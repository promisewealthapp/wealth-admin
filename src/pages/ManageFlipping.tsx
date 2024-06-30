import Popover from "../components/ui/Popover";
import AppModal from "../components/ui/AppModal";
import { Avatar } from "antd";
import { FaNairaSign } from "react-icons/fa6";
import { GrLocation } from "react-icons/gr";
import ViewCrowdfunding from "../components/manage-croudfunding/ViewCrowdfunding";
import { useEffect, useMemo, useState } from "react";
import AppTable from "../components/ui/AppTable";
import { useDeleteFlippingMutation, useEditFlippingMutation, useGetFlippingQuery } from "../redux/features/flipping/flippingApi";
import { ColumnsType } from "antd/es/table";
import { Flipping } from "../types/common";
import AppPopover from "../components/ui/AppPopover";
import { IoIosArrowDown } from "react-icons/io";
import { toast } from "react-toastify";

const ManageFlipping = () => {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [removeProperty, { isLoading, isSuccess }] = useDeleteFlippingMutation();
    const [updateFlippingStatus, { isError, error, isLoading: updateLoading, isSuccess: updateSuccess }] = useEditFlippingMutation();

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

    const infoQuery = useGetFlippingQuery(queryString);

    const handleStatusUpdate = (status: string, id: string) => {
        const updateData = {
            id, status
        }
        console.log(updateData);
        updateFlippingStatus(updateData);
    }

    useEffect(() => {
        if (!isLoading && isSuccess) {
            toast.success("Flipping Property remove successful!", { toastId: 1 })
        }
        if (!updateLoading && updateSuccess) {
            toast.success("Flipping Property Status update successful!", { toastId: 1 })
        } else if (isError) {
            toast.error("Flipping Property Status update unsuccessful!", { toastId: 1 })
        }
    }, [error, isError, isLoading, isSuccess, updateLoading, updateSuccess])

    const statusOptions = [
        {
            status: "pending"
        },
        {
            status: "available"
        },
        {
            status: "sold"
        },
        {
            status: "denied"
        },
    ];

    const columns: ColumnsType<Flipping> = [
        {
            title: "",
            dataIndex: "title",
            className: "min-w-[330px] lg:min-w-[220px]",
            render: (title: string, record: Flipping) => {
                return (
                    <div className="flex items-end gap-2 w-fit">
                        <AppModal
                            title="Crowdfunding Flipping Details"
                            button={
                                <img
                                    src={record?.thumbnail}
                                    alt=""
                                    className="rounded-lg w-36 2xl:w-40 h-20 2xl:h-24 cursor-pointer"
                                />
                            }
                        >
                            <ViewCrowdfunding type="flipping" record={record} />
                        </AppModal>
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
            className: "min-w-[150px]",
            render: (location: string) => {
                return (
                    <div className="flex flex-col justify-end h-20 2xl:h-24">
                        <p className="text-[#6B6B6F] text-sm">Location</p>
                        <div className="pt-1 flex items-center gap-1">
                            <GrLocation className="text-[#7CAA38]" />
                            <h2 className="text-textDark">{location}</h2>
                        </div>
                    </div>
                );
            },
        },
        {
            title: "",
            dataIndex: "price",
            className: "min-w-[100px]",
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
            dataIndex: "order",
            className: "min-w-[80px]",
            render: (order: string, record: Flipping) => {
                return (
                    <div className="flex flex-col justify-end h-20 2xl:h-24">
                        <p className="text-[#6B6B6F] text-sm">Buyer</p>
                        <div className="pt-1 flex items-center gap-1">
                            <Avatar src={record?.Orders ? record?.Orders[0]?.orderBy?.profileImg : null} size={"small"} />
                        </div>
                    </div>
                );
            },
        },
        {
            title: "",
            dataIndex: "status",
            className: "min-w-[120px]",
            render: (status: string, record: Flipping) => {
                return (
                    <div className="flex flex-col justify-end h-20 2xl:h-24">
                        <p className="text-[#6B6B6F] text-sm">Status</p>
                        <div className="pt-1 flex items-center gap-1">
                            <AppPopover
                                arrow={false}
                                button={
                                    <div className={`flex items-center gap-1 text-textDark text-sm  rounded-full px-4 py-0.5 ${status !== "sold" ? "bg-[#FCF0C9] cursor-pointer" : "bg-green-500 text-white"}`}>
                                        <h3>{status}</h3>{status !== "sold" && <IoIosArrowDown />}
                                    </div>
                                }
                            >
                                {status !== "sold" && <div className='flex flex-col items-end text-end'>
                                    {statusOptions.map(stat => (
                                        <AppModal
                                            key={stat.status}
                                            button={
                                                <button className="hover:bg-blue-50 w-full">{stat.status}</button>
                                            }
                                            cancelButtonTitle="No, Don’t"
                                            primaryButtonTitle="Yes. Update"
                                            primaryButtonAction={() => handleStatusUpdate(stat.status, record?.id)}
                                        >
                                            <div className="max-w-80">
                                                <p className="text-center text-[#828282] pt-4 text-lg">
                                                    Are you sure Update status {record?.status} to
                                                    <span className="text-textDark font-medium">
                                                        {" "}{stat.status}
                                                    </span>{" "}
                                                    from this current property?
                                                </p>
                                            </div>
                                        </AppModal>
                                    ))}
                                </div>}
                            </AppPopover>
                        </div>
                    </div>
                );
            },
        },
        {
            title: "",
            dataIndex: "action",
            className: "min-w-[150px]",
            render: (text: string, record: Flipping) => {
                return (
                    <div className="flex flex-col items-end pb-1 justify-between h-20 2xl:h-24">
                        <div>
                            {
                                (record?.status === "available" || record?.status === "denied") ?
                                    <div>
                                        {record?.status === "denied" ? <p className="px-2.5 py-0.5 rounded-full text-xs text-textSecondary bg-[#DADADA]">Declined</p> :
                                            <p className="px-2.5 py-0.5 rounded-full text-xs text-white bg-success">Accepted</p>
                                        }
                                    </div> :
                                    <div className="flex items-center gap-1">
                                        <AppModal
                                            button={
                                                <button className="px-2.5 py-0.5 rounded-full text-xs text-white bg-success">Accept</button>
                                            }
                                            cancelButtonTitle="No, Don’t"
                                            primaryButtonTitle="Yes. Update"
                                            primaryButtonAction={() => handleStatusUpdate("available", record?.id)}
                                        >
                                            <div className="max-w-80">
                                                <p className="text-center text-[#828282] pt-4 text-lg">
                                                    Are you sure Update status {record?.status} to
                                                    <span className="text-textDark font-medium">
                                                        {" "}available
                                                    </span>{" "}
                                                    for this current property?
                                                </p>
                                            </div>
                                        </AppModal>
                                        <AppModal
                                            button={
                                                <button className="px-2.5 py-0.5 rounded-full text-xs text-textSecondary bg-[#DADADA]">Decline</button>
                                            }
                                            cancelButtonTitle="No, Don’t"
                                            primaryButtonTitle="Yes. Update"
                                            primaryButtonAction={() => handleStatusUpdate("denied", record?.id)}
                                        >
                                            <div className="max-w-80">
                                                <p className="text-center text-[#828282] pt-4 text-lg">
                                                    Are you sure Update status {record?.status} to
                                                    <span className="text-textDark font-medium">
                                                        {" "}denied
                                                    </span>{" "}
                                                    for this current property?
                                                </p>
                                            </div>
                                        </AppModal>
                                    </div>
                            }

                        </div>
                        <Popover>
                            <div className="flex flex-col items-end justify-end">
                                <AppModal button={<button>Remove</button>}
                                    cancelButtonTitle="No, Don’t"
                                    primaryButtonTitle="Yes. Remove"
                                    primaryButtonAction={() => removeProperty(record.id)}
                                >
                                    <div className="max-w-80">
                                        <p className="text-center text-[#828282] pt-4 text-lg">
                                            Are you sure remove{" "}
                                            <span className="text-textDark font-medium">
                                                {record?.title}
                                            </span>{" "}
                                            from the user list?
                                        </p>
                                    </div>
                                </AppModal>
                                {/* <Link to={`/edit-crowdfunding/${record?.id}`}>
                                    <button className="text-textDark">Edit</button>
                                </Link> */}
                            </div>
                        </Popover>
                    </div>
                );
            },
        },
    ];

    return (
        <AppTable
            header={false}
            columns={columns}
            infoQuery={infoQuery}
            onInputChange={(text) => setSearch(text)}
            setPage={setPage}
            headerText="Flipping List"
            inputPlaceholder="Search property"
        // button={
        //     <button className="roundedBtn">New Flipping properties</button>
        // }
        />
    );
};

export default ManageFlipping;