import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useAddPropertyStateMutation } from "../../redux/features/propertyState/propertyStateApi";
import { DatePicker } from "antd";
import AppDatePicker from "../ui/AppDatePicker";

type TInputs = {
    price: number;
    time: string;
}

type TAddNewPropertyState = {
    closeModal?: () => void;
    propertyId: string;
}

const AddNewProperty = ({ propertyId, closeModal }: TAddNewPropertyState) => {
    const [addPropertyState] = useAddPropertyStateMutation();

    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<TInputs>();

    const onSubmit: SubmitHandler<TInputs> = async (data) => {
        const submitData = {
            ...data, propertyId
        }
        console.log(submitData);
        await addPropertyState(submitData).unwrap().then((res: any) => {
            if (!res.success) {
                toast.error(res.message || "Something went wrong");
            }
            toast.success("Property state are edited successfully!");
            if (closeModal) {
                closeModal()
            }

        }).catch(res => {
            if (!res.success) {
                toast.error(res.message || "Something went wrong");
            }
        });
    }
    return (
        <div className='w-[560px]'>
            <form className="grid grid-cols-2 gap-4 2xl:gap-6 py-2" onSubmit={handleSubmit(onSubmit)}>

                <div className='flex flex-col text-textDark'>
                    <label htmlFor="price">Add Amount</label>
                    <input type="number" id="price" className={`input ${errors.price && 'border-2 border-bgred  '}`} placeholder="Type your account number" {...register("price", { required: true, valueAsNumber: true })} />
                    {errors.price && <p className="text-bgred"> Add Amount is required.</p>}
                </div>

                <div className='flex flex-col text-textDark'>
                    <label htmlFor="price">Date</label>
                    <AppDatePicker
                        control={control}
                        name="time"
                        placeholder="Select Date"
                    />
                    {/* <input id="price" className={`input ${errors.price && 'border-2 border-bgred  '}`} placeholder="Type your account number" {...register("price", { required: true, valueAsNumber: true })} /> */}

                    {errors.time && <p className="text-bgred"> Date is required.</p>}
                </div>

                <div className='col-span-2 flex items-center justify-center pt-4'>
                    <input type="submit" className="roundedBtn cursor-pointer" value={"Add"} />
                </div>
            </form>
        </div>
    );
};

export default AddNewProperty;