import { message } from "antd";
import React, { useState } from "react";
import { handleAddLeadPaymentHistory } from "../../Components/services/payment";

const AddPaymentHistory = ({
  leadDetails,
  setIsAddPaymentHistoryOpen,
  syncDetails,
  setSyncDetails,
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
    });

    if (resp?.status === 201) {
      message.success("Payment Added Successfully");
      setSyncTotalPaid(!syncTotalPaid);
      setAmount(0);
      setIsAddPaymentHistoryOpen(false);
    }
  };

  return (
    <div className="w-10/12 mx-auto font_poppins">
      <div className="text-lg font-semibold mt-6 mb-8">Add Payment History</div>
      <div>
        <div className="flex items-center gap-4">
          <div className="w-1/2 text-lg text-[#808080] leading-8 mb-4 tracking-wide">
            <h1 className="text-sm mb-1">Enter the Amount:</h1>
            <input
              id="amount"
              name="amount"
              className={`mt-1 px-2 block w-full py-2 border-b border-gray-300 bg-zinc-50 focus:outline-none focus:ring-brand-color focus:border-b focus:border-brand-color sm:text-sm`}
              type="number"
              placeholder="$0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="flex justify-center my-10 gap-1">
        <div>
          <button
            className="py-1 font-semibold px-4 w-full mr-4 text-red-500 bg-white border border-red-500 rounded-lg transition-colors duration-150 focus:shadow-outline hover:border-gray-800 hover:text-gray-800 tracking-wide"
            onClick={() => setIsAddPaymentHistoryOpen(false)}
          >
            Cancel
          </button>
        </div>
        <div>
          <button
            key="submit"
            onClick={handleAddPaymentHistoryReq}
            className="py-1 font-semibold px-4 w-full border border-black text-white bg-black rounded-lg transition-colors duration-150 focus:shadow-outline hover:bg-gray-800 tracking-wide"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddPaymentHistory;
