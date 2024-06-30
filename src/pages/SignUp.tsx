import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { LuAlertTriangle, LuEye, LuEyeOff } from "react-icons/lu";
import { MdOutlineInfo } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { toast } from "react-toastify";
import { createUser, setError } from "../redux/features/auth/authSlice";
import Loading from "../components/ui/Loading";

type Inputs = {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
};

const SignUp = () => {
  const [show, setShow] = useState(false);
  const dispatch = useAppDispatch();
  const { isLoading, user, error } = useAppSelector((state) => state.user);
  const [suggestionShow, setSuggestionShow] = useState(true);
  const router = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (data.password.length < 8) {
      toast.error("minimum password value is 8");
      return;
    }
    dispatch(createUser(data));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    } else if (!isLoading && user?.email) {
      router(`/verification-code`);
    }
    return () => {
      dispatch(setError({ isError: false, error: "" }));
    };
  }, [error, isLoading, user, router, dispatch]);
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
      <div className="w-full h-fit lg:w-3/5 px-4 lg:px-20 2xl:px-24 py-12 lg:py-24 2xl:py-32 ">
        <h2 className="heading text-primary">Sign up</h2>
        <p className="pt-1 lg:pt-4 2xl:pt-5 text-sm lg:text-base text-[#5C5D5E]">
          Sign up with your valid account information
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-2 2xl:gap-3 pt-4 lg:pt-6 2xl:pt-8"
        >
          <div className="flex flex-col gap-1  max-w-[435px]">
            <label htmlFor="name" className="cursor-pointer">
              Full Name
            </label>
            <input
              id="name"
              className="input"
              type="text"
              placeholder="e.g. John Due"
              autoComplete="name"
              {...register("name", { required: true })}
            />
          </div>

          <div className="flex flex-col gap-1  max-w-[435px]">
            <label htmlFor="email" className="cursor-pointer">
              Email
            </label>
            <input
              id="email"
              className="input"
              autoComplete="email"
              type="email"
              placeholder="e.g. demo@gmail.com"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <div className="px-2 py-1.5 flex gap-2 rounded border bg-[#FFF2E2] border-[#F87034] ">
                <LuAlertTriangle className="text-[#F87034]" />
                <p className="text-primary text-xs">Invalid email address!!</p>
              </div>
            )}
          </div>
          <div className="flex flex-col gap-1  max-w-[435px]">
            <label htmlFor="name" className="cursor-pointer">
              Phone Number
            </label>
            <input
              id="contact"
              className="input"
              type="tel"
              autoComplete="tel"
              placeholder="+232332323"
              {...register("phoneNumber", { required: true })}
            />
          </div>

          <div className=" flex flex-col gap-1">
            <label htmlFor="password" className="cursor-pointer">
              Password
            </label>
            <div className="relative w-full  max-w-[435px]">
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
            {errors.password && (
              <div className="">
                <div className=" max-w-[435px] px-2 py-1.5 flex gap-2 rounded border bg-[#FFF2E2] border-[#F87034] ">
                  <LuAlertTriangle className="text-[#F87034]" />
                  <p className="text-primary text-xs">
                    Password must not be the same as your username or email
                    address.
                  </p>
                </div>
                {/* this is checkbox and suggestion div  */}
                <div className="pt-4 flex items-center gap-4 mb-6">
                  <div className="space-y-1">
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
                  {errors.password && suggestionShow && (
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

          <div className="flex  max-w-[435px]">
            <div className="w-5">
              <input type="checkbox" id="policy" className="w-full" />
            </div>
            <label
              htmlFor="policy"
              className="pl-3 text-sm cursor-pointer font-medium text-[#75777a]"
            >
              By creating a account you agree to our{" "}
              <span className="text-primary font-semibold">
                Terms & Conditions
              </span>{" "}
              and{" "}
              <span className="text-primary font-semibold">Privacy Policy</span>
              .
            </label>
          </div>
          <input
            className="secondaryBtn mt-4 lg:mt-6 2xl:mt-10  max-w-[435px]"
            value={"Sign Up"}
            type="submit"
          />
        </form>

        <div className="text-center pt-4 lg:pt-6 2xl:pt-10 font-medium text-textSecondary  max-w-[435px]">
          Already a member?{" "}
          <Link to={"/sign-in"} className="text-primary font-semibold">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
