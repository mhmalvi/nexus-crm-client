// import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
// import { message } from "antd";
import React, { useState } from "react";
// import paypalLogo from "../../assets/Images/paypal.png";

// const key = "updatable";

export default function PayPalPaymentForm() {
  // const paypalRef = useRef();
  const [amount, setAmount] = useState(0);
  console.log(setAmount);

  // const [show, setShow] = useState(false);
  // const [success, setSuccess] = useState(false);
  // const [errorMessage, setErrorMessage] = useState("");
  // const [orderId, setOrderId] = useState(false);

  console.log(amount);

  // useEffect(() => {
  //   if (window.myButton) window.myButton.close();
  //   window.myButton = window.paypal.Buttons({
  //     createOrder: (data, actions) => {
  //       return actions.order.create({
  //         purchase_units: [
  //           {
  //             description: "RLP Course",
  //             amount: {
  //               currency_code: "AUD",
  //               value: amount,
  //             },
  //           },
  //         ],
  //       });
  //     },
  //     onApprove: async (data, actions) => {
  //       const order = await actions.order.capture();
  //       console.log(data);
  //       console.log(order);
  //       if (order) {
  //         message.loading({ content: "Paying...", key });
  //         setTimeout(() => {
  //           message.success({
  //             content: `Successfully Paid $${amount}`,
  //             key,
  //             duration: 2,
  //           });
  //         }, 3000);
  //       }
  //     },
  //     onError: (err) => {
  //       if (err) {
  //         message.loading({ content: "Paying...", key });
  //         setTimeout(() => {
  //           message.warning({
  //             content: `Something went wrong check your PayPal account`,
  //             key,
  //             duration: 2,
  //           });
  //         }, 3000);
  //       }
  //     },
  //   });
  //   window.myButton.render(paypalRef.current);
  // }, [amount]);

  // const createOrder = (data, actions) => {
  //   return actions.order
  //     .create({
  //       purchase_units: [
  //         {
  //           description: "This is the Book Worth 100",
  //           amount: {
  //             currency_code: "USD",
  //             value: 100,
  //           },
  //         },
  //       ],
  //       application_context: {
  //         shipping_preference: "NO_SHIPPING",
  //       },
  //     })
  //     .then((orderID) => {
  //       setOrderId(orderID);
  //       return orderID;
  //     });
  // };

  // const onApprove = (data, actions) => {
  //   return actions.order.capture().then(function (details) {
  //     const { payer } = details;
  //     console.log("payer", payer);
  //     setSuccess(true);
  //   });
  // };

  // const onError = (data, actions) => {
  //   setErrorMessage("An error occured with your payment");
  // };

  return (
    <div>
      <h1>
        <span className="text-red-500 text-xl">*</span> Feature Comming Soon...
      </h1>
      {/* <div className="relative mb-6">
        <img className="w-10" src={paypalLogo} alt="" />
        <div className="absolute w-full h-full top-0"></div>
      </div>
      <div>
        <p className="font-poppins font-light text-black mb-1 ml-6">Amount</p>
        <input
          className="w-full mb-4 px-6 py-2.5 text-base font-normal leading-6 font-poppins bg-gray-100 rounded-2xl outline-none border-none text-black"
          type="text"
          name="amount"
          required
          id=""
          placeholder="Amount"
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <div>
        <PayPalScriptProvider
          options={{
            "client-id":
              "AQ4Qra0icbx0sd67S7gW9KdZeIICbt44y-t2OivfBrR11PGyB1tmtoOk-LJV7i8z_wP-hWJ-1qnk0s0j",
          }}
        >
          <PayPalButtons
            style={{ layout: "vertical" }}
            createOrder={createOrder}
            onApprove={onApprove}
            onError={onError}
          />
        </PayPalScriptProvider>
      </div> */}
    </div>
  );
}
