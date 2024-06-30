import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { LuAlertTriangle } from "react-icons/lu";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import VerificationInput from "react-verification-input";
import Loading from "../ui/Loading";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import {
  loginUserWithToken,
  resendEmail,
  url,
  verifyUserWithToken,
} from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import { IGenericErrorMessage, ResponseSuccessType } from "../../types/common";
import ResetPassword from "./ResetPassword";

type Inputs = {
  email: string;
};

const ForgotVerificationCode = () => {
  const [token, setToken] = useState("");

  const router = useNavigate();
  const location = useParams();
  const email = location.email;
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsloading] = useState(false);

  if (isLoading) {
    return <Loading></Loading>;
  }

  const handleVerify = () => {
    if (token.length !== 4) {
      toast.error("invalid token");
      return;
    }
    setIsloading(true);
    fetch(`${url}/auth/verify-forgot-token`, {
      method: "POST",
      body: JSON.stringify({ token: parseInt(token), email }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res: ResponseSuccessType) => {
        if (res.success) {
          toast.success("Successfully verification complete");
          setIsSuccess(true);
        } else {
          toast.error(res.message || "something went wrong to send email");
          setIsSuccess(false);
        }
      })
      .catch((err: IGenericErrorMessage) => {
        toast.error(err.message || "something went wrong to send email");
        setIsSuccess(false);
      })
      .finally(() => {
        setIsloading(false);
      });
  };

  if (isSuccess) {
    return <ResetPassword email={email as string} token={parseInt(token)} />;
  }
  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div className="flex h-[100vh]">
      <img
        className="hidden h-full lg:block w-2/5"
        src="/images/sign-up.png"
        alt="Sign up"
      />
      <div className="w-full h-fit lg:w-3/5 px-4 lg:px-20 2xl:px-24 py-12 lg:py-28 2xl:py-36">
        <Link to={"/forgot-password"}>
          <img
            src="/images/Back.png"
            alt="back"
            className="w-10 lg:w-14 h-10 lg:h-14"
          />
        </Link>
        <h2 className="heading text-primary pt-4 lg:pt-8 2xl:pt-12">
          Forgot password OTP
        </h2>
        <p className="pt-2 lg:pt-4 2xl:pt-5 text-sm lg:text-base text-[#5C5D5E]">
          We’ve sent the code to your mail address that you include:{" "}
        </p>
        <h3 className="text-lg font-semibold">{email}</h3>
        <div className="flex flex-col gap-3 pt-2 lg:pt-8 2xl:pt-4 max-w-[435px]">
          <div className="grid grid-cols-5 gap-3"></div>
          <div className="flex justify-center mb-5">
            <VerificationInput
              onChange={(e) => {
                setToken(e);
              }}
              validChars="0-9"
              // containerProps={{ className: "gap-2" }}

              classNames={{
                character:
                  "border  text-center border-[#E7CF62]  rounded-xl size-14 2xl:size-14 bg-white",
                characterInactive:
                  "border text-center border-[#E7CF62] rounded-xl size-14 2xl:size-14",
                characterFilled:
                  "border text-center border-[#E7CF62] rounded-xl size-14 2xl:size-14",
                characterSelected:
                  "border text-center border-[#E7CF62] rounded-xl size-14 2xl:size-14",
                //   container:
                // "border text-center border-[#E7CF62] rounded-xl size-14 2xl:size-14",
              }}
              // placeholder=""
              length={4}
            />
          </div>

          <button
            onClick={handleVerify}
            disabled={token.length < 4}
            className="secondaryBtn mt-4 disabled:opacity-40 disabled:cursor-not-allowed"
            value={"Sign In"}
          >
            Verify
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgotVerificationCode;
