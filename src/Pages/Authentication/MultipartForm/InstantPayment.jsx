import React, { useState } from "react";
import { useSelector } from "react-redux";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import {
  errorNotification,
} from "../../../Components/Shared/Toast";
import { createCard } from "../../../Components/services/billing";

const InstantPayment = ({setPaymentDone, setPaymentModal}) => {
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

      const createResponse = await createCard(stripeToken);

      if (createResponse.cvc_check === "pass") {
        setSaveButtonClicked(false);
        setPaymentDone(2)
        setPaymentModal(false)
      }
    } catch (error) {
      setSaveButtonClicked(false);
      errorNotification(error);
      console.error("Error saving card details:", error);
    }
  };
  return (
    <div className="w-full flex flex-col gap-4">
      <div className={`border bg-slate-300 border-slate-300 rounded-md p-4`}>
        <CardElement
          id="card-element"
          onChange={(e) => {
            setCardInputComplete(e.complete);
          }}
        />
      </div>
      <button
        onClick={SaveCardDetails}
        type="button"
        disabled={
             cardInputComplete === false
            ? true
            : false
        }
        className={`ease-in duration-300 w-full px-4 py-2 rounded-md bg-brand-color text-slate-300 disabled:bg-gray-500 disabled:cursor-not-allowed`}
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
          "Add "
        )}
      </button>
    </div>
  );
};

export default InstantPayment;
