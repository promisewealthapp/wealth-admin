import { Avatar, Progress } from "antd";
import { FaNairaSign } from "react-icons/fa6";
import { GrLocation } from "react-icons/gr";
import AppModal from "../ui/AppModal";
import { Link } from "react-router-dom";
import { useDeleteCrowdFundMutation } from "../../redux/features/crowdFund/crowdFundApi";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useDeletePropertyMutation } from "../../redux/features/property/propertyApi";
import { useDeleteFlippingMutation } from "../../redux/features/flipping/flippingApi";

type TViewCrowdfundingProps = {
  type?: string;
  record: any;
};

const ViewCrowdfunding = ({ record, type }: TViewCrowdfundingProps) => {
  console.log(record);
  const [
    removeUserCrowdFund,
    { isLoading: crowdLoading, isSuccess: crowdSuccess }
  ] = useDeleteCrowdFundMutation();
  const [
    removeUserFlipping,
    { isLoading: flippingLoading, isSuccess: flippingSuccess }
  ] = useDeleteFlippingMutation();
  const [
    removeUserCurrentLocation,
    { isLoading: currentLoading, isSuccess: currentSuccess }
  ] = useDeletePropertyMutation();

  const handleDelete = (id: string) => {
    if (type === "currentLocation") {
      removeUserCurrentLocation(id);
    } else if (type === "crowdFund") {
      removeUserCrowdFund(id);
    } else if (type === "flipping") {
      removeUserFlipping(id);
    }
  };

  useEffect(() => {
    if (!crowdLoading && crowdSuccess) {
      toast.success("Crowdfund Property remove successful!");
    }
    if (!currentLoading && currentSuccess) {
      toast.success("Current Location Property remove successful!");
    }
    if (!flippingLoading && flippingSuccess) {
      toast.success("Flipping remove successfully!");
    }
  }, [
    crowdLoading,
    crowdSuccess,
    currentLoading,
    currentSuccess,
    flippingLoading,
    flippingSuccess
  ]);

  let location;
  if (type === "flipping") {
    location = record?.location;
  } else {
    location = record?.location?.name;
  }

  return (
    <div className="min-w-[320px] md:w-[660px] pt-2">
      <img
        src={record?.thumbnail}
        alt={record?.title}
        className="w-full h-36 md:h-[280px] 2xl:h-[300px] rounded-lg"
      />
      <div className="flex flex-col md:flex-row md:items-center justify-between pt-2">
        <div className="">
          <p className="text-[#6B6B6F] text-sm">Property Name</p>
          <h2 className="text-[#181818] font-semibold text-xl">
            {record?.title}
          </h2>
        </div>
        {/* <div className="pt-1">
          <p className="text-[#6B6B6F] text-sm">Donor</p>
          <Avatar.Group>
            {record?.Orders?.map((img: string) => (
              <Avatar src={img} />
            ))}
          </Avatar.Group>
        </div> */}
      </div>

      <p className="text-[#535355] py-1 md:py-2">{record?.description}</p>

      <div className="grid grid-cols-2 md:flex items-center gap-2 md:gap-10">
        <div className="">
          <p className="text-[#6B6B6F] text-sm">Property Type</p>
          <h2 className="text-textDark font-medium">{record?.type}</h2>
        </div>
        <div className="">
          <p className="text-[#6B6B6F] text-sm">Location</p>
          <div className="pt-1 flex items-center gap-1">
            <GrLocation className="text-[#7CAA38]" />
            <h2 className="text-textDark  font-medium">{location}</h2>
          </div>
        </div>
        <div className="col-span-2">
          <p className="text-[#6B6B6F] text-sm">Street Address</p>
          <h2 className="text-textDark font-medium">
            {record?.streetLocation}
          </h2>
        </div>
      </div>

      {record?.fundRaised && record?.targetFund && (
        <>
          <div className="flex items-center justify-between py-2">
            <div className="flex flex-col">
              <p className="text-[#6B6B6F] text-sm">Fund Raised</p>
              <div className="pt-1 flex items-center gap-1">
                <FaNairaSign className="text-textDark" />
                <h2 className="text-textDark  font-medium">
                  {record?.fundRaised}
                </h2>
              </div>
            </div>
            <div className="flex flex-col">
              <p className="text-[#6B6B6F] text-sm">Target Fund</p>
              <div className="pt-1 flex items-center gap-1">
                <FaNairaSign className="text-textDark" />
                <h2 className="text-textDark font-medium">
                  {record?.targetFund}
                </h2>
              </div>
            </div>
          </div>

          <Progress
            percent={
              record?.fundRaised && record?.targetFund
                ? Number(
                    ((record?.fundRaised / record?.targetFund) * 100)?.toFixed(
                      1
                    )
                  )
                : 0
            }
            strokeColor={"#EC9414"}
          />
        </>
      )}

      {record?.order && record?.order[0] && (
        <div className="">
          <p className="text-[#6B6B6F] text-sm">Buyer Information</p>
          <div className="py-1 flex gap-1">
            <div className="">
              <img
                className="size-8 rounded-full"
                src={record?.order[0]?.orderBy?.profileImg}
                alt={record?.order[0]?.orderBy?.name}
              />
            </div>
            <div className="">
              <h2 className="text-textDark font-medium capitalize">
                {record?.order[0]?.orderBy?.name}
              </h2>
              <p className="text-xs text-[#6B6B6F]">
                {record?.order[0]?.orderBy?.role}
              </p>
              <p className="text-sm">
                Email: {record?.order[0]?.orderBy?.email}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="pt-2  space-y-2 md:space-y-4">
        <div className="grid md:grid-cols-2 gap-2 md:gap-4">
          <div className="w-full">
            <p className="text-[#181818] text-sm pb-1">Banner Image</p>
            <img
              src={record?.thumbnail}
              alt=""
              className="rounded-lg w-full h-40"
            />
            {/* <img src="/images/reverse.png" alt="" className="absolute bottom-2 right-2 w-5 h-5" /> */}
          </div>
          <div className="relative w-full">
            <p className="text-[#181818] text-sm pb-1">Banner video</p>
            {/* <video autoPlay controls className="w-full h-36 rounded-lg object-fill">
                            <source src={record?.videoUrl} type="video/mp4" />
                        </video> */}
            {record?.videoUrl && (
              <iframe
                className="rounded-lg w-full h-40 object-fill"
                title="YouTube Video"
                src={`https://www.youtube.com/embed/${
                  record?.videoUrl?.split("/")?.pop()?.split("?")[0]
                }`}
                allowFullScreen
              ></iframe>
            )}
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
          {record?.images.map((img: any) => (
            <div className="relative w-full">
              <p className="text-[#181818] text-sm pb-1">Property Image</p>
              <img src={img} alt="" className="rounded-lg w-full h-24 border" />
              {/* <img src="/images/reverse.png" alt="" className="absolute bottom-2 right-2 w-5 h-5" /> */}
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-center gap-2 pt-4">
        <AppModal
          button={<button className="roundedBtn bg-bgred">Remove</button>}
          cancelButtonTitle="No, Don’t"
          primaryButtonTitle="Yes. Remove"
          primaryButtonAction={() => handleDelete(record?.id)}
        >
          <div className="max-w-80">
            <p className="text-center text-[#828282] pt-4 text-lg">
              Are you sure remove{" "}
              <span className="text-textDark font-medium">{record?.title}</span>{" "}
              from the user list?
            </p>
          </div>
        </AppModal>
        {type === "crowdFund" && (
          <Link to={`/edit-crowdfunding/${record?.id}`}>
            <button className="roundedBtn text-sm">Edit</button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default ViewCrowdfunding;
