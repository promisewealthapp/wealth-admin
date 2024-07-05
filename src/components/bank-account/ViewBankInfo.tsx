import { useEffect } from "react";
import { Bank } from "../../types/common";
import AppModal from "../ui/AppModal";
import EditBankAccount from "./EditBankAccount";
import { useDeleteBankMutation, useGetBankByIdQuery } from "../../redux/features/bank/bankApi";
import { toast } from "react-toastify";

type TViewBankProps = {
    record?: Bank;
    footerButton?: boolean;
    wealthBankId?: string;
}

const ViewBankInfo = ({ record, footerButton = true, wealthBankId }: TViewBankProps) => {
    const [deleteBankAccount, { isError, isSuccess, isLoading }] = useDeleteBankMutation();
    const { data } = useGetBankByIdQuery(wealthBankId, {
        skip: !wealthBankId,
    });

    useEffect(() => {
        if (isError) {
            toast.error("Group delete unsuccessful!");
        } else if (!isLoading && isSuccess) {
            toast.success('Group deleted Successful!')
        }
    }, [isError, isLoading, isSuccess])
    console.log(data);
    return (
        <div className='w-[560px]'>
            <div className='grid grid-cols-2 py-4 gap-6 2xl:gap-8'>
                <div className=''>
                    <p className="text-[#828282]">Account Holder Name</p>
                    <p className="text-textDark font-medium">{record?.accountName || data?.accountName}</p>
                </div>

                <div className=''>
                    <p className="text-[#828282]">Account Number</p>
                    <p className="text-textDark font-medium">{record?.accountNumber || data?.accountNumber}</p>
                </div>

                <div className=''>
                    <p className="text-[#828282]">Currency</p>
                    <p className="text-textDark font-medium">{record?.typeOfBank || data?.typeOfBank}</p>
                </div>

                <div className=''>
                    <p className="text-[#828282]">Branch Name</p>
                    <div className='flex items-center gap-1 font-medium'>
                        <img src={record?.logoOfBank || data?.logoOfBank} alt="" className="rounded-sm w-8 h-5" />
                        <p>{record?.name || data?.name}</p>
                    </div>
                </div>
            </div>
            {footerButton &&

                <div className='flex items-center justify-center gap-2 pt-4 lg:pt-6'>
                    <AppModal button={
                        <button className="roundedBtn text-textDark bg-[#E8E8E8] text-sm">Delete</button>
                    }
                        cancelButtonTitle="No, Don’t"
                        primaryButtonTitle="Yes. Delete"
                        primaryButtonAction={() => deleteBankAccount(record?.id)}
                    >
                        <div className='max-w-80'>
                            <p className="text-center text-[#828282] pt-4 text-lg">Are you sure delete <span className="text-textDark font-medium">{record?.accountName}</span> from the account list?</p>
                        </div>
                    </AppModal>

                    <AppModal title="Edit New Bank Account" button={
                        <button className="roundedBtn text-sm">Edit</button>
                    }>
                        <EditBankAccount record={record} />
                    </AppModal>
                </div>
            }
        </div>
    );
};

export default ViewBankInfo;