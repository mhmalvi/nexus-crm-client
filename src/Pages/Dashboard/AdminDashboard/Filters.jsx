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
    <div className="h-full w-full rounded-xl overflow-hidden shadow-md">
      {layout !== "Payment" && (
        <div className="h-full p-3  backdrop-blur-2xl bg-[#ffffff11] min-h-[16vh]">
          <h1
            className={`text-xl text-${
              colorMode ? "slate-300" : "gray-800"
            } font-normal font-poppins  pt-1`}
          >
            <span className="text-base">Filter by</span> Status
          </h1>
          <div
            className={`grid grid-cols-${isBigScreen ? "7" : "6"} gap-2 w-full`}
          >
            {/* Status Filters */}
            {filterOptions.map((option) => (
              <div
                key={option.id}
                onClick={() => handleFilterLeadList(option.id)}
              >
                <h1
                  className={`w-full text-xs text-center font-normal font-poppins p-1 cursor-pointer ${
                    activeFilter === option.id
                      ? "text-slate-300 bg-[#7037ff] border-[0.5px] border-brand-color"
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
                  >
                    <h1
                      className={`text-xs text-center border-[1px] border-${
                        colorMode ? "slate-200" : "gray-800"
                      } font-normal font-poppins p-1 cursor-pointer ${
                        activeFilter === rate?.id
                          ? "text-slate-300 bg-[#7037ff] "
                          : colorMode
                          ? "text-slate-300 bg-transparent"
                          : "text-gray-800 bg-transparent"
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
