import React, { useState } from "react";

export default function PayPalPaymentForm() {
  const [amount, setAmount] = useState(0);
  console.log(setAmount);

  console.log(amount);


  return (
    <div>
      <h1>
        <span className="text-red-500 text-xl">*</span> Feature Comming Soon...
      </h1>
    </div>
  );
}
