import { useSelector } from "react-redux";

const Filters = ({
  activeFilter,
  filterOptions,
  ratings,
  layout,
  handleFilterLeadList,
  handleStaredLeadsFilter,
}) => {
  const userDetails = useSelector((state) => state.user?.userInfo);

  return (
    <div>
      {layout !== "Payment" && (
        <div className="p-3 rounded-xl shadow-xl backdrop-blur-2xl bg-[#ffffff11] border-[0.5px] border-[#ffffff44]">
          <h1 className="text-2xl text-white font-normal font-poppins  pt-1">
            Filters
          </h1>
          <div className="grid grid-cols-7 gap-2 w-full">
            {/* Status Filters */}
            {filterOptions.map((option) => (
              <div
                key={option.id}
                onClick={() => handleFilterLeadList(option.id)}
              >
                <h1
                  className={`text-xs text-center font-normal border-[1px] border-white font-poppins p-2 cursor-pointer ${
                    activeFilter === option.id
                      ? "text-white bg-[#460a94] "
                      : "text-white bg-transparent"
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
                      className={`text-xs text-center border-[1px] border-white font-normal font-poppins p-2 cursor-pointer ${
                        activeFilter === rate?.id
                          ? "text-white bg-[#460a94]"
                          : "text-white bg-transparent"
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
