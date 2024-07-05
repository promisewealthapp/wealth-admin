import { LiaUserCogSolid } from "react-icons/lia";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { BiMessageSquareDetail } from "react-icons/bi";
import { CiBank } from "react-icons/ci";
import { IoHomeOutline } from "react-icons/io5";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { LuPalmtree } from "react-icons/lu";
import { FaRegUser } from "react-icons/fa";
import { ImStatsDots } from "react-icons/im";
import { Link, useLocation } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { FaLocationDot } from "react-icons/fa6";
import { BiSolidMessageError } from "react-icons/bi";
import { useAppSelector } from "../../redux/hook";
import { UserRole } from "../../types/common";

const Sidebar = () => {
  const { pathname } = useLocation();
  const { user } = useAppSelector(state => state.user);

  const sidebarLinksSuperAdmin = [
    {
      item: "System Users",
      navs: [
        {
          path: "/",
          Icon: RxDashboard,
          label: "Dashboard",
          relativePath2: "",
        },
        {
          path: "/manage-admins",
          relativePath: "/make-admin",
          Icon: LiaUserCogSolid,
          label: "Manage Admins",
        },
        {
          path: "/manage-champions",
          relativePath: "/make-champion",
          Icon: ImStatsDots,
          label: "Manage Champions",
        },
        {
          path: "/manage-user",
          Icon: FaRegUser,
          label: "Manage User",
        },
      ],
    },
    {
      item: "Properties",
      navs: [
        {
          path: "/manage-crowdfunding",
          Icon: LuPalmtree,
          label: "Manage Crowdfunding",
          relativePath: "/add-crowdfunding",
          relativePath2: "/edit-crowdfunding",
        },
        {
          path: "/manage-current-location",
          Icon: HiOutlineBuildingOffice2,
          label: "Manage Current Location",
          relativePath: "/add-current-location",
        },
        {
          path: "/manage-flipping",
          Icon: IoHomeOutline,
          label: "Manage Flipping",
        },
      ],
    },
    {
      item: "Others",
      navs: [
        {
          path: "/manage-bank",
          Icon: CiBank,
          label: "Manage Bank",
        },
        {
          path: "/manage-group",
          Icon: HiOutlineUserGroup,
          label: "Manage Group",
        },
        {
          path: "/manage-order",
          Icon: BiMessageSquareDetail,
          label: "Manage Order",
        },
        {
          path: "/manage-location",
          Icon: FaLocationDot,
          label: "Manage Location",
        },
        {
          path: "/manage-support",
          Icon: BiSolidMessageError,
          label: "Manage Support(AI)",
          relativePath: "/add-faq",
        },
      ],
    },
  ];

  const sidebarLinksAdmin = [
    {
      item: "Properties",
      navs: [
        {
          path: "/manage-crowdfunding",
          Icon: LuPalmtree,
          label: "Manage Crowdfunding",
          relativePath: "/add-crowdfunding",
          relativePath2: "/edit-crowdfunding",
        },
        {
          path: "/manage-current-location",
          Icon: HiOutlineBuildingOffice2,
          label: "Manage Current Location",
          relativePath2: "",
        },
        {
          path: "/manage-flipping",
          Icon: IoHomeOutline,
          label: "Manage Flipping",
          relativePath2: "",
        },
      ],
    },
    {
      item: "Others",
      navs: [
        {
          path: "/manage-group",
          Icon: HiOutlineUserGroup,
          label: "Manage Group",
          relativePath2: "",
        },
        {
          path: "/manage-order",
          Icon: BiMessageSquareDetail,
          label: "Manage Order",
        },
        {
          path: "/manage-location",
          Icon: FaLocationDot,
          label: "Manage Location",
        },
        {
          path: "/manage-support",
          Icon: BiSolidMessageError,
          label: "Manage Support(AI)",
          relativePath: "/add-faq",
        },
      ],
    },
  ];

  let sidebarItems;
  if (user?.role === UserRole.SUPER_ADMIN) {
    sidebarItems = sidebarLinksSuperAdmin
  }
  if (user?.role === UserRole.ADMIN) {
    sidebarItems = sidebarLinksAdmin
  }
  return (
    <div className="lg:border-r border-[#DDDDDD] lg:pl-5 2xl:pl-7 space-y-2 2xl:space-y-5">
      {sidebarItems?.map((singleItem) => (
        <div key={singleItem?.item} className="">
          <p className="text-textDark pb-2 2xl:pb-3">{singleItem?.item}</p>
          <div className="space-y-0.5 2xl:space-y-1">
            {singleItem.navs.map((nav) => (
              <div key={nav.label}>
                <Link
                  to={nav.path}
                  className={`relative flex items-center gap-2 2xl:gap-3 pl-2 lg:pl-4 hover:bg-textDark hover:rounded-[10px]  hover:text-white hover:font-semibold group py-1.5 2xl:py-2 ${pathname === nav.path ||
                    pathname === nav.relativePath ||
                    pathname === nav?.relativePath2
                    ? "text-white font-semibold bg-textDark rounded-[10px]"
                    : "text-textSecondary"
                    }`}
                >
                  <div
                    className={`w-9 h-9 flex items-center justify-center rounded-full group-hover:bg-[#494949] p-1 ${pathname === nav.path ||
                      pathname === nav.relativePath ||
                      pathname === nav?.relativePath2
                      ? "bg-[#494949]"
                      : "bg-[#F5F5F6]"
                      }`}
                  >
                    <nav.Icon className="text-xl " />
                  </div>
                  <p className="">{nav.label}</p>
                  <div
                    className={`group-hover:bg-[#EC9414] absolute h-4 w-1 right-0 top-[35%] rounded-l ${pathname === nav.path ||
                      pathname === nav.relativePath ||
                      pathname === nav?.relativePath2
                      ? "bg-[#EC9414]"
                      : ""
                      }`}
                  ></div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
