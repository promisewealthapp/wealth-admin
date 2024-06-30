import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Link } from "react-router-dom";

type TAppButtonProps = {
    isLoading?: boolean;
    href?: string;
    label: string;
    variant?: "solid" | "outline" | "deleteOutline" | "deleteSolid";
    size?: "small" | "medium" | "default"
}

const AppButton = ({ isLoading, label, href, variant = "solid", size = "default" }: TAppButtonProps) => {
    let btnStyle = "appBtn"

    switch (variant) {
        case "solid":
            if (size === "small") {
                btnStyle = "appBtnSm"
            } else if (size === "medium") {
                btnStyle = "appBtnMd"
            } else {
                btnStyle = "appBtn";
            }
            break;

        case "outline":
            if (size === "small") {
                btnStyle = "appOutlineBtnSm"
            } else if (size === "medium") {
                btnStyle = "appOutlineBtnMd"
            } else {
                btnStyle = "appOutlineBtn";
            }
            break;

        case "deleteOutline":
            if (size === "small") {
                btnStyle = "appOutlineBtnSmDelete"
            } else {
                btnStyle = "appOutlineBtnDelete";
            }
            break;

        case "deleteSolid":
            if (size === "small") {
                btnStyle = "appBtnSmDelete"
            } else {
                btnStyle = "appBtnDelete";
            }
            break;

        default:
            btnStyle = "appBtn"
            break;
    }

    return (
        <>
            {
                href ?
                    <Link to={href}>
                        <button disabled={isLoading} type="submit" className={btnStyle}>
                            {label}
                        </button>
                    </Link>
                    :

                    isLoading ? (
                        <button type="button" className={`roundedBtn px-10`}>
                            <AiOutlineLoading3Quarters className="animate-spin text-white text-xl" />
                        </button>
                    ) : (
                        <button disabled={isLoading} type="submit" className="roundedBtn cursor-pointer">
                            {label}
                        </button>
                    )}
        </>
    );
};

export default AppButton;