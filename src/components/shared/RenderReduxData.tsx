import React from "react";
import Loading from "../ui/Loading";
import { UseQueryHookResult } from "@reduxjs/toolkit/dist/query/react/buildHooks";
import ErrorCompo from "../ui/ErrorCompo";

type Props = {
  info: UseQueryHookResult<any>;
  showData: (data: any) => React.ReactNode;
  renderErrorComponent?: (error: any) => React.ReactNode;
  loadingComponent?: React.ReactNode;
  notAllowIsFetching?: boolean;
};

const RenderReduxData = ({
  info,
  showData,
  renderErrorComponent,
  loadingComponent,
  notAllowIsFetching,
}: Props) => {
  const { data, isFetching, isLoading, isError, error } = info;

  let content;

  const shouldFetch = notAllowIsFetching === true ? false : isFetching;

  if (shouldFetch || isLoading) {
    content = loadingComponent || <Loading></Loading>;
  } else if (isError) {
    content = renderErrorComponent ? (
      renderErrorComponent(error)
    ) : (
      <ErrorCompo></ErrorCompo>
    );

  } else if (data) {
    content = showData(data);
  } else {
    content = (
      <div>
        <h2 className="text-center capitalize">No Data found!</h2>
      </div>
    );
  }
  return <>{content}</>;
};

export default RenderReduxData;
