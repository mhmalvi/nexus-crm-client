import React, { useState } from "react";
import companyIcon from "../../../assets/Images/company_icon.png";
import { Link } from "react-router-dom";
import { Button, Modal } from "antd";
import { useEffect } from "react";
import { handleFetchCompanies } from "../../../Components/services/company";
import { useDispatch, useSelector } from "react-redux";
import { setLoader } from "../../../features/user/userSlice";
import Loading from "../../../Components/Shared/Loader";

const Companies = () => {
  const dispatch = useDispatch();
  const loadingDetails = useSelector((state) => state?.user)?.loading;

  const [companies, setCompanies] = useState([]);
  const [toggleAddCompany, setToggleAddCompany] = useState(false);

  useEffect(() => {
    dispatch(setLoader(true));
    (async () => {
      const companiesResponse = await handleFetchCompanies();

      if (companiesResponse?.data?.length) {
        setCompanies(companiesResponse?.data);
        dispatch(setLoader(false));
      }
    })();
  }, [dispatch]);

  const handleCancel = () => {
    setToggleAddCompany(false);
  };

  const handleSubmit = () => {
    setToggleAddCompany(false);
  };

  return (
    <div className="font-poppins">
      <div className="flex items-center mb-5">
        <h1 className="text-xl leading-8 font-semibold font-poppins text-black text-opacity-50 mb-0">
          Companies
        </h1>
        <button
          className="ml-28 py-1 text-base leading-6 font-medium bg-blue-500 rounded-md text-white"
          style={{
            width: "75px",
          }}
          onClick={() => setToggleAddCompany(true)}
        >
          Add
        </button>
      </div>

      {/* Loader */}
      <div>
        {loadingDetails && (
          <div className="w-screen h-screen text-7xl absolute z-50 flex justify-center items-center bg-white bg-opacity-70">
            <Loading />
          </div>
        )}
      </div>
      {companies.length ? (
        <div className="grid grid-cols-4 2xl:grid-cols-5 gap-8">
          {companies?.map((company, i) => (
            <Link
              key={i}
              to={`company/${company?.id}`}
              className="border border-gray-600 border-opacity-70 px-4 py-3 rounded-2xl cursor-pointer"
            >
              <div className="my-4">
                <img className="mx-auto w-10" src={companyIcon} alt="" />
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

      <div>
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
      </div>
    </div>
  );
};

export default Companies;
