import { message } from "antd";
import React, { useState } from "react";
import { handleAddLeadPaymentHistory } from "../../Components/services/payment";

const AddPaymentHistory = ({
  leadDetails,
  setIsAddPaymentHistoryOpen,
  syncTotalPaid,
  setSyncTotalPaid,
}) => {
  const [amount, setAmount] = useState();
  console.log("leadDetails", leadDetails);

  const handleAddPaymentHistoryReq = async () => {
    const resp = await handleAddLeadPaymentHistory({
      payer_id: `P_${leadDetails?.leadDetails?.lead_id}`,
      payment_amount: amount,
      company_id: leadDetails?.leadDetails?.client_id,
      lead_id: leadDetails?.leadDetails?.lead_id,
      first_name: leadDetails?.leadDetails?.full_name,
      last_name: "",
      street1: "",
      street2: "",
      city: "",
      state: "",
      postal_code: "",
      country: "",
      email: leadDetails?.leadDetails?.student_email,
      phone: "",
      mobile: "",
      course_title: leadDetails?.leadDetails?.course_title,
      course_code: leadDetails?.leadDetails?.course_code,
    });

    if (resp?.status === 201) {
      message.success("Payment Added Successfully");
      setSyncTotalPaid(!syncTotalPaid);
      setAmount(0);
      setIsAddPaymentHistoryOpen(false);
    }
  };

  return (
    <div className="w-full flex flex-col gap-4 font_poppins">
      <h1 className="m-0 p-0 text-lg text-slate-300 font-semibold">
        Add Payment History
      </h1>

      <div className="flex flex-col items-start gap-2 justify-center">
        <h1 className="text-base text-slate-300 m-0 p-0">Enter the Amount:</h1>
        <input
          id="amount"
          name="amount"
          autofocus
          className={`px-2 w-full py-2 bg-transparent focus:ring-brand-color rounded-md placeholder:!text-slate-300`}
          type="number"
          placeholder="$0"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          autoFocus={true}
        />
      </div>

      <div className="flex justify-center gap-4">
        <button
          className="py-2 font-semibold px-4 w-full text-gray-800 bg-slate-300 rounded-md transition-colors duration-150 focus:shadow-outline hover:text-red-500 "
          onClick={() => setIsAddPaymentHistoryOpen(false)}
        >
          Cancel
        </button>

        <button
          key="submit"
          onClick={handleAddPaymentHistoryReq}
          className="py-2 font-semibold px-4 w-full text-slate-300 bg-brand-color rounded-md transition-colors duration-100 focus:shadow-outline hover:text-gray-800 "
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default AddPaymentHistory;
