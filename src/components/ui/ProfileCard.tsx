import { userLoggedOut } from "../../redux/features/auth/authSlice";
import { useAppDispatch } from "../../redux/hook";
import { User } from "../../types/common";

const ProfileCard = ({ user }: { user: User }) => {
    const dispatch = useAppDispatch();

    return (
        <div className="flex flex-col justify-center max-w-xs px-4 py-2 lg:p-6 rounded-xl lg:px-12 text-gray-800">
            <img src={user?.profileImg} alt={user?.name} className="size-16 lg:size-32 mx-auto rounded-full bg-mainColor/10 aspect-square" />
            <div className="space-y-2 lg:space-y-4 text-center divide-y divide-gray-700">
                <div className="lg:my-2 space-y-1">
                    <h2 className="text-lg md:text-xl font-semibold lg:text-2xl capitalize">{user?.name}</h2>
                    <p className="px-5 text-xs sm:text-base text-textSecondary uppercase">{user?.role}</p>
                    <p className="px-5 text-xs sm:text-base text-textSecondary">{user?.email}</p>
                </div>
                <div className="flex justify-center pt-2 space-x-4 align-center">
                    <button
                        onClick={() => dispatch(userLoggedOut())}
                        className="roundedBtn bg-bgred hover:bg-bgred/80">Logout</button>
                </div>
            </div>
        </div>
    );
};

export default ProfileCard;