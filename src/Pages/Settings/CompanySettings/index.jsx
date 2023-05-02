import { message, Upload } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import companyIcon from "../../../assets/Images/company_icon.png";
import {
  handleFetchCompanyDetails,
  handleUpdateCompany,
} from "../../../Components/services/company";
import { handleSyncLeads } from "../../../Components/services/leads";
import {
  handleFetchFile,
  handleUploadFile,
} from "../../../Components/services/utils";
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
  const [fileList, setFileList] = useState([]);
  const [fileId, setFileId] = useState();
  const [avatarPreviewer, setAvatarPreviewer] = useState();
  const [toggleFacebookSecret, setToggleFacebookSecret] = useState(false);
  const [toggleFacebookAppId, setToggleFacebookAppId] = useState(false);
  const [syncEmployees, setSyncEmployees] = useState(false);
  const [packageEndTime, setpackageEndTime] = useState("");

  useEffect(() => {
    // const packageEnd = new Date(companyDetails?.package_date);
    // packageEnd.setDate(packageEnd.getDate() + 10);
    // setpackageEndTime(packageEnd.toString()?.slice(4, 15));

    dispatch(setLoader(true));

    (async () => {
      const companyDetailsResponse = await handleFetchCompanyDetails(
        userDetails?.userInfo?.client_id
      );

      console.log("Cooool", companyDetailsResponse?.data?.[0].logo_id);
      if (companyDetailsResponse?.status) {
        if (companyDetailsResponse?.data?.[0]?.logo_id) {
          const fetchFile = await handleFetchFile(
            companyDetailsResponse?.data?.[0].logo_id
          );

          console.log("fetchFile", fetchFile);
          if (fetchFile?.status === 200) {
            setAvatarPreviewer(
              (
                process.env.REACT_APP_FILE_SERVER_URL +
                "/public/" +
                fetchFile?.data?.document_name
              ).toString()
            );
          }
        }
      }

      if (companyDetailsResponse?.status) {
        setCompanyDetails(companyDetailsResponse?.data?.[0]);

        const packageEnd = new Date(
          companyDetailsResponse?.data?.[0]?.package_date
        );
        packageEnd.setDate(packageEnd.getDate() + 10);
        setpackageEndTime(packageEnd.toString()?.slice(4, 15));

        dispatch(setLoader(false));
      } else {
        setTimeout(() => {
          dispatch(setLoader(false));
        }, 3000);
      }
    })();
  }, [
    // companyDetails?.package_date,
    dispatch,
    userDetails?.userInfo?.client_id,
  ]);

  // console.log(companyDetails);

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
      logo_id: fileId,
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
      app_id: companyDetails?.app_id,
      secret_key: companyDetails?.secret_key,
      form: "Not Added Yet",
      subscription_id: companyDetails?.subscription_id,
      business_type: 1,
    });

    if (createCompany?.key === "success") {
      setToggleEditDetails(false);

      dispatch(setLoader(true));
      const syncResponse = await handleSyncLeads(
        companyDetails?.cid,
        companyDetails?.fb_ac_credential
      );
      if (syncResponse?.status) {
        dispatch(setLoader(false));
      }

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

  const handleChangeAvatar = async (e) => {
    const file = await getBase64(e.file.originFileObj);
    setAvatarPreviewer(file);

    const fileFormData = new FormData();
    fileFormData.append("user_id", userDetails?.userInfo?.user_id);
    fileFormData.append("client_id", userDetails?.userInfo?.client_id);
    fileFormData.append("document_name", e?.file?.originFileObj);
    fileFormData.append("document_details", e?.file?.originFileObj?.name);

    // for (const value of fileFormData.values()) {
    //   console.log(value);
    // }
    const uploadFile = await handleUploadFile(fileFormData);
    // setFileId(uploadFile?.message?.data[0]?.id);
    setFileId(uploadFile?.data?.id);
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
                <img
                  className="w-full rounded-md shadow-sm"
                  src={avatarPreviewer?.length ? avatarPreviewer : companyIcon}
                  alt=""
                />

                {toggleEditDetails ? (
                  <Upload
                    className="company_avatar"
                    onChange={(e) => handleChangeAvatar(e)}
                    id="avatar"
                    accept="image/png, image/jpeg, image/jpg"
                    fileList={fileList}
                  >
                    {/* <label htmlFor="avatar"> */}
                    <div className="w-6 h-6 absolute bottom-1 -right-5 bg-brand-color cursor-pointer font-semibold flex justify-center items-center rounded-full shadow-sm">
                      <Icons.AddImage className="w-4 text-white" />
                    </div>
                    {/* </label> */}
                  </Upload>
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
              className={`max-h-100 px-4 overflow-y-auto w-11/12 block text-justify font-normal leading-6 text-sm mt-4 ${
                toggleEditDetails &&
                "outline-none border bg-gray-100 p-2 rounded-lg"
              }`}
            >
              {companyDetails?.description
                ? companyDetails?.description
                : "No details added"}
            </p>
          </div>

          {/* Company Details */}
          <div className="relative w-1/2 pb-8">
            <div className=" ml-2">
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

                <div className="mb-4">
                  <div className="mb-8">
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
                        <a
                          href={companyDetails?.website}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {companyDetails?.website}
                        </a>

                        // <span>{companyDetails?.website}</span>
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
                      <span className="whitespace-nowrap">
                        FB Credential :&nbsp;
                      </span>

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
                      <span>FB Secret :&nbsp;</span>

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
                      <span>FB AppID :&nbsp;</span>

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
                        defaultValue={companyDetails?.app_id}
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

                  <div className="flex">
                    <h1 className="font-normal text-sm 2xl:text-base leading-6 font-poppins mr-6">
                      Active Package:
                    </h1>
                    {companyDetails?.pid ? (
                      <div
                        className={`w-48 cursor-pointer flex flex-col border-4 border-[#966dff] shadow bg-[#f3efff] text-white p-6 rounded-xl text-center`}
                      >
                        <h3 className="font-bold py-2 text-xs">
                          {companyDetails?.package_name}
                        </h3>
                        <h1 className="text-xs text-brand-color mb-0">
                          ${companyDetails?.price}
                          <br />
                        </h1>
                        <span className="text-brand-color text-xs">
                          /Monthly
                        </span>
                        <div className="flex-1 text-slate-500 text-xs py-2">
                          {companyDetails?.package_details}
                        </div>
                        <div className="flex-1 text-black text-xs py-1 font-semibold italic">
                          <span>
                            {new Date(companyDetails?.package_date)
                              .toString()
                              .slice(4, 15)}
                          </span>
                          <span> - </span>
                          <span>{packageEndTime}</span>
                        </div>
                      </div>
                    ) : (
                      <div className="flex">
                        <h1>No Package Yet</h1>
                      </div>
                    )}
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
                    Cancel
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

      <SalesAdmins
        clientId={userDetails?.userInfo?.client_id}
        syncEmployees={syncEmployees}
        setSyncEmployees={setSyncEmployees}
      />
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

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
