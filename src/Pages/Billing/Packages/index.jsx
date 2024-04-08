import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { LoadingOutlined } from "@ant-design/icons";
import {
  createSubscription,
  getAllProducts,
  getProductPrice,
} from "../../../Components/services/billing";
import { Spin } from "antd";
import { successNotification } from "../../../Components/Shared/Toast";

const Packages = () => {
  const colorMode = useSelector((state) => state?.user)?.colorMode;
  const userDetails = useSelector((state) => state?.user);
  const [productData, setProductData] = useState(null);
  const [buttonClicked, setButtonClicked] = useState(null);
  const [subscriptionId, setSubscriptionId] = useState(
    userDetails.userInfo.subscription_id
  );
  const interval = userDetails.userInfo.interval;

  const subscribe = async (interval, package_name, price_id) => {
    const userInfo = JSON.parse(localStorage.getItem("user_info"));
    const response = await createSubscription(
      interval,
      package_name,
      price_id,
      subscriptionId
    );

    userInfo.package = package_name;
    userInfo.interval = interval;
    userInfo.subscription_id = response.data?.data?.id;
    let modifiedDataString = JSON.stringify(userInfo);
    setSubscriptionId(userInfo.subscription_id);

    if (response.status === 200 || response.message === "success") {
      setButtonClicked(false);
      localStorage.setItem("user_info", modifiedDataString);
      successNotification(
        "You have subscribed to the " +
          package_name.toUpperCase() +
          " " +
          interval +
          " package."
      );
      setTimeout(() => {
        window.location.reload();
      }, [3000]);
    } else if (response.status === 422) {
      successNotification(
        "Cannot use the monthly subscription of this package"
      );
      setButtonClicked(false);
    } else {
      successNotification("Subscription already available");
      setButtonClicked(false);
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
  }, [subscriptionId]);

  return (
    <div className="w-full flex flex-wrap h-full gap-8 items-center justify-center gap-8">
      {productData === null ? (
        <h1>No packages yet. Use for free.</h1>
      ) : (
        productData.map((item, index) => {
          return (
            <div
              key={index}
              className={`flex flex-col border  ${
                colorMode ? "border-slate-300" : "border-gray-800"
              } w-1/4 h-5/6 rounded-md`}
            >
              <h1
                className={`w-full p-4 m-0 text-xl text-slate-300 border-b ${
                  colorMode ? "border-slate-300" : "border-gray-800"
                }  bg-brand-color rounded-t-md`}
              >
                Package: {item.product.name}
              </h1>
              <div className="w-full flex flex-col items-center gap-4 py-2 overflow-y-scroll">
                {item.price.data.map((items, index) => {
                  const disableButton =
                    (interval === "year" &&
                      ["week", "month", "day"].includes(
                        items.recurring.interval
                      )) ||
                    (interval === "month" &&
                      ["week", "day"].includes(items.recurring.interval)) ||
                    (interval === "week" && items.recurring.interval === "day");
                  return (
                    <div className="w-full flex flex-col items-center px-4 py-2">
                      <h1
                        className={`w-full m-0 px-4 py-2 text-xl text-center ${
                          colorMode ? "text-slate-300" : "text-gray-800"
                        }`}
                      >
                        $ {items.unit_amount} / {items.recurring.interval}
                      </h1>
                      <button
                        onClick={() => {
                          subscribe(
                            items.recurring.interval,
                            item.product.name,
                            items.id
                          );
                          setButtonClicked(index);
                        }}
                        disabled={
                          interval === items.recurring.interval || disableButton
                        }
                        className="disabled:opacity-20 disabled:hover:bg-brand-color disabled:hover:text-slate-300 disabled:cursor-not-allowed px-4 py-2 w-full bg-brand-color text-slate-300 rounded-md border border-brand-color hover:bg-slate-300 hover:text-brand-color ease-in duration-100"
                      >
                        {buttonClicked === index ? (
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
                          "Subscribe"
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default Packages;
