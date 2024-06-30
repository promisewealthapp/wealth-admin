import AddBankAccount from "../components/bank-account/AddBankAccount";
import AppModal from "../components/ui/AppModal";
import Popover from "../components/ui/Popover";
import ViewBankInfo from "../components/bank-account/ViewBankInfo";
import EditBankAccount from "../components/bank-account/EditBankAccount";
import { useDeleteBankMutation, useGetBanksQuery } from "../redux/features/bank/bankApi";
import AppTable from "../components/ui/AppTable";
import { useEffect, useMemo, useState } from "react";
import { Bank } from "../types/common";
import { toast } from "react-toastify";

const ManageBank = () => {
    const [page, setPage] = useState(1);
    const [modalOpen, setModalOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [deleteBankAccount, { isError, isSuccess, isLoading }] = useDeleteBankMutation();
    const queryString = useMemo(() => {
        const info = {
            // role: "admin",
            limit: 10,
            page,
            searchTerm: search.length ? search : undefined,
        };
        const queryString = Object.keys(info).reduce((pre, key: string) => {
            const value = info[key as keyof typeof info];
            if (value) {
                return pre + `${Boolean(pre.length) ? "&" : ""}${key}=${value}`;
            }
            return pre;
        }, "");
        return queryString;
    }, [page, search]);

    const infoQuery = useGetBanksQuery(queryString);

    useEffect(() => {
        if (isError) {
            toast.error("Bank delete unsuccessful!");
        } else if (!isLoading && isSuccess) {
            toast.success('Bank deleted Successful!')
        }
    }, [isError, isLoading, isSuccess])


    const columns = [
        {
            title: 'Account Name',
            dataIndex: 'accountName',
            className: "min-w-[150px]",
            render: (accountName: string, record: any) => {
                return (
                    <AppModal title="Account Details" button={
                        <p className="cursor-pointer">{accountName}</p>
                    } >
                        <ViewBankInfo record={record} />
                    </AppModal>
                )
            }
        },
        {
            title: 'Account Number',
            dataIndex: 'accountNumber',
            className: "min-w-[150px]",
        },
        {
            title: 'Bank Name',
            dataIndex: 'name',
            className: "min-w-[150px]",
            render: (name: string, record: Bank) => {
                return (
                    <div className='flex items-center gap-1 font-medium'>
                        <img src={record?.logoOfBank} alt="" className="rounded-sm w-8 h-5" />
                        <p>{name}</p>
                    </div>
                )
            }
        },
        {
            title: 'Branch Name',
            dataIndex: 'typeOfBank',
            className: "min-w-[150px]",
        },
        {
            title: 'Action',
            dataIndex: 'action',
            className: "min-w-[80px]",
            render: (text: string, record: any) => {
                return (
                    <div className='flex items-center justify-end gap-1'>
                        <Popover>
                            <div className="flex flex-col items-end justify-end">
                                <AppModal button={
                                    <p className="cursor-pointer">Delete</p>
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
                                    <button className="cursor-pointer">Edit</button>
                                }>
                                    <EditBankAccount record={record} />
                                </AppModal>
                            </div>
                        </Popover>
                    </div>
                )
            }
        },
    ];

    return (
        <AppTable
            columns={columns}
            infoQuery={infoQuery}
            onInputChange={(text) => setSearch(text)}
            setPage={setPage}
            headerText="Account List"
            button={
                <AppModal title="Add New Bank Account" button={
                    <button className="roundedBtn">Add New Bank</button>
                }
                    modalOpen={modalOpen}
                    setModalOpen={setModalOpen}
                >
                    <AddBankAccount closeModal={() => setModalOpen(false)} />
                </AppModal>
            }
        />
    );
};

export default ManageBank;