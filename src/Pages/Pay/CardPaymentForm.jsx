import React from "react";
import { useEffect, useState } from "react";
import amex from "../../assets/Images/amex.png";
import master from "../../assets/Images/master.png";
import visa from "../../assets/Images/visa.png";

const CardPaymentForm = () => {
  const [amount, setAmount] = useState("");

  useEffect(() => {
    const scriptContainer = document.getElementById("e-way");
    scriptContainer.innerHTML = "";
    const script = document.createElement("script");
    script.src = "https://secure.ewaypayments.com/scripts/eCrypt.js";
    script.className = "eway-paynow-button";
    script.setAttribute(
      "data-publicapikey",
      "epk-5C39F555-79BF-4DF3-A805-0260D31CF07B"
    );
    script.setAttribute("data-amount", `${amount * 100}`);
    script.setAttribute("data-currency", "AUD");
    script.setAttribute("data-submitform", "yes");
    script.setAttribute("data-resulturl", "http://localhost:3000/pay/16541");

    script.async = true;
    scriptContainer.appendChild(script);
  }, [amount]);

  return (
    <div>
      <div className="relative flex items-center mx-auto">
        <img className="w-10" src={visa} alt="" />
        <img className="w-10 mx-4" src={master} alt="" />
        <img className="w-10" src={amex} alt="" />
        <div className="absolute w-full h-full"></div>
      </div>

      <div className="mt-4">
        <p className="font-poppins font-light text-black mb-1 ml-6">
          Enter Payment Amount
        </p>
        <div>
          <input
            className="w-66 px-6 py-2.5 text-base font-normal leading-6 font-poppins bg-gray-100 rounded-2xl outline-none border-none text-black"
            type="text"
            name="card_number"
            onChange={(e) => setAmount(e.target.value)}
            id=""
            placeholder="$amount"
          />
        </div>
      </div>

      <button id="e-way"></button>

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
