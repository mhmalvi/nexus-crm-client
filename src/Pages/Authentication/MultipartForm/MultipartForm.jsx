import React, { useState, useEffect } from "react";
import Icons from "../../../Components/Shared/Icons";
import "./multipart.css";
import { Modal, Select } from "antd";
import { useNavigate } from "react-router-dom";
import {
  handleLogout,
  handleMultipartRegistration,
} from "./../../../Components/services/auth";
import { Storage } from "../../../Components/Shared/utils/store";
import { useSelector, useDispatch } from "react-redux";
import Loading from "../../../Components/Shared/Loader";
import { addUserDetails } from "../../../features/user/userSlice";
import { Elements } from "@stripe/react-stripe-js";
import {
  getAllProducts,
  getProductPrice,
} from "../../../Components/services/billing";
import {
  errorNotification,
  successNotification,
  warningNotification,
} from "../../../Components/Shared/Toast";
import InstantPayment from "./InstantPayment";

const MultipartForm = ({ stripePromise }) => {
  const authToken = JSON.parse(window.localStorage.getItem("auth_tok"));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [screen, setScreen] = useState(0);
  const userDetails = useSelector((state) => state?.user);
  const [industriesList, setIndustriesList] = useState(["RTO"]);
  const [productData, setProductData] = useState([]);
  const [paymentModal, setPaymentModal] = useState();
  const [paymentDone, setPaymentDone] = useState(0);
  const [data, setData] = useState({
    username: "",
    contact: "",
    company_name: "",
    company_address: "",
    industry: "RTO",
    email: userDetails?.userInfo?.email,
    website: "",
    abn: "",
    company_code: "",
    package: "Trial",
    priceId: "",
    interval: "",
  });

  const [submitClicked, setSubmitClicked] = useState(false);
  const handleChange = (value) => {
    setIndustriesList(value);
  };
  const handlePackageChange = (value, data) => {
    setData((prevData) => ({
      ...prevData,
      package: value,
      priceId: data?.data?.price.data[0].id,
      interval: data?.data?.price.data[0].recurring.interval,
    }));

    if (value !== "Trial") {
      setPaymentDone(1);
    }
  };
  const logoutHandler = () => {
    handleLogout({
      user_id: userDetails.userInfo.user_id,
      email: userDetails.userInfo.email,
      token: authToken,
    });
    Storage.removeItem("auth_tok");
    Storage.removeItem("user_info");
    Storage.removeItem("fac_t");
    warningNotification("Logout Successful.");
    navigate("/login");
    // window.location.reload();
  };
  const { Option } = Select;
  const [hoverLogout, setHoverLogout] = useState(false);

  const setupProfile = async () => {
    setSubmitClicked(true);
    try {
      const res = await handleMultipartRegistration(data);
      if (res.status === 201) {
        const userData = {
          ...res.data,
          ...res.company,
        };
        Storage.setItem("user_info", userData && userData);
        dispatch(addUserDetails(userData));
        setSubmitClicked(false);
        successNotification("You  have successfully created your profile.");
        navigate("/dashboard");
      } else {
        setSubmitClicked(false);
        warningNotification(res.message);
      }
    } catch (error) {
      setSubmitClicked(false);
      errorNotification(error.response);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsResponse = await getAllProducts();
        const combinedDataArray = [];

        if (productsResponse) {
          for (const item of productsResponse) {
            const priceResponse = await getProductPrice({ prod_id: item.id });
            combinedDataArray.push({
              product: item,
              price: priceResponse,
            });
          }
        }
        setProductData(combinedDataArray);
      } catch (error) {
        console.error("Error occurred while fetching data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="h-screen w-full flex flex-col gap-4 items-center justify-center formBackground font-poppins ">
      {submitClicked ? (
        <Loading />
      ) : (
        <>
          {/* Screen 0 */}
          {screen === 0 && (
            <div className="w-1/3 flex flex-col items-center justify-center animateDiv">
              <Icons.WelcomeStart className="w-full ease-in duration-200 w-full" />
              <h1 className="2xl:text-6xl text-5xl !text-slate-300 m-0 p-0 text-center ">
                You are almost set
              </h1>
              <h1 className="2xl:text-lg text-sm !text-slate-300 m-0 p-0 text-center w-full">
                Now that you have verified your email, let&apos;s setup your
                profile.
              </h1>
              <button
                onClick={() => {
                  setScreen(1);
                }}
                className="px-4 py-2 m-0 text-blue-500 self-end 2xl:mr-12 xl:mr-0 mr-4 hover:!text-slate-300 ease-in duration-100"
              >
                Next →
              </button>
            </div>
          )}
          {/* HEADING Screen 1,2,3 */}
          {screen === 1 && (
            <h1 className="text-xl !text-slate-300 m-0 p-0 ">
              Personal Information
            </h1>
          )}
          {screen === 2 && (
            <h1 className="text-xl !text-slate-300 m-0 p-0 ">
              Company Information
            </h1>
          )}
          {screen === 3 && (
            <h1 className="text-xl !text-slate-300 m-0 p-0 ">
              Legal Information
            </h1>
          )}

          {/* FORM Screen 1,2,3 */}
          <form
            className={`2xl:w-1/5 lg:w-1/3 h-2/3 flex items-center justify-center shadow-md backdrop-blur-2xl bg-[#ffffff22] border-[0.5px] border-[#ffffff44] rounded-md p-8 ${
              screen === 0 || screen === 4 ? "hidden" : "block"
            }`}
          >
            {screen === 1 && (
              <div className="w-full flex flex-col gap-4 items-center justify-center">
                <div className="w-full">
                  <h1 className="m-0 w-full text-base !text-slate-300 font-normal">
                    Username
                  </h1>
                  <input
                    className="m-0 px-4 py-2 w-full rounded-md bg-transparent border border-slate-300 !text-slate-300"
                    placeholder="Username"
                    type="text"
                    value={data.username}
                    onChange={(e) => {
                      setData((prevData) => ({
                        ...prevData,
                        username: e.target.value,
                      }));
                    }}
                  />
                </div>
                <div className="w-full">
                  <h1 className="m-0 w-full text-base !text-slate-300 font-normal">
                    Contact Number
                  </h1>
                  <input
                    className="m-0 px-4 py-2 w-full rounded-md bg-transparent border border-slate-300 !text-slate-300"
                    required
                    placeholder="Contact Number"
                    type="tel"
                    id="phone"
                    name="phone"
                    pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                    value={data.contact}
                    onChange={(e) => {
                      setData((prevData) => ({
                        ...prevData,
                        contact: e.target.value,
                      }));
                    }}
                  />
                </div>
                <button
                  onClick={() => {
                    setScreen(2);
                  }}
                  disabled={
                    data.username.length && data.contact.length ? false : true
                  }
                  className="m-0 text-blue-500 hover:text-gray-300 disabled:!text-slate-300 disabled:text-opacity-10 disabled:hover:text-opacity-10 self-end ease-in duration-100 disabled:cursor-not-allowed"
                >
                  Next →
                </button>
              </div>
            )}
            {screen === 2 && (
              <div className="w-full flex flex-col gap-4 items-center justify-center">
                <div className="w-full">
                  <h1 className="m-0 w-full text-base !text-slate-300 font-normal">
                    Company Name
                  </h1>
                  <input
                    className="m-0 px-4 py-2 w-full rounded-md bg-transparent border border-slate-300 !text-slate-300"
                    value={data.company_name}
                    placeholder="Company Name"
                    type="text"
                    onChange={(e) => {
                      setData((prevData) => ({
                        ...prevData,
                        company_name: e.target.value,
                      }));
                    }}
                  />
                </div>
                <div className="w-full">
                  <h1 className="m-0 w-full text-base !text-slate-300 font-normal">
                    Company Address
                  </h1>
                  <input
                    className="m-0 px-4 py-2 w-full rounded-md bg-transparent border border-slate-300 !text-slate-300 "
                    placeholder="Company Address"
                    value={data.company_address}
                    type="text"
                    onChange={(e) => {
                      setData((prevData) => ({
                        ...prevData,
                        company_address: e.target.value,
                      }));
                    }}
                  />
                </div>
                <div className="w-full">
                  <h1 className="m-0 w-full text-base !text-slate-300 font-normal">
                    Select Industry
                  </h1>
                  <Select
                    id="companies"
                    defaultValue={data.industry}
                    value={data.industry}
                    placeholder="Select an industry"
                    className="!m-0 !px-0 !py-0 !w-full rounded-md bg-transparent border border-slate-300 multipartDropdown"
                    onChange={handleChange}
                  >
                    {industriesList?.map((industry) => (
                      <Option value={industry}>{industry}</Option>
                    ))}
                  </Select>
                </div>
                <div className="w-full">
                  <h1 className="m-0 w-full text-base !text-slate-300 font-normal">
                    Website (Optional)
                  </h1>
                  <input
                    className="m-0 px-4 py-2 w-full rounded-md bg-transparent border border-slate-300 !text-slate-300"
                    required
                    type="text"
                    value={data.website}
                    placeholder="Website"
                    onChange={(e) => {
                      setData((prevData) => ({
                        ...prevData,
                        website: e.target.value,
                      }));
                    }}
                  />
                </div>
                <div className="w-full flex items-center justify-between">
                  <button
                    onClick={() => {
                      setScreen(1);
                    }}
                    className="m-0 text-blue-500 self-end hover:!text-slate-300 ease-in duration-100"
                  >
                    ← Previous
                  </button>
                  <button
                    onClick={() => {
                      setScreen(3);
                    }}
                    disabled={
                      data.company_name.length &&
                      data.company_address.length &&
                      data.industry.length
                        ? false
                        : true
                    }
                    className="m-0 text-blue-500 hover:text-gray-300 disabled:!text-slate-300 disabled:text-opacity-10 disabled:hover:text-opacity-10 self-end ease-in duration-100 disabled:cursor-not-allowed"
                  >
                    Next →
                  </button>
                </div>
              </div>
            )}
            {screen === 3 && (
              <div className="w-full flex flex-col gap-4 items-center justify-center">
                <div className="w-full">
                  <h1 className="m-0 w-full text-base !text-slate-300 font-normal">
                    ABN Number (Optional)
                  </h1>
                  <input
                    className="m-0 px-4 py-2 w-full rounded-md bg-transparent border border-slate-300 !text-slate-300"
                    placeholder="ABN Number"
                    type="number"
                    value={data.abn}
                    onChange={(e) => {
                      setData((prevData) => ({
                        ...prevData,
                        abn: e.target.value || null,
                      }));
                    }}
                  />
                </div>
                <div className="w-full">
                  <h1 className="m-0 w-full text-base !text-slate-300 font-normal">
                    Company Code
                  </h1>
                  <input
                    className="m-0 px-4 py-2 w-full rounded-md bg-transparent border border-slate-300 !text-slate-300"
                    required
                    type="number"
                    value={data.company_code}
                    placeholder="Company Code"
                    onChange={(e) => {
                      setData((prevData) => ({
                        ...prevData,
                        company_code: e.target.value,
                      }));
                    }}
                  />
                </div>
                <div className="w-full">
                  <h1 className="m-0 w-full text-base !text-slate-300 font-normal">
                    Package
                  </h1>
                  {paymentDone === 2 ? (
                    <h1 className="m-0 px-4 text-xs text-slate-300 bg-brand-color rounded-md">
                      You have availed the {data.package} package.
                    </h1>
                  ) : (
                    <Select
                      id="package"
                      defaultValue={data.package}
                      value={data.package}
                      placeholder="Select package"
                      className="!m-0 !px-0 !py-0 !w-full rounded-md bg-transparent border border-slate-300 multipartDropdown"
                      onChange={handlePackageChange}
                    >
                      {productData &&
                        productData?.map((item) => {
                          return (
                            <Option value={item.product.name} data={item}>
                              {item.product.name}
                            </Option>
                          );
                        })}
                      <Option value={"Trial"}>Trial</Option>
                    </Select>
                  )}
                </div>

                <div className="w-full flex items-center justify-between">
                  <button
                    onClick={() => {
                      setScreen(2);
                    }}
                    className="m-0 text-blue-500 self-end hover:!text-slate-300 ease-in duration-100"
                  >
                    ← Previous
                  </button>
                  {data.package === "Trial" || paymentDone === 2 ? (
                    <button
                      type="button"
                      onClick={setupProfile}
                      className="m-0 !text-slate-300 hover:scale-95 border border-slate-300 hover:border-brand-color ease-in duration-100 bg-gradient-to-b from-[#8A7CFD] to-[#2596FB] px-4 rounded-md"
                    >
                      Submit
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        setPaymentModal(true);
                      }}
                      className="m-0 !text-slate-300 hover:scale-95 border border-slate-300 hover:border-brand-color ease-in duration-100 bg-gradient-to-b from-[#8A7CFD] to-[#2596FB] px-4 rounded-md"
                    >
                      Add payment method
                    </button>
                  )}
                </div>
              </div>
            )}
          </form>

          {screen === 0 || screen === 4 ? null : (
            <div
              className={`flex items-center justify-center ${
                screen === 0 || screen === 4 ? "hidden" : "block"
              }`}
            >
              <div
                className={`${
                  screen >= 1 ? "bg-slate-300" : ""
                } ease-in duration-100 w-1 h-1 rounded-full border border-slate-300 p-1 mx-2`}
              ></div>
              <div
                className={`${
                  screen >= 2 ? "bg-slate-300" : ""
                } ease-in duration-100 w-1 h-1 rounded-full border border-slate-300 p-1 mx-2`}
              ></div>
              <div
                className={`${
                  screen >= 3 ? "bg-slate-300" : ""
                } ease-in duration-100 w-1 h-1 rounded-full border border-slate-300 p-1 mx-2`}
              ></div>
            </div>
          )}
          <Modal
            title="Add Payment Method"
            visible={paymentModal}
            onCancel={() => {
              setPaymentModal(false);
            }}
            className="paymentModal"
            okButtonProps={{ style: { display: "none" } }}
          >
            <Elements stripe={stripePromise}>
              <InstantPayment
                setPaymentDone={setPaymentDone}
                setPaymentModal={setPaymentModal}
              />
            </Elements>
          </Modal>
          <div
            className="absolute top-0 right-0 flex items-center justify-center text-base cursor-pointer my-4"
            onClick={logoutHandler}
            onMouseEnter={() => setHoverLogout(true)}
            onMouseLeave={() => setHoverLogout(false)}
          >
            <button className="flex w-full items-center justify-center bg-[#D93D3D] mx-2 rounded-md px-4 py-2 shadow-md overflow-hidden">
              <div className="">
                <Icons.LogOut className="m-0 p-0 text-white" />
              </div>

              <span
                className={`ease-in duration-200  flex items-center justify-center font-medium font-poppins text-[#FFFFFF] px-2 ${
                  hoverLogout ? " w-full h-5" : " w-0 h-5 hidden"
                }`}
              >
                <h1
                  className={`m-0 p-0 w-full text-white text-sx ${
                    hoverLogout ? " w-full h-5" : " w-0 hidden"
                  }`}
                >
                  Log out
                </h1>
              </span>
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default MultipartForm;
