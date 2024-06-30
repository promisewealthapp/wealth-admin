import EditUser from "../components/manage-user/EditUser";
import ViewUser from "../components/manage-user/ViewUser";
import AppModal from "../components/ui/AppModal";
import Popover from "../components/ui/Popover";
import { Link } from "react-router-dom";
import { useEditUserMutation, useGetUsersQuery } from "../redux/features/user/userApi";
import { useMemo, useState } from "react";
import AppTable from "../components/ui/AppTable";
import { User } from "../types/common";
import { toast } from "react-toastify";
import { MdBlock } from "react-icons/md";
import { RiVerifiedBadgeFill } from "react-icons/ri";

const ManageAdmins = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [updateUser] = useEditUserMutation();

  const queryString = useMemo(() => {
    const info = {
      role: "admin",
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

  const handleStatusUpdate = async (role: string, id: string) => {
    const updateData = {
      id, role
    }

    await updateUser(updateData).unwrap().then(res => {
      if (!res.success) {
        toast.error("Make Admin to User update unsuccessful!", { toastId: 1 })
      }
      toast.success("Make Admin to User update successful!", { toastId: 1 })
    }).catch(res => {
      if (!res.success) {
        toast.error("Make Admin to User update unsuccessful!", { toastId: 1 })
      }
    });
  }

  const handleBlockUser = async (id: string, value: boolean) => {
    const updateData = {
      id, isBlocked: value
    }
    await updateUser(updateData).unwrap().then(res => {
      if (!res.success) {
        toast.error("Block User update unsuccessful!", { toastId: 1 })
      }
      toast.success("Block User update successful!", { toastId: 1 })
    }).catch(res => {
      if (!res.success) {
        toast.error("Block User update unsuccessful!", { toastId: 1 })
      }
    });
  }

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      className: "min-w-[120px]",
      render: (name: string, record: User) => {
        return (
          <div className="flex items-center gap-1">
            <img
              src={record?.profileImg}
              alt=""
              className="rounded-full w-10 h-10"
            />
            <AppModal
              title="Admin Details"
              button={<p className="cursor-pointer">{name}</p>}
            >
              <ViewUser record={record} />
            </AppModal>
          </div>
        );
      },
    },
    {
      title: "Email",
      dataIndex: "email",
      className: "min-w-[120px]",
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      className: "min-w-[150px]",
    },
    {
      title: "User Status",
      dataIndex: "isBlocked",
      className: "min-w-[120px]",
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
                <button className="text-xs text-white px-4 py-1 rounded-full bg-bgred">Remove</button>
              }
              cancelButtonTitle="No, Don’t"
              primaryButtonTitle="Yes. Remove"
              primaryButtonAction={() => handleStatusUpdate("user", record?.id)}
            >
              <div className="max-w-80">
                <p className="text-center text-[#828282] pt-4 text-lg">
                  Are you sure Remove{" "}
                  <span className="text-textDark font-medium">
                    {record?.name}
                  </span>{" "}
                  from the admin list?
                </p>
              </div>
            </AppModal>
            <Popover>
              <div className="flex flex-col items-end justify-end">
                <AppModal
                  button={<button>{record?.isBlocked ? "UnBlock" : "Block"}</button>}
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
                      from the admin list?
                    </p>
                  </div>
                </AppModal>

                <AppModal title="Edit Admin" button={<button>Edit</button>}>
                  <EditUser record={record} />
                </AppModal>
              </div>
            </Popover>
          </div>
        );
      },
    },
  ];

  return (
    <AppTable
      columns={columns}
      headerText="Admin List"
      inputPlaceholder="Search Admin"
      infoQuery={infoQuery}
      onInputChange={(text) => setSearch(text)}
      setPage={setPage}
      button={
        <Link to={"/make-admin"}>
          <button className="roundedBtn">New Admin</button>
        </Link>
      }
    />
  );
};

export default ManageAdmins;
