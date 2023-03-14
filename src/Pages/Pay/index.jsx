import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { handleLeadDetails } from "../../Components/services/leads";
import Icons from "../../Components/Shared/Icons";
import { Storage } from "../../Components/Shared/utils/store";
import BankPaymentForm from "./BankPaymentForm";
import CardPaymentForm from "./CardPaymentForm";
import PayPalPaymentForm from "./PayPalPaymentForm";

const Pay = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const userDetails = useSelector((state) => state.user)?.userInfo;
  const [amount, setAmount] = useState("");
  const [searchParams] = useSearchParams();

  console.log(userDetails);
  console.log(searchParams.get("AccessCode"));

  const [transactionsMethod, setTransactionsMethod] = useState(0);
  const [requestedLeadDetails, setRequestedLeadDetails] = useState();

  useEffect(() => {
    Storage.setItem("l_Details", requestedLeadDetails?.leadDetails);
  }, [requestedLeadDetails?.leadDetails]);

  useEffect(() => {
    (async () => {
      const leadDetailsResponse = await handleLeadDetails(id);
      if (leadDetailsResponse?.status) {
        setRequestedLeadDetails(leadDetailsResponse);
      }
    })();
  }, [id]);

  const paymentOptions = [
    {
      id: 0,
      title: "E-way",
      component: (
        <CardPaymentForm
          requestedLeadDetails={requestedLeadDetails}
          amount={amount}
          setAmount={setAmount}
        />
      ),
    },
    {
      id: 1,
      title: "PayPal",
      component: <PayPalPaymentForm />,
    },
    {
      id: 2,
      title: "Bank",
      component: <BankPaymentForm />,
    },
  ];

  return (
    <div className="bg-white mt-18 2xl:mt-25 pt-1">
      <div
        className="ml-4 flex items-center cursor-pointer"
        onClick={() => {
          navigate(`../lead/${id}`);
        }}
      >
        <Icons.DownArrow className="rotate-90" />
        <span className="text-base font-semibold ml-2">Back</span>
      </div>
      <div className="mx-auto 2xl:pb-0">
        <div className="rounded-2xl flex justify-center items-end">
          <div className="px-8 py-10 rounded-2xl border border-gray-400">
            <div>
              <div>
                <div className="mb-10 flex items-start justify-between">
                  <div className="font-semibold text-base leading-6 font-poppins">
                    <div>
                      <h1 className="w-72 text-lg leading-8 font-poppins font-semibold mb-0">
                        {requestedLeadDetails?.leadDetails?.full_name}
                      </h1>
                    </div>
                    <div className="w-72 font-medium text-base leading-6 font-poppins flex items-center mt-2">
                      <span>
                        {requestedLeadDetails?.leadDetails?.student_email}
                      </span>
                    </div>
                  </div>
                  <div>
                    <div className="w-60 text-end text-lg leading-8 font-poppins font-semibold mb-0 text-brand-color text-opacity-90">
                      {/* <span>Courses:&nbsp;</span> */}
                      <span>
                        {requestedLeadDetails?.leadDetails?.course_title}
                      </span>
                    </div>
                    <div>
                      <h4 className="text-end font-medium text-base leading-8 text-black pb-6">
                        Total Payable:{" "}
                        {requestedLeadDetails?.leadAmountHistory?.length ? (
                          <span className="text-red-600">
                            {requestedLeadDetails?.leadAmountHistory[0]
                              ?.amount - JSON.parse(Storage.getItem("_tp_"))}
                          </span>
                        ) : (
                          <span className="text-red-600">Not Set Yet</span>
                        )}
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h2 className="font-semibold text-2xl leading-8 font-poppins text-black text-center pb-6">
                  Transactions
                </h2>
              </div>
            </div>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pay;
