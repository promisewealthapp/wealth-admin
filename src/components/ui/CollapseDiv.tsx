import { useState } from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import { SlArrowDown, SlArrowUp } from "react-icons/sl";
import AppModal from "./AppModal";
import { useDeleteUserMutation } from "../../redux/features/user/userApi";
import { useDeleteFaqMutation } from "../../redux/features/faq/faqApi";

type TCollapseData = {
    data: {
        id: string;
        question: string;
        ans: string;
    }
};

const CollapseDiv = ({ data }: TCollapseData) => {
    const [open, setOpen] = useState(false);
    const [deleteFaq] = useDeleteFaqMutation();

    return (
        <div className=' border border-[#E6E6E7] rounded-lg'>
            <div onClick={() => setOpen(prev => !prev)} className='px-4 py-2.5 flex items-center justify-between hover:bg-gray-100 cursor-pointer'>
                <h2 className="font-semibold text-textDark">{data?.question}</h2>
                <div className='flex items-center gap-4'>
                    <AppModal button={
                        <RiDeleteBinLine className="text-red-700" />
                    }
                        cancelButtonTitle="No, Don’t"
                        primaryButtonTitle="Yes. Delete"
                        primaryButtonAction={() => deleteFaq(data?.id)}
                    >
                        <div className='max-w-80'>
                            <p className="text-center text-[#828282] pt-4 text-lg">Are you sure Delete FAQ from the FAQ list?</p>
                        </div>
                    </AppModal>
                    {open ?
                        <SlArrowUp />
                        : <SlArrowDown />
                    }
                </div>

            </div>
            {open && <p className="text-sm px-4 py-2 text-[#6B6B6F]">{data?.ans}</p>}
        </div>
    );
};

export default CollapseDiv;