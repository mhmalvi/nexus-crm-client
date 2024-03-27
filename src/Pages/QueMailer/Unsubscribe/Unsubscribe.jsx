import React, { useState } from "react";
import { unsubscribeFromEmail, unsubscribeFromQueLeadsMail } from "../../../Components/services/que-mail";
import { useSelector } from "react-redux";
import { errorNotification, successNotification } from "../../../Components/Shared/Toast";

const Unsubscribe = () => {
  
  const userDetails = useSelector((state) => state?.user?.userInfo);
  const [email, setEmail] = useState({
    recipients_mail: "",
  });
  const handleUnsubscribe = async () => {
    if (userDetails?.role_id === 1) {
      const res = await unsubscribeFromEmail(email);
      if (res?.status === 201) {
        successNotification("You have been successfully unsubscribed.");
      } else {
        errorNotification(res?.data?.message);
      }
  } else {
      const res = await unsubscribeFromQueLeadsMail(email);
      if (res?.status === 201) {
        successNotification("You have been successfully unsubscribed.");
      } else {
        errorNotification(res?.data?.message);
      }
  }
  };
  return (
    <div className="h-screen w-full flex flex-col gap-4 items-center justify-center">
      <h1 className="text-center text-gray-800 text-2xl">
        We are so sorry that you have to unsubscribe
      </h1>
      <form className="w-96 flex flex-col gap-4 bg-[#ffffff11] background-blur-2xl rounded shadow p-8">
        <h1 className="text-base font-semibold text-gray-800 m-0 p-0">
          Enter email address below to unsubscribe:
        </h1>
        <input
          type="email"
          required
          placeholder="john_doe@email.com"
          className="block w-full border border-gray-300 rounded-md"
          onChange={(e) => {
            setEmail({ recipients_mail: e.target.value });
          }}
        />
        <button
          type="button"
          disabled = {email.recipients_mail  ? false : true}
          className="flex items-center justify-center py-2 px-4 text-slate-300 bg-brand-color rounded-md hover:text-white ease-in duration-100 disabled:bg-slate-300 disabled:text-slate-500"
          onClick={handleUnsubscribe}
        >
          Unsubscribe
        </button>
      </form>
    </div>
  );
};

export default Unsubscribe;
