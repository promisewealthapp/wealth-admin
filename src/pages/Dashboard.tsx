import { useMemo, useState } from "react";
import AppModal from "../components/ui/AppModal";
import AppTable from "../components/ui/AppTable";
import { useDeleteUserMutation, useEditUserMutation, useGetOverviewQuery, useGetUsersQuery } from "../redux/features/user/userApi";
import { toast } from "react-toastify";
import { useAppSelector } from "../redux/hook";
import { ColumnsType } from "antd/es/table";
import { User } from "../types/common";
import { MdBlock } from "react-icons/md";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import Loading from "../components/ui/Loading";

const Dashboard = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [updateUser] = useEditUserMutation();
  const [deleteUser] = useDeleteUserMutation();
  const { data, isSuccess } = useGetOverviewQuery("");

  const { user } = useAppSelector(state => state.user);
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

  const handleDeleteUser = async (id: string) => {

    await deleteUser(id).unwrap().then(res => {
      if (!res.success) {
        toast.error("Remove this User unsuccessful!", { toastId: 1 })
      }
      toast.success("Remove this User successful!", { toastId: 1 })
    }).catch(res => {
      if (!res.success) {
        toast.error("Remove this User unsuccessful!", { toastId: 1 })
      }
    });
  }

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

  const dashboardCards = [
    {
      imageUrl: "/images/dashboard/order.png",
      title: "Total Order",
      value: data?.data?.totalOrder,
    },
    {
      imageUrl: "/images/dashboard/property.png",
      title: "Total Property Sold",
      value: data?.data?.totalOrderComplete,
    },
    {
      imageUrl: "/images/dashboard/admin.png",
      title: "Total Admin",
      value: data?.data?.totalAdmin,
    },
    {
      imageUrl: "/images/dashboard/champion.png",
      title: "Total Champions",
      value: data?.data?.totalChampion,
    },
    {
      imageUrl: "/images/dashboard/user.png",
      title: "Today’s User",
      value: data?.data?.totalUser,
    },
    {
      imageUrl: "/images/dashboard/crowdfunding.png",
      title: "Total Crowdfunding",
      value: data?.data?.totalCrowdFund,
    },
    {
      imageUrl: "/images/dashboard/location.png",
      title: "Total Current Location",
      value: data?.data?.totalProperty,
    },
    {
      imageUrl: "/images/dashboard/flipping.png",
      title: "Total Flipping",
      value: data?.data?.totalFlipping,
    },
  ];

  const columns: ColumnsType<User> = [
    {
      title: "Name",
      dataIndex: "name",
      className: "min-w-[120px]"
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      className: "min-w-[150px]"
    },
    {
      title: "Payment Status",
      dataIndex: "isPaid",
      className: "min-w-[150px]",
      render: (isPaid: boolean) => {
        return (
          <div className={`flex items-center gap-1`}>
            {isPaid === true ? "Paid" : "Free"}
          </div>
        );
      },
    },
    {
      title: "User Status",
      dataIndex: "isBlocked",
      className: "min-w-[150px]",
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
      title: "Action",
      dataIndex: "action",
      className: "min-w-[120px]",
      render: (text: string, record: User) => {
        return (
          <div className="flex items-center justify-evenly gap-1">
            <AppModal
              button={
                <button className="text-xs text-white px-4 py-1 rounded-full bg-bgred">
                  Remove
                </button>
              }
              cancelButtonTitle="No, Don’t"
              primaryButtonTitle="Yes. Remove"
              primaryButtonAction={() => handleDeleteUser(record?.id)}
            >
              <div className="max-w-80">
                <p className="text-center text-[#828282] pt-4 text-lg">
                  Are you sure Remove{" "}
                  <span className="text-textDark font-medium">
                    {record?.name}
                  </span>{" "}
                  from the user list?
                </p>
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
        );
      },
    },
  ];

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 lg:gap-5">
        <div className="col-span-2 lg:col-span-4 flex flex-col justify-center pl-4 md:pl-6 lg:pl-12">
          <p className="text-[#6D6D6D]">Good Morning</p>
          <p className="text-black text-2xl md:text-3xl font-semibold capitalize">{user?.name}</p>
        </div>

        {isSuccess ?
          <>
            {dashboardCards.map((card) => (
              <div
                key={card?.title}
                className="bg-[#F8F8F8] rounded-2xl flex flex-col items-center justify-center px-2 py-4"
              >
                <img
                  src={card?.imageUrl}
                  alt={card?.title}
                  className="rounded-full object-contain size-12"
                />
                <p className=" text-[#454545] text-sm py-2">{card?.title}</p>
                <h3 className="text-[#414141] text-2xl font-bold">{card?.value}</h3>
              </div>
            ))}
          </>
          : <Loading />}
      </div>

      <div className="pt-8">
        <AppTable
          columns={columns}
          infoQuery={infoQuery}
          onInputChange={(text) => setSearch(text)}
          headerText="Users List"
          inputPlaceholder="Search user"
          setPage={setPage}
        />
      </div>
    </>
  );
};

export default Dashboard;
