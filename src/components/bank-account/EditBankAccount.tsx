import { SubmitHandler, useForm } from "react-hook-form";
import AppSelect from "../ui/AppSelect";
import { Bank, ResponseSuccessType } from "../../types/common";
import SmallLoading from "../ui/SmallLoading";
import { useEditBankMutation } from "../../redux/features/bank/bankApi";
import { useEffect, useState } from "react";
import { useUploadImageMutation } from "../../redux/features/crowdFund/crowdFundApi";
import { toast } from "react-toastify";

type TInputs = {
    accountName: string;
    accountNumber: string;
    typeOfBank: string;
    name: string;
}

type TBankProps = {
    record?: Bank;
    closeModal?: () => void
}


const EditBankAccount = ({ record, closeModal }: TBankProps) => {
    const [loading, setLoading] = useState(false);
    const [logoOfBank, setLogoOfBank] = useState("");
    const [uploadImage, { data: imageData, isLoading: imageLoading, isError: imageError, isSuccess: imageSuccess }] = useUploadImageMutation();
    const [editBankAccount] = useEditBankMutation();

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
        const submitData = {
            id: record?.id, ...data, logoOfBank: logoOfBank || record?.logoOfBank
        }

        await editBankAccount(submitData).unwrap().then((res: any) => {
            if (!res.success) {
                toast.error(res.message || "Something went wrong");
            }
            toast.success("User are edited successfully!");
            if (closeModal) {
                closeModal()
            }

        }).catch(res => {
            if (!res.success) {
                toast.error(res.message || "Something went wrong");
            }
        });
    }
    const bankNameOptions = [
        { value: 'bankOfNigeria', label: 'Bank of Nigeria' },
        { value: 'bankOfSpain', label: 'Bank Of Spain' },
        { value: 'bankOfFrance', label: 'Bank Of France' },
    ]

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
                            <label htmlFor="logoOfBank" className="relative rounded-lg cursor-pointer w-[100px] h-[80px] flex items-center justify-center ">
                                <img src={logoOfBank || record?.logoOfBank} alt="" className="w-full h-full rounded-lg object-fill" />
                                <img src="/images/reverse.png" alt="" className="absolute bottom-2 right-2 w-5 h-5" />
                            </label>
                    }
                    <p className="text-sm text-center text-textDark">Bank Thumbnail</p>
                </div>

                <div className='flex flex-col text-textDark'>
                    <label htmlFor="accountName">Account Holder Name</label>
                    <input id="accountName" defaultValue={record?.accountName} className={`input ${errors.accountName && 'border-2 border-bgred  '}`} placeholder="Type your account holder name" {...register("accountName", { required: true })} />
                    {errors.accountName && <p className="text-bgred">Account Holder Name is required.</p>}
                </div>

                <div className='flex flex-col text-textDark'>
                    <label htmlFor="accountNumber">Account Number</label>
                    <input id="accountNumber" defaultValue={record?.accountNumber} className={`input ${errors.accountNumber && 'border-2 border-bgred  '}`} placeholder="Type your account number" {...register("accountNumber", { required: true })} />
                    {errors.accountName && <p className="text-bgred"> Account Number is required.</p>}
                </div>
                <div className='flex flex-col text-textDark'>
                    <label htmlFor="typeOfBank">Currency</label>
                    <AppSelect
                        name="typeOfBank"
                        defaultValue={record?.typeOfBank}
                        control={control}
                        options={currencyOptions} />
                    {errors.typeOfBank && <p className="text-bgred">Currency is required.</p>}
                </div>

                <div className='flex flex-col text-textDark'>
                    <label htmlFor="name">Bank Name</label>
                    <AppSelect
                        name={record?.name || ""}
                        defaultValue="Bank of Nigeria"
                        control={control}
                        options={bankNameOptions} />
                </div>
                <div className='md:col-span-2 flex items-center justify-center pt-4'>
                    <input type="submit" className="roundedBtn cursor-pointer" value={"Save Update"} />
                </div>
            </form>
        </div>
    );
};

export default EditBankAccount;