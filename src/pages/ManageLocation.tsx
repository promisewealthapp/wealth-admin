import { AiOutlineDelete } from "react-icons/ai";
import AppModal from "../components/ui/AppModal";
import AppTable from "../components/ui/AppTable";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { useDeleteLocationMutation, useGetLocationsQuery } from "../redux/features/location/locationApi";
import { Location } from "../types/common";
import AddNewLocation from "../components/manage-location/AddNewLocation";

const ManageLocation = () => {
    const [page, setPage] = useState(1);
    const [modalOpen, setModalOpen] = useState(false);
    const [deleteLocation, { isError, isSuccess, isLoading }] = useDeleteLocationMutation();
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

    const infoQuery = useGetLocationsQuery(queryString);

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            className: "min-w-[200px]",
            render: (name: string, record: Location) => {
                return (
                    <div className='flex items-center gap-1'>
                        <img src={record?.imgUrl} alt="" className="rounded-full w-10 h-10" />
                        <p className="">{name}</p>
                    </div>
                )
            }
        },
        {
            title: 'Crowdfund',
            dataIndex: '_count.crowdFund',
            className: "min-w-[120px]",
            render: (name: string, record: Location) => {
                return (
                    <p className="pl-4">{record?._count.crowdFund}</p>
                )
            }
        },
        {
            title: 'Property',
            dataIndex: '_count.property',
            className: "min-w-[120px]",
            render: (name: string, record: Location) => {
                return (
                    <p className="pl-4">{record?._count.property}</p>
                )
            }
        },
        {
            title: 'Action',
            dataIndex: 'action',
            className: "min-w-[120px]",
            render: (text: string, record: any) => {
                return (
                    <div className='flex items-center justify-center gap-1'>
                        <AppModal button={
                            <button className='text-xl hover:text-bgred'><AiOutlineDelete /></button>}
                            cancelButtonTitle="No, Don’t"
                            primaryButtonTitle="Yes. Remove"
                            primaryButtonAction={() => deleteLocation(record.id)}
                        >
                            <div className='max-w-80'>
                                <p className="text-center text-[#828282] pt-4 text-lg">Are you sure delete <span className="text-textDark font-medium">{record?.name}</span> location from the chat group list?</p>
                            </div>
                        </AppModal>

                    </div>
                )
            }
        },
    ];

    useEffect(() => {
        if (isError) {
            toast.error("Location delete unsuccessful!", { toastId: 1 });
        } else if (!isLoading && isSuccess) {
            toast.success('Location deleted Successful!', { toastId: 1 })
        }
    }, [isError, isLoading, isSuccess])

    return (
        <AppTable
            columns={columns}
            infoQuery={infoQuery}
            onInputChange={(text) => setSearch(text)}
            setPage={setPage}
            inputPlaceholder="Search location.."
            headerText="Location List"
            button={
                <AppModal title="Add New Location"
                    button={
                        <button className="roundedBtn px-2 md:px-6">Add New Location</button>
                    }
                    modalOpen={modalOpen}
                    setModalOpen={setModalOpen}
                >
                    <AddNewLocation closeModal={() => setModalOpen(false)} />
                </AppModal>
            }
        />
    );
};

export default ManageLocation;