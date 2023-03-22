import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { message } from "antd";
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

const CardPaymentForm = ({ requestedLeadDetails, amount, setAmount }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();

  // const [card, setCard] = useState({
  //   number: "",
  //   exp_month: "",
  //   exp_year: "",
  //   cvc: "",
  // });

  useEffect(() => {
    if (amount) {
      Storage.setItem("l_Details", requestedLeadDetails?.leadDetails);
    }

    // (async () => {
    //   const stripe = await stripePromise;

    //   const { error, token } = await stripe.createToken({
    //     card: {
    //       number: "4242424242424242",
    //       exp_month: 12,
    //       exp_year: 2023,
    //       cvc: "123",
    //     },
    //   });
    //   console.log("token.id", token);

    //   if (error) {
    //     console.log("error", error);
    //   } else {
    //     console.log("token.id", token);
    //   }
    // })();
  }, [amount, requestedLeadDetails?.leadDetails]);

  // useEffect(() => {
  //   const scriptContainer = document.getElementById("e-way");
  //   scriptContainer.innerHTML = "";
  //   const script = document.createElement("script");
  //   script.src = "https://secure.ewaypayments.com/scripts/eCrypt.js";
  //   script.className = "eway-paynow-button";
  //   script.setAttribute(
  //     "data-publicapikey",
  //     `${process.env.REACT_APP_EWAY_ACCESS_KEY}`
  //   );
  //   script.setAttribute("data-amount", `${amount * 100}`);
  //   script.setAttribute("data-currency", "AUD");
  //   script.setAttribute("data-submitform", "yes");
  //   script.setAttribute(
  //     "data-resulturl",
  //     `http://localhost:3000/success/${requestedLeadDetails?.leadDetails?.lead_id}-${requestedLeadDetails?.leadDetails?.client_id}`
  //     // `${process.env.REACT_APP_CLIENT_URL}/success/${requestedLeadDetails?.leadDetails?.lead_id}-${requestedLeadDetails?.leadDetails?.client_id}`
  //   );

  //   script.async = true;
  //   scriptContainer.appendChild(script);
  // }, [
  //   amount,
  //   requestedLeadDetails?.leadDetails?.client_id,
  //   requestedLeadDetails?.leadDetails?.lead_id,
  // ]);

  console.log(requestedLeadDetails);

  const handleSubmit = async (event) => {
    dispatch(setLoader(true));
    event.preventDefault();

    const { error, token } = await stripe.createToken(
      elements.getElement(CardElement)
    );

    if (error) {
      console.log(error.message);
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
        message.success("Payment Completed Successfully");
        navigate(`/success/${requestedLeadDetails?.leadDetails?.lead_id}`);
      }

      dispatch(setLoader(false));
    }
  };

  // const handleChange = (event) => {
  //   const { name, value } = event.target;
  //   setCard((prevState) => ({ ...prevState, [name]: value }));
  // };

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

      {/* <div className="mt-4">
        <p className="font-poppins font-light text-black mb-1 ml-6">
          Enter Payment Amount
        </p>
        <div className="flex justify-between items-center">
          <input
            className="w-1/2 px-6 py-2.5 text-base font-normal leading-6 font-poppins bg-gray-100 rounded-2xl outline-none border-none text-black"
            type="text"
            name="card_number"
            onChange={(e) => setAmount(e.target.value)}
            id="payment_amount"
            placeholder="$amount"
          />
          <input
            className="w-1/2 px-6 py-2.5 text-base font-normal leading-6 font-poppins bg-gray-100 rounded-2xl outline-none border-none text-black"
            type="text"
            name="card_number"
            onChange={(e) => setAmount(e.target.value)}
            id="payment_amount"
            placeholder="$amount"
          />
        </div>
      </div> */}

      {/* <div className="relative mt-2">
        <button id="e-way"></button>
        {!amount ? (
          <Tooltip title="Oopps! No amount added" placement="left">
            <div className="w-1/3 h-full cursor-not-allowed absolute top-0"></div>
          </Tooltip>
        ) : null}
      </div> */}

      {/* <form action="">
        <div className="flex justify-between">
          <div className="mt-4">
            <p className="font-poppins font-light text-black mb-1 ml-6">
              Card number
            </p>
            <div>
              <input
                className="w-66 px-6 py-2.5 text-base font-normal leading-6 font-poppins bg-gray-100 rounded-2xl outline-none border-none text-black"
                type="text"
                name="card_number"
                id=""
                placeholder="Card number"
              />
            </div>
          </div>
          <div className="mt-4">
            <p className="font-poppins font-light text-black mb-1 ml-6">CVV</p>
            <div>
              <input
                className="w-44 px-6 py-2.5 text-base font-normal leading-6 font-poppins bg-gray-100 rounded-2xl outline-none border-none text-black"
                type="text"
                name="tran_id"
                id=""
                placeholder="CVV"
              />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="mt-6">
            <p className="font-poppins font-light text-black mb-1 ml-6">
              Name on card
            </p>
            <div>
              <input
                className="w-66 px-6 py-2.5 text-base font-normal leading-6 font-poppins bg-gray-100 rounded-2xl outline-none border-none text-black"
                type="text"
                name="tran_id"
                id=""
                placeholder="Name on card"
              />
            </div>
          </div>
          <div className="mt-6">
            <p className="font-poppins font-light text-black mb-1 ml-6">
              Amount
            </p>
            <div>
              <input
                className="w-44 px-6 py-2.5 text-base font-normal leading-6 font-poppins bg-gray-100 rounded-2xl outline-none border-none text-black"
                type="text"
                name="amount"
                id=""
                placeholder="Amount"
              />
            </div>
          </div>
        </div>
        <div className="mt-6">
          <p className="font-poppins font-light text-black mb-1 ml-6">
            Expiration date
          </p>
          <div>
            <input
              className="w-66 px-6 py-2.5 text-base font-normal leading-6 font-poppins bg-gray-100 rounded-2xl outline-none border-none text-black"
              type="date"
              name="expiration_date"
              id=""
              placeholder="DD/MM/YY"
            />
          </div>
        </div>
        <div className="flex justify-center items-center mt-8">
          <button
            type="submit"
            className="mx-auto w-68 text-black bg-white px-8 py-3 rounded-full cursor-pointer font-semibold font-poppins border border-black"
          >
            Confirm
          </button>
        </div>
      </form> */}
    </div>
  );
};

export default CardPaymentForm;
