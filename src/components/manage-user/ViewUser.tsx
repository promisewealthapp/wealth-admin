import { User } from "../../types/common";
import AppModal from "../ui/AppModal";
import EditUser from "./EditUser";

type TEditUserProps = {
    record: User,
    footerButton?: boolean;
}

const ViewUser = ({ record, footerButton = true }: TEditUserProps) => {
    return (
        <div className='w-[560px]'>
            <div className='flex items-center justify-center py-6'>
                <img src={record?.profileImg} alt={record?.name} className="w-[120px] 2xl:w-[150px] h-[120px] 2xl:h-[150px] rounded-full bg-gray-200" />
            </div>
            <div className='flex gap-8'>
                <div className=''>
                    <p className="text-[#828282]">Name</p>
                    <p className="text-textDark font-medium">{record?.name}</p>
                </div>

                <div className=''>
                    <p className="text-[#828282]">Phone Number</p>
                    <p className="text-textDark font-medium">{record?.phoneNumber}</p>
                </div>
            </div>


            <div className='flex gap-8 pt-4'>
                <div className=''>
                    <p className="text-[#828282]">Email</p>
                    <p className="text-textDark font-medium">{record?.email}</p>
                </div>

                <div className=''>
                    <p className="text-[#828282]">Address</p>
                    <p className="text-textDark font-medium">{record?.location}</p>
                </div>
            </div>
            {footerButton &&

                <div className='flex items-center justify-center gap-2 pt-4 lg:pt-6'>
                    <AppModal button={
                        <button className="roundedBtn text-textDark bg-[#E8E8E8] text-sm">Remove</button>
                    }
                        cancelButtonTitle="No, Don’t"
                        primaryButtonTitle="Yes. Remove"
                    >
                        <div className='max-w-80'>
                            <p className="text-center text-[#828282] pt-4 text-lg">Are you sure  Remove <span className="text-textDark font-medium">{record?.name}</span> from the admin list?</p>

                        </div>
                    </AppModal>
                    <AppModal button={
                        <button className="roundedBtn text-sm">Edit</button>
                    }>
                        <EditUser record={record} />
                    </AppModal>
                </div>
            }
        </div>
    );
};

export default ViewUser;