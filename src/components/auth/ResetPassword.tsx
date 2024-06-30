import React from "react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { LuAlertTriangle, LuEye, LuEyeOff } from "react-icons/lu";
import { MdOutlineInfo } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { IGenericErrorMessage, ResponseSuccessType } from "../../types/common";
import { url } from "../../redux/features/auth/authSlice";
import Loading from "../ui/Loading";
import ResetSuccess from "./ResetSuccess";

type Inputs = {
  newPassword: string;
  confirmPassword: string;
};
type IProps = {
  token: number;
  email: string;
};
const ResetPassword = ({ token, email }: IProps) => {
  const [show, setShow] = useState(false);
  const [confirmPassShow, setConfirmPassShow] = useState(false);
  const [suggestionShow, setSuggestionShow] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (data.newPassword.length < 8) {
      toast.error("Minimum password length should be 8");
      return;
    }
    if (data.confirmPassword !== data.newPassword) {
      toast.error("password does not match!");
      return;
    }
    setIsLoading(true);
    fetch(`${url}/auth/change-password`, {
      method: "POST",
      body: JSON.stringify({ token, email, password: data.confirmPassword }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res: ResponseSuccessType) => {
        if (res.success) {
          toast.success("Successfully password change");
          setIsSuccess(true);
        } else {
          toast.error(res.message || "something went wrong");
        }
      })
      .catch((err: IGenericErrorMessage) => {
        toast.error(err.message || "something went wrong to send email");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  if (isLoading) {
    return <Loading></Loading>;
  }
  if (isSuccess) {
    return <ResetSuccess></ResetSuccess>;
  }
  return (
    <div className="flex">
      <img
        className="hidden lg:block w-2/5"
        src="/images/sign-up.png"
        alt="Sign up"
      />
      <div className="w-full lg:w-3/5 px-4 lg:px-20 2xl:px-24 py-12 lg:py-32 2xl:py-36">
        <Link to={"/sign-in"}>
          <img
            src="/images/Back.png"
            alt="back"
            className="w-10 lg:w-14 h-10 lg:h-14"
          />
        </Link>
        <h2 className="heading text-primary mt-5">Reset Password</h2>
        <p className="pt-1 lg:pt-4 2xl:pt-5 text-sm lg:text-base text-[#5C5D5E]">
          Reset your password with new password.
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-3 pt-4 lg:pt-8 2xl:pt-12"
        >
          <div className=" flex flex-col gap-1">
            <label htmlFor="newPassword" className="cursor-pointer">
              New Password
            </label>
            <div className="relative w-full max-w-[435px]">
              <input
                type={show ? "text" : "password"}
                id="newPassword"
                className="input w-full"
                placeholder="Type New Password"
                {...register("newPassword", { required: true, minLength: 8 })}
              />
              {show ? (
                <LuEyeOff
                  onClick={() => setShow((prev) => !prev)}
                  className="absolute right-3 top-[30%] cursor-pointer text-[#BABABA] text-2xl"
                />
              ) : (
                <LuEye
                  onClick={() => setShow((prev) => !prev)}
                  className="absolute right-3 top-[30%] cursor-pointer text-[#BABABA] text-2xl"
                />
              )}
            </div>
            {errors.newPassword && (
              <div className="">
                {/* <div className="w-fit px-2 py-2 flex gap-2 rounded border bg-[#DEF4FC]">
                  <MdOutlineInfo className="text-[#1689CB]" />
                  <p className="text-[#545557] text-xs">
                    This is your previous password. Try new One!
                  </p>
                </div> */}
                {/* this is checkbox and suggestion div  */}
                <div className="pt-4 flex flex-col lg:flex-row items-center gap-4 mb-4 lg:mb-6">
                  <div className=" grid grid-cols-2 lg:block space-y-1">
                    <div className="flex gap-2">
                      <input type="checkbox" id="character" className="" />
                      <label
                        htmlFor="character"
                        className="text-sm cursor-pointer font-medium text-[#4E4F50]"
                      >
                        Include special character
                      </label>
                    </div>
                    <div className="flex gap-2">
                      <input type="checkbox" id="number" className="" />
                      <label
                        htmlFor="number"
                        className="text-sm cursor-pointer font-medium text-[#4E4F50]"
                      >
                        Include Number
                      </label>
                    </div>
                    <div className="flex gap-2">
                      <input type="checkbox" id="uppercase" className="" />
                      <label
                        htmlFor="uppercase"
                        className="text-sm cursor-pointer font-medium text-[#4E4F50]"
                      >
                        Include Uppercase
                      </label>
                    </div>
                    <div className="flex gap-2">
                      <input type="checkbox" id="lowercase" className="" />
                      <label
                        htmlFor="lowercase"
                        className="text-sm cursor-pointer font-medium text-[#4E4F50]"
                      >
                        Include Lowercase
                      </label>
                    </div>
                  </div>
                  {/* this is suggestion div  */}
                  {errors.newPassword && suggestionShow && (
                    <div className="bg-[#DEF4FC] p-2 flex gap-1 max-w-[332px]">
                      <div className="">
                        <MdOutlineInfo className="text-blue-500 text-xl" />
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <h3 className="text-[#0A435C] font-semibold">
                            Tips for your secuirity
                          </h3>
                          <RxCross2
                            onClick={() => setSuggestionShow(false)}
                            className="cursor-pointer"
                          />
                        </div>
                        <p className="text-[#545557] text-xs">
                          A good password will includes all the numbers letters
                          and special characters. It’s length will be more that
                          eight. Don’t use same password everywhere.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className=" flex flex-col gap-1">
            <label htmlFor="confirmPassword" className="cursor-pointer">
              Confirm Password
            </label>
            <div className="relative w-full max-w-[435px]">
              <input
                type={confirmPassShow ? "text" : "password"}
                id="confirmPassword"
                className="input w-full"
                placeholder="Retype Password"
                {...register("confirmPassword", {
                  required: true,
                  minLength: 8,
                })}
              />
              {confirmPassShow ? (
                <LuEyeOff
                  onClick={() => setConfirmPassShow((prev) => !prev)}
                  className="absolute right-3 top-[30%] cursor-pointer text-[#BABABA] text-2xl"
                />
              ) : (
                <LuEye
                  onClick={() => setConfirmPassShow((prev) => !prev)}
                  className="absolute right-3 top-[30%] cursor-pointer text-[#BABABA] text-2xl"
                />
              )}
            </div>
          </div>

          <input className="secondaryBtn mt-4 max-w-[435px]" type="submit" />
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
