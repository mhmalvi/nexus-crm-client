import "antd/dist/antd.css";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import mailLogo from "../../../assets/Images/gmail.png";
import whatsappLogo from "../../../assets/Images/whatsapp.png";
import MailModal from "./MailModal";

const Conversation = ({ leadDetails, id }) => {
  let dayPickerDays = [];

  const colorMode = useSelector((state) => state?.user)?.colorMode;
  const userDetails = useSelector((state) => state?.user);
  const [openMailModal, setOpenMailModal] = useState(false);

  const showMailModal = () => {
    setOpenMailModal(true);
  };

  for (let i = 0; i < 31; i++) {
    dayPickerDays.push({
      label: i + 1,
      key: i,
    });
  }

  return (
    <div className="w-full shadow-md backdrop-blur-2xl bg-[#ffffff11] rounded-md">
      <h1
        className={`px-5 py-2 text-lg font-poppins ${
          colorMode ? "text-slate-300" : "text-gray-800"
        } shadow-md backdrop-blur-2xl bg-[#ffffff11] rounded-t-md`}
      >
        Contact
      </h1>
      <div className="flex flex-col gap-4 p-5 rounded-t-md">
        {userDetails?.userInfo?.role_id !== 6 ? (
          <button className="px-4 py-2 w-full rounded-md shadow-md backdrop-blur-2xl bg-[#ffffff11] ease-in duration-200 hover:scale-[0.98]">
            <a
              className="flex items-center"
              href={`https://api.whatsapp.com/send?phone=${leadDetails?.leadDetails?.phone_number.replace(
                "+",
                ""
              )}`}
              target="_blank"
              rel="noreferrer"
            >
              <img className="w-6" src={whatsappLogo} alt="" />
              <span
                className={`${
                  colorMode ? "text-slate-300" : "text-gray-800"
                } text-base ml-3`}
              >
                Open in Whatsapp
              </span>
            </a>
          </button>
        ) : null}
        {/* Custom click to open modal message */}

        <button
          className="px-4 py-2 w-full rounded-md shadow-md backdrop-blur-2xl bg-[#ffffff11] ease-in duration-200 hover:scale-[0.98]"
          onClick={showMailModal}
        >
          <div className="flex items-center">
            <img className="w-6" src={mailLogo} alt="" />
            <span
              className={`${
                colorMode ? "text-slate-300" : "text-gray-800"
              } text-base ml-3`}
            >
              Send Mail
            </span>
          </div>
        </button>

        <script
          src="https://secure.ewaypayments.com/scripts/eCrypt.js"
          className="eway-paynow-button"
          data-publicapikey="epk-5C39F555-79BF-4DF3-A805-0260D31CF07B"
          data-amount="10000"
          data-currency="AUD"
        ></script>
        <MailModal
          leadDetails={leadDetails}
          openMailModal={openMailModal}
          setOpenMailModal={setOpenMailModal}
        />
      </div>
    </div>
  );
};

export default Conversation;
