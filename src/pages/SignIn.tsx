import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { LuAlertTriangle, LuEye, LuEyeOff } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { loginUser, setError } from "../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import Loading from "../components/ui/Loading";

type Inputs = {
  name: string;
  email: string;
  password: string;
};

const SignIn = () => {
  const { isLoading, user, error } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const [show, setShow] = useState(false);
  const router = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    dispatch(loginUser(data));
  };
  useEffect(() => {
    if (error) {
      toast.error(error, { toastId: 1 });
    } else if (!isLoading && user?.email) {
      router("/");
    }
    return () => {
      dispatch(setError({ isError: false, error: "" }));
    };
  }, [error, isLoading, user, router, dispatch]);
  if (isLoading) {
    return (
      <div>
        <Loading></Loading>
      </div>
    );
  }
  return (
    <div className="flex h-[100vh]">
      <img
        className="hidden h-full lg:block w-2/5"
        src="/images/sign-up.png"
        alt="Sign up"
      />
      <div className="w-full h-fit lg:w-3/5 px-4 lg:px-20 2xl:px-24 py-12 lg:py-24 2xl:py-32 2xl:pb-0">
        <h2 className="heading text-primary">Sign In</h2>
        <p className="pt-1 lg:pt-4 2xl:pt-5 text-sm lg:text-base text-[#5C5D5E]">
          Sign in with your valid account information
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-2 2xl:gap-3 pt-4 lg:pt-6 2xl:pt-8  max-w-[435px]"
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
              <div className="px-2 py-1 lg:py-1.5 flex gap-1 lg:gap-2 rounded border bg-[#FFF2E2] border-[#F87034] ">
                <LuAlertTriangle className="text-[#F87034]" />
                <p className="text-primary text-[10px] leading-[12px] lg:leading-4 lg:text-xs">
                  The email and password you entered doesn’t match our records.
                  Please double-check and try again.
                </p>
              </div>
            )}
          </div>

          <div className=" flex flex-col gap-1">
            <label htmlFor="password" className="cursor-pointer">
              Password
            </label>
            <div className="relative w-full">
              <input
                type={show ? "text" : "password"}
                id="password"
                className="input w-full"
                placeholder="e.g.***********"
                {...register("password", { required: true })}
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
            {errors.email && (
              <div className="px-2 py-1 lg:py-1.5 flex gap-1 lg:gap-2 rounded border bg-[#FFF2E2] border-[#F87034] ">
                <LuAlertTriangle className="text-[#F87034]" />
                <p className="text-primary text-[10px] leading-[12px] lg:leading-4 lg:text-xs">
                  The email and password you entered doesn’t match our records.
                  Please double-check and try again.
                </p>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <input type="checkbox" id="policy" className="" />
              <label
                htmlFor="policy"
                className="text-sm cursor-pointer font-medium text-[#75777a]"
              >
                Remember me
              </label>
            </div>
            <Link
              to={"/forgot-password"}
              className="text-primary underline text-sm lg:text-base"
            >
              Forgot Password
            </Link>
          </div>
          <input
            className="secondaryBtn mt-4 lg:mt-6 2xl:mt-10  max-w-[435px]"
            value={"Sign In"}
            type="submit"
          />
        </form>

        <div className="text-center pt-4 lg:pt-6 2xl:pt-10 font-medium text-textSecondary  max-w-[435px]">
          Don’t have an account?{" "}
          <Link to={"/sign-up"} className="text-primary font-semibold">
            {" "}
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
