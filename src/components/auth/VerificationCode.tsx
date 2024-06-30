import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { LuAlertTriangle } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
import VerificationInput from "react-verification-input";
import Loading from "../ui/Loading";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import {
  loginUserWithToken,
  resendEmail,
  verifyUserWithToken,
} from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import { IGenericErrorMessage } from "../../types/common";

type Inputs = {
  email: string;
};

const VerificationCode = () => {
  const [token, setToken] = useState("");
  const dispatch = useAppDispatch();
  const [isDisabled, setIsDisabled] = useState(true);
  const [countdown, setCountdown] = useState(30);
  const { isLoading, user } = useAppSelector((state) => state.user);
  const router = useNavigate();

  useEffect(() => {
    let countdownInterval: NodeJS.Timeout;

    if (isDisabled) {
      // Start countdown when button is disabled
      countdownInterval = setInterval(() => {
        setCountdown((prevCountdown) => {
          if (prevCountdown === 1) {
            // If countdown reaches 1, enable the button
            setIsDisabled(false);
            clearInterval(countdownInterval);
            return 30; // Reset countdown to 30 seconds
          }
          return prevCountdown - 1;
        });
      }, 1000); // Update countdown every second
    }

    // Clear interval when component is unmounted or when button is re-enabled
    return () => clearInterval(countdownInterval);
  }, [isDisabled]);

  useEffect(() => {
    if (user?.isVerified) {
      router("/");
    }
  }, [user, router]);

  if (isLoading) {
    return <Loading></Loading>;
  }
  if (!user) {
    router("/sign-up");
    return <></>;
  }
  const handleResend = () => {
    dispatch(resendEmail(user.email))
      .unwrap()
      .then((res) => {
        toast.success("Successfully verification email sent");
      })
      .catch((err) => {
        toast.error("something went wrong to send email");
      });
    setIsDisabled(true);
  };
  const handleVerify = () => {
    if (token.length !== 4) {
      toast.error("invalid token");
      return;
    }
    dispatch(verifyUserWithToken(parseInt(token)))
      .unwrap()
      .then((res) => {
        toast.success("Successfully verification complete");
      })
      .catch((err: IGenericErrorMessage) => {
        toast.error(err.message || "something went wrong to send email");
      });
  };
  return (
    <div className="flex h-[100vh]">
      <img
        className="hidden h-full lg:block w-2/5"
        src="/images/sign-up.png"
        alt="Sign up"
      />
      <div className="w-full h-fit lg:w-3/5 px-4 lg:px-20 2xl:px-24 py-12 lg:py-28 2xl:py-36">
        <h2 className="heading text-primary pt-4 lg:pt-8 2xl:pt-12">
          Verification Code
        </h2>
        <p className="pt-2 lg:pt-4 2xl:pt-5 text-sm lg:text-base text-[#5C5D5E]">
          We’ve sent the code to your mail address that you include:{" "}
        </p>
        <h3 className="text-lg font-semibold">{user.email}</h3>
        <div className="flex flex-col gap-3 pt-2 lg:pt-8 2xl:pt-4 max-w-[435px]">
          <div className="grid grid-cols-5 gap-3">
            {/* <input
              id="input1"
              className="border text-center border-[#E7CF62] rounded-xl size-14 2xl:size-14"
              placeholder="1"
              {...register("email", { required: true })}
            />
            <input
              id="input2"
              className="border text-center border-[#E7CF62] rounded-xl size-14 2xl:size-14"
              placeholder="2"
              {...register("email", { required: true })}
            />
            <input
              id="input3"
              className="border text-center border-[#E7CF62] rounded-xl size-14 2xl:size-14"
              placeholder="3"
              {...register("email", { required: true })}
            />
            <input
              id="input4"
              className="border text-center border-[#E7CF62] rounded-xl size-14 2xl:size-14"
              placeholder="4"
              {...register("email", { required: true })}
            />
            <input
              id="input5"
              className="border text-center border-[#E7CF62] rounded-xl size-14 2xl:size-14"
              placeholder="5"
              {...register("email", { required: true })}
            /> */}
          </div>
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
          <div className="flex items-center justify-end">
            <button
              //   to={"/forgot-password"}
              disabled={isDisabled}
              onClick={handleResend}
              className="text-[#82491E] underline text-sm lg:text-base"
            >
              Resend Code {isDisabled && <span> in {countdown}s</span>}
            </button>
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

export default VerificationCode;
