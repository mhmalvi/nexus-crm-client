import React, { useState } from "react";
import BankPaymentForm from "./BankPaymentForm";
import CardPaymentForm from "./CardPaymentForm";

const Pay = () => {
  const [transactionsMethod, setTransactionsMethod] = useState(0);
  // const [transactionsType, setTransactionsType] = useState("payment");

  const paymentOptions = [
    {
      id: 0,
      title: "Credit/Debit Card",
      component: <CardPaymentForm />,
    },
    {
      id: 1,
      title: "After Pay",
      component: <CardPaymentForm />,
    },
    {
      id: 2,
      title: "Bank",
      component: <BankPaymentForm />,
    },
  ];

  return (
    <div className="bg-white mt-18 2xl:mt-25 pt-1">
      <div className="mx-auto  2xl:pb-0">
        <div className="rounded-2xl flex justify-center items-end">
          <div className="px-8 py-10 rounded-2xl border border-gray-400">
            <div>
              <div>
                <div className="mb-14 flex items-start justify-between">
                  <div className="font-semibold text-base leading-6 font-poppins">
                    <div>
                      <h1 className="text-xl leading-8 font-poppins font-semibold mb-0">
                        Davidov Artur
                      </h1>
                    </div>
                    <div className="font-medium text-base leading-6 font-poppins flex items-center mt-2">
                      {/* <span>Email:&nbsp;</span> */}
                      <span>art89@google.com</span>
                    </div>
                  </div>
                  <div className="text-xl leading-8 font-poppins font-semibold mb-0 text-brand-color text-opacity-90">
                    {/* <span>Courses:&nbsp;</span> */}
                    <span>Fashion Designing</span>
                  </div>
                </div>
              </div>
              <div>
                <h2 className="font-semibold text-2xl leading-8 font-poppins text-black text-center pb-6">
                  Transactions
                </h2>
              </div>
            </div>
            <form action="/">
              <div className="flex items-center mb-8">
                {/* Payment Methods */}
                {paymentOptions.map((option) => (
                  <div
                    key={option.id}
                    onClick={() => setTransactionsMethod(option.id)}
                  >
                    <h1
                      className={`text-base leading-4 font-medium font-poppins px-6 p-4 cursor-pointer mr-6 ${
                        transactionsMethod === option.id
                          ? "text-white bg-black"
                          : "text-black bg-white"
                      }  rounded-full`}
                      style={{
                        border: "1px solid rgba(124, 141, 181, 0.5)",
                      }}
                    >
                      {option.title}
                    </h1>
                  </div>
                ))}
              </div>

              <div>
                {paymentOptions
                  .filter((item) => item.id === transactionsMethod)
                  .map((form) => (
                    <div key={form.id}>{form.component}</div>
                  ))}
              </div>

              {/* {transactionsMethod === "Credit/Debit Card" ? (
                <div className="mt-6">
                  <p className="font-poppins font-light text-black mb-1">
                    Card number
                  </p>
                  <div>
                    <input
                      className="w-66 px-6 py-2.5 text-base font-normal leading-6 font-poppins bg-gray-100 rounded-2xl outline-none border-none text-black"
                      type="text"
                      name="tran_id"
                      id=""
                      defaultValue="fkgjdriofhsdfhg"
                    />
                  </div>
                </div>
              ) : (
                <div className="mt-6">
                  <p className="font-poppins font-light text-black mb-1">
                    Password
                  </p>
                  <div>
                    <input
                      className="w-66 px-6 py-2.5 text-base font-normal leading-6 font-poppins bg-gray-100 rounded-2xl outline-none border-none text-black"
                      type="text"
                      name="tran_id"
                      id=""
                      defaultValue="562566"
                    />
                  </div>
                </div>
              )} */}

              {/* <div className="mt-6">
                <p className="font-poppins font-light text-black mb-1">
                  Amount
                </p>
                <div>
                  <input
                    className="w-44 px-6 py-2.5 text-base font-normal leading-6 font-poppins bg-gray-100 rounded-2xl outline-none border-none text-black"
                    type="text"
                    name="acc_number"
                    id=""
                    defaultValue="400"
                  />
                </div>
              </div> */}
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
        </div>
      </div>
    </div>
  );
};

export default Pay;
