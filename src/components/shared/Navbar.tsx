import { SlArrowDown } from "react-icons/sl";
import ProfileCard from "../ui/ProfileCard";
import { useAppSelector } from "../../redux/hook";
import { User } from "../../types/common";
import { useState } from "react";
import { GrMenu } from "react-icons/gr";
import { Drawer } from "antd";
import Sidebar from "./Sidebar";
import AppPopover from "../ui/AppPopover";

const Navbar = () => {
  const [openDrawer, setOpenDrawer] = useState(false);

  const showDrawer = () => {
    setOpenDrawer(true);
  };

  const onClose = () => {
    setOpenDrawer(false);
  };

  const { user } = useAppSelector(state => state.user);

  return (
    <div className="bg-bgWhite">
      <div className="px-5 md:px-8 lg:px-12 2xl:px-14 flex items-center justify-between py-1.5 2xl:py-3 ">
        <div className="">
          <img src="/images/wealth.png" alt="" className="w-20 lg:w-24 2xl:w-[120px] h-6 lg:h-8 2xl:h-10" />
          <p className="text-[#6B6B6F] text-xs lg:text-sm">by promiseland estate</p>
        </div>

        {/* this is for user profile  */}
        <AppPopover
          button={
            <div className="hidden lg:flex items-center gap-4 cursor-pointer hover:bg-gray-50 px-4 py-1 rounded-lg">
              <img
                src={user?.profileImg}
                alt={user?.name}
                className="w-11 h-11 rounded-full"
              />
              <div className="">
                <h3 className="text-lg font-semibold text-textDarkBlue capitalize">
                  {user?.name}
                </h3>
                <p className="text-[#5C5D5E] uppercase text-xs">{user?.role}</p>
              </div>
              <SlArrowDown />
            </div>
          }>
          <ProfileCard user={user as User} />
        </AppPopover>

        {/* this is mobile menu div  */}
        <div onClick={showDrawer} className='lg:hidden border-2 rounded border-mainColor p-0.5 text-textDark text-xl'>
          <GrMenu />
        </div>
        <Drawer width={"70%"} placement="left" onClose={onClose} open={openDrawer}>
          <ProfileCard user={user as User} />
          <Sidebar />
        </Drawer>
      </div>
    </div>
  );
};

export default Navbar;
