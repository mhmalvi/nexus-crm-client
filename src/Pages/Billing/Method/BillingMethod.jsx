import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import BillingDetails from "./BillingDetails";
import BillingForm from "./BillingForm";
import NoBilling from "./NoBilling";
import { Elements } from "@stripe/react-stripe-js";

const BillingMethod = ({
  detailsClicked,
  setDetailsClicked,
  totalSavedCards,
  stripePromise,
}) => {
  const colorMode = useSelector((state) => state?.user)?.colorMode;
  const userDetails = useSelector((state) => state.user);

  const [hasBillingDetails, setHasBillingDetails] = useState(true);
  console.log(totalSavedCards);
  useEffect(() => {
    if (totalSavedCards.length > 0) {
      setHasBillingDetails(true);
    } else {
      setHasBillingDetails(false);
    }
  }, [totalSavedCards.length]);

  return (
    <>
      {detailsClicked.screen === "default" ? (
        hasBillingDetails ? (
          <div className="flex grow gap-4 w-full">
            {/* MAP BILLING DETAILS HERE */}
            {totalSavedCards &&
              totalSavedCards.map((items, index) => {
                return (
                  <div
                    key={index}
                    className="w-1/3 rounded-md h-1/3 bg-brand-color shadow-md hover:scale-[0.98] cursor-pointer ease-in duration-200 p-4"
                    onClick={() => {
                      setDetailsClicked({
                        screen: "card-details",
                        data: items,
                      });
                    }}
                  >
                    <h1>Debit/Credit Card</h1>
                    <h1>Card Number</h1>
                    <h1>Exp Date</h1>
                    <h1>Card Name</h1>
                  </div>
                );
              })}

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
        ) : (
          <NoBilling setDetailsClicked={setDetailsClicked} />
        )
      ) : detailsClicked.screen === "card-details" ? (
        <BillingDetails
          setDetailsClicked={setDetailsClicked}
          detailsClicked={detailsClicked}
        />
      ) : (
        <Elements stripe={stripePromise}>
          <BillingForm setDetailsClicked={setDetailsClicked} />
        </Elements>
      )}
    </>
  );
};

export default BillingMethod;
