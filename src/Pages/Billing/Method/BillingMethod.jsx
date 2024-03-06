import React, { useState } from "react";
import { useSelector } from "react-redux";
import BillingDetails from "./BillingDetails";
import BillingForm from "./BillingForm";
import NoBilling from "./NoBilling";
const BillingMethod = ({ detailsClicked, setDetailsClicked }) => {
  const colorMode = useSelector((state) => state?.user)?.colorMode;
  const userDetails = useSelector((state) => state.user);

  const [hasBillingDetails, setHasBillingDetails] = useState(false);

  return (
    <>
      {detailsClicked.screen === "default" ? (
        hasBillingDetails ? (
          <div className="flex grow gap-4 w-full">
            {/* MAP BILLING DETAILS HERE */}
            <div
              className="w-1/3 rounded-md h-1/3 bg-brand-color shadow-md hover:scale-[0.98] cursor-pointer ease-in duration-200"
              onClick={() => {
                setDetailsClicked({
                  screen: "card-details",
                  data: "okay",
                });
              }}
            >
              ok
            </div>
            <div
              className="w-1/3 rounded-md h-1/3 bg-brand-color shadow-md hover:scale-[0.98] cursor-pointer ease-in duration-200"
              onClick={() => {
                setDetailsClicked({
                  screen: "card-details",
                  data: "not okay",
                });
              }}
            >
              Not ok
            </div>

            {/* ADD NEW CARD */}
            <div
              class={`flex justify-center items-center relative w-3/12 h-1/3 rounded-md shadow-md hover:scale-[0.98] cursor-pointer ease-in duration-200 border ring-inset ${
                colorMode ? "border-slate-300" : "border-gray-800"
              }`}
              onClick={() => {
                setDetailsClicked({
                  screen: "billing-form",
                });
              }}
            >
              <div
                class={`absolute w-2 h-8 ${
                  colorMode ? "bg-slate-300" : "bg-gray-800"
                }`}
              ></div>
              <div
                class={`absolute w-8 h-2 ${
                  colorMode ? "bg-slate-300" : "bg-gray-800"
                }`}
              ></div>
            </div>
          </div>
        ) : <NoBilling setDetailsClicked={setDetailsClicked} />
      ) : detailsClicked.screen === "card-details" ? (
        <BillingDetails
          setDetailsClicked={setDetailsClicked}
          detailsClicked={detailsClicked}
        />
      ) : (
        <BillingForm setDetailsClicked={setDetailsClicked} />
      )}
    </>
  );
};

export default BillingMethod;
