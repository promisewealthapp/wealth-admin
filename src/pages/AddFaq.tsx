import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAddFaqMutation } from "../redux/features/faq/faqApi";
import AppButton from "../components/ui/AppButton";

type TInputs = {
    question: string;
    ans: string;
};

const AddFaq = () => {
    const navigate = useNavigate();
    const [addFaq, { isLoading }] = useAddFaqMutation()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<TInputs>();

    const onSubmit: SubmitHandler<TInputs> = async (data) => {

        await addFaq(data).unwrap().then(res => {
            toast.success("Support are added successfully!");
            navigate('/manage-support');

        }).catch(res => {
            if (!res.success) {
                toast.error(res.message || "Something went wrong");
            }
        });
    };

    return (
        <>
            <Link
                to={"/manage-support"}
                className="text-xl 2xl:text-2xl w-fit font-medium text-[#343A40] flex items-center gap-2"
            >
                <img
                    src="/images/Back-without-border.png"
                    alt="back"
                    className="w-10 lg:w-12 2xl:w-14 h-10 lg:h-12 2xl:h-14"
                />
                <h2>Go Back</h2>
            </Link>

            <div className="mt-4 rounded-2xl border bg-[#F8F8F8] p-3 lg:p-5 rounded-t-2xl border-[#E6E6E7] overflow-x-auto ">
                <h1 className="lg:text-xl font-medium">Add FAQ</h1>
                <form className="pt-4 space-y-4" onSubmit={handleSubmit(onSubmit)}>
                    <div className=" flex flex-col text-textDark">
                        <label htmlFor="question">Question</label>
                        <input
                            id="question"
                            className={`input ${errors.question && "border-2 border-bgred  "
                                }`}
                            placeholder="Type your question here"
                            {...register("question", { required: true })}
                        />
                        {errors.question && (
                            <p className="text-bgred"> question is required.</p>
                        )}
                    </div>
                    <div className="flex flex-col text-textDark">
                        <label htmlFor="ans">Answer</label>
                        <textarea
                            id="ans"
                            className={`input ${errors.ans && "border-2 border-bgred  "
                                }`}
                            placeholder="Type your answer here"
                            {...register("ans", { required: true })}
                        />
                        {errors.ans && (
                            <p className="text-bgred"> Answer is required.</p>
                        )}
                    </div>
                    <div className="flex items-center justify-center pt-4">
                        <AppButton
                            label="Add"
                            isLoading={isLoading}
                        />
                    </div>
                </form>
            </div>
        </>
    );
};

export default AddFaq;