import React, { useEffect, useState } from "react";
import AppButton from "../components/ui/AppButton";
import SmallLoading from "../components/ui/SmallLoading";
import { toast } from "react-toastify";
import { SubmitHandler, useForm } from "react-hook-form";
import { useUploadImageMutation } from "../redux/features/crowdFund/crowdFundApi";
import { useAddLocationMutation } from "../redux/features/location/locationApi";
import { ResponseSuccessType } from "../types/common";
import { FaPlus } from "react-icons/fa";
import AppDatePicker from "../components/ui/AppDatePicker";
import { useAddPromotionMutation } from "../redux/features/promotion/promotionApi";

type Props = {};
type TInputs = {
  location: string;
  title: string;
  type: string;
  streetLocation: string;
  description: string;
};

export default function AddPromotion(props: Props) {
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
  const [addPromotion, { isLoading }] = useAddPromotionMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset
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
      return toast.error("Please upload Thumbnail and try again.", {
        toastId: 1
      });
    }
    const submitData = {
      ...data,
      thumbnail: imgUrl
    };
    addPromotion(submitData)
      .unwrap()
      .then((res) => {
        console.log(res);
        toast.success(res?.message);
        reset();
        setImgUrl("");
      })
      .catch((err) => {
        toast.error(err?.data?.message || "Failed to add");
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
    <div className=" ">
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
            <div className="  border border-[#E3E7E7] w-[100px] h-[100px]">
              {" "}
              <SmallLoading />
            </div>
          ) : (
            <label
              htmlFor="imgUrl"
              className="  cursor-pointer w-full md:w-[375px] h-[244px] flex items-center justify-center rounded-lg overflow-hidden"
            >
              {imgUrl ? (
                <img
                  src={imgUrl}
                  alt=""
                  className="w-full h-full   object-cover"
                />
              ) : (
                <div className="bg-[#E3E7E7] flex items-center justify-center   w-full h-full">
                  <FaPlus className="text-xl text-primary" />
                </div>
              )}
            </label>
          )}
          <p className="text-sm text-center text-textDark ">
            Upload A Thumbnail
          </p>
        </div>
        <div className="grid grid-cols-1 pt-5 md:grid-cols-2  gap-5 ">
          <div className="flex flex-col text-textDark">
            <label htmlFor="name">Title</label>
            <input
              id="title"
              className={`input ${errors.title && "border-2 border-bgred  "}`}
              placeholder="Enter title"
              {...register("title", { required: true })}
            />
            {errors.title && <p className="text-bgred"> Title is required.</p>}
          </div>
          <div className="flex flex-col text-textDark">
            <label htmlFor="location">Location Name</label>
            <input
              id="location"
              className={`input ${
                errors.location && "border-2 border-bgred  "
              }`}
              placeholder="Enter location"
              {...register("location", { required: true })}
            />
            {errors.location && (
              <p className="text-bgred"> Location is required.</p>
            )}
          </div>
          <div className="flex flex-col text-textDark">
            <label htmlFor="streetLocation">Street Location</label>
            <input
              id="streetLocation"
              className={`input ${
                errors.streetLocation && "border-2 border-bgred  "
              }`}
              placeholder="Enter street location"
              {...register("streetLocation", { required: true })}
            />
            {errors.streetLocation && (
              <p className="text-bgred"> Street Location is required.</p>
            )}
          </div>
          <div className="flex flex-col text-textDark">
            <label htmlFor="streetLocation">Select Date</label>
            <AppDatePicker
              control={control}
              className="h-[45px]"
              name="date"
            ></AppDatePicker>
          </div>
        </div>
        <div className="md:col-span-2">
          <div className="flex flex-col text-textDark">
            <label htmlFor="description">Description</label>
            <textarea
              rows={5}
              id="description"
              className={`input ${
                errors.description && "border-2 border-bgred  "
              }`}
              placeholder="Type here"
              {...register("description", { required: true })}
            />
            {errors.description && (
              <p className="text-bgred"> Description is required.</p>
            )}
          </div>
        </div>

        <div className="flex items-center justify-center pt-4">
          <AppButton label="Add" isLoading={loading || imageLoading} />
        </div>
      </form>
    </div>
  );
}
