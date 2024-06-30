import { SubmitHandler, useForm } from "react-hook-form";
import AppSelect from "../ui/AppSelect";
import SmallLoading from "../ui/SmallLoading";
import { useEffect, useState } from "react";
import { useAddBankMutation } from "../../redux/features/bank/bankApi";
import { useUploadImageMutation } from "../../redux/features/crowdFund/crowdFundApi";
import { toast } from "react-toastify";
import { ResponseSuccessType } from "../../types/common";
import { FaPlus } from "react-icons/fa";
import AppButton from "../ui/AppButton";

type TInputs = {
    accountName: string;
    accountNumber: string;
    typeOfBank: string;
    name: string;
}

type TAddBankAccount = {
    closeModal?: () => void
}

const AddBankAccount = ({ closeModal }: TAddBankAccount) => {
    const [loading, setLoading] = useState(false);
    const [logoOfBank, setLogoOfBank] = useState("");
    const [uploadImage, { data: imageData, isLoading: imageLoading, isError: imageError, isSuccess: imageSuccess }] = useUploadImageMutation();
    const [addChatGroup] = useAddBankMutation();

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
        if (!logoOfBank) {
            return toast.error("Please upload logo and try again.", { toastId: 1 });
        }
        const submitData = {
            ...data, logoOfBank
        }

        await addChatGroup(submitData).unwrap().then((res: any) => {
            if (!res.success) {
                toast.error(res.message || "Something went wrong");
            }
            toast.success("Bank are added successfully!");
            if (closeModal) {
                closeModal()
            }

        }).catch(res => {
            if (!res.success) {
                toast.error(res.message || "Something went wrong");
            }
        });
    }

    const currencyOptions = [
        { value: 'naira', label: 'Naira' },
        { value: 'usd', label: 'USD' },
    ]

    useEffect(() => {
        if (!imageLoading && !imageError && imageSuccess) {
            if (imageData?.data.url) {
                setLogoOfBank(imageData?.data.url);
                setLoading(false)
            }
        }
    }, [imageData?.data.url, imageError, imageLoading, imageSuccess])

    return (
        <div className='min-w-[320px] md:w-[560px]'>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4 2xl:gap-6 pt-6 pb-2" onSubmit={handleSubmit(onSubmit)}>

                <input onChange={(e) => handleFileUpload(e.target.files && e.target.files[0])} type="file" name="" id="logoOfBank" className="hidden" />
                <div className='md:col-span-2 flex flex-col items-center gap-1 justify-center'>
                    {
                        loading ? <SmallLoading className="rounded-lg border border-[#FEFAEC] w-[100px] h-[80px]" /> :
                            <label htmlFor="logoOfBank" className="rounded-lg cursor-pointer w-[100px] h-[80px] flex items-center justify-center ">
                                {
                                    logoOfBank ?
                                        <img src={logoOfBank} alt="" className="w-full h-full rounded-lg object-fill" />
                                        : <div className='bg-[#FEFAEC] flex items-center justify-center rounded-lg w-full h-full'>
                                            <FaPlus className="text-xl text-primary" />
                                        </div>
                                }
                            </label>
                    }
                    <p className="text-sm text-center text-textDark">Bank Thumbnail</p>
                </div>

                <div className='flex flex-col text-textDark'>
                    <label htmlFor="accountName">Account Holder Name</label>
                    <input id="accountName" className={`input ${errors.accountName && 'border-2 border-bgred  '}`} placeholder="Type your account holder name" {...register("accountName", { required: true })} />
                    {errors.accountName && <p className="text-bgred">Account Holder Name is required.</p>}
                </div>

                <div className='flex flex-col text-textDark'>
                    <label htmlFor="accountNumber">Account Number</label>
                    <input id="accountNumber" className={`input ${errors.accountNumber && 'border-2 border-bgred  '}`} placeholder="Type your account number" {...register("accountNumber", { required: true })} />
                    {errors.accountNumber && <p className="text-bgred"> Account Number is required.</p>}
                </div>
                <div className='flex flex-col text-textDark'>
                    <label htmlFor="typeOfBank">Currency</label>
                    <AppSelect
                        name="typeOfBank"
                        placeholder="Naira"
                        control={control}
                        options={currencyOptions} />
                    {errors.typeOfBank && <p className="text-bgred">Currency is required.</p>}
                </div>


                <div className='flex flex-col text-textDark'>
                    <label htmlFor="name">Bank Name</label>
                    <input id="name" className={`input ${errors.name && 'border-2 border-bgred  '}`} placeholder="Type your Bank Name" {...register("name", { required: true })} />
                    {errors.name && <p className="text-bgred">Bank Name is required.</p>}
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

export default AddBankAccount;