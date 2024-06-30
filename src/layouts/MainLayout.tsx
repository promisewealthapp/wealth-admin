import { ReactElement } from "react";
import Sidebar from "../components/shared/Sidebar";

const MainLayout = ({ children }: {
    children: ReactElement
}) => {
    return (
        <div className='py-2 lg:py-5 flex'>
            <div className='hidden lg:block w-0 lg:w-1/5 h-[82.5dvh] overflow-auto '>
                <Sidebar />
            </div>
            <div className='w-full lg:w-4/5 h-[82.5dvh] overflow-auto  px-4 2xl:px-8 py-5 2xl:py-7'>
                {children}
            </div>
        </div>
    );
};

export default MainLayout;