import React, { useEffect, useState } from "react";
import { Popover, Spin } from "antd";
import { useSelector } from "react-redux";
import BillingForm from "./BillingForm";
import NoBilling from "./NoBilling";
import { Elements } from "@stripe/react-stripe-js";
import Icons from "../../../Components/Shared/Icons";
import {
  deleteCard,
  updateDefaultCard,
} from "../../../Components/services/billing";
import { LoadingOutlined } from "@ant-design/icons";

const BillingMethod = ({
  detailsClicked,
  setDetailsClicked,
  totalSavedCards,
  customerDetails,
  stripePromise,
}) => {
  const colorMode = useSelector((state) => state?.user)?.colorMode;
  console.log(customerDetails);
  const [hasBillingDetails, setHasBillingDetails] = useState(true);
  const [openPopover, setOpenPopover] = useState(false);
  const [deleteButtonClicked, setDeleteButtonClicked] = useState(false);
  const [updateButtonClicked, setUpdateButtonClicked] = useState(false);

  const handleOpenChange = (newOpen) => {
    setOpenPopover(newOpen);
  };

  useEffect(() => {
    if (totalSavedCards.length > 0) {
      setHasBillingDetails(true);
    } else {
      setHasBillingDetails(false);
    }
  }, [totalSavedCards.length]);

  const handleDeleteCard = async (cardId) => {
    setDeleteButtonClicked(true);
    try {
      const response = await deleteCard(cardId);

      if (response.deleted === true) {
        setDeleteButtonClicked(false);
        window.location.reload();
      }
    } catch (error) {
      console.error("Error deleting card:", error);
    }
  };

  const handleDefaultCard = async (cardId) => {
    setUpdateButtonClicked(true);
    try {
      const response = await updateDefaultCard(cardId);
      if (response) {
        setUpdateButtonClicked(false);
        window.location.reload();
      }
    } catch (error) {
      console.error("Error deleting card:", error);
    }
  };

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
                    className={`relative w-1/3 rounded-md h-1/3 border ${
                      colorMode
                        ? "hover:border-slate-300"
                        : "hover:border-gray-800"
                    } border-brand-color flex flex-col items-start justify-around shadow-md cursor-pointer ease-in duration-200 p-4`}
                  >
                    <div className="w-full flex items-center justify-between">
                      <h1
                        className={`m-0 p-0 ${
                          colorMode ? "text-slate-300" : "text-gray-800"
                        }`}
                      >
                        {items.brand} {items.funding} card
                      </h1>
                      {items.id === customerDetails.default_source && (
                        <p className="m-0 px-8 py-2 right-0 absolute rounded-l-md bg-brand-color text-slate-300">
                          Default
                        </p>
                      )}
                    </div>
                    <h1
                      className={`m-0 p-0 ${
                        colorMode ? "text-slate-300" : "text-gray-800"
                      }`}
                    >
                      Card Number: **** **** **** {items.last4}
                    </h1>
                    <h1
                      className={`m-0 p-0 ${
                        colorMode ? "text-slate-300" : "text-gray-800"
                      }`}
                    >
                      Expiry Date: {items.exp_month} / {items.exp_year}
                    </h1>
                    <div className="w-full flex items-center justify-between">
                      <h1
                        className={`m-0 p-0 ${
                          colorMode ? "text-slate-300" : "text-gray-800"
                        }`}
                      >
                        Country: {items.country}
                      </h1>
                      <Popover
                        content={
                          <div className="flex gap-2">
                            <button
                              disabled={
                                items.id === customerDetails.default_source &&
                                true
                              }
                              className="disabled:opacity-20 px-4 py-2 border border-brand-color rounded-md text-slate-300 hover:scale-95 ease-in duration-100"
                              onClick={() => {
                                handleDefaultCard(items.id);
                              }}
                            >
                              Set to Default
                            </button>
                            <button
                              className="px-4 py-2 border border-brand-color rounded-md text-slate-300 hover:scale-95 ease-in duration-100"
                              onClick={() => {
                                handleDeleteCard(items.id);
                              }}
                            >
                              {deleteButtonClicked ? (
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
                                "Delete"
                              )}
                            </button>
                          </div>
                        }
                        trigger="click"
                        open={openPopover}
                        onOpenChange={handleOpenChange}
                      >
                        <button className="flex gap-2 hover:scale-110">
                          <Icons.Edit
                            className={`${
                              colorMode ? "text-slate-300" : "text-gray-800"
                            }`}
                          />
                        </button>
                      </Popover>
                    </div>
                  </div>
                );
              })}

            {/* ADD NEW CARD */}
            <div
              className={`flex justify-center items-center relative w-3/12 h-1/3 rounded-md shadow-md cursor-pointer ease-in duration-200 border ring-inset ${
                colorMode ? "border-slate-300" : "border-gray-800"
              }`}
              onClick={() => {
                setDetailsClicked({
                  screen: "billing-form",
                });
              }}
            >
              <div className="flex items-center justify-center !*:bg-brand-color">
                <div
                  className={`absolute w-2 h-8 ${
                    colorMode ? "bg-slate-300" : "bg-gray-800"
                  }`}
                ></div>
                <div
                  className={`absolute w-8 h-2 ${
                    colorMode ? "bg-slate-300" : "bg-gray-800"
                  }`}
                ></div>
              </div>
            </div>
          </div>
        ) : (
          <NoBilling setDetailsClicked={setDetailsClicked} />
        )
      ) : (
        <Elements stripe={stripePromise}>
          <BillingForm setDetailsClicked={setDetailsClicked} />
        </Elements>
      )}
    </>
  );
};

export default BillingMethod;
