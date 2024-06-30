import React from "react";

type Props = {
  error?: string;
};

const ErrorCompo = (props: Props) => {
  return (
    <div className="h-[60vh] flex justify-center items-center text-bgred font-semibold text-xl lg:text-2xl 2xl:text-3xl">
      <span>{props.error || "Something went wrong"}</span>
    </div>
  );
};

export default ErrorCompo;
