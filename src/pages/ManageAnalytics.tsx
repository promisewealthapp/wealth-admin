import { Link, useNavigate, useParams } from "react-router-dom";
import { useDeletePropertyStateMutation, useGetPropertyStateQuery } from "../redux/features/propertyState/propertyStateApi";
import Loading from "../components/ui/Loading";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import AppTable from "../components/ui/AppTable";
import { FaNairaSign } from "react-icons/fa6";
import { GrLocation } from "react-icons/gr";
import { Location, Property } from "../types/common";
import { useGetPropertyByIdQuery } from "../redux/features/property/propertyApi";
import AppModal from "../components/ui/AppModal";
import { AiOutlineDelete } from "react-icons/ai";
import AddNewProperty from "../components/property/AddNewProperty";

const ManageAnalytics = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const { id } = useParams();
    console.log(id);
    const infoPropertyQuery = useGetPropertyByIdQuery(id);
    const [deletePropertyState, { isError, isSuccess, isLoading }] = useDeletePropertyStateMutation();
    const infoQuery = useGetPropertyStateQuery(id);


    useEffect(() => {
        if (isError) {
            toast.error("Property State delete unsuccessful!", { toastId: 1 })
        } else if (!isLoading && isSuccess) {
            toast.success('Property State deleted Successful!', { toastId: 1 })
        }
    }, [isError, isLoading, isSuccess])


    const columns = [
        {
            title: "",
            dataIndex: "title",
            render: (title: string, record: Property) => {
                return (
                    <div className="flex items-end gap-2 w-fit">
                        <img
                            src={record?.thumbnail}
                            alt=""
                            className="rounded-lg w-36 2xl:w-40 h-20 2xl:h-24 cursor-pointer"
                        />

                        <div className="w-fit">
                            <p className="text-[#181818] text-sm">
                                Property ID: #{record?.id.slice(0, 10)}
                            </p>
                            <div className="pt-2">
                                <p className="text-[#6B6B6F] text-sm">Property Name</p>
                                <h2 className="text-[#181818] font-medium">{title}</h2>
                            </div>
                        </div>
                    </div>
                );
            },
        },
        {
            title: "",
            dataIndex: "location",
            render: (location: Location) => {
                return (
                    <div className="flex flex-col justify-end h-20 2xl:h-24">
                        <p className="text-[#6B6B6F] text-sm">Location</p>
                        <div className="pt-1 flex items-center gap-1">
                            <GrLocation className="text-[#7CAA38]" />
                            <h2 className="text-textDark">{location?.name}</h2>
                        </div>
                    </div>
                );
            },
        },
        {
            title: "",
            dataIndex: "price",
            render: (price: string) => {
                return (
                    <div className="flex flex-col justify-end h-20 2xl:h-24">
                        <p className="text-[#6B6B6F] text-sm">price</p>
                        <div className="pt-1 flex items-center gap-1">
                            <FaNairaSign className="text-textDark" />
                            <h2 className="text-textDark">{price}</h2>
                        </div>
                    </div>
                );
            },
        },
        {
            title: "",
            dataIndex: "status",
            render: (status: string, record: Property) => {
                return (
                    <div className="flex flex-col justify-end h-20 2xl:h-24">
                        <p className="text-[#6B6B6F] text-sm">Status</p>
                        <div className="pt-1 flex items-center gap-1">
                            <div className="flex items-center gap-1 text-textDark text-sm bg-[#FCF0C9] rounded-full px-4 py-0.5">
                                <h3>{status}</h3>
                            </div>
                        </div>
                    </div>
                );
            },
        },
        {
            title: "empty",
            dataIndex: "a3",
        },
    ];

    const dateColumns = [
        {
            title: 'Date',
            dataIndex: 'time',
            render: (time: string) => {
                return (
                    <div className='flex items-center gap-1'>
                        <p className="cursor-pointer">{new Date(time)?.toLocaleDateString()}</p>
                    </div>
                )
            }
        },
        {
            title: 'Amount',
            dataIndex: 'price',
        },
        {
            title: 'Action',
            dataIndex: 'action',
            render: (text: string, record: any) => {
                return (
                    <div className='flex items-center justify-center gap-1'>
                        <AppModal button={
                            <button className='text-xl hover:text-bgred'><AiOutlineDelete /></button>}
                            cancelButtonTitle="No, Don’t"
                            primaryButtonTitle="Yes. Remove"
                            primaryButtonAction={() => deletePropertyState(record.id)}
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

    return (
        <>
            <Link
                to={"/manage-current-location"}
                className="text-xl 2xl:text-2xl w-fit font-medium text-[#343A40] flex items-center gap-2"
            >
                <img
                    src="/images/Back-without-border.png"
                    alt="back"
                    className="w-10 lg:w-12 2xl:w-14 h-10 lg:h-12 2xl:h-14"
                />
                <h2>Go Back</h2>
            </Link>

            <div className='py-4'>
                <AppTable
                    infoQuery={infoPropertyQuery}
                    header={false}
                    columns={columns}
                />
            </div>
            <AppTable
                columns={dateColumns}
                infoQuery={infoQuery}
                headerText="Analytic amount List"
                button={
                    <AppModal title="Add New Amount"
                        button={
                            <button className="roundedBtn">Add New Amount</button>
                        }
                        modalOpen={modalOpen}
                        setModalOpen={setModalOpen}
                    >
                        <AddNewProperty propertyId={id as string} closeModal={() => setModalOpen(false)} />
                    </AppModal>
                }
            />
        </>
    );
};

export default ManageAnalytics;