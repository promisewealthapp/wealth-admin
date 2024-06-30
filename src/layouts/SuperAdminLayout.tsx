import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../redux/hook";
import Loading from "../components/ui/Loading";
import { UserRole } from "../types/common";
import { ReactNode, useEffect } from "react";

type Props = { children: ReactNode };

const SuperAdminLayout = ({ children }: Props) => {
  const { isLoading, user } = useAppSelector((state) => state.user);
  const router = useNavigate();

  useEffect(() => {
    if (!isLoading) {
      if (user?.role !== UserRole.SUPER_ADMIN) {
        router("/");
      }
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="flex justify-center">
        <Loading></Loading>
      </div>
    );
  }

  if (user?.role !== UserRole.SUPER_ADMIN) {
    router("/manage-crowdfunding");
    return (
      <div className="flex justify-center">
        <Loading></Loading>
      </div>
    );
  }

  return (
    <>{children}</>
  );
};

export default SuperAdminLayout;
