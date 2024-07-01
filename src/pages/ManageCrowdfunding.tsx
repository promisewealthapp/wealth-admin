import { Link } from "react-router-dom";
import AppModal from "../components/ui/AppModal";
import Popover from "../components/ui/Popover";
import { GrLocation } from "react-icons/gr";
import { FaNairaSign } from "react-icons/fa6";
import { Avatar } from "antd";
import ViewCrowdfunding from "../components/manage-croudfunding/ViewCrowdfunding";
import { useDeleteCrowdFundMutation, useEditCrowdFundMutation, useGetCrowdFundsQuery } from "../redux/features/crowdFund/crowdFundApi";
import { CrowdFund, Location, Order, ResponseSuccessType } from "../types/common";
import AppTable from "../components/ui/AppTable";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import AppPopover from "../components/ui/AppPopover";
import { IoIosArrowDown } from "react-icons/io";

const ManageCrowdfunding = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const [removeUser, { isLoading, isSuccess }] = useDeleteCrowdFundMutation();
  const [updateCrowdFundStatus] = useEditCrowdFundMutation();

  const queryString = useMemo(() => {
    const info = {
      // role: "admin",
      limit: 10,
      page,
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
  }, [page, search]);

  const infoQuery = useGetCrowdFundsQuery(queryString);

  useEffect(() => {
    if (!isLoading && isSuccess) {
      toast.success("Crowdfund Property remove successful!");
    }
  }, [isLoading, isSuccess])

  const handleStatusUpdate = async (status: string, id: string) => {
    const updateData = {
      id, status
    }

    await updateCrowdFundStatus(updateData).unwrap().then((res: ResponseSuccessType) => {
      if (!res.success) {
        return toast.error("CrowdFund property state updated unsuccessful!");
      } else {
        toast.success("CrowdFund property state updated successful!");
      }
    }).catch(res => {
      if (!res.success) {
        return toast.error(res.message || "Something went wrong");
      }
    });
  }

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

  const columns = [
    {
      title: "",
      dataIndex: "title",
      className: "min-w-[320px] lg:min-w-[220px]",
      render: (title: string, record: CrowdFund) => {
        return (
          <div className="flex items-end gap-2 w-fit">
            <AppModal
              title="Crowdfunding Property Details"
              button={
                <img
                  src={record?.thumbnail}
                  alt=""
                  className="rounded-lg w-28 md:w-36 2xl:w-40 h-16 md:h-20 2xl:h-24 cursor-pointer"
                />
              }
            >
              <ViewCrowdfunding type="crowdFund" record={record} />
            </AppModal>
            <div className="w-fit">
              <p className="text-[#181818] text-sm">
                Property ID: #{record?.id.slice(0, 10)}
              </p>
              <div className="pt-1 md:pt-2">
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
      className: "min-w-[200px]",
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
      dataIndex: "fundRaised",
      className: "min-w-[120px]",
      render: (fundRaised: string) => {
        return (
          <div className="flex flex-col justify-end h-20 2xl:h-24">
            <p className="text-[#6B6B6F] text-sm">Fund Raised</p>
            <div className="pt-1 flex items-center gap-1">
              <FaNairaSign className="text-textDark" />
              <h2 className="text-textDark">{fundRaised}</h2>
            </div>
          </div>
        );
      },
    },
    {
      title: "",
      dataIndex: "targetFund",
      className: "min-w-[120px]",
      render: (targetFund: string) => {
        return (
          <div className="flex flex-col justify-end h-20 2xl:h-24">
            <p className="text-[#6B6B6F] text-sm">Target Fund</p>
            <div className="pt-1 flex items-center gap-1">
              <FaNairaSign className="text-textDark" />
              <h2 className="text-textDark">{targetFund}</h2>
            </div>
          </div>
        );
      },
    },
    {
      title: "",
      dataIndex: "Orders",
      className: "min-w-[80px]",
      render: (Orders: Order[]) => {
        return (
          <div className="flex flex-col justify-end h-20 2xl:h-24">
            <p className="text-[#6B6B6F] text-sm">Donor</p>
            <div className="pt-1 flex items-center gap-1">
              {Orders[0]?.orderBy?.profileImg ?
                <Avatar.Group size={"small"}>
                  {
                    Orders.slice(0, 3).map(order => (
                      <Avatar src={order?.orderBy?.profileImg} />
                    ))
                  }
                </Avatar.Group> :
                <img src="/images/0.jpg" alt="" className="size-5 rounded-full" />
              }
            </div>
          </div>
        );
      },
    },
    {
      title: "",
      dataIndex: "status",
      className: "min-w-[100px]",
      render: (status: string, record: CrowdFund) => {
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
                          from this CrowdFund property?
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
      className: "min-w-[50px]",
      render: (text: string, record: CrowdFund) => {
        return (
          <div className="flex items-end pb-2 justify-center h-20 2xl:h-24">
            <Popover>
              <div className="flex flex-col items-end justify-end">
                <AppModal button={<button>Remove</button>}
                  cancelButtonTitle="No, Don’t"
                  primaryButtonTitle="Yes. Remove"
                  primaryButtonAction={() => removeUser(record.id)}
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
                <Link to={`/edit-crowdfunding/${record?.id}`}>
                  <button className="text-textDark">Edit</button>
                </Link>
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
      headerText="Crowdfunding List"
      inputPlaceholder="Search property"
      button={
        <Link to={"/add-crowdfunding"}>
          <button className="roundedBtn">
            New Crowdfunding properties
          </button>
        </Link>
      }
    />
  );
};

export default ManageCrowdfunding;
