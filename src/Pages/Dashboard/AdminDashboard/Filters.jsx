import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";

const Filters = ({
  activeFilter,
  filterOptions,
  ratings,
  layout,
  handleFilterLeadList,
  handleStaredLeadsFilter,
}) => {
  const userDetails = useSelector((state) => state.user?.userInfo);

  const colorMode = useSelector((state) => state?.user)?.colorMode;
  const isBigScreen = useMediaQuery({ query: "(min-width: 1824px)" });
  return (
    <div className="h-full w-full rounded-md overflow-hidden shadow-md">
      {layout !== "Payment" && (
        <div className="h-full px-8 py-4 rounded-md backdrop-blur-2xl bg-[#ffffff11] min-h-[16vh]">
          <h1
            className={`text-lg text-${
              colorMode ? "slate-300" : "gray-800"
            } font-normal font-poppins`}
          >
            <span className="text-base">Filter by</span> Status
          </h1>
          <div
            className={`flex flex-wrap gap-2`}
          >
            {/* Status Filters */}
            {filterOptions.map((option) => (
              <div
                key={option.id}
                onClick={() => handleFilterLeadList(option.id)}
              >
                <h1
                  className={`ease-in duration-100 w-full text-xs text-center font-normal font-poppins 2xl:px-4 2xl:py-2 px-2 py-1 cursor-pointer ${
                    activeFilter === option.id
                      // ? "text-slate-300 bg-[#7037ff] border-[0.5px] border-brand-color" #100b1e,#0b0815,#000000
                      ? colorMode ? "text-white bg-[#ffffff7f] border-[0.5px] border-white" : "text-black bg-[#ffffff7f] border-[0.5px] border-black"
                      : colorMode
                      ? "text-slate-300 bg-transparent border-[0.05px] border-slate-300 "
                      : "text-gray-800 bg-transparent border-[0.05px] border-gray-800"
                  }  rounded-md`}
                >
                  {option.title}
                </h1>
              </div>
            ))}
            {userDetails?.role_id === 1 ||
            userDetails?.role_id === 3 ||
            userDetails?.role_id === 4 ? (
              <>
                {/* Star Filters */}
                {ratings.map((rate) => (
                  <div
                    key={rate?.id}
                    onClick={() => handleStaredLeadsFilter(rate?.id)}
                    className={`flex flex-wrap gap-4`}
                  >
                    <h1
                     className={`ease-in duration-100 w-full text-xs text-center font-normal font-poppins 2xl:px-4 2xl:py-2 px-2 py-1 cursor-pointer ${
                      activeFilter === rate?.id
                        // ? "text-slate-300 bg-[#7037ff] border-[0.5px] border-brand-color" #100b1e,#0b0815,#000000
                        ? colorMode ? "text-white bg-[#ffffff7f] border-[0.5px] border-white" : "text-black bg-[#ffffff7f] border-[0.5px] border-black"
                        : colorMode
                        ? "text-slate-300 bg-transparent border-[0.05px] border-slate-300 "
                        : "text-gray-800 bg-transparent border-[0.05px] border-gray-800"
                    }  rounded-md`}
                    >
                      {rate?.title}
                    </h1>
                  </div>
                ))}
              </>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
};

export default Filters;
