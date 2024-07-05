import AppModal from "../components/ui/AppModal";
import { Avatar, Select } from "antd";
import { FaNairaSign } from "react-icons/fa6";
import { GrLocation } from "react-icons/gr";
import ViewCrowdfunding from "../components/manage-croudfunding/ViewCrowdfunding";
import AppTable from "../components/ui/AppTable";
import { useMemo, useState } from "react";
import { useEditOrderMutation, useGetOrderQuery } from "../redux/features/order/orderApi";
import AppPopover from "../components/ui/AppPopover";
import { IoIosArrowDown } from "react-icons/io";
import { ColumnsType } from "antd/es/table";
import { Order, ResponseSuccessType } from "../types/common";
import { toast } from "react-toastify";
import ViewUser from "../components/manage-user/ViewUser";
import ViewBankInfo from "../components/bank-account/ViewBankInfo";

const ManageOrder = () => {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("");
    const [refName, setRefName] = useState("crowdFund");

    const [updateOrder] = useEditOrderMutation();

    const queryString = useMemo(() => {
        const info = {
            // role: "admin",
            limit: 10,
            page,
            refName,
            status: status.length ? status : "",
            searchTerm: search.length ? search : "",
        };
        const queryString = Object.keys(info).reduce((pre, key: string) => {
            const value = info[key as keyof typeof info];
            if (value) {
                return pre + `${Boolean(pre.length) ? "&" : ""}${key}=${value}`;
            }
            return pre;
        }, "");
        return queryString;
    }, [page, refName, search, status]);

    const infoQuery = useGetOrderQuery(queryString);

    const statusOptions = [
        {
            status: "pending"
        },
        {
            status: "success"
        },
        {
            status: "denied"
        },
    ];

    const handleStatusUpdate = async (status: string, id: string) => {
        const updateData = {
            id, status
        }
        await updateOrder(updateData).unwrap().then((res: ResponseSuccessType) => {
            if (!res.success) {
                return toast.error(res?.data.message || "Order state updated unsuccessful!");
            } else {
                toast.success("Order state updated successful!");
            }
        }).catch(res => {
            return toast.error(res?.data.message || "Something went wrong!");
        });
    }

    const columns: ColumnsType<Order> = [
        {
            title: "",
            dataIndex: refName,
            className: "min-w-[350px] md:min-w-[220px]",
            render: (record: any, fullObj: any) => {
                return (
                    <div className="flex items-end gap-2 w-fit">
                        <AppModal
                            title="Crowdfunding Property Details"
                            button={
                                <img
                                    src={
                                        fullObj[refName]?.thumbnail
                                    }
                                    alt=""
                                    className="rounded-lg w-36 2xl:w-40 h-20 2xl:h-24 cursor-pointer"
                                />
                            }
                        >
                            <ViewCrowdfunding type="currentLocation" record={record} />
                        </AppModal>
                        <div className="w-fit">
                            <p className="text-[#181818] text-sm">
                                Property ID: #{fullObj[refName]?.id.slice(0, 10)}
                            </p>
                            <div className="pt-2">
                                <p className="text-[#6B6B6F] text-sm">Property Name</p>
                                <h2 className="text-[#181818] font-medium">{fullObj[refName]?.title}</h2>
                            </div>
                        </div>
                    </div>
                );
            },
        },
        {
            title: "",
            dataIndex: "orderBy",
            className: "min-w-[180px]",
            render: (orderBy: any, fullObj: any) => {
                return (
                    <div className="flex flex-col justify-end h-20 2xl:h-24">
                        <p className="text-[#6B6B6F] text-sm">Order By</p>
                        <div className="pt-1 flex items-center gap-1">
                            <div className='flex items-center gap-1'>
                                <img src={orderBy?.profileImg} alt="" className="rounded-full size-8" />
                                <AppModal title="User Details" button={
                                    <p className="cursor-pointer">{orderBy?.name}</p>
                                } >
                                    <ViewUser footerButton={false} record={orderBy} />
                                </AppModal>
                            </div>
                        </div>
                    </div>
                );
            },
        },
        {
            title: "",
            dataIndex: "paymentType",
            className: "min-w-[180px]",
            render: (paymentType: string, fullObj: any) => {
                return (
                    <div className="flex flex-col justify-end h-20 2xl:h-24">
                        <p className="text-[#6B6B6F] text-sm">Payment By</p>
                        <div className="pt-1 flex items-center gap-1">
                            <div className='flex items-center gap-1'>
                                <AppModal title="Bank Account Details" button={
                                    <p className="cursor-pointer">Wealth Bank</p>
                                } >
                                    <ViewBankInfo footerButton={false} wealthBankId={fullObj?.wealthBankId} />
                                </AppModal>
                            </div>
                        </div>
                    </div>
                );
            },
        },

        {
            title: "",
            dataIndex: refName,
            className: "min-w-[180px]",
            render: (record: any, fullObj: any) => {
                return (
                    <div className="flex flex-col justify-end h-20 2xl:h-24">
                        <p className="text-[#6B6B6F] text-sm">Location</p>
                        <div className="pt-1 flex items-center gap-1">
                            <GrLocation className="text-[#7CAA38]" />
                            <h2 className="text-textDark">{fullObj[refName]?.streetLocation}</h2>
                        </div>
                    </div>
                );
            },
        },


        {
            title: "",
            dataIndex: refName,
            className: "min-w-[80px]",
            render: (record: any, fullObj: any) => {
                return (
                    fullObj?.orderBy ||
                    <div className="flex flex-col justify-end h-20 2xl:h-24">
                        <p className="text-[#6B6B6F] text-sm">Buyer</p>
                        <div className="pt-1 flex items-center gap-1">
                            <Avatar src={fullObj?.orderBy?.profileImg} size={"small"} />
                        </div>
                    </div>
                );
            },
        },
        {
            title: "",
            dataIndex: refName,
            className: "min-w-[100px]",
            render: (record: any, fullObj: any) => {
                return (
                    <div className="flex flex-col justify-end h-20 2xl:h-24">
                        <p className="text-[#6B6B6F] text-sm">Status</p>
                        <div className="pt-1 flex items-center gap-1">
                            <AppPopover
                                arrow={false}
                                button={
                                    <div className={`flex items-center gap-1 text-textDark text-sm  rounded-full px-4 py-0.5 bg-[#FCF0C9] ${fullObj?.status === "success" && "bg-green-500 text-white"} ${fullObj?.status === "denied" && "bg-red-500 text-white"} ${fullObj?.status === "pending" && "cursor-pointer"}`}>
                                        <h3>{fullObj?.status}</h3>{fullObj?.status === "pending" && <IoIosArrowDown />}
                                    </div>
                                }
                            >
                                {fullObj?.status === "pending" && <div className='flex flex-col items-end text-end'>
                                    {statusOptions.map(stat => (
                                        <AppModal
                                            key={stat.status}
                                            button={
                                                <button className="hover:bg-blue-50 w-full">{stat.status}</button>
                                            }
                                            cancelButtonTitle="No, Don’t"
                                            primaryButtonTitle="Yes. Update"
                                            primaryButtonAction={() => handleStatusUpdate(stat.status, fullObj?.id)}
                                        >
                                            <div className="max-w-80">
                                                <p className="text-center text-[#828282] pt-4 text-lg">
                                                    Are you sure Update status {fullObj?.status} to
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
    ];

    if (refName === "crowdFund") {
        columns.splice(3, 0, {
            title: "",
            dataIndex: refName,
            className: "min-w-[100px]",
            render: (record: any, fullObj: any) => {
                return (
                    <div className="flex flex-col justify-end h-20 2xl:h-24">
                        <p className="text-[#6B6B6F] text-sm">Fund Raised</p>
                        <div className="pt-1 flex items-center gap-1">
                            <FaNairaSign className="text-textDark" />
                            <h2 className="text-textDark">{fullObj[refName]?.fundRaised}</h2>
                        </div>
                    </div>
                );
            },
        },
            {
                title: "",
                dataIndex: refName,
                className: "min-w-[100px]",
                render: (record: any, fullObj: any) => {
                    return (
                        <div className="flex flex-col justify-end h-20 2xl:h-24">
                            <p className="text-[#6B6B6F] text-sm">Target Fund</p>
                            <div className="pt-1 flex items-center gap-1">
                                <FaNairaSign className="text-textDark" />
                                <h2 className="text-textDark">{fullObj[refName]?.targetFund}</h2>
                            </div>
                        </div>
                    );
                },
            },)
    }

    if (refName !== "crowdFund") {
        columns.splice(2, 0, {
            title: "",
            dataIndex: refName,
            className: "min-w-[120px]",
            render: (record: any, fullObj: any) => {
                return (
                    <div className="flex flex-col justify-end h-20 2xl:h-24">
                        <p className="text-[#6B6B6F] text-sm">price</p>
                        <div className="pt-1 flex items-center gap-1">
                            <FaNairaSign className="text-textDark" />
                            <h2 className="text-textDark">{fullObj[refName]?.price}</h2>
                        </div>
                    </div>
                );
            },
        },)
    }
    return (
        <AppTable
            header={false}
            columns={columns}
            infoQuery={infoQuery}
            onInputChange={(text) => setSearch(text)}
            inputPlaceholder="Search property"
            setPage={setPage}
            headerText="Order List"
            tabs={
                <div className='flex items-center gap-2 w-full md:w-3/5'>
                    <button onClick={() => setRefName("crowdFund")} className={`${refName === "crowdFund" ? "roundedBtn" : "roundedBtn text-textDark bg-[#E6E6E7]"}`}>Crowdfunding</button>
                    <button onClick={() => setRefName("property")} className={`${refName === "property" ? "roundedBtn" : "roundedBtn text-textDark bg-[#E6E6E7]"}`}>Current Location</button>
                    <button onClick={() => setRefName("flipping")} className={`${refName === "flipping" ? "roundedBtn" : "roundedBtn text-textDark bg-[#E6E6E7]"}`}>Flipping</button>
                </div>
            }
            button={
                <div className={`flex cursor-pointer items-center gap-1.5 text-textDark`}>
                    <h3>Short by</h3> <Select
                        style={{ width: 120 }}
                        placeholder="Select Status"
                        className="focus-visible:!ring-0 focus:!ring-0"
                        onChange={(value) => setStatus(value)}
                        options={[
                            { value: '', label: 'All Order' },
                            { value: 'pending', label: 'Pending' },
                            { value: 'success', label: 'Success' },
                            { value: 'denied', label: 'Denied' },
                        ]}
                    />
                </div>
            }
        />
    );
};

export default ManageOrder;