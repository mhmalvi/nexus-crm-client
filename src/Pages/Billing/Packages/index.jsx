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
// import { useNavigate } from "react-router-dom";
import { Storage } from "../../../Components/Shared/utils/store";

const Packages = () => {
  const colorMode = useSelector((state) => state?.user)?.colorMode;
  const userDetails = useSelector((state) => state?.user);
  const [productData, setProductData] = useState(null);
  const [buttonClicked, setButtonClicked] = useState(null);
  const subscriptionId = userDetails.userInfo.subscription_id;
  const interval = userDetails.userInfo.interval;
  // const navigate = useNavigate();

  const userInfo = localStorage.getItem("user_info");
  const subscribe = async (interval, package_name, price_id) => {
    const userInfoObject = JSON.parse(userInfo);

    userInfoObject.interval = interval;
    userInfoObject.package = package_name;

    Storage.setItem("user_info", userInfoObject);

    const response = await createSubscription(
      interval,
      package_name,
      price_id,
      subscriptionId
    );
;
    if (response.status === 200 || response.message === "success") {
      setButtonClicked(false);

      successNotification(
        "You have subscribed to the " +
          package_name.toUpperCase() +
          " " +
          interval +
          " package. Please Login Again."
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
    <div className="w-full flex lg:flex-row flex-col items-center justify-center gap-8 ease-in duration-100">
      {productData === null ? (
        <h1>No packages yet. Use for free.</h1>
      ) : (
        productData.map((item, index) => {
          const disableButton =
            userDetails.userInfo.package === item.product.name &&
            ((interval === "year" &&
              ["week", "month", "day"].includes(
                item.price.data[0].recurring.interval
              )) ||
              (interval === "month" &&
                ["week", "day"].includes(
                  item.price.data[0].recurring.interval
                )) ||
              (interval === "week" &&
                item.price.data[0].recurring.interval === "day"));
          return (
            <div
              key={index}
              // className={`flex flex-col border   w-1/4 h-5/6 rounded-md`}
              className={`flex flex-col border xl:w-1/4 ${
                colorMode ? "border-slate-300" : "border-gray-800"
              } lg:w-1/3 w-full h-5/6 gap-8 rounded-md items-center justify-center px-4 py-16 bg-[#ffffff11] overflow-hidden shadow-md backdrop-blur-2xl ease-in duration-100`}
            >
              <div className="absolute h-8 w-40 bg-brand-color top-6 -right-10 rotate-45 flex items-center justify-center">
                <h1 className="m-0 p-0">Save 25%</h1>
              </div>
              <h1 className={`p-0 m-0 text-xl text-slate-300`}>
                {item.product.name} Package
              </h1>
              <div className="w-full flex flex-col items-center gap-4 p-0">
                {item.price.data.map((items, index) => {
                  return (
                    <div className="w-full flex flex-col items-center p-0 m-0">
                      <h1
                        // className={`w-full m-0 px-4 py-2 text-xl text-center `}
                        className={`w-full m-0 p-0 ${
                          colorMode ? "text-slate-300" : "text-gray-800"
                        } text-xl text-center text-slate-300`}
                      >
                        <span className="text-3xl">
                          $ {items.unit_amount / 100} /
                        </span>{" "}
                        {items.recurring.interval}
                      </h1>
                      <h1 className="text-slate-500">
                        Best for -{" "}
                        {item.product.name === "Premium"
                          ? "Single Project, Startups"
                          : "Limited Requirements"}
                      </h1>
                      <div>
                        {item.product.name === "Premium" && (
                          <div className="flex flex-col items-center justify-center gap-4">
                            <h1 className="m-0 p-0 text-slate-300">
                              ✔ Post Campaigns
                            </h1>
                            <h1 className="m-0 p-0 text-slate-300">
                              ✔ Sales Automation
                            </h1>
                            <h1 className="m-0 p-0 text-slate-300">
                              ✔ High Quality SEO
                            </h1>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
              <button
                onClick={() => {
                  subscribe(
                    item.price.data[0].recurring.interval,
                    item.product.name,
                    item.id
                  );
                  setButtonClicked(item);
                }}
                disabled={
                  interval === item.price.data[0].recurring.interval ||
                  disableButton
                  //   &&
                  // userDetails.userInfo.package === item.product.name
                }
                className="disabled:opacity-20 disabled:hover:bg-brand-color disabled:hover:text-slate-300 disabled:cursor-not-allowed px-4 py-2 w-full bg-brand-color text-slate-300 rounded-md border border-brand-color hover:bg-slate-300 hover:text-brand-color ease-in duration-100"
              >
                {buttonClicked === item ? (
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
        })
      )}
    </div>
  );
};

export default Packages;
