import React from "react";

const CardPaymentForm = () => {
  return (
    <div>
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
            placeholder="MM/YY"
          />
        </div>
      </div>
    </div>
  );
};

export default CardPaymentForm;
