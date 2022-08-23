import { message } from "antd";
import React, { useEffect, useRef, useState } from "react";
import paypalLogo from "../../assets/Images/paypal.png";

const key = "updatable";

export default function PayPalPaymentForm() {
  const paypalRef = useRef();
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    if (window.myButton) window.myButton.close();
    window.myButton = window.paypal.Buttons({
      createOrder: (data, actions) => {
        console.log(amount);
        return actions.order.create({
          purchase_units: [
            {
              description: "RLP Course",
              amount: {
                currency_code: "USD",
                value: amount,
              },
            },
          ],
        });
      },
      onApprove: async (data, actions) => {
        const order = await actions.order.capture();
        if (order) {
          message.loading({ content: "Paying...", key });
          setTimeout(() => {
            message.success({
              content: `Successfully Paid $${amount}`,
              key,
              duration: 2,
            });
          }, 3000);
        }
      },
      onError: (err) => {
        if (err) {
          message.loading({ content: "Paying...", key });
          setTimeout(() => {
            message.warning({
              content: `Something went wrong check your PayPal account`,
              key,
              duration: 2,
            });
          }, 3000);
        }
      },
    });
    window.myButton.render(paypalRef.current);
  }, [amount]);

  return (
    <div>
      <div className="mb-6">
        <img className="w-10" src={paypalLogo} alt="" />
      </div>
      <div>
        <p className="font-poppins font-light text-black mb-1 ml-6">Amount</p>
        <input
          className="w-full mb-4 px-6 py-2.5 text-base font-normal leading-6 font-poppins bg-gray-100 rounded-2xl outline-none border-none text-black"
          type="text"
          name="amount"
          id=""
          placeholder="Amount"
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <div ref={paypalRef}></div>
    </div>
  );
}
