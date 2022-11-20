import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import companyIcon from "../../../assets/Images/company_icon.png";
import { handleFetchCompanies } from "../../../Components/services/company";
import Icons from "../../../Components/Shared/Icons";
import Loading from "../../../Components/Shared/Loader";
import { setLoader } from "../../../features/user/userSlice";

const SuperAdminDashboard = () => {
  const dispatch = useDispatch();
  const loadingDetails = useSelector((state) => state?.user)?.loading;

  const [storecompanies, setStoreCompanies] = useState([]);
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    dispatch(setLoader(true));

    (async () => {
      const companiesResponse = await handleFetchCompanies();

      console.log("companiesResponse", companiesResponse);

      if (companiesResponse?.status === true) {
        setCompanies(
          companiesResponse?.data?.filter((company) => !company?.super_admin)
        );
        setStoreCompanies(
          companiesResponse?.data?.filter((company) => !company?.super_admin)
        );
        dispatch(setLoader(false));
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
      <div className="font-poppins">
        <div className="flex justify-between items-end mb-10">
          <h1 className="text-xl leading-8 font-semibold font-poppins text-black text-opacity-50 mb-0">
            Companies Management
          </h1>
          <div>
            <h1 className="text-lg leading-7 font-normal font-poppins text-opacity-50">
              Search Lead
            </h1>
            <div
              className="w-58 px-4 py-2.5 mx-0.5 flex items-center bg-gray-100"
              style={{
                borderRadius: "10px",
              }}
            >
              <div>
                <Icons.Search />
              </div>
              <div>
                <input
                  className="outline-none text-xs bg-gray-100 leading-5 font-medium font-poppins ml-4"
                  type="text"
                  name="search-code"
                  id=""
                  onChange={(e) => handleChange(e.target.value)}
                  placeholder="Search Code"
                />
              </div>
              <div>
                <Icons.Send />
              </div>
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
          <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8">
            {companies?.map((company, i) => (
              <Link
                key={i}
                to={`company/${company?.id}`}
                className="border h-48 border-gray-600 border-opacity-70 px-4 py-3 rounded-2xl cursor-pointer"
              >
                <div className="my-4 relative">
                  <img className="mx-auto w-16" src={companyIcon} alt="" />
                  <div>
                    {company?.active === 1 ? (
                      <div
                        className="absolute -top-3.5 -right-1 cursor-pointer px-1.5 py-0.5 border font-semibold border-black rounded-xl text-black"
                        style={{
                          fontSize: "10px",
                        }}
                      >
                        Active
                      </div>
                    ) : (
                      <div
                        className="absolute -top-3.5 -right-1 cursor-pointer px-1.5 py-0.5 border font-semibold border-red-500 rounded-xl text-red-500"
                        style={{
                          fontSize: "10px",
                        }}
                      >
                        Inactive
                      </div>
                    )}
                  </div>
                </div>
                <div className="ml-4">
                  <h1 className="font-semibold text-xl text-center">
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

        {/* Add company modal */}

        {/* <div>
        <Modal
          title="Create Company Profile"
          centered
          visible={toggleAddCompany}
          onSubmit={() => setToggleAddCompany(false)}
          onCancel={() => setToggleAddCompany(false)}
          footer={[
            <Button key="back" onClick={handleCancel}>
              Cancle
            </Button>,
            <Button key="submit" type="primary" onClick={handleSubmit}>
              Submit
            </Button>,
          ]}
        >
          <p>Company informations</p>
        </Modal>
      </div> */}
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
