import { message } from "antd";
import React, { useEffect, useRef, useState } from "react";

const key = "updatable";

export default function PayPalPaymentForm() {
  const paypal = useRef();
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
        console.log(order);
      },
      onError: (err) => {
        console.error(err);
      },
    });
    window.myButton.render(paypal.current);
  }, [amount]);

  return (
    <div>
      <div>
        <input
          className="w-full mb-4 px-6 py-2.5 text-base font-normal leading-6 font-poppins bg-gray-100 rounded-2xl outline-none border-none text-black"
          type="text"
          name="amount"
          id=""
          placeholder="Amount"
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <div ref={paypal}></div>
    </div>
  );
}
