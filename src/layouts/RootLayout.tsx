import "react-toastify/dist/ReactToastify.css";
import { ReactNode, useEffect } from "react";
import { useAppDispatch } from "../redux/hook";
import { getFromLocalStorage } from "../utils/local-storage";
import {
  loginUserWithToken,
  setLoading,
} from "../redux/features/auth/authSlice";
import { authKey } from "../constants/storageKey";


const RootLayout = ({ children }: { children: ReactNode }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = getFromLocalStorage(authKey);
    if (token?.length && token !== "undefined") {
      dispatch(loginUserWithToken());
      //
    } else {
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  return <>{children}</>;
};
export default RootLayout;
