import { Link } from "react-router-dom";
import AppModal from "../components/ui/AppModal";
import { Avatar } from "antd";
import { FaNairaSign } from "react-icons/fa6";
import { GrLocation } from "react-icons/gr";
import ViewCrowdfunding from "../components/manage-croudfunding/ViewCrowdfunding";
import AppTable from "../components/ui/AppTable";
import { useEffect, useMemo, useState } from "react";
import { useDeletePropertyMutation, useEditPropertyMutation, useGetPropertyQuery } from "../redux/features/property/propertyApi";
import { Location, Property, ResponseSuccessType } from "../types/common";
import { toast } from "react-toastify";
import { IoIosArrowDown } from "react-icons/io";
import AppPopover from "../components/ui/AppPopover";
import Popover from "../components/ui/Popover";
import { ColumnsType } from "antd/es/table";

const ManageCurrentLocation = () => {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [removeProperty, { isLoading, isSuccess }] = useDeletePropertyMutation();
    const [updateProperty, { isError, error, isLoading: updateLoading, isSuccess: updateSuccess }] = useEditPropertyMutation();

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
    }, [search, page]);

    const infoQuery = useGetPropertyQuery(queryString);

    const handleStatusUpdate = async (status: string, id: string) => {
        const updateData = {
            id, status
        }

        await updateProperty(updateData).unwrap().then((res: ResponseSuccessType) => {
            if (!res.success) {
                return toast.error("Current Location property state updated unsuccessful!");
            } else {
                toast.success("Current Location property state updated successful!");
            }
        }).catch(res => {
            if (!res.success) {
                return toast.error(res.message || "Something went wrong");
            }
        });
    }

    useEffect(() => {
        if (!isLoading && isSuccess) {
            toast.success("Crowdfund Property remove successful!", { toastId: 1 })
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

    const columns: ColumnsType<Property> = [
        {
            title: "",
            dataIndex: "title",
            className: "min-w-[340px] md:min-w-[220px]",
            render: (title: string, record: Property) => {
                return (
                    <div className="flex items-end gap-2 w-fit">
                        <AppModal
                            title="Crowdfunding Property Details"
                            button={
                                <img
                                    src={record?.thumbnail}
                                    alt=""
                                    className="rounded-lg w-36 2xl:w-40 h-20 2xl:h-24 cursor-pointer"
                                />
                            }
                        >
                            <ViewCrowdfunding type="currentLocation" record={record} />
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
            className: "min-w-[120px]",
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
            render: (order: string, record: Property) => {
                return (
                    <div className="flex flex-col justify-end h-20 2xl:h-24">
                        <p className="text-[#6B6B6F] text-sm">Buyer</p>
                        <div className="pt-1 flex items-center gap-1">
                            <Avatar src={record?.order ? record?.order[0]?.orderBy?.profileImg : null} size={"small"} />
                        </div>
                    </div>
                );
            },
        },
        {
            title: "",
            dataIndex: "status",
            className: "min-w-[100px]",
            render: (status: string, record: Property) => {
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
            render: (text: string, record: Property) => {
                return (
                    <div className="flex flex-col items-end pb-1 justify-between h-20 2xl:h-24">
                        <Link to={`/manage-analytics/${record.id}`}>
                            <button className="px-2.5 py-1.5 rounded-full text-xs text-white bg-[#D9A027] hover:bg-[#D9A027]/80">Manage Analytics</button>
                        </Link>
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
            headerText="Current Location List"
            inputPlaceholder="Search property"
            setPage={setPage}
            button={
                <Link to={"/add-current-location"}>
                    <button className="roundedBtn">New Current location properties</button>
                </Link>
            }
        />
    );
};

export default ManageCurrentLocation;