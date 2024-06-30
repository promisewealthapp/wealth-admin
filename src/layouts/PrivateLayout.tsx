import React, { ReactNode } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { Link, useNavigate } from "react-router-dom";
import NotVerified from "../components/ui/NotVerified";
import Loading from "../components/ui/Loading";
import { UserRole } from "../types/common";
import { userLoggedOut } from "../redux/features/auth/authSlice";

interface TPrivateLayoutProps {
  children: ReactNode;
}

const PrivateLayout = ({ children }: TPrivateLayoutProps) => {
  const { isLoading, user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const router = useNavigate();

  if (isLoading) {
    return (
      <div className="flex justify-center">
        <Loading></Loading>
      </div>
    );
  }

  if (!user?.email) {
    router("/sign-in");
    return (
      <div className="flex justify-center">
        <Loading></Loading>
      </div>
    );
  }
  if (!user.isVerified) {
    return <NotVerified></NotVerified>;
  }
  if (user.role === UserRole.USER) {
    return (
      <div className="text-center h-screen  flex-col flex justify-center items-center text-xl font-bold">
        <h2 className="2xl:text-5xl text-textSecondary pb-4">Opps! You are not Admin!</h2>
        <Link
          to="sign-in"
          onClick={() => dispatch(userLoggedOut())}
          className="block border px-4 lg:px-8 text-md py-2 mt-5 text-red-600 border-red-600 rounded-full"
        >
          Sign in
        </Link>
      </div>
    );
  }

  return <>{children}</>;
};

export default PrivateLayout;
