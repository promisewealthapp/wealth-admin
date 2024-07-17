import React from "react";
import {
  useDeletePromotionMutation,
  useGetPromotionsQuery
} from "../redux/features/promotion/promotionApi";
import RenderReduxData from "../components/shared/RenderReduxData";
import {
  IGenericErrorMessage,
  IGenericErrorResponse,
  IPromotion
} from "../types/common";
import { Avatar } from "antd";
import { IoLocationOutline } from "react-icons/io5";
import { toast } from "react-toastify";

type Props = {};

const Promotion = (props: Props) => {
  const queryData = useGetPromotionsQuery("");
  const [deletePromotion, { isLoading }] = useDeletePromotionMutation();
  const handleDelete = (id: string) => {
    deletePromotion(id)
      .unwrap()
      .then((res) => {
        toast.success("Successfully Delete!");
      })
      .catch((res) => {
        toast.error(res?.data?.message || "Failed to failed");
      });
  };

  return (
    <div>
      <RenderReduxData
        info={queryData}
        showData={(data) => {
          const mainData = data.data as IPromotion[];
          return (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {mainData.map((single) => (
                <div className="p-[9px] rounded-2xl shadow" key={single.id}>
                  <div className="h-[200px] relative overflow-hidden rounded-lg">
                    <img
                      className="w-full h-full object-cover rounded-lg"
                      src={single.thumbnail}
                      alt=""
                    />
                    <div className="absolute left-2 size-[60px] text-center rounded-[10px] top-2 bg-white text-[#F0635A] flex flex-col items-center ">
                      <span className="text- font-bold text-[20px] left-0">
                        {new Date(single.date).getDay()}
                      </span>
                      <span className="text-[16px] leading-none ">
                        {new Date(single.date).toLocaleString("default", {
                          month: "short"
                        })}
                      </span>
                    </div>
                  </div>
                  <div>
                    <h2 className="mt-[14px] text-[18px] font-bold text-black">
                      {single.title}
                    </h2>
                  </div>
                  <div>
                    <Avatar.Group size={"small"}>
                      {single.interesteds.slice(0, 3).map((inter) => (
                        <Avatar src={inter.ownBy.profileImg} />
                      ))}
                    </Avatar.Group>
                    {single.interesteds.length ? (
                      <div>{single.interesteds.length} Going</div>
                    ) : null}
                  </div>
                  <div className="flex  items-center gap-2">
                    <div>
                      <IoLocationOutline color="#2B2849"></IoLocationOutline>
                    </div>
                    <p className="break-words text-[#2B2849]">
                      {single.location}-{single.streetLocation}
                    </p>
                  </div>
                  <div>
                    <button
                      onClick={() => handleDelete(single.id)}
                      disabled={isLoading}
                      className="mt-4 mb-2 font-bold text-sm p-4 py-1 bg-red-300 rounded hover:bg-red-400 transition-all "
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          );
        }}
      ></RenderReduxData>
    </div>
  );
};

export default Promotion;
