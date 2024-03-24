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
  const [hasBillingDetails, setHasBillingDetails] = useState(true);
  const [openPopover, setOpenPopover] = useState(false);
  const [deleteButtonClicked, setDeleteButtonClicked] = useState(false);
  const [defaultButtonClicked, setDefaultButtonClicked] = useState(false);

  const handleOpenChange = (newOpen) => {
    setOpenPopover(newOpen);
  };
  console.log(totalSavedCards);
  useEffect(() => {
    if (totalSavedCards.length >= 1) {
      setHasBillingDetails(true);
    } else {
      setHasBillingDetails(false);
    }
  }, [totalSavedCards]);

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
    setDefaultButtonClicked(true);
    try {
      const response = await updateDefaultCard(cardId);
      if (response) {
        setDefaultButtonClicked(false);
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
          <div className="flex flex-wrap gap-8 w-full">
            {/* MAP BILLING DETAILS HERE */}
            {totalSavedCards.length > 0 &&
              totalSavedCards.map((items, index) => {
                return (
                  <div
                    key={index}
                    className={`relative w-[26vw] rounded-md h-2/6 hover:border ${
                      colorMode
                        ? "hover:border-slate-300 bg-gradient-to-r from-black to-gray-900"
                        : "hover:border-gray-800 bg-gradient-to-r from-sky-300 to-purple-300"
                    }  flex flex-col items-start gap-1 justify-around shadow-md cursor-pointer ease-in duration-100 p-8`}
                  >
                    <div className="w-full flex items-center justify-between">
                      <h1
                        className={`m-0 p-0 2xl:text-2xl text-sm font-semibold ${
                          colorMode ? "text-slate-300" : "text-gray-800"
                        }`}
                      >
                        {items.brand} {items.funding} card
                      </h1>
                      <div className="flex right-0 absolute">
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
                                {defaultButtonClicked ? (
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
                                  "Set to Default"
                                )}
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
                          <button
                            className={`flex items-center gap-2 hover:bg-gray-800 cursor-pointer bg-brand-color px-2 2xl:py-2 py-1 rounded-md mr-2 ease-in duration-100`}
                          >
                            <Icons.Edit className={`text-slate-300`} />
                            {items.id === customerDetails.default_source && (
                              <p className="m-0 px-2 2xl:py-2 py-1 h-full text-slate-300">
                                Default
                              </p>
                            )}
                          </button>
                        </Popover>
                      </div>
                    </div>
                    <img
                      className="2xl:my-2 2xl:w-12 2xl:h-12 w-8 h-8"
                      alt="Icons8 flat sim card chip"
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Icons8_flat_sim_card_chip.svg/512px-Icons8_flat_sim_card_chip.svg.png"
                    ></img>
                    <div className="flex flex-col w-full">
                      <h1
                        className={`m-0 p-0 uppercase 2xl:text-sm text-xs ${
                          colorMode ? "text-slate-300" : "text-gray-800"
                        }`}
                      >
                        Card Number
                      </h1>
                      <h1
                        className={`m-0 p-0 2xl:text-4xl text-2xl flex justify-around ${
                          colorMode ? "text-gray-400" : "text-gray-800"
                        }`}
                      >
                        <span>**** </span>
                        <span>**** </span> <span>**** </span>{" "}
                        <span>{items.last4}</span>
                      </h1>
                    </div>
                    <div className="w-full flex items-center justify-between mt-2">
                      <div className="flex flex-col">
                        <h1
                          className={`m-0 p-0 uppercase 2xl:text-sm text-xs ${
                            colorMode ? "text-slate-300" : "text-gray-800"
                          }`}
                        >
                          Name
                        </h1>
                        <h1
                          className={`m-0 p-0 2xl:text-lg ${
                            colorMode ? "text-slate-300" : "text-gray-800"
                          }`}
                        >
                          {items.name}
                        </h1>
                      </div>
                      <div className="flex flex-col">
                        <h1
                          className={`m-0 p-0 uppercase 2xl:text-sm text-xs ${
                            colorMode ? "text-slate-300" : "text-gray-800"
                          }`}
                        >
                          Country
                        </h1>
                        <h1
                          className={`m-0 p-0 2xl:text-lg ${
                            colorMode ? "text-slate-300" : "text-gray-800"
                          }`}
                        >
                          {items.country}
                        </h1>
                      </div>
                      <div className="flex flex-col">
                        <h1
                          className={`m-0 p-0 uppercase 2xl:text-sm text-xs ${
                            colorMode ? "text-slate-300" : "text-gray-800"
                          }`}
                        >
                          Valid till
                        </h1>
                        <h1
                          className={`m-0 p-0 2xl:text-xl flex justify-around ${
                            colorMode ? "text-gray-400" : "text-gray-800"
                          }`}
                        >
                          {items.exp_month} / {items.exp_year}
                        </h1>
                      </div>
                    </div>
                  </div>
                );
              })}

            {/* ADD NEW CARD */}
            <div
              className={`hover:border-brand-color flex justify-center items-center relative min-w-[25vw] h-1/3 rounded-md shadow-md cursor-pointer ease-in duration-200 border ring-inset ${
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
