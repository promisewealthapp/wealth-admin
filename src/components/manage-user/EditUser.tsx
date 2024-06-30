import { useForm, SubmitHandler } from "react-hook-form"
import { ResponseSuccessType, User } from "../../types/common";
import { useEffect, useState } from "react";
import { useUploadImageMutation } from "../../redux/features/crowdFund/crowdFundApi";
import { toast } from "react-toastify";
import SmallLoading from "../ui/SmallLoading";
import { useEditUserMutation } from "../../redux/features/user/userApi";
import { useNavigate } from "react-router-dom";

type TInputs = {
    name: string;
    phoneNumber: string;
    email: string;
    address: string;
}

type TEditUserProps = {
    record: User
}

const EditUser = ({ record }: TEditUserProps) => {
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState("");
    const [uploadImage, { data: imageData, isError: imageError, isSuccess: imageSuccess, isLoading: imageLoading }] = useUploadImageMutation();
    const [editUser, { }] = useEditUserMutation();
    const {
        register,
        handleSubmit,
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

    useEffect(() => {
        if (!imageLoading && !imageError && imageSuccess) {
            if (imageData?.data.url) {
                setImage(imageData?.data.url);
                setLoading(false)
            }
        }
    }, [imageData?.data.url, imageError, imageLoading, imageSuccess])


    const onSubmit: SubmitHandler<TInputs> = async (data) => {
        const submitData = {
            id: record.id, ...data, profileImg: image || record?.profileImg
        }
        console.log(submitData);
        await editUser(submitData).unwrap().then((res: any) => {
            if (!res.success) {
                toast.error(res.message || "Something went wrong");
            }
            toast.success("User are edited successfully!");

        }).catch(res => {
            if (!res.success) {
                toast.error(res.message || "Something went wrong");
            }
        });
    }

    return (
        <div className='w-[560px]'>
            <div className='flex items-center justify-center py-6'>
                <input onChange={(e) => handleFileUpload(e.target.files && e.target.files[0])} type="file" name="" id="image" className="hidden" />
                <div className='relative w-[120px] 2xl:w-[150px] h-[120px] 2xl:h-[150px] rounded-full bg-gray-200'>
                    {
                        loading ? <SmallLoading className="w-[120px] 2xl:w-[150px] h-[120px] 2xl:h-[150px] rounded-full" /> :
                            <label htmlFor="image" className="rounded-full cursor-pointer w-full h-full flex items-center justify-center">
                                <img src={image ? image : record?.profileImg} alt={record?.name} className=" rounded-full " />
                                <img src="/images/reverse.png" alt="reverse" className="absolute bottom-1 right-1 w-8 2xl:w-11 h-8 2xl:h-11 cursor-pointer" />
                            </label>
                    }

                </div>
            </div>
            <form className="grid grid-cols-2 gap-4 2xl:gap-6" onSubmit={handleSubmit(onSubmit)}>

                <div className='flex flex-col text-textDark'>
                    <label htmlFor="name">Name</label>
                    <input id="name" className="input" defaultValue={record?.name} {...register("name", { required: true })} />
                </div>

                <div className='flex flex-col text-textDark'>
                    <label htmlFor="phoneNumber">Phone Number</label>
                    <input id="phoneNumber" className="input" defaultValue={record?.phoneNumber} {...register("phoneNumber", { required: true })} />
                </div>

                <div className='col-span-2 flex flex-col text-textDark'>
                    <label htmlFor="email">Email Address</label>
                    <input id="email" className="input" defaultValue={record?.email} {...register("email", { required: true })} />
                </div>

                <div className='col-span-2 flex flex-col text-textDark'>
                    <label htmlFor="address">Address</label>
                    <input id="address" className="input" defaultValue={record?.location} {...register("address", { required: true })} />
                </div>
                <div className='col-span-2 flex items-center justify-center'>
                    <input type="submit" className="roundedBtn cursor-pointer" value={"Save Update"} />
                </div>
            </form>
        </div>
    );
};

export default EditUser;