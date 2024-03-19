import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useSelector } from "react-redux";
import { createCard } from "../../../Components/services/billing";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin, message } from "antd";

const BillingForm = ({ setDetailsClicked }) => {
  const colorMode = useSelector((state) => state?.user)?.colorMode;
  const userDetails = useSelector((state) => state.user);
  const stripe = useStripe();
  const elements = useElements();
  const [paymentDetails, setPaymentDetails] = useState({
    name: "",
    user_id: userDetails?.userInfo?.user_id,
    client_id: userDetails?.userInfo?.client_id,
    type: "card",
    email: userDetails?.userInfo?.email,
    tokenStripe: "",
  });
  const [cardInputComplete, setCardInputComplete] = useState(false);
  const [saveButtonClicked, setSaveButtonClicked] = useState(false);
  const SaveCardDetails = async () => {
    setSaveButtonClicked(true);
    try {
      const stripeTokenResponse = await stripe.createToken(
        elements.getElement(CardElement)
      );
      const stripeToken = stripeTokenResponse.token.id;

      setPaymentDetails((prevData) => ({
        ...prevData,
        tokenStripe: stripeToken,
      }));

      // const response =  await saveCardDetails(paymentDetails);
      const response = await createCard(stripeToken);
      if (response.cvc_check === "pass") {
        setSaveButtonClicked(false);
        window.location.reload();
      }
    } catch (error) {
      setSaveButtonClicked(false);
      message.error(error);
      console.error("Error saving card details:", error);
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full h-full">
      <div
        className={`border ${
          colorMode
            ? "border-slate-300 text-slate-300"
            : "border-gray-800 text-gray-800"
        } ease-in duration-100 w-1/12  rounded-md px-4 py-1 flex items-center justify-center cursor-pointer hover:scale-95`}
        onClick={() => {
          setDetailsClicked({ screen: "default" });
        }}
      >
        Back
      </div>
      <div className="flex items-center justify-center gap-4 w-full h-full ">
        <form className="w-1/2 background-blur-md bg-[#ffffff11] p-8 shadow-md rounded-md flex flex-col gap-8">
          <h1
            className={`text-2xl m-0 p-0 ${
              colorMode ? "text-slate-300" : "text-gray-800"
            }`}
          >
            Add Card Information
          </h1>
          <div
            className={`border bg-slate-300 ${
              colorMode ? `border-slate-300` : `border-gray-800`
            } rounded-md p-4`}
          >
            <CardElement
              id="card-element"
              onChange={(e) => {
                setCardInputComplete(e.complete);
                console.log(e.complete);
              }}
            />
          </div>
          <div>
            <label
              htmlFor="last_name"
              className={`text-sm font-medium ${
                colorMode ? " text-slate-300" : " text-gray-800"
              }`}
            >
              Cardholder Name
            </label>
            <input
              type="text"
              id="Name"
              className={`bg-slate-300 text-sm text-gray-800 placeholder:!text-gray-800 border-gray-800 placeholder:!text-opacity-40 rounded-md focus:ring-brand-color focus:border-brand-color w-full p-2.5`}
              placeholder="JOHN DOE"
              onChange={(e) => {
                setPaymentDetails((prevData) => ({
                  ...prevData,
                  name: e.target.value.toUpperCase(),
                }));
              }}
              required
            />
          </div>
          <div className="w-full flex items-center justify-end">
            <button
              onClick={SaveCardDetails}
              type="button"
              disabled={
                paymentDetails.name.length < 1 || cardInputComplete === false
                  ? true
                  : false
              }
              className={`ease-in duration-300 w-1/4 px-4 py-2 rounded-md bg-brand-color text-slate-300 disabled:bg-gray-500 disabled:cursor-not-allowed`}
            >
              {saveButtonClicked ? (
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
                "Save"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BillingForm;
