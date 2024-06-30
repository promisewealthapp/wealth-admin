import { SubmitHandler, useForm } from "react-hook-form";
import AppSelect from "../ui/AppSelect";
import { useEffect, useState } from "react";
import { useUploadImageMutation } from "../../redux/features/crowdFund/crowdFundApi";
import SmallLoading from "../ui/SmallLoading";
import { ResponseSuccessType } from "../../types/common";
import { toast } from "react-toastify";
import { FaPlus } from "react-icons/fa";
import { useAddGroupMutation } from "../../redux/features/group/groupApi";
import AppButton from "../ui/AppButton";

type TInputs = {
    name: string;
    type: string;
}
type TAddNewGroup = {
    closeModal?: () => void
}

const AddNewGroup = ({ closeModal }: TAddNewGroup) => {
    const [loading, setLoading] = useState(false);
    const [thumbnail, setThumbnail] = useState("");
    const [uploadImage, { data: imageData, isLoading: imageLoading, isError: imageError, isSuccess: imageSuccess }] = useUploadImageMutation();
    const [addChatGroup] = useAddGroupMutation();

    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<TInputs>();

    const handleFileUpload = async (value: any) => {
        const formData = new FormData();
        setLoading(true);

        const maxSizeInBytes = 4 * 1024 * 1024;
        if (value.size && value.size > maxSizeInBytes) {
            setLoading(false)
            return toast.error("Your file was more than 4 Megabyte!", { toastId: 1 });
        }

        formData.append('image', value);
        await uploadImage(formData).unwrap().then((res: ResponseSuccessType) => {

            if (!res.success) {
                toast.error(res.message || "Something went wrong");
                setLoading(false)
            }
        }).catch(res => {
            if (!res.success) {
                toast.error(res.message || "Something went wrong");
                setLoading(false)
            }
        })

    }

    const onSubmit: SubmitHandler<TInputs> = async (data) => {
        if (!thumbnail) {
            return toast.error("Please upload Group image and try again.", { toastId: 1 });
        }
        const submitData = {
            ...data, thumbnail
        }

        await addChatGroup(submitData).unwrap().then((res: any) => {
            if (!res.success) {
                toast.error(res.message || "Something went wrong");
            }
            toast.success("Add New Chat Group Added successfully!");
            if (closeModal) {
                closeModal()
            }

        }).catch(res => {
            if (!res.success) {
                toast.error(res.message || "Something went wrong");
            }
        });
    }

    const groupTypeOptions = [
        { value: 'public', label: 'Public' },
        { value: 'admin', label: 'Admin' },
        { value: 'champion', label: 'Champion' },
    ]

    useEffect(() => {
        if (!imageLoading && !imageError && imageSuccess) {
            if (imageData?.data.url) {
                setThumbnail(imageData?.data.url);
                setLoading(false)
            }
        }
    }, [imageData?.data.url, imageError, imageLoading, imageSuccess])


    return (
        <div className='min-w-[320px] md:w-[560px]'>
            <form className="grid md:grid-cols-2 gap-4 2xl:gap-6 py-2" onSubmit={handleSubmit(onSubmit)}>
                <input onChange={(e) => handleFileUpload(e.target.files && e.target.files[0])} type="file" name="" id="thumbnail" className="hidden" />
                <div className='md:col-span-2 flex flex-col items-center gap-1 justify-center'>
                    {
                        loading ? <SmallLoading className="rounded-full border border-[#E3E7E7] w-[100px] h-[100px]" /> :
                            <label htmlFor="thumbnail" className="rounded-full cursor-pointer w-[100px] h-[100px] flex items-center justify-center ">
                                {
                                    thumbnail ?
                                        <img src={thumbnail} alt="" className="w-full h-full rounded-full object-fill" />
                                        : <div className='bg-[#E3E7E7] flex items-center justify-center rounded-full w-full h-full'>
                                            <FaPlus className="text-xl text-primary" />
                                        </div>
                                }
                            </label>
                    }
                    <p className="text-sm text-center text-textDark">Group Image</p>
                </div>

                <div className='flex flex-col text-textDark'>
                    <label htmlFor="type">Group Type</label>
                    <AppSelect
                        name="type"
                        defaultValue="public"
                        control={control}
                        options={groupTypeOptions} />
                </div>

                <div className='flex flex-col text-textDark'>
                    <label htmlFor="name">Group Name</label>
                    <input id="name" className={`input ${errors.name && 'border-2 border-bgred  '}`} placeholder="Type your account number" {...register("name", { required: true })} />
                    {errors.name && <p className="text-bgred"> Group Name is required.</p>}
                </div>

                <div className='md:col-span-2 flex items-center justify-center pt-4'>
                    <AppButton
                        label="Add"
                        isLoading={loading || imageLoading}
                    />
                </div>
            </form>
        </div>
    );
};

export default AddNewGroup;