import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
// import companyIcon from "../../../assets/Images/company_icon.png";
import { handleFetchCompanies } from "../../../Components/services/company";
import Icons from "../../../Components/Shared/Icons";
import Loading from "../../../Components/Shared/Loader";
import { setLoader, setCompanyId } from "../../../features/user/userSlice";

const SuperAdminDashboard = () => {
  const dispatch = useDispatch();
  const loadingDetails = useSelector((state) => state?.user)?.loading;
  const colorMode = useSelector((state) => state?.user)?.colorMode;

  const [storecompanies, setStoreCompanies] = useState([]);
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    dispatch(setLoader(true));

    (async () => {
      const companiesResponse = await handleFetchCompanies();

      console.log("companiesResponse", companiesResponse);

      if (companiesResponse?.status === true) {
        if (companiesResponse) {
          if (companiesResponse?.data) {
            setCompanies(
              companiesResponse?.data?.filter(
                (company) => !company?.super_admin
              )
            );
            setStoreCompanies(
              companiesResponse?.data?.filter(
                (company) => !company?.super_admin
              )
            );
            dispatch(setLoader(false));
          }
        }
      }
    })();
  }, [dispatch]);

  const handleChange = (input) => {
    console.log(input);

    if (input?.length === 0) {
      setCompanies(storecompanies);
    } else {
      setCompanies(
        storecompanies?.filter((company) =>
          (company?.name).toLowerCase().includes(input.toLowerCase())
        )
      );
    }
  };

  return (
    <div>
      {/* <Companies /> */}
      <div className="flex flex-col gap-8 h-[90vh] w-[92vw] rounded-md shadow-md backdrop-blur-2xl bg-[#ffffff11] p-4">
        <div className="flex flex-wrap justify-between items-center">
          <h1
            className={`text-xl ${
              colorMode ? "text-slate-300" : "text-gray-800"
            } font-semibold font-poppins m-0 p-0`}
          >
            Companies Management
          </h1>
          <div className="flex items-center gap-4 p-0">
            <div
              className={`${colorMode ? "text-slate-300" : "text-gray-800"} `}
            >
              <Icons.Search />
            </div>
            <div>
              <input
                className="outline-none text-xs rounded-md font-medium font-poppins"
                type="text"
                name="search-code"
                id=""
                onChange={(e) => handleChange(e.target.value)}
                placeholder="Search Lead"
              />
            </div>
          </div>
        </div>

        {/* Loader */}
        <div>
          {loadingDetails && (
            <div className="w-screen h-screen text-7xl absolute z-50 flex justify-center items-center bg-white bg-opacity-70">
              <Loading />
            </div>
          )}
        </div>

        {companies.length !== 0 ? (
          <div className="flex flex-wrap gap-4 justify-center items-center">
            {companies?.map((company, i) => (
              <Link
                key={i}
                to={`company/${company?.id}`}
                className={`border w-98 h-48 ${
                  colorMode ? "border-slate-300" : "border-gray-800"
                } p-4 rounded-md cursor-pointer`}
                onClick={() => {
                  dispatch(setCompanyId(company?.id));
                }}
              >
                <div className="flex flex-col items-center justify-center h-full relative">
                  <div className={`${colorMode?"fill-slate-300":"fill-gray-800"} w-28`}>
                    <Icons.Buildings />
                  </div>
                  <div>
                    {company?.active === 1 ? (
                      <div
                        className={`absolute text-xs top-0 -right-1  cursor-pointer px-4 py-2 border font-semibold rounded-md ${
                          colorMode
                            ? "border-slate-300 text-slate-300"
                            : "border-gray-800 text-gray-800"
                        }`}
                      >
                        Active
                      </div>
                    ) : (
                      <div className="absolute text-xs top-0 -right-1 cursor-pointer px-4 py-2  border font-semibold border-red-500 rounded-md text-red-500">
                        Inactive
                      </div>
                    )}
                  </div>
                  <h1
                    className={`font-semibold text-base text-center m-0 p-0 ${
                      colorMode ? " text-slate-300" : " text-gray-800"
                    }`}
                  >
                    {company?.name}
                  </h1>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-lg font-semibold text-center py-16">
            No Companies Yet
          </div>
        )}
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
