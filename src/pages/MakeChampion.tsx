import { Link } from "react-router-dom";
import AppModal from "../components/ui/AppModal";
import AppTable from "../components/ui/AppTable";
import { useEditUserMutation, useGetUsersQuery } from "../redux/features/user/userApi";
import { useEffect, useMemo, useState } from "react";
import { User } from "../types/common";
import { toast } from "react-toastify";

const MakeChampion = () => {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [updateUser, { isError, isLoading, isSuccess }] = useEditUserMutation();

    const queryString = useMemo(() => {
        const info = {
            role: "user",
            isChampion: "false",
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

    const handleStatusUpdate = (id: string) => {
        const updateData = {
            id, isChampion: true
        }
        updateUser(updateData);
    }

    useEffect(() => {
        if (!isLoading && isSuccess) {
            toast.success("Make User to Champion update successful!", { toastId: 1 })
        } else if (isError) {
            toast.error("Make User to Champion update unsuccessful!", { toastId: 1 })
        }
    }, [isError, isLoading, isSuccess])


    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            className: "min-w-[150px]",
            render: (name: string, record: User) => {
                return (
                    <div className='flex items-center gap-1'>
                        <img src={record?.profileImg} alt="" className="rounded-full w-10 h-10" />
                        <p className="cursor-pointer">{name}</p>
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
            className: "min-w-[150px]",
        },
        {
            title: 'Action',
            dataIndex: 'action',
            className: "min-w-[150px]",
            render: (text: string, record: User) => {
                return (
                    <div className='flex items-center justify-end'>
                        <AppModal button={
                            <button className="roundedBtn">Make Champion</button>
                        }
                            cancelButtonTitle="No, Don’t"
                            primaryButtonTitle="Yes. Make Champion"
                            primaryButtonAction={() => handleStatusUpdate(record?.id)}
                        >
                            <div className='max-w-80'>
                                <p className="text-center text-[#828282] pt-4 text-lg">Are you sure make champion <span className="text-textDark font-medium">{record?.name}</span> from the user list?</p>
                            </div>
                        </AppModal>
                    </div>
                )
            }
        },
    ];

    return (
        <>
            <Link to={'/manage-champions'} className='text-xl 2xl:text-2xl w-fit font-medium text-[#343A40] flex items-center gap-2'>
                <img src="/images/Back-without-border.png" alt="back" className="w-10 lg:w-12 2xl:w-14 h-10 lg:h-12 2xl:h-14" />
                <h2>Go Back</h2>
            </Link>

            <div className='pt-6 2xl:pt-10'>
                <AppTable
                    columns={columns}
                    infoQuery={infoQuery}
                    onInputChange={(text) => setSearch(text)}
                    setPage={setPage}
                    inputPlaceholder="Search User"
                    headerText="User List"
                />
            </div>
        </>
    );
};

export default MakeChampion;