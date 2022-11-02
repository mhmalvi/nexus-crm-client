import { message } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import companyIcon from "../../../assets/Images/company_icon.png";
import {
  handleFetchCompanyDetails,
  handleUpdateCompany,
} from "../../../Components/services/company";
import Icons from "../../../Components/Shared/Icons";
import Loading from "../../../Components/Shared/Loader";
import { setLoader } from "../../../features/user/userSlice";
import SalesAdmins from "./SalesAdmins";

const CompanySettings = () => {
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.user);
  const loadingDetails = useSelector((state) => state?.user)?.loading;

  const [companyDetails, setCompanyDetails] = useState(initialState);
  const [toggleEditDetails, setToggleEditDetails] = useState(false);
  const [toggleFacebookCredential, setToggleFacebookCredential] =
    useState(false);
  const [toggleFacebookSecret, setToggleFacebookSecret] = useState(false);
  const [toggleFacebookAppId, setToggleFacebookAppId] = useState(false);

  useEffect(() => {
    dispatch(setLoader(true));

    console.log(userDetails?.userInfo?.client_id);

    (async () => {
      const companyDetailsResponse = await handleFetchCompanyDetails(
        userDetails?.userInfo?.client_id
      );

      if (companyDetailsResponse?.status) {
        setCompanyDetails(companyDetailsResponse?.data?.[0]);
        dispatch(setLoader(false));
      } else {
        setTimeout(() => {
          dispatch(setLoader(false));
        }, 3000);
      }
    })();
  }, [dispatch, userDetails?.userInfo?.client_id]);

  console.log(companyDetails);

  const handleLoadCompanyDetails = (e) => {
    const data = { ...companyDetails };
    data[e.target.id] = e.target.value;
    setCompanyDetails(data);
  };

  const handleUpdateCompanyDetailsReq = async () => {
    const createCompany = await handleUpdateCompany({
      id: companyDetails?.cid,
      name: companyDetails?.name,
      description: document.getElementById("description").innerText,
      logo_id: "",
      contact: companyDetails?.contact,
      business_email: companyDetails?.business_email,
      address: companyDetails?.address,
      abn: companyDetails?.abn,
      website: companyDetails?.website,
      trading_name: companyDetails?.trading_name,
      rto_code: companyDetails?.rto_code,
      country_name: companyDetails?.country_name,
      admin: companyDetails?.admin,
      fb_ac_credential: companyDetails?.fb_ac_credential,
      secret_key: "Not Added Yet",
      form: "Not Added Yet",
      subscription_id: companyDetails?.subscription_id,
      business_type: 1,
    });

    console.log(createCompany);

    if (createCompany?.key === "success") {
      setToggleEditDetails(false);
      message.success("Company Details updated Successfully");
    }
  };

  const showFacebookCredential = () => {
    var x = document.getElementById("fb_ac_credential");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
    setToggleFacebookCredential(!toggleFacebookCredential);
  };

  const showFacebookSecret = () => {
    var x = document.getElementById("secret_key");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
    setToggleFacebookSecret(!toggleFacebookSecret);
  };

  const showFacebookAppId = () => {
    var x = document.getElementById("app_id");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
    setToggleFacebookAppId(!toggleFacebookAppId);
  };

  return (
    <div className="mx-6 py-12">
      {/* <CompanyDetails companyDetails={companyDetails} />
      <SalesAdmins admin={true} /> */}

      <div
        className="lg:w-[100%] xl:w-[80%] font-poppins border py-10 px-8 mx-auto mb-28"
        style={{
          borderRadius: "20px",
        }}
      >
        <div className="flex justify-between items-stretch">
          {loadingDetails && (
            <div className="absolute left-0 z-50 w-screen h-full bg-white bg-opacity-70">
              <div className="lg:w-[62%] xl:w-[64%] 2xl:w-[69%] h-screen text-7xl flex justify-start items-center">
                <Loading />
              </div>
            </div>
          )}

          <div className="w-1/2 border-r mr-4">
            <div className="mb-8">
              <div className="relative w-24">
                <img className="w-20" src={companyIcon} alt="" />
                {toggleEditDetails ? (
                  <div className="w-8 h-8 absolute bottom-0 right-0 bg-brand-color cursor-pointer font-semibold flex justify-center items-center rounded-full shadow-sm">
                    <Icons.AddImage className="w-4 text-white" />
                  </div>
                ) : null}
              </div>
            </div>
            <input
              id="name"
              className={`text-xl font-semibold ${
                toggleEditDetails
                  ? "outline-none border bg-gray-100 px-2 rounded-lg"
                  : "bg-transparent"
              }`}
              type="text"
              disabled={!toggleEditDetails ? "disabled" : ""}
              onChange={handleLoadCompanyDetails}
              defaultValue={companyDetails?.name}
            />
            <p
              id="description"
              contentEditable={toggleEditDetails}
              className={`h-48 overflow-y-auto w-10/12 block text-justify font-normal leading-6 text-sm mt-4 ${
                toggleEditDetails &&
                "outline-none border bg-gray-100 p-2 rounded-lg"
              }`}
            >
              {companyDetails?.description
                ? companyDetails?.description
                : "No details added"}
            </p>
          </div>
          <div className="relative w-1/2 pb-8">
            <div className="h-98 ml-2">
              <div>
                <div className="flex mb-4">
                  <h1 className="text-lg font-semibold">Company Details</h1>
                  {!toggleEditDetails ? (
                    <Icons.Edit
                      className="mt-1 cursor-pointer ml-6"
                      onClick={() => setToggleEditDetails(true)}
                    />
                  ) : null}
                </div>

                <div className="flex justify-between">
                  <div>
                    <div className="font-normal text-sm 2xl:text-base leading-6 font-poppins mb-2">
                      <span>Trading Name :&nbsp;</span>
                      {toggleEditDetails ? (
                        <input
                          id="trading_name"
                          className={`w-auto outline-none border bg-gray-100 px-2 rounded-lg`}
                          type="text"
                          disabled={!toggleEditDetails ? "disabled" : ""}
                          onChange={handleLoadCompanyDetails}
                          defaultValue={companyDetails?.trading_name}
                        />
                      ) : (
                        <span>{companyDetails?.trading_name}</span>
                      )}
                    </div>

                    <div className="font-normal text-sm 2xl:text-base leading-6 font-poppins mb-2">
                      <span>Contact:&nbsp;</span>
                      {toggleEditDetails ? (
                        <input
                          id="contact"
                          className={`w-auto outline-none border bg-gray-100 px-2 rounded-lg`}
                          type="text"
                          disabled={!toggleEditDetails ? "disabled" : ""}
                          onChange={handleLoadCompanyDetails}
                          defaultValue={companyDetails?.contact}
                        />
                      ) : (
                        <span>{companyDetails?.contact}</span>
                      )}
                    </div>

                    <div className="font-normal text-sm 2xl:text-base leading-6 font-poppins flex items-center mt-2">
                      <span>Email:&nbsp;</span>
                      {toggleEditDetails ? (
                        <input
                          id="business_email"
                          className={`w-auto outline-none border bg-gray-100 px-2 rounded-lg`}
                          type="text"
                          disabled={!toggleEditDetails ? "disabled" : ""}
                          onChange={handleLoadCompanyDetails}
                          defaultValue={companyDetails?.business_email}
                        />
                      ) : (
                        <span>{companyDetails?.business_email}</span>
                      )}
                    </div>

                    <div className="font-normal text-sm 2xl:text-base leading-6 font-poppins flex items-center mt-2">
                      <span>Address:&nbsp;</span>

                      {toggleEditDetails ? (
                        <input
                          id="address"
                          className={`w-auto outline-none border bg-gray-100 px-2 rounded-lg`}
                          type="text"
                          disabled={!toggleEditDetails ? "disabled" : ""}
                          onChange={handleLoadCompanyDetails}
                          defaultValue={companyDetails?.address}
                        />
                      ) : (
                        <span>{companyDetails?.address}</span>
                      )}
                    </div>

                    <div className="font-normal text-sm 2xl:text-base leading-6 font-poppins flex items-center mt-2">
                      <span>ABN:&nbsp;</span>
                      {toggleEditDetails ? (
                        <input
                          id="abn"
                          className={`w-auto outline-none border bg-gray-100 px-2 rounded-lg`}
                          type="text"
                          disabled={!toggleEditDetails ? "disabled" : ""}
                          onChange={handleLoadCompanyDetails}
                          defaultValue={companyDetails?.abn}
                        />
                      ) : (
                        <span>{companyDetails?.abn}</span>
                      )}
                    </div>

                    <div className="font-normal text-sm 2xl:text-base leading-6 font-poppins flex items-center mt-2">
                      <span>RTO Code:&nbsp;</span>
                      {toggleEditDetails ? (
                        <input
                          id="rto_code"
                          className={`w-auto outline-none border bg-gray-100 px-2 rounded-lg`}
                          type="text"
                          disabled={!toggleEditDetails ? "disabled" : ""}
                          onChange={handleLoadCompanyDetails}
                          defaultValue={companyDetails?.rto_code}
                        />
                      ) : (
                        <span>{companyDetails?.rto_code}</span>
                      )}
                    </div>

                    <div className="font-normal text-sm 2xl:text-base leading-6 font-poppins flex items-center mt-2">
                      <span>Website:&nbsp;</span>

                      {toggleEditDetails ? (
                        <input
                          id="website"
                          className={`w-72 outline-none border bg-gray-100 px-2 rounded-lg`}
                          type="text"
                          disabled={!toggleEditDetails ? "disabled" : ""}
                          onChange={handleLoadCompanyDetails}
                          defaultValue={companyDetails?.website}
                        />
                      ) : (
                        <span>{companyDetails?.website}</span>
                      )}
                    </div>
                    <div className="font-normal text-sm 2xl:text-base leading-6 font-poppins flex items-center mt-2">
                      <span>Country:&nbsp;</span>

                      {toggleEditDetails ? (
                        <input
                          id="country_name"
                          className={`w-auto outline-none border bg-gray-100 px-2 rounded-lg`}
                          type="text"
                          disabled={!toggleEditDetails ? "disabled" : ""}
                          onChange={handleLoadCompanyDetails}
                          defaultValue={companyDetails?.country_name}
                        />
                      ) : (
                        <span>{companyDetails?.country_name}</span>
                      )}
                    </div>
                    <div className="font-normal text-sm 2xl:text-base leading-6 font-poppins flex items-center mt-2">
                      <span>Facebook Credential :&nbsp;</span>

                      <input
                        id="fb_ac_credential"
                        className={`w-36 ${
                          toggleEditDetails
                            ? "outline-none border bg-gray-100 px-2 rounded-lg"
                            : "bg-transparent"
                        }`}
                        type="password"
                        disabled={!toggleEditDetails ? "disabled" : ""}
                        onChange={handleLoadCompanyDetails}
                        defaultValue={companyDetails?.fb_ac_credential}
                      />

                      {!toggleFacebookCredential ? (
                        <Icons.Eye
                          onClick={showFacebookCredential}
                          className="w-4 h-4 ml-3 font-semibold text-brand-color cursor-pointer"
                        />
                      ) : (
                        <Icons.CloseEye
                          onClick={showFacebookCredential}
                          className="w-4 h-4 ml-3 font-semibold text-brand-color cursor-pointer"
                        />
                      )}
                    </div>
                    <div className="font-normal text-sm 2xl:text-base leading-6 font-poppins flex items-center mt-2">
                      <span>Facebook Secret :&nbsp;</span>

                      <input
                        id="secret_key"
                        className={`w-36 ${
                          toggleEditDetails
                            ? "outline-none border bg-gray-100 px-2 rounded-lg"
                            : "bg-transparent"
                        }`}
                        type="password"
                        disabled={!toggleEditDetails ? "disabled" : ""}
                        onChange={handleLoadCompanyDetails}
                        defaultValue={companyDetails?.secret_key}
                      />

                      {!toggleFacebookSecret ? (
                        <Icons.Eye
                          onClick={showFacebookSecret}
                          className="w-4 h-4 ml-3 font-semibold text-brand-color cursor-pointer"
                        />
                      ) : (
                        <Icons.CloseEye
                          onClick={showFacebookSecret}
                          className="w-4 h-4 ml-3 font-semibold text-brand-color cursor-pointer"
                        />
                      )}
                    </div>

                    <div className="font-normal text-sm 2xl:text-base leading-6 font-poppins flex items-center mt-2">
                      <span>Facebook AppID :&nbsp;</span>

                      <input
                        id="app_id"
                        className={`w-36 ${
                          toggleEditDetails
                            ? "outline-none border bg-gray-100 px-2 rounded-lg"
                            : "bg-transparent"
                        }`}
                        type="password"
                        disabled={!toggleEditDetails ? "disabled" : ""}
                        onChange={handleLoadCompanyDetails}
                        defaultValue={
                          companyDetails?.app_id
                            ? companyDetails?.app_id
                            : "Not Added Yet"
                        }
                      />

                      {!toggleFacebookAppId ? (
                        <Icons.Eye
                          onClick={showFacebookAppId}
                          className="w-4 h-4 ml-3 font-semibold text-brand-color cursor-pointer"
                        />
                      ) : (
                        <Icons.CloseEye
                          onClick={showFacebookAppId}
                          className="w-4 h-4 ml-3 font-semibold text-brand-color cursor-pointer"
                        />
                      )}
                    </div>
                  </div>
                  <div>
                    <div
                      className={`w-36 mx-auto cursor-pointer flex flex-col border-4 border-[#966dff] shadow bg-[#f3efff] text-white p-6 rounded-xl text-center`}
                    >
                      <h3 className="font-bold py-2 text-xs">
                        {companyDetails?.package_name}
                      </h3>
                      <h1 className="text-xs text-brand-color mb-0">
                        ${companyDetails?.price}
                        <br />
                      </h1>
                      <span className="text-brand-color text-xs">/Monthly</span>
                      <div className="flex-1 text-slate-500 text-xs py-2">
                        {companyDetails?.package_details}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute bottom-0 right-0">
              {toggleEditDetails ? (
                <div>
                  <button
                    className="px-4 py-1 rounded-md bg-black text-white"
                    onClick={() => setToggleEditDetails(false)}
                  >
                    Cancle
                  </button>
                  <button
                    className="px-4 py-1 ml-2 rounded-md bg-brand-color text-white"
                    onClick={handleUpdateCompanyDetailsReq}
                  >
                    Save
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      <SalesAdmins clientId={userDetails?.userInfo?.client_id} />
    </div>
  );
};

export default CompanySettings;

const initialState = {
  name: "",
  description: "",
  logo_id: "",
  contact: "",
  business_email: "",
  address: "",
  abn: "",
  website: "",
  trading_name: "",
  rto_code: "",
  country_name: "",
  admin: "",
  fb_ac_credential: "",
  secret_key: "",
  subscription_id: "",
  business_type: "",
};
