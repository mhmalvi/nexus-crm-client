import React, { useEffect, useState } from "react";
import Icons from "../../../Components/Shared/Icons";
import { Storage } from "../../../Components/Shared/utils/store";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import {
  getPriceList,
  getProduct,
  getSubscriptionDetails,
} from "../../../Components/services/billing";
import { handleLogout } from "./../../../Components/services/auth";
import { Spin } from "antd";
import { successNotification } from "../../../Components/Shared/Toast";
import DueBillForm from "./DueBillForm";

const PackageDue = () => {
  const authToken = JSON.parse(window.localStorage.getItem("auth_tok"));
  const colorMode = useSelector((state) => state?.user)?.colorMode;
  const userDetails = useSelector((state) => state?.user);
  const navigate = useNavigate();
  const [productId, setProductId] = useState(null);
  const [priceDetails, setPriceDetails] = useState(null);
  const [productData, setProductData] = useState([]);
  const [buttonClicked, setButtonClicked] = useState(null);
  const subscriptionId = userDetails.userInfo.subscription_id;

  const [subscriptionDetails, setSubscriptionDetails] = useState(null);
  const [subscriptionClicked, setSubscriptionClicked] = useState(false);

  useEffect(() => {
    (async () => {
      const response = await getPriceList();
      setProductId(response.data[0].product);
      setPriceDetails(response);
    })();

    subscriptionId !== null &&
      (async () => {
        const response = await getSubscriptionDetails(subscriptionId);
        setSubscriptionDetails(response);
      })();
    productId !== null &&
      (async () => {
        const response = await getProduct(productId);

        setProductData((prevData) => ({
          ...prevData,
          response,
        }));
      })();
  }, [productId, subscriptionId]);

  const logoutHandler = () => {
    handleLogout({
      user_id: userDetails.userInfo.user_id,
      email: userDetails.userInfo.email,
      token: authToken,
    });
    Storage.removeItem("auth_tok");
    Storage.removeItem("user_info");
    Storage.removeItem("fac_t");
    successNotification("Logout Successful.");
    navigate("/login");
    window.location.reload();
  };

  const [hoverLogout, setHoverLogout] = useState(false);
  const stripePromise = loadStripe(process.env.REACT_APP_ZULKER_SP_KEY);
  return (
    <div className="relative w-full h-screen flex items-center justify-center gap-8 p-8">
      {productData && priceDetails ? (
        <div
          className={`w-1/4 h-full border flex flex-col justify-around ${
            colorMode ? "border-brand-color" : "border-gray-800"
          } rounded-md `}
        >
          <h1
            className={`flex items-center justify-center gap-2 w-full m-0 p-4 2xl:text-6xl text-4xl text-center bg-brand-color shadow-md font-semibold ${
              colorMode ? "text-slate-300" : "text-gray-800 "
            }`}
          >
            {productData?.response?.name} Package
          </h1>
          {priceDetails.data.map((item, idx) => {
            return (
              <div key={idx + 1}>
                <h1
                  className={` flex items-center justify-center gap-2 w-full m-0 py-2 px-4 2xl:text-3xl text-xl font-semibold ${
                    colorMode ? "text-slate-300" : "text-gray-800 "
                  }`}
                >
                  ${item.unit_amount / 100}/{item.recurring.interval}
                </h1>
                <div className=" px-4">
                  <button
                    disabled={
                      subscriptionDetails?.plan?.interval === "year" ||
                      (subscriptionDetails?.plan?.interval === "month" &&
                        item.recurring.interval !== "year") ||
                      (subscriptionDetails?.plan?.interval === "day" &&
                        item.recurring.interval !== "month" &&
                        item.recurring.interval !== "year")
                    }
                    className={`py-4 rounded-md w-full text-slate-300 font-semibold disabled:cursor-not-allowed disabled:opacity-20 ease-in duration-100 ${
                      colorMode
                        ? "hover:disabled:bg-brand-color :hover:bg-gray-800 bg-brand-color"
                        : "hover:disabled:bg-gray-800 hover:bg-brand-color bg-gray-800"
                    }`}
                    onClick={() => {
                      setSubscriptionClicked({
                        interval: item.recurring.interval,
                        package_name: productData.response.name,
                        price_id: item.id,
                      });
                      setButtonClicked(idx + 1);
                    }}
                  >
                    {buttonClicked === idx + 1 ? (
                      <Spin
                        indicator={
                          <LoadingOutlined
                            style={{
                              fontSize: 24,
                            }}
                            spin
                            className="!text-slate-300"
                          />
                        }
                      />
                    ) : subscriptionDetails?.plan?.id === item.id ? (
                      `Current Package`
                    ) : (
                      `Avail ${item.recurring.interval} package`
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
      {buttonClicked > 0 && (
        <Elements stripe={stripePromise}>
          <DueBillForm
            subscriptionClicked={subscriptionClicked}
            setButtonClicked={setButtonClicked}
          />
        </Elements>
      )}

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
    </div>
  );
};

export default PackageDue;
