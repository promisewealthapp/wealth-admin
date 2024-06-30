import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { LuAlertTriangle } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../redux/hook";
import Loading from "../ui/Loading";
import axios from "axios";
import { url } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";
type Inputs = {
  email: string;
};

const ForgotPassword = () => {
  const { user } = useAppSelector((state) => state.user);
  const router = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setIsLoading(true);
    axios
      .post(`${url}/auth/send-forgot-email/${data.email}`)
      .then((res) => {
        toast.success("successfully OTP send");
        router(`/forgot-password-otp/${data.email}`);
      })
      .catch(({ response }) => {
        // console.log();
        toast.error(response?.data?.message || "something went wrong");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  if (user?.email) {
    router("/");
    return <Loading></Loading>;
  }
  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div className="flex h-[115vh]">
      <img
        className="hidden h-full lg:block w-2/5"
        src="/images/sign-up.png"
        alt="Sign up"
      />
      <div className="w-full h-fit lg:w-3/5 px-4 lg:px-20 2xl:px-24 py-12 lg:py-24 2xl:py-32">
        <Link to={"/sign-in"}>
          <img
            src="/images/Back.png"
            alt="back"
            className="w-10 lg:w-14 h-10 lg:h-14"
          />
        </Link>
        <h2 className="heading text-primary pt-4 lg:pt-8 2xl:pt-12">
          Forgot Password
        </h2>
        <p className="pt-2 lg:pt-4 2xl:pt-5 text-sm lg:text-base text-[#5C5D5E]">
          Provide the email address associated with your account in the
          designated field.
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-3 pt-4 lg:pt-8 2xl:pt-12 max-w-[435px]"
        >
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="cursor-pointer">
              Email
            </label>
            <input
              id="email"
              className="input"
              placeholder="e.g. demo@gmail.com"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <div className="px-2 py-1.5 flex gap-2 rounded border bg-[#FFF2E2] border-[#F87034] ">
                <LuAlertTriangle className="text-[#F87034]" />
                <p className="text-primary text-xs">
                  The email you entered doesn’t match our records. Please
                  double-check and try again.
                </p>
              </div>
            )}
          </div>

          <input
            className="secondaryBtn mt-4"
            value={"Send OTP"}
            type="submit"
          />
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
