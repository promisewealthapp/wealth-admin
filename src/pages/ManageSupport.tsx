import { Skeleton } from "antd";
import CollapseDiv from "../components/ui/CollapseDiv";
import { useGetFaqsQuery } from "../redux/features/faq/faqApi";
import { Link } from "react-router-dom";

type TFaq = {
    id: string;
    question: string;
    ans: string;
}

const ManageSupport = () => {
    // const [search, setSearch] = useState("");
    // const debounceInput = useDebounce(search, 500);
    // const queryString = useMemo(() => {
    //     const info = {
    //         // role: "admin",
    //         limit: 10,
    //         searchTerm: debounceInput.length ? debounceInput : undefined,
    //     };
    //     const queryString = Object.keys(info).reduce((pre, key: string) => {
    //         const value = info[key as keyof typeof info];
    //         if (value) {
    //             return pre + `${Boolean(pre.length) ? "&" : ""}${key}=${value}`;
    //         }
    //         return pre;
    //     }, "");
    //     return queryString;
    // }, [debounceInput]);

    const { data, isFetching } = useGetFaqsQuery("");

    return (
        <div className="rounded-2xl border border-[#E6E6E7] overflow-x-auto ">
            {/* Table header here  */}
            <div className="bg-[#F8F8F8] flex justify-between p-3 rounded-t-2xl">
                <h1 className="lg:text-xl font-medium">FAQ List</h1>
                <Link to={'/add-faq'}>
                    <button className="roundedBtn">Add New FAQ</button>
                </Link>
            </div>

            {/* <div className="bg-[#F5EFEA] mt-4 ml-7 w-2/5 rounded-md p-2.5 flex items-center">
                <LuSearch className="text-textDark text-lg" />
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder='Search...'
                    className="w-full h-full bg-[#F5EFEA] outline-none border-none focus:border-none pl-2"
                />
            </div> */}
            {
                isFetching ? <Skeleton /> :

                    <div className='space-y-2 lg:space-y-3 px-4 lg:px-7 py-3 lg:py-5'>
                        {data?.data?.map((faq: TFaq) => (
                            <CollapseDiv key={faq?.question} data={faq} />
                        ))}
                    </div>
            }
        </div>
    );
};

export default ManageSupport;