import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Storage } from "../../../Components/Shared/utils/store";
import { LoadingOutlined } from "@ant-design/icons";
import {
  createSubscription,
  getPriceList,
  getProduct,
  getSubscriptionDetails,
} from "../../../Components/services/billing";
import { message, Spin } from "antd";
const Packages = () => {
  const colorMode = useSelector((state) => state?.user)?.colorMode;
  const userDetails = useSelector((state) => state?.user);
  const dispatch = useDispatch();
  const [productId, setProductId] = useState(null);
  const [priceDetails, setPriceDetails] = useState(null);
  const [productData, setProductData] = useState([]);
  const [buttonClicked, setButtonClicked] = useState(null);
  const [subscriptionId, setSubscriptionId] = useState(null);
  const [subscriptionDetails, setSubscriptionDetails] = useState(null);

  const subscribe = async (interval, package_name, price_id) => {
    const userInfo = JSON.parse(localStorage.getItem("user_info"));
    const response = await createSubscription(interval, package_name, price_id);
    console.log(subscriptionDetails);
    userInfo.package = package_name;
    userInfo.interval = interval;
    userInfo.subscription_id = response.data?.data?.id;
    let modifiedDataString = JSON.stringify(userInfo);
    setSubscriptionId(userInfo.subscription_id);

    if (response.status === 200 || response.message === "success") {
      setButtonClicked(null);
      localStorage.setItem("user_info", modifiedDataString);
      message.success(
        "You have subscribed to the " +
          package_name.toUpperCase() +
          " " +
          interval +
          " package."
      );
    } else if (response.status === 422) {
      setButtonClicked(null);
      message.success("Cannot use the monthly subscription of this package");
    } else {
      setButtonClicked(null);
      message.success("Subscription already available");
    }
  };
  useEffect(() => {
    (async () => {
      const response = await getPriceList();
      setProductId(response.data[0].product);
      setPriceDetails(response);
    })();
    subscriptionId !== null &&
      (async () => {
        const response = await getSubscriptionDetails(subscriptionId);
        console.log(response);
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
  }, [productId, subscriptionDetails, subscriptionId]);

  return (
    <div className="w-full flex items-center justify-center gap-16">
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
            {productData.response?.name} Package
          </h1>
          {priceDetails.data.map((item, idx) => {
            return (
              <div key={idx}>
                <h1
                  className={`${
                    userDetails.userInfo.package === "standard" && "opacity-20"
                  } flex items-center justify-center gap-2 w-full  m-0 py-2 px-4 2xl:text-3xl text-xl font-semibold ${
                    colorMode ? "text-slate-300" : "text-gray-800 "
                  }`}
                >
                  ${item.unit_amount / 100}/{item.recurring.interval}
                </h1>
                <div className="px-4">
                  <button
                    // disabled={userDetails.userInfo.package === "standard"}
                    className={`py-4 rounded-md w-full text-slate-300 font-semibold disabled:cursor-not-allowed disabled:opacity-20 ${
                      colorMode ? "bg-brand-color" : "bg-gray-800"
                    }`}
                    onClick={() => {
                      subscribe(
                        item.recurring.interval,
                        productData.response.name,
                        item.id
                      );
                      setButtonClicked(idx);
                    }}
                  >
                    {buttonClicked === idx ? (
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
                    ) : (
                      `Avail ${item.recurring.interval} Package`
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
      {/* {subscriptionDetails && (
        <div
          className={`w-[40vw] h-full border flex flex-col justify-around ${
            colorMode ? "border-brand-color" : "border-gray-800"
          } rounded-md `}
        >
          ok
        </div>
      )} */}
    </div>
  );
};

export default Packages;
