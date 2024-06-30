import { ReactNode, useState } from "react";
import { Popover } from "antd";

const AppPopover = ({ children, button, arrow }: { arrow?: boolean, children: ReactNode, button: ReactNode }) => {
    const [clicked, setClicked] = useState(false);

    const handleClickChange = (open: boolean) => {
        setClicked(open);
    };

    return (
        <Popover
            placement="bottom"
            content={children}
            trigger="click"
            open={clicked}
            onOpenChange={handleClickChange}
            arrow={arrow}
        >
            {button}
        </Popover>
    );
};

export default AppPopover;