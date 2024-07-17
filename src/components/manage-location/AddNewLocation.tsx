import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useUploadImageMutation } from "../../redux/features/crowdFund/crowdFundApi";
import SmallLoading from "../ui/SmallLoading";
import { ResponseSuccessType } from "../../types/common";
import { toast } from "react-toastify";
import { FaPlus } from "react-icons/fa";
import { useAddLocationMutation } from "../../redux/features/location/locationApi";
import AppButton from "../ui/AppButton";

type TInputs = {
  name: string;
  type: string;
};

type TAddNewLocation = {
  closeModal?: () => void;
};

const AddNewLocation = ({ closeModal }: TAddNewLocation) => {
  const [loading, setLoading] = useState(false);
  const [imgUrl, setImgUrl] = useState("");
  const [
    uploadImage,
    {
      data: imageData,
      isLoading: imageLoading,
      isError: imageError,
      isSuccess: imageSuccess
    }
  ] = useUploadImageMutation();
  const [addChatGroup] = useAddLocationMutation();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<TInputs>();

  const handleFileUpload = async (value: any) => {
    const formData = new FormData();
    setLoading(true);

    const maxSizeInBytes = 4 * 1024 * 1024;
    if (value.size && value.size > maxSizeInBytes) {
      setLoading(false);
      return toast.error("Your file was more than 4 Megabyte!", { toastId: 1 });
    }

    formData.append("image", value);
    await uploadImage(formData)
      .unwrap()
      .then((res: ResponseSuccessType) => {
        if (!res.success) {
          toast.error(res.message || "Something went wrong");
          setLoading(false);
        }
      })
      .catch((res) => {
        if (!res.success) {
          toast.error(res.message || "Something went wrong");
          setLoading(false);
        }
      });
  };

  const onSubmit: SubmitHandler<TInputs> = async (data) => {
    if (!imgUrl) {
      return toast.error("Please upload Location image and try again.", {
        toastId: 1
      });
    }
    const submitData = {
      ...data,
      imgUrl
    };
    await addChatGroup(submitData)
      .unwrap()
      .then((res: any) => {
        toast.success("location are added successfully!", { toastId: 1 });
        if (closeModal) {
          closeModal();
        }
      })
      .catch((res) => {
        if (!res.success) {
          toast.error(res.message || "Something went wrong", { toastId: 1 });
        }
      });
  };

  useEffect(() => {
    if (!imageLoading && !imageError && imageSuccess) {
      if (imageData?.data.url) {
        setImgUrl(imageData?.data.url);
        setLoading(false);
      }
    }
  }, [imageData?.data.url, imageError, imageLoading, imageSuccess]);

  return (
    <div className="min-w-[320px] md:w-[560px]">
      <form
        className="space-y-4 2xl:space-y-6 py-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          onChange={(e) =>
            handleFileUpload(e.target.files?.length && e.target.files[0])
          }
          type="file"
          name=""
          id="imgUrl"
          className="hidden"
        />
        <div className="flex flex-col items-center gap-1 justify-center">
          {loading ? (
            <div className="rounded-full border border-[#E3E7E7] w-[100px] h-[100px]">
              {" "}
              <SmallLoading />
            </div>
          ) : (
            <label
              htmlFor="imgUrl"
              className="rounded-full cursor-pointer w-[100px] h-[100px] flex items-center justify-center "
            >
              {imgUrl ? (
                <img
                  src={imgUrl}
                  alt=""
                  className="w-full h-full rounded-full object-fill"
                />
              ) : (
                <div className="bg-[#E3E7E7] flex items-center justify-center rounded-full w-full h-full">
                  <FaPlus className="text-xl text-primary" />
                </div>
              )}
            </label>
          )}
          <p className="text-sm text-center text-textDark">Location Image</p>
        </div>

        <div className="flex flex-col text-textDark">
          <label htmlFor="name">Location Name</label>
          <input
            id="name"
            className={`input ${errors.name && "border-2 border-bgred  "}`}
            placeholder="Type your account number"
            {...register("name", { required: true })}
          />
          {errors.name && (
            <p className="text-bgred"> Location Name is required.</p>
          )}
        </div>

        <div className="flex items-center justify-center pt-4">
          <AppButton label="Add" isLoading={loading || imageLoading} />
        </div>
      </form>
    </div>
  );
};

export default AddNewLocation;
