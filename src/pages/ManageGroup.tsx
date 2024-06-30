import { AiOutlineDelete } from "react-icons/ai";
import AppModal from "../components/ui/AppModal";
import AddNewGroup from "../components/manage-group/AddNewGroup";
import { useDeleteGroupMutation, useGetGroupsQuery } from "../redux/features/group/groupApi";
import AppTable from "../components/ui/AppTable";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

const ManageGroup = () => {
    const [page, setPage] = useState(1);
    const [modalOpen, setModalOpen] = useState(false);
    const [deleteGroup, { isError, isSuccess, isLoading }] = useDeleteGroupMutation();
    const [search, setSearch] = useState("");

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

    const infoQuery = useGetGroupsQuery(queryString);

    const columns = [
        {
            title: 'Group Name',
            dataIndex: 'name',
            className: "min-w-[220px]",
            render: (name: string, record: any) => {
                return (
                    <div className='flex items-center gap-1'>
                        <img src={record?.thumbnail} alt="" className="rounded-full w-10 h-10" />
                        <p className="cursor-pointer">{name}</p>
                    </div>
                )
            }
        },
        {
            title: 'Group Type',
            dataIndex: 'type',
            className: "min-w-[120px]",
        },
        {
            title: 'Action',
            dataIndex: 'action',
            className: "min-w-[80px]",
            render: (text: string, record: any) => {
                return (
                    <div className='flex items-center justify-center gap-1'>
                        <AppModal button={
                            <button className='text-xl hover:text-bgred'><AiOutlineDelete /></button>}
                            cancelButtonTitle="No, Don’t"
                            primaryButtonTitle="Yes. Remove"
                            primaryButtonAction={() => deleteGroup(record.id)}
                        >
                            <div className='max-w-80'>
                                <p className="text-center text-[#828282] pt-4 text-lg">Are you sure delete <span className="text-textDark font-medium">{record?.groupName}</span> group from the chat group list?</p>
                            </div>
                        </AppModal>

                    </div>
                )
            }
        },
    ];

    useEffect(() => {
        if (isError) {
            toast.error("Group delete unsuccessful!");
        } else if (!isLoading && isSuccess) {
            toast.success('Group deleted Successful!')
        }
    }, [isError, isLoading, isSuccess])

    return (
        <AppTable
            columns={columns}
            infoQuery={infoQuery}
            onInputChange={(text) => setSearch(text)}
            setPage={setPage}
            headerText="Investor Chat Group List"
            inputPlaceholder="Search group.."
            button={
                <AppModal title="Add New Chat Group"
                    button={
                        <button className="roundedBtn">Add New Group</button>
                    }
                    modalOpen={modalOpen}
                    setModalOpen={setModalOpen}
                >
                    <AddNewGroup closeModal={() => setModalOpen(false)} />
                </AppModal>
            }
        />
    );
};

export default ManageGroup;