import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import AppSelect from "../components/ui/AppSelect";
import { useEditCrowdFundMutation, useGetCrowdFundByIdQuery, useUploadImageMutation } from "../redux/features/crowdFund/crowdFundApi";
import Loading from "../components/ui/Loading";
import LocationAppSelect from "../components/manage-croudfunding/LocationAppSelect";
import { useEffect, useState } from "react";
import SmallLoading from "../components/ui/SmallLoading";
import { toast } from "react-toastify";
import { ResponseSuccessType } from "../types/common";

type TInputs = {
    title: string;
    targetFund: number;
    size: string;
    description: string;
    streetLocation: string;
    type: string;
    locationId: string;
    thumbnail: string;
    videoUrl: string;
    images: string[],
    fundRaised: number;
    rooms: number;
};

const EditCrowdfunding = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [type, setType] = useState('');
    const [uploadImage, { data: imageData, isError: imageError, isSuccess: imageSuccess, isLoading: imageLoading }] = useUploadImageMutation();
    const { data: crowdFundData, isLoading, isSuccess } = useGetCrowdFundByIdQuery(params?.id);
    const [editCrowdfund, { isLoading: crowdLoading }] = useEditCrowdFundMutation();

    const [thumbnail, setThumbnail] = useState("");
    const [image1, setImage1] = useState("");
    const [image2, setImage2] = useState("");
    const [image3, setImage3] = useState("");
    const [image4, setImage4] = useState("");

    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
        setValue
    } = useForm<TInputs>();

    const onSubmit: SubmitHandler<TInputs> = async (data) => {
        const submitData = {
            ...data, id: params?.id, thumbnail, images: [image1, image2, image3, image4]
        }
        await editCrowdfund(submitData).unwrap().then((res: { success: any; message: any; }) => {
            if (!res.success) {
                toast.error(res.message || "Something went wrong");
            }
            toast.success("Crowdfunding are updated successfully!", { toastId: 1 });
            navigate('/manage-crowdfunding');

        }).catch((res: { success: any; message: any; }) => {
            if (!res.success) {
                toast.error(res.message || "Something went wrong");
            }
        });
    };


    const propertyType = [
        { value: "land", label: "Land" },
        { value: "semiDetachedHouse", label: "Semi Detached House" },
        { value: "detachedHouse", label: "Detached House" },
        { value: "finished", label: "Finished" },
        { value: "unFinished", label: "Unfinished" },
    ];


    const handleFileUpload = async (value: any, type: string) => {
        const formData = new FormData();
        setType(type);

        const maxSizeInBytes = 4 * 1024 * 1024;

        if (value.size && value.size > maxSizeInBytes) {
            setLoading(false)
            return toast.error("Your file was more than 4 Megabyte!", { toastId: 1 });
        }

        if (type === "thumbnail" || type === "setImage1" || type === "setImage2" || type === "setImage3" || type === "setImage4") {
            setLoading(true);
            formData.append('image', value);
            await uploadImage(formData).unwrap().then((res: ResponseSuccessType) => {

                if (!res.success) {
                    toast.error(res.message || "Something went wrong");
                    setLoading(false)
                }
            }).catch((res: any) => {
                if (!res.success) {
                    toast.error(res.message || "Something went wrong");
                    setLoading(false)
                }
            })
        }

    }


    useEffect(() => {
        if (!imageLoading && !imageError && imageSuccess) {
            if (type === "thumbnail" && imageData?.data.url) {
                setThumbnail(imageData?.data.url);
                setLoading(false)
            } else if (type === "setImage1" && imageData?.data.url) {
                setImage1(imageData?.data.url);
                setLoading(false)
            } else if (type === "setImage2" && imageData?.data.url) {
                setImage2(imageData?.data.url);
                setLoading(false)
            } else if (type === "setImage3" && imageData?.data.url) {
                setImage3(imageData?.data.url);
                setLoading(false)
            } else if (type === "setImage4" && imageData?.data.url) {
                setImage4(imageData?.data.url);
                setLoading(false)
            }
        }
    }, [type, imageData?.data.url, imageError, imageLoading, imageSuccess])

    useEffect(() => {
        if (crowdFundData?.data && isSuccess) {
            setValue('title', crowdFundData?.data?.title);
            setValue('targetFund', crowdFundData?.data?.targetFund);
            setValue('size', crowdFundData?.data?.size);
            setValue('description', crowdFundData?.data?.description);
            setValue('streetLocation', crowdFundData?.data?.streetLocation);
            setValue('type', crowdFundData?.data?.type);
            setValue('locationId', crowdFundData?.data?.locationId);
            setValue('thumbnail', crowdFundData?.data?.thumbnail);
            setValue('videoUrl', crowdFundData?.data?.videoUrl);
            setValue('images', crowdFundData?.data?.images);
            setValue('fundRaised', crowdFundData?.data?.fundRaised);
            setValue('rooms', crowdFundData?.data?.rooms);

            setThumbnail(crowdFundData?.data?.thumbnail)
            setImage1(crowdFundData?.data?.images[0])
            setImage2(crowdFundData?.data?.images[1])
            setImage3(crowdFundData?.data?.images[2])
            setImage4(crowdFundData?.data?.images[3])
        }
    }, [crowdFundData, isLoading, isSuccess, setValue]);

    return (
        <>
            <Link to={'/manage-crowdfunding'} className='text-xl 2xl:text-2xl w-fit font-medium text-[#343A40] flex items-center gap-2'>
                <img src="/images/Back-without-border.png" alt="back" className="w-10 lg:w-12 2xl:w-14 h-10 lg:h-12 2xl:h-14" />
                <h2>Go Back</h2>
            </Link>

            {
                (crowdLoading && isLoading && !isSuccess) ? <Loading />
                    :
                    <div className="bg-[#F8F8F8] p-3 md:p-4 rounded-2xl mt-4">
                        <h1 className="md:text-xl font-medium">Edit Crowdfunding</h1>
                        <form className="space-y-2 md:space-y-4 pt-4 pb-2" onSubmit={handleSubmit(onSubmit)}>
                            <div className="grid md:grid-cols-5 gap-2 md:gap-4">
                                <div className="md:col-span-3 flex flex-col text-textDark">
                                    <label htmlFor="title">Property Name</label>
                                    <input
                                        id="title"
                                        className={`input ${errors.title && "border-2 border-bgred  "
                                            }`}
                                        placeholder="DFG-012-MODEL TOWN"
                                        {...register("title", { required: true })}
                                    />
                                    {errors.title && (
                                        <p className="text-bgred"> Property Name is required.</p>
                                    )}
                                </div>

                                <div className="flex flex-col text-textDark">
                                    <label htmlFor="type">Property Type</label>
                                    <AppSelect
                                        name="type"
                                        placeholder="Land"
                                        control={control}
                                        options={propertyType}
                                    />
                                    {errors.type && (
                                        <p className="text-bgred"> Property Type is required.</p>
                                    )}
                                </div>
                                <div className="flex flex-col text-textDark">
                                    <label htmlFor="locationId">Location</label>
                                    <LocationAppSelect control={control} />
                                    {errors.locationId && (
                                        <p className="text-bgred"> Location is required.</p>
                                    )}
                                </div>
                            </div>

                            <div className="flex flex-col text-textDark">
                                <label htmlFor="streetLocation">Street Address</label>
                                <input
                                    id="streetLocation"
                                    className={`input ${errors.streetLocation && "border-2 border-bgred"}`}
                                    placeholder="883 Hank Creek"
                                    {...register("streetLocation", { required: true })}
                                />
                                {errors.streetLocation && (
                                    <p className="text-bgred"> Street Address is required.</p>
                                )}
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
                                <div className="flex flex-col text-textDark">
                                    <label htmlFor="fundRaised">Fund Raised</label>
                                    <input
                                        id="fundRaised"
                                        type="number"
                                        className={`input ${errors.fundRaised && "border-2 border-bgred  "
                                            }`}
                                        placeholder="Fund Raised number"
                                        {...register("fundRaised", { required: true, valueAsNumber: true })}
                                    />
                                    {errors.fundRaised && (
                                        <p className="text-bgred"> Fund Raised is required.</p>
                                    )}
                                </div>

                                <div className="flex flex-col text-textDark">
                                    <label htmlFor="targetFund">Target Amount</label>
                                    <input
                                        id="targetFund"
                                        type="number"
                                        className={`input ${errors.targetFund && "border-2 border-bgred  "
                                            }`}
                                        placeholder="Target Amount number"
                                        {...register("targetFund", { required: true, valueAsNumber: true })}
                                    />
                                    {errors.targetFund && (
                                        <p className="text-bgred"> Target Amount is required.</p>
                                    )}
                                </div>

                                <div className="flex flex-col text-textDark">
                                    <label htmlFor="size">Size</label>
                                    <input
                                        id="size"
                                        type="number"
                                        className={`input ${errors.size && "border-2 border-bgred  "}`}
                                        placeholder="Size number"
                                        {...register("size", { required: true })}
                                    />
                                    {errors.size && <p className="text-bgred"> Size is required.</p>}
                                </div>

                                <div className="flex flex-col text-textDark">
                                    <label htmlFor="rooms">Room (Optional)</label>
                                    <input
                                        id="rooms"
                                        type="number"
                                        className={`input `}
                                        placeholder="Type room number"
                                        {...register("rooms", { valueAsNumber: true })}
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col text-textDark">
                                <label htmlFor="description">Property Details</label>
                                <textarea
                                    rows={5}
                                    id="description"
                                    className={`input ${errors.description && "border-2 border-bgred  "
                                        }`}
                                    placeholder="Type here"
                                    {...register("description", { required: true })}
                                />
                                {errors.description && (
                                    <p className="text-bgred"> Property Details is required.</p>
                                )}
                            </div>

                            <div className="grid md:grid-cols-2 gap-2 md:gap-4">
                                <div className="">
                                    <p className="text-[#181818] text-sm pb-1">Banner Image</p>
                                    <input onChange={(e) => handleFileUpload(e.target.files && e.target.files[0], "thumbnail")} type="file" name="" id="bannerImage" className="hidden" />
                                    <div className="relative rounded-lg w-full h-32 md:h-52 2xl:h-56  border border-[#E2E5ED] hover:border-mainColor bg-white">
                                        {
                                            loading ? <SmallLoading /> :
                                                <label htmlFor="bannerImage" className="rounded-lg cursor-pointer w-full h-full flex items-center justify-center ">
                                                    <img src={thumbnail ? thumbnail : crowdFundData?.data?.thumbnail} alt="" className="w-full h-full rounded-lg object-fill" />
                                                    <img src="/images/reverse.png" alt="" className="absolute bottom-2 right-2 w-5 h-5" />
                                                </label>
                                        }
                                    </div>
                                </div>

                                <div className="">
                                    <p className="text-[#181818] text-sm pb-1">Banner video</p>
                                    <input
                                        id="videoUrl"
                                        type="url"
                                        className={`input w-full ${errors.videoUrl && "border-2 border-bgred  "
                                            }`}
                                        placeholder="Youtube video url here"
                                        {...register("videoUrl", { required: true })}
                                    />
                                    {errors.videoUrl && (
                                        <p className="text-bgred"> Video url is required.</p>
                                    )}
                                    {/* <input onChange={(e) => handleFileUpload(e.target.files && e.target.files[0], "videoUrl")} type="file" name="" id="videoUrl" className="hidden" />
                                    <div className="flex items-center justify-center rounded-lg w-full cursor-pointer h-52 2xl:h-56  border border-[#E2E5ED] hover:border-mainColor bg-white">
                                        {
                                            videoLoading ? <SmallLoading /> :
                                                <label htmlFor="videoUrl" className="rounded-lg cursor-pointer w-full h-full flex items-center justify-center ">
                                                    <video autoPlay controls className="w-full h-full rounded-lg object-fill">
                                                        <source src={videoUrl ? videoUrl : crowdFund?.videoUrl} type="video/mp4" />
                                                    </video>
                                                </label>
                                        }
                                    </div> */}
                                </div>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
                                <div className="">
                                    <p className="text-[#181818] text-sm pb-1">Property Image</p>
                                    <input onChange={(e) => handleFileUpload(e.target.files && e.target.files[0], "setImage1")} type="file" name="" id="setImage1" className="hidden" />
                                    <div className="relative flex items-center justify-center rounded-lg w-full cursor-pointer h-28  border border-[#E2E5ED] hover:border-mainColor bg-white">
                                        {
                                            loading ? <SmallLoading /> :
                                                <label htmlFor="setImage1" className="rounded-lg cursor-pointer w-full h-full flex items-center justify-center ">
                                                    <img src={image1 ? image1 : crowdFundData?.data?.images[0]} alt="" className="w-full h-full rounded-lg object-fill" />
                                                    <img src="/images/reverse.png" alt="" className="absolute bottom-2 right-2 w-5 h-5" />
                                                </label>
                                        }
                                    </div>
                                </div>
                                <div className="">
                                    <p className="text-[#181818] text-sm pb-1">Property Image</p>
                                    <input onChange={(e) => handleFileUpload(e.target.files && e.target.files[0], "setImage2")} type="file" name="" id="setImage2" className="hidden" />
                                    <div className="relative flex items-center justify-center rounded-lg w-full cursor-pointer h-28  border border-[#E2E5ED] hover:border-mainColor bg-white">
                                        {
                                            loading ? <SmallLoading /> :
                                                <label htmlFor="setImage2" className="rounded-lg cursor-pointer w-full h-full flex items-center justify-center ">
                                                    <img src={image2 ? image2 : crowdFundData?.data?.images[1]} alt="" className="w-full h-full rounded-lg object-fill" />
                                                    <img src="/images/reverse.png" alt="" className="absolute bottom-2 right-2 w-5 h-5" />
                                                </label>
                                        }
                                    </div>
                                </div>
                                <div className="">
                                    <p className="text-[#181818] text-sm pb-1">Property Image</p>
                                    <input onChange={(e) => handleFileUpload(e.target.files && e.target.files[0], "setImage3")} type="file" name="" id="setImage3" className="hidden" />
                                    <div className="relative flex items-center justify-center rounded-lg w-full cursor-pointer h-28  border border-[#E2E5ED] hover:border-mainColor bg-white">
                                        {
                                            loading ? <SmallLoading /> :
                                                <label htmlFor="setImage3" className="rounded-lg cursor-pointer w-full h-full flex items-center justify-center ">
                                                    <img src={image3 ? image3 : crowdFundData?.data?.images[2]} alt="" className="w-full h-full rounded-lg object-fill" />
                                                    <img src="/images/reverse.png" alt="" className="absolute bottom-2 right-2 w-5 h-5" />
                                                </label>
                                        }
                                    </div>
                                </div>
                                <div className="">
                                    <p className="text-[#181818] text-sm pb-1">Property Image</p>
                                    <input onChange={(e) => handleFileUpload(e.target.files && e.target.files[0], "setImage4")} type="file" name="" id="setImage4" className="hidden" />
                                    <div className="relative flex items-center justify-center rounded-lg w-full cursor-pointer h-28  border border-[#E2E5ED] hover:border-mainColor bg-white">
                                        {
                                            loading ? <SmallLoading /> :
                                                <label htmlFor="setImage4" className="rounded-lg cursor-pointer w-full h-full flex items-center justify-center ">
                                                    <img src={image4 ? image4 : crowdFundData?.data?.images[3]} alt="" className="w-full h-full rounded-lg object-fill" />
                                                    <img src="/images/reverse.png" alt="" className="absolute bottom-2 right-2 w-5 h-5" />
                                                </label>
                                        }
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-center pt-4">
                                <input
                                    type="submit"
                                    className="roundedBtn cursor-pointer"
                                    value={"Add Properties"}
                                />
                            </div>
                        </form>
                    </div>
            }
        </>
    );
};

export default EditCrowdfunding;