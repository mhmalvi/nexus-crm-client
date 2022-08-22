import React from "react";
import visa from "../../assets/Images/visa.png";
import master from "../../assets/Images/master.png";
import amex from "../../assets/Images/amex.png";

const CardPaymentForm = () => {
  return (
    <div>
      <div className="flex items-center mx-auto">
        <img className="w-10" src={visa} alt="" />
        <img className="w-10 mx-4" src={master} alt="" />
        <img className="w-10" src={amex} alt="" />
      </div>
      <form action="">
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
      </form>
    </div>
  );
};

export default CardPaymentForm;
