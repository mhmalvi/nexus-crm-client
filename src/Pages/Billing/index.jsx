import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import BillingMethod from "./Method/BillingMethod";
import {
  getCardDetails,
  getCustomerDetails,
} from "../../Components/services/billing";
import { loadStripe } from "@stripe/stripe-js";

const Billing = () => {
  const colorMode = useSelector((state) => state?.user)?.colorMode;

  const [activeItem, setActiveItem] = useState("Method");
  const [detailsClicked, setDetailsClicked] = useState({
    screen: "default",
    data: "",
  });
  const [totalSavedCards, setTotalSavedCards] = useState([]);
  const [customerDetails, setCustomerDetails] = useState([]);

  const stripePromise = loadStripe(process.env.REACT_APP_ZULKER_SP_KEY);
  useEffect(() => {
    (async () => {
      const responseCard = await getCardDetails();
      setTotalSavedCards(responseCard.data);
    })();
    (async () => {
      const responseCustomer = await getCustomerDetails();
      setCustomerDetails(responseCustomer.data);
    })();
  }, []);

  return (
    <div className="flex items-start justify-center w-full h-screen py-8">
      <div className="flex flex-col flex-grow gap-4 w-full h-full mx-5 ">
        {/* MENU BAR */}
        <div className="flex justify-between w-full rounded-md shadow-md backdrop-blur-2xl bg-[#ffffff11] p-4">
          <div className="flex gap-4">
            <button
              className={`${
                colorMode
                  ? `hover:text-white ${
                      activeItem === "Method" ? "text-white" : "text-slate-300"
                    }`
                  : `hover:text-gray-800  ${
                      activeItem === "Method"
                        ? "text-gray-800"
                        : "text-gray-500"
                    }`
              } px-4 text-base`}
              onClick={() => {
                setActiveItem("Method");
              }}
            >
              Method
            </button>
            <button
              className={`${
                colorMode
                  ? `hover:text-white ${
                      activeItem === "Billing History"
                        ? "text-white"
                        : "text-slate-300  "
                    }`
                  : `hover:text-gray-800 ${
                      activeItem === "Billing History"
                        ? "text-gray-800"
                        : "text-gray-500"
                    }`
              } px-4 text-base`}
              onClick={() => {
                setActiveItem("Billing History");
              }}
            >
              Billing History
            </button>
          </div>
        </div>
        {/* MAIN BOX */}
        <div className="flex justify-between w-full h-full rounded-md shadow-md backdrop-blur-2xl bg-[#ffffff11] p-8">
          {activeItem === "Method" && (
            <BillingMethod
              detailsClicked={detailsClicked}
              setDetailsClicked={setDetailsClicked}
              totalSavedCards={totalSavedCards}
              stripePromise={stripePromise}
              customerDetails={customerDetails}
            />
          )}
          {activeItem === "Billing History" && <h1>Billing History</h1>}
        </div>
      </div>
    </div>
  );
};

export default Billing;
