import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import amex from "../../assets/Images/amex.png";
import DinersClub from "../../assets/Images/Diners_Club.png";
import Discover from "../../assets/Images/discover.png";
import JCB from "../../assets/Images/JCB.png";
import master from "../../assets/Images/master.png";
import UnionPay from "../../assets/Images/UnionPay.png";
import visa from "../../assets/Images/visa.png";
import { handleAddEwayPaymentDetails } from "../../Components/services/payment";
import { Storage } from "../../Components/Shared/utils/store";
import { setLoader } from "../../features/user/userSlice";
import { successNotification } from "../../Components/Shared/Toast";

const CardPaymentForm = ({ requestedLeadDetails, amount, setAmount }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    if (amount) {
      Storage.setItem("l_Details", requestedLeadDetails?.leadDetails);
    }
  }, [amount, requestedLeadDetails?.leadDetails]);

  console.log(requestedLeadDetails);

  const handleSubmit = async (event) => {
    dispatch(setLoader(true));
    event.preventDefault();

    const { error, token } = await stripe.createToken(
      elements.getElement(CardElement)
    );

    if (error) {
      dispatch(setLoader(false));
    } else {
      console.log({
        user_id: requestedLeadDetails?.leadDetails?.student_id,
        lead_id: requestedLeadDetails?.leadDetails?.lead_id,
        campaign_id: requestedLeadDetails?.leadDetails?.campaign_id,
        full_name: requestedLeadDetails?.leadDetails?.full_name,
        user_email: requestedLeadDetails?.leadDetails?.student_email,
        role_id: 6,
        token: token.id,
        client_id: requestedLeadDetails?.leadDetails?.client_id,
        amount: parseFloat(amount),
        course_code: requestedLeadDetails?.leadDetails?.course_code,
        course_title: requestedLeadDetails?.leadDetails?.course_title,
      });

      const paymentResponse = await handleAddEwayPaymentDetails({
        user_id: requestedLeadDetails?.leadDetails?.student_id,
        lead_id: requestedLeadDetails?.leadDetails?.lead_id,
        campaign_id: requestedLeadDetails?.leadDetails?.campaign_id,
        full_name: requestedLeadDetails?.leadDetails?.full_name,
        user_email: requestedLeadDetails?.leadDetails?.student_email,
        role_id: 6,
        token: token.id,
        client_id: requestedLeadDetails?.leadDetails?.client_id,
        amount: parseFloat(amount),
        course_code: requestedLeadDetails?.leadDetails?.course_code,
        course_title: requestedLeadDetails?.leadDetails?.course_title,
      });

      if (paymentResponse.status === 201) {
        successNotification("Payment completed successfully.");
        navigate(`/success/${requestedLeadDetails?.leadDetails?.lead_id}`);
      }

      dispatch(setLoader(false));
    }
  };

  return (
    <div>
      <div className="relative flex items-center mx-auto">
        <img className="w-10 mr-4" src={visa} alt="" />
        <img className="w-10 mr-4" src={master} alt="" />
        <img className="w-10 mr-4" src={amex} alt="" />
        <img className="w-10 mr-4" src={Discover} alt="" />
        <img className="w-10 mr-4" src={JCB} alt="" />
        <img className="w-10 mr-4" src={UnionPay} alt="" />
        <img className="w-10 mr-4" src={DinersClub} alt="" />
        <div className="absolute w-full h-full"></div>
      </div>

      <form onSubmit={handleSubmit} className="mb-6 mt-3">
        <div className="form-group">
          <div className="text-base font-normal pt-6 pb-4">
            <label htmlFor="card-element">Enter Your Valid Informations</label>
          </div>
          <input
            className="w-1/2 px-6 py-1.5 mb-6 text-sm font-normal leading-6 font-poppins bg-gray-50 rounded-2xl outline-none border-none text-black"
            type="text"
            name="card_number"
            onChange={(e) => setAmount(e.target.value)}
            id="payment_amount"
            placeholder="$amount"
          />
          <CardElement
            id="card-element"
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
          />
        </div>

        <div className="pt-6 text-center">
          <input
            type="submit"
            value="Pay Now"
            className="px-6 py-2 text-base font-poppins cursor-pointer text-white bg-black shadow-sm rounded-full border border-black"
          />
        </div>
      </form>
    </div>
  );
};

export default CardPaymentForm;
