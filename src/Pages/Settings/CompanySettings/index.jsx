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
import { Storage } from "../../../Components/Shared/utils/store";
import { setLoader, updateFbToken } from "../../../features/user/userSlice";
import SalesAdmins from "./SalesAdmins";

const CompanySettings = () => {
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.user);
  const colorMode = useSelector((state) => state?.user)?.colorMode;

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
    dispatch(setLoader(true));

    (async () => {
      const companyDetailsResponse = await handleFetchCompanyDetails(
        userDetails?.userInfo?.client_id
      );

      if (companyDetailsResponse?.status) {
        if (companyDetailsResponse?.data?.[0]?.logo_id) {
          const fetchFile = await handleFetchFile(
            companyDetailsResponse?.data?.[0].logo_id
          );

          if (fetchFile?.status === 200) {
            setAvatarPreviewer(
              (
                process.env.REACT_APP_FILE_SERVER_URL +
                "/" +
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
  }, [dispatch, userDetails?.userInfo?.client_id]);

  const handleLoadCompanyDetails = (e) => {
    const data = { ...companyDetails };
    data[e.target.id] = e.target.value;
    setCompanyDetails(data);
  };

  const handleUpdateCompanyDetailsReq = async () => {
    const updateCompany = await handleUpdateCompany({
      id: companyDetails?.cid,
      name: companyDetails?.name,
      description: document.getElementById("description").innerText,
      logo_id: fileId ? fileId : companyDetails?.logo_id,
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

    if (updateCompany?.key === "success") {
      setToggleEditDetails(false);
      dispatch(setLoader(true));
      const syncResponse = await handleSyncLeads(
        companyDetails?.cid,
        companyDetails?.fb_ac_credential
      );
      if (syncResponse?.status) {
        dispatch(setLoader(false));
        Storage.setItem("fac_t", companyDetails?.fb_ac_credential);
        dispatch(updateFbToken(companyDetails?.fb_ac_credential));
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

    const uploadFile = await handleUploadFile(fileFormData);
    setFileId(uploadFile?.data?.id);
  };

  return (
    <div className="h-[90vh] w-full mx-6 rounded-md p-5 shadow-md backdrop-blur-2xl bg-[#ffffff11] flex gap-4">
      <div className="w-2/3 flex flex-col justify-center items-center h-full gap-4 rounded-md p-5 shadow-md backdrop-blur-2xl bg-[#ffffff11] overflow-y-scroll">
        <div className="w-full flex justify-between items-center ">
          <div className="relative flex w-24">
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
                <div className="w-6 h-6 absolute bottom-1 -right-5 bg-brand-color cursor-pointer font-semibold flex justify-center items-center rounded-full shadow-sm">
                  <Icons.AddImage className="w-4 text-slate-300" />
                </div>
              </Upload>
            ) : null}
          </div>
          <div className="">
            <input
              id="name"
              className={`text-xl ${
                colorMode ? "text-slate-300" : "text-gray-800"
              } font-semibold rounded-md backdrop-blur-xl bg-[#ffffff11] ${
                toggleEditDetails
                  ? "outline-none bg-[#ffffff11] px-2"
                  : "bg-transparent "
              }`}
              type="text"
              disabled={!toggleEditDetails ? "disabled" : ""}
              onChange={handleLoadCompanyDetails}
              defaultValue={companyDetails?.name}
            />
            <p
              id="description"
              contentEditable={toggleEditDetails}
              className={`overflow-y-auto text-right ${
                colorMode ? "text-slate-300" : "text-gray-800"
              } justify-end pt-2 ${toggleEditDetails && "outline-none"}`}
            >
              {companyDetails?.description
                ? companyDetails?.description
                : "No details added"}
            </p>
          </div>
        </div>
        {/* Company Details */}
        <div className="w-full rounded-md">
          <div className="flex justify-between">
            <h1
              className={`text-lg font-semibold ${
                colorMode ? "text-slate-300" : "text-gray-800"
              }`}
            >
              Company Details
            </h1>
            {!toggleEditDetails ? (
              <button
                className="flex items-center justify-center gap-2 px-2 bg-slate-300 rounded-md"
                onClick={() => setToggleEditDetails(true)}
              >
                <span className="text-brand-color">Edit</span>
                <Icons.Edit className="cursor-pointer text-brand-color" />
              </button>
            ) : null}
          </div>
          <div className="flex flex-col justify-evenly">
            <div className="font-normal flex items-center border-b border-[#ffffff55] text-base text-slate-300 h-10">
              <span
                className={`w-48  ${
                  colorMode ? "text-slate-300" : "text-gray-800"
                }`}
              >
                Trading Name :&nbsp;
              </span>
              {toggleEditDetails ? (
                <input
                  id="trading_name"
                  className={`w-full outline-none border-0  ${
                    colorMode
                      ? "text-slate-300 bg-[#ffffff11]"
                      : "text-gray-800 bg-[#33333322]"
                  } py-0`}
                  type="text"
                  disabled={!toggleEditDetails ? "disabled" : ""}
                  onChange={handleLoadCompanyDetails}
                  defaultValue={companyDetails?.trading_name}
                />
              ) : (
                <span
                  className={`w-full px-3 ${
                    colorMode ? "text-slate-300" : "text-gray-800"
                  }`}
                >
                  {companyDetails?.trading_name}
                </span>
              )}
            </div>
            <div className="font-normal flex items-center border-b border-[#ffffff55] text-base text-slate-300  h-10">
              <span
                className={`w-48 ${
                  colorMode ? "text-slate-300" : "text-gray-800"
                }`}
              >
                Contact:&nbsp;
              </span>
              {toggleEditDetails ? (
                <input
                  id="contact"
                  className={`w-full outline-none border-0 ${
                    colorMode
                      ? "text-slate-300 bg-[#ffffff11]"
                      : "text-gray-800 bg-[#33333322]"
                  } py-0`}
                  type="text"
                  disabled={!toggleEditDetails ? "disabled" : ""}
                  onChange={handleLoadCompanyDetails}
                  defaultValue={companyDetails?.contact}
                />
              ) : (
                <span
                  className={`${
                    colorMode ? "text-slate-300" : "text-gray-800"
                  } w-full px-3`}
                >
                  {companyDetails?.contact}
                </span>
              )}
            </div>
            <div className="font-normal flex items-center border-b border-[#ffffff55] text-base text-slate-300  h-10">
              <span
                className={`w-48 ${
                  colorMode ? "text-slate-300" : "text-gray-800"
                }`}
              >
                Email:&nbsp;
              </span>
              {toggleEditDetails ? (
                <input
                  id="business_email"
                  className={`w-full outline-none border-0 ${
                    colorMode
                      ? "text-slate-300 bg-[#ffffff11]"
                      : "text-gray-800 bg-[#33333322]"
                  } py-0`}
                  type="text"
                  disabled={!toggleEditDetails ? "disabled" : ""}
                  onChange={handleLoadCompanyDetails}
                  defaultValue={companyDetails?.business_email}
                />
              ) : (
                <span
                  className={`${
                    colorMode ? "text-slate-300" : "text-gray-800"
                  } w-full px-3`}
                >
                  {companyDetails?.business_email}
                </span>
              )}
            </div>
            <div className="font-normal flex items-center border-b border-[#ffffff55] text-base text-slate-300  h-10">
              <span
                className={`w-48 ${
                  colorMode ? "text-slate-300" : "text-gray-800"
                }`}
              >
                Address:&nbsp;
              </span>

              {toggleEditDetails ? (
                <input
                  id="address"
                  className={`w-full outline-none border-0 ${
                    colorMode
                      ? "text-slate-300 bg-[#ffffff11]"
                      : "text-gray-800 bg-[#33333322]"
                  } py-0`}
                  type="text"
                  disabled={!toggleEditDetails ? "disabled" : ""}
                  onChange={handleLoadCompanyDetails}
                  defaultValue={companyDetails?.address}
                />
              ) : (
                <span
                  className={`${
                    colorMode ? "text-slate-300" : "text-gray-800"
                  } w-full px-3`}
                >
                  {companyDetails?.address}
                </span>
              )}
            </div>
            <div className="font-normal flex items-center border-b border-[#ffffff55] text-base text-slate-300  h-10">
              <span
                className={`w-48 ${
                  colorMode ? "text-slate-300" : "text-gray-800"
                }`}
              >
                ABN:&nbsp;
              </span>
              {toggleEditDetails ? (
                <input
                  id="abn"
                  className={`w-full outline-none border-0 ${
                    colorMode
                      ? "text-slate-300 bg-[#ffffff11]"
                      : "text-gray-800 bg-[#33333322]"
                  } py-0`}
                  type="text"
                  disabled={!toggleEditDetails ? "disabled" : ""}
                  onChange={handleLoadCompanyDetails}
                  defaultValue={companyDetails?.abn}
                />
              ) : (
                <span
                  className={`${
                    colorMode ? "text-slate-300" : "text-gray-800"
                  } w-full px-3`}
                >
                  {companyDetails?.abn}
                </span>
              )}
            </div>
            <div className="font-normal flex items-center border-b border-[#ffffff55] text-base text-slate-300  h-10">
              <span
                className={`w-48 ${
                  colorMode ? "text-slate-300" : "text-gray-800"
                }`}
              >
                RTO Code:&nbsp;
              </span>
              {toggleEditDetails ? (
                <input
                  id="rto_code"
                  className={`w-full outline-none border-0 ${
                    colorMode
                      ? "text-slate-300 bg-[#ffffff11]"
                      : "text-gray-800 bg-[#33333322]"
                  } py-0`}
                  type="text"
                  disabled={!toggleEditDetails ? "disabled" : ""}
                  onChange={handleLoadCompanyDetails}
                  defaultValue={companyDetails?.rto_code}
                />
              ) : (
                <span
                  className={`${
                    colorMode ? "text-slate-300" : "text-gray-800"
                  } w-full px-3`}
                >
                  {companyDetails?.rto_code}
                </span>
              )}
            </div>
            <div className="font-normal flex items-center border-b border-[#ffffff55] text-base text-slate-300  h-10">
              <span
                className={`w-48 ${
                  colorMode ? "text-slate-300" : "text-gray-800"
                }`}
              >
                Website:&nbsp;
              </span>

              {toggleEditDetails ? (
                <input
                  id="website"
                  className={`w-full outline-none border-0 ${
                    colorMode
                      ? "text-slate-300 bg-[#ffffff11]"
                      : "text-gray-800 bg-[#33333322]"
                  } py-0`}
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
                  className="w-full px-3"
                >
                  {companyDetails?.website}
                </a>
              )}
            </div>
            <div className="font-normal flex items-center border-b border-[#ffffff55] text-base text-slate-300  h-10">
              <span
                className={`w-48 ${
                  colorMode ? "text-slate-300" : "text-gray-800"
                }`}
              >
                Country:&nbsp;
              </span>

              {toggleEditDetails ? (
                <input
                  id="country_name"
                  className={`w-full outline-none border-0 ${
                    colorMode ? "text-slate-300" : "text-gray-800"
                  } ${colorMode ? " bg-[#ffffff11]" : "bg-[#33333322]"} py-0`}
                  type="text"
                  disabled={!toggleEditDetails ? "disabled" : ""}
                  onChange={handleLoadCompanyDetails}
                  defaultValue={companyDetails?.country_name}
                />
              ) : (
                <span
                  className={`${
                    colorMode ? "text-slate-300" : "text-gray-800"
                  } w-full px-3`}
                >
                  {companyDetails?.country_name}
                </span>
              )}
            </div>
            <div className="font-normal flex items-center border-b border-[#ffffff55] text-base text-slate-300  h-10">
              <span
                className={`w-48 ${
                  colorMode ? "text-slate-300" : "text-gray-800"
                }`}
              >
                FB Credential :&nbsp;
              </span>

              <input
                id="fb_ac_credential"
                className={`w-full  ${
                  colorMode ? "text-slate-300" : "text-gray-800"
                } ${
                  toggleEditDetails
                    ? `outline-none border-0 ${
                        colorMode ? "bg-[#ffffff11]" : "bg-[#33333322]"
                      } py-0`
                    : "bg-transparent border-transparent"
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
            <div className="font-normal flex items-center border-b border-[#ffffff55] text-base text-slate-300  h-10">
              <span
                className={`w-48 ${
                  colorMode ? "text-slate-300" : "text-gray-800"
                }`}
              >
                FB Secret :&nbsp;
              </span>
              <input
                id="secret_key"
                className={`w-full  ${
                  colorMode ? "text-slate-300" : "text-gray-800"
                } ${
                  toggleEditDetails
                    ? `outline-none border-0  ${
                        colorMode ? "bg-[#ffffff11]" : "bg-[#33333322]"
                      } py-0`
                    : "bg-transparent border-transparent"
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
            <div className="font-normal flex items-center border-b border-[#ffffff55] text-base text-slate-300  h-10 w-full">
              <span
                className={`w-48 ${
                  colorMode ? "text-slate-300" : "text-gray-800"
                }`}
              >
                FB AppID :&nbsp;
              </span>

              <input
                id="app_id"
                className={`w-full  ${
                  colorMode ? "text-slate-300" : "text-gray-800"
                } ${
                  toggleEditDetails
                    ? `outline-none border-0 ${
                        colorMode ? "bg-[#ffffff11]" : "bg-[#33333322]"
                      } py-0`
                    : "bg-transparent border-transparent"
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
            <div className="font-normal flex items-center border-b border-[#ffffff55] text-base text-slate-300  h-10 w-full">
              <span
                className={`w-48 ${
                  colorMode ? "text-slate-300" : "text-gray-800"
                }`}
              >
                Active Package:&nbsp;
              </span>
              {companyDetails?.pid ? (
                <div
                  className={`w-full cursor-pointer flex items-center justify-center border-2 border-[#966dff] shadow text-slate-300 p-2 rounded-md text-center`}
                >
                  <h3
                    className={`m-0 pr-2 font-bold text-xs ${
                      colorMode ? "text-slate-300" : "text-gray-800"
                    }`}
                  >
                    {companyDetails?.package_name}
                  </h3>
                  <h1 className="text-xs text-brand-color m-0 p-0 ">
                    ${companyDetails?.price}
                    <br />
                  </h1>
                  <span className="text-brand-color text-xs">/Monthly</span>
                  <div
                    className={`flex-1 ${
                      colorMode ? "text-slate-300" : "text-gray-800"
                    } text-xs`}
                  >
                    {companyDetails?.package_details}
                  </div>
                  <div
                    className={`flex-1 ${
                      colorMode ? "text-slate-300" : "text-gray-800"
                    } text-xs  font-semibold italic`}
                  >
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
                <h1
                  className={`pl-1 w-full  ${
                    colorMode ? "text-slate-300" : "text-gray-800"
                  }`}
                >
                  No Package Yet
                </h1>
              )}
            </div>
          </div>
          {toggleEditDetails ? (
            <div className="flex items-center justify-end w-full mt-4">
              <button
                className="px-4 py-1 rounded-md bg-black text-slate-300"
                onClick={() => setToggleEditDetails(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-1 ml-2 rounded-md bg-brand-color text-slate-300"
                onClick={handleUpdateCompanyDetailsReq}
              >
                Save
              </button>
            </div>
          ) : null}
        </div>
      </div>
      <div className="w-full">
        <SalesAdmins
          clientId={userDetails?.userInfo?.client_id}
          syncEmployees={syncEmployees}
          setSyncEmployees={setSyncEmployees}
        />
      </div>
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
