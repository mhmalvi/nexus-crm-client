import { message, Popconfirm, Upload } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import companyIcon from "../../../assets/Images/company_icon.png";
import {
  handleFetchCompanyDetails,
  handleRefreshCompanyFBToken,
  handleUpdateCompany,
} from "../../../Components/services/company";
import {
  handleFetchFile,
  handleUploadFile,
} from "../../../Components/services/utils";
import Icons from "../../../Components/Shared/Icons";
import Loading from "../../../Components/Shared/Loader";
import { Storage } from "../../../Components/Shared/utils/store";
import { setLoader } from "../../../features/user/userSlice";
import SalesAdmins from "../CompanySettings/SalesAdmins";

const CompanyDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.user);
  const loadingDetails = useSelector((state) => state?.user)?.loading;

  const [companyDetails, setCompanyDetails] = useState(initialState);
  // const [syncDetails, setSyncDetails] = useState(false);
  const [toggleShowPassword, setToggleShowPassword] = useState(false);
  const [toggleEditDetails, setToggleEditDetails] = useState(false);
  const [toggleFacebookSecret, setToggleFacebookSecret] = useState(false);
  const [toggleFacebookAppId, setToggleFacebookAppId] = useState(false);
  const [fileList, setFileList] = useState();
  const [fileId, setFileId] = useState();
  const [avatarPreviewer, setAvatarPreviewer] = useState();

  useEffect(() => {
    // const someDate = new Date();
    // const result = new Date().setDate(someDate.getDate() + 50);
    // const finaldate = new Date(result);
    // const futureDate = finaldate.toString().slice(0, 15);

    dispatch(setLoader(true));

    (async () => {
      const companyDetailsResponse = await handleFetchCompanyDetails(id);
      if (companyDetailsResponse?.status) {
        setCompanyDetails(companyDetailsResponse?.data?.[0]);

        if (companyDetailsResponse?.data?.[0]?.logo_id) {
          const fetchFile = await handleFetchFile(
            parseInt(companyDetailsResponse?.data?.[0]?.logo_id)
          );

          const filePath = fetchFile?.data?.[0];
          setAvatarPreviewer(
            (
              process.env.REACT_APP_FILE_SERVER_URL +
              "/" +
              filePath?.document_name
            ).toString()
          );
        }

        dispatch(setLoader(false));
      }
    })();
  }, [dispatch, id]);

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

    // console.log(createCompany);

    if (createCompany?.key === "success") {
      setToggleEditDetails(false);
      message.success("Company Details updated Successfully");
    }
  };

  const showPassword = () => {
    var x = document.getElementById("fb_ac_credential");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
    setToggleShowPassword(!toggleShowPassword);
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

  const confirm = async () => {
    const refreshResponse = await handleRefreshCompanyFBToken(id);
    const someDate = new Date();
    const result = new Date().setDate(someDate.getDate() + 50);
    const finaldate = new Date(result);
    const futureDate = finaldate.toString().slice(0, 15);

    Storage.setItem("refresh_tok", futureDate);
    if (refreshResponse?.status === true) {
      setCompanyDetails(refreshResponse?.data);
      message.success("Facebook Token Updated Successfully");
    }
  };

  const cancel = (e) => {
    console.log(e);
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
    // console.log("uploadFile", uploadFile);
    // console.log(uploadFile?.message?.data[0]?.id);

    setFileId(uploadFile?.message?.data[0]?.id);
  };

  return (
    <div
      className="lg:w-[95%] xl:w-[80%] font-poppins border py-10 px-8 mx-auto my-20"
      style={{
        // width: "90%",
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
            className={`h-56 overflow-y-auto w-11/12 block text-justify font-normal leading-6 text-sm mt-4 ${
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
          <div className="h-98 ml-4">
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
              <div className="flex justify-between items-start">
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
                    <span>Contact :&nbsp;</span>
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
                    <span>Email :&nbsp;</span>
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
                    <span>Address :&nbsp;</span>

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
                    <span>ABN :&nbsp;</span>
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
                    <span>RTO Code :&nbsp;</span>
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
                    <span>Website :&nbsp;</span>

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
                    <span>Country :&nbsp;</span>

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

                    {!toggleShowPassword ? (
                      <Icons.Eye
                        onClick={showPassword}
                        className="w-4 h-4 ml-3 font-semibold text-brand-color cursor-pointer"
                      />
                    ) : (
                      <Icons.CloseEye
                        onClick={showPassword}
                        className="w-4 h-4 ml-3 font-semibold cursor-pointer"
                      />
                    )}

                    <div>
                      <Popconfirm
                        title="Are you sure?"
                        onConfirm={confirm}
                        onCancel={cancel}
                        okText="Yes"
                        cancelText="No"
                      >
                        <button
                          className="px-3 py-1 ml-4 text-xs rounded-md border border-brand-color text-brand-color hover:bg-brand-color hover:text-white hover:transition-colors hover:delay-150"
                          // onClick={handleUpdateFaceboookToken}
                        >
                          Refresh
                        </button>
                      </Popconfirm>
                    </div>
                  </div>

                  <div>
                    <span className="text-xs text-red-500 font-semibold italic mt-0.5 mb-2">
                      (Refresh facebook credential on{" "}
                      {Storage.getItem("refresh_tok")})
                    </span>
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
                <div>
                  <div
                    className={`w-32 mx-auto cursor-pointer flex flex-col border-4 border-[#966dff] shadow bg-[#f3efff] text-white p-6 rounded-xl text-center`}
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
                  className="px-4 py-1 rounded-md  bg-black text-white"
                  onClick={() => setToggleEditDetails(false)}
                >
                  Cancle
                </button>
                <button
                  className="px-4 py-1 ml-4 rounded-md bg-brand-color text-white"
                  onClick={handleUpdateCompanyDetailsReq}
                >
                  Save
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
      <SalesAdmins clientId={id} />
    </div>
  );
};

export default CompanyDetails;

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
  app_id: "",
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
