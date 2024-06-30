import { ReactNode, useState } from "react";
import { HiDotsVertical } from "react-icons/hi";
import { Popover as AntdPopover } from "antd";

const Popover = ({ children }: { children: ReactNode }) => {
    const [clicked, setClicked] = useState(false);

    const handleClickChange = (open: boolean) => {
        setClicked(open);
    };

    return (
        <AntdPopover
            placement="bottom"
            content={children}
            trigger="click"
            open={clicked}
            onOpenChange={handleClickChange}
        >
            <button className='px-2 2xl:px-4 py-1.5 2xl:py-2 text-lg bg-white border border-[#DDE8FF] rounded-lg'><HiDotsVertical /></button>
        </AntdPopover>
    );
};

export default Popover;