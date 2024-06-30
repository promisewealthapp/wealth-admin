import { Link } from "react-router-dom";

const ResetSuccess = () => {
    return (
        <div className='h-screen w-full flex items-center justify-center'>

            <div className='w-fit 2xl:w-[560px] rounded-3xl border-2 px-16 2xl:px-24 py-12 2xl:py-14 border-dashed border-[#D0D0D1] h-fit mx-auto'>
                <img src="/images/reset.png" alt="" className="mx-auto w-72 2xl:w-[350px] h-56 2xl:h-[280px]" />
                <div className='max-w-96 text-center'>
                    <h2 className="text-[#4E4F50] font-bold text-3xl">Your password reset
                        successfully</h2>
                    <p className="pt-2 text-[#7B7B7B]">your password reset done successfully, you can
                        sign in now</p>
                    <Link to={'/sign-in'}>
                        <button className="mt-4 2xl:mt-8 secondaryBtn">Sign in</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ResetSuccess;