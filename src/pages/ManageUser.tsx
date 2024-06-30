import { GoVerified } from "react-icons/go";
import { GoUnverified } from "react-icons/go";
import AppModal from "../components/ui/AppModal";
import { useDeleteUserMutation, useEditUserMutation, useGetUsersQuery } from "../redux/features/user/userApi";
import { toast } from "react-toastify";
import { useEffect, useMemo, useState } from "react";
import AppTable from "../components/ui/AppTable";
import { User } from "../types/common";
import ViewUser from "../components/manage-user/ViewUser";
import { MdBlock } from "react-icons/md";
import { RiVerifiedBadgeFill } from "react-icons/ri";

const ManageUser = () => {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");

    const queryString = useMemo(() => {
        const info = {
            role: "user",
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

    const infoQuery = useGetUsersQuery(queryString);

    const [deleteUser, { isError, error, isLoading, isSuccess }] = useDeleteUserMutation();
    const [updateUser] = useEditUserMutation();

    const handleBlockUser = async (id: string, value: boolean) => {
        const updateData = {
            id, isBlocked: value
        }
        await updateUser(updateData).unwrap().then(res => {
            if (!res.success) {
                toast.error("Block this User unsuccessful!", { toastId: 1 })
            }
            toast.success("Block this User successful!", { toastId: 1 })
        }).catch(res => {
            if (!res.success) {
                toast.error("Block this User unsuccessful!", { toastId: 1 })
            }
        });
    }

    useEffect(() => {
        if (isError) {
            toast.error("User delete unsuccessful!");
        } else if (!isLoading && isSuccess) {
            toast.success('User deleted Successful!')
        }
    }, [isError, error, isLoading, isSuccess])

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            className: "min-w-[150px]",
            render: (name: string, record: User) => {
                return (
                    <div className='flex items-center gap-1'>
                        <img src={record?.profileImg} alt="" className="rounded-full w-10 h-10" />
                        <AppModal title="User Details" button={
                            <p className="cursor-pointer">{name}</p>
                        } >
                            <ViewUser record={record} />
                        </AppModal>
                    </div>
                )
            }
        },
        {
            title: 'Email',
            dataIndex: 'email',
            className: "min-w-[150px]",
        },
        {
            title: 'Phone Number',
            dataIndex: 'phoneNumber',
            className: "min-w-[145px]",
        },
        {
            title: 'Payment Status',
            dataIndex: 'isPaid',
            className: "min-w-[150px]",
            render: (isPaid: boolean) => {
                return (
                    <div className={`flex items-center gap-1`}>
                        {isPaid === true ? "Paid" : "Free"}
                    </div>
                )
            }
        },
        {
            title: "User Status",
            dataIndex: "isBlocked",
            className: "min-w-[115px]",
            render: (isBlocked: boolean) => {
                return (
                    <div className={`flex items-center gap-1 text-sm ${isBlocked ? "text-textDark" : "text-success"}`}>
                        {
                            isBlocked ? <MdBlock /> : <RiVerifiedBadgeFill />
                        }
                        {isBlocked ? "Blocked" : "Active"}
                    </div>
                );
            },
        },
        {
            title: 'Verification Status',
            dataIndex: 'isVerified',
            className: "min-w-[150px]",
            render: (isVerified: boolean) => {
                return (
                    <div className={`flex items-center gap-1 ${isVerified === true ? 'text-success' : "text-bgSecondary"}`}>
                        {
                            isVerified === true ? <GoVerified /> : <GoUnverified />
                        }
                        {isVerified === true ? "Verified" : "Unverified"}
                    </div>
                )
            }
        },
        {
            title: 'Action',
            dataIndex: 'action',
            className: "min-w-[145px]",
            render: (text: string, record: any) => {
                return (
                    <div className='flex items-center justify-evenly gap-1'>
                        <AppModal button={
                            <button className="text-xs text-white px-4 py-1 rounded-full bg-bgred">Remove</button>}
                            cancelButtonTitle="No, Don’t"
                            primaryButtonTitle="Yes. Remove"
                            primaryButtonAction={() => deleteUser(record?.id)}
                        >
                            <div className='max-w-80'>
                                <p className="text-center text-[#828282] pt-4 text-lg">Are you sure  Remove <span className="text-textDark font-medium">{record?.name}</span> from the user list?</p>
                            </div>
                        </AppModal>
                        <AppModal
                            button={
                                <button className="text-xs font-medium px-4 py-1 rounded-full bg-[#E6E6E7]">
                                    {record?.isBlocked ? "UnBlock" : "Block"}
                                </button>
                            }
                            cancelButtonTitle="No, Don’t"
                            primaryButtonTitle={`Yes. ${record?.isBlocked ? "UnBlock" : "Block"}`}
                            primaryButtonAction={() => handleBlockUser(record?.id, record?.isBlocked ? false : true)}
                        >
                            <div className="max-w-80">
                                <p className="text-center text-[#828282] pt-4 text-lg">
                                    Are you sure {record?.isBlocked ? "UnBlock" : "Block"}{" "}
                                    <span className="text-textDark font-medium">
                                        {record?.name}
                                    </span>{" "}
                                    from the users list?
                                </p>
                            </div>
                        </AppModal>
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
            headerText="Users List"
            inputPlaceholder="Search user"
            button={
                <button className="roundedBtn">New User</button>
            }
        />
    );
};

export default ManageUser;