import "antd/dist/antd.css";
import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import mailLogo from "../../../assets/Images/gmail.png";
import whatsappLogo from "../../../assets/Images/whatsapp.png";
import { handleLeadDetails } from "../../../Components/services/leads";
import Comments from "./Comments";
import MailModal from "./MailModal";
import StatusShow from "./StatusShow";

const Conversation = ({ leadDetails, id }) => {
  let dayPickerDays = [];

  const userDetails = useSelector((state) => state?.user);
  const [leadDtls, setLeadDtls] = useState({});
  const [openMailModal, setOpenMailModal] = useState(false);
  const params = useParams();

  const showMailModal = () => {
    setOpenMailModal(true);
  };


  useEffect(() => {
    (async () => {
      const lDtails = await handleLeadDetails(params?.id);
      if (lDtails) {
        setLeadDtls(lDtails);
      }
    })();
  }, [params?.id]);
  console.log("ldetails: ", leadDtls);

  for (let i = 0; i < 31; i++) {
    dayPickerDays.push({
      label: i + 1,
      key: i,
    });
  }

  return (
    <div className="min-h-full px-6 border-r">
      <div>
        {/* --------------- Conversation Section -------------- */}
        <div
          style={{
            height: "500px",
          }}
        >
          <h1 className="text-xl leading-8 font-semibold font-poppins text-black text-opacity-50 mb-5">
            Contact
          </h1>

          <div>
            {userDetails?.userInfo?.role_id !== 6 ? (
              <button className="px-4 py-2 bg-white rounded-full shadow-md w-56">
                <a
                  className="flex items-center "
                  href={`https://api.whatsapp.com/send?phone=${leadDetails?.leadDetails?.phone_number.replace(
                    "+",
                    ""
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <img className="w-6" src={whatsappLogo} alt="" />
                  <span className="text-black font-semibold text-base ml-3">
                    Open in Whatsapp
                  </span>
                </a>
              </button>
            ) : null}
          </div>

          {/* Custom click to open modal message */}
          <div className=" mt-6">
            <button
              className="px-4 py-2 bg-white rounded-full shadow-md flex items-center w-56"
              onClick={showMailModal}
            >
              <img className="w-6" src={mailLogo} alt="" />
              <span className="text-black font-semibold text-base ml-3">
                Send Mail
              </span>
            </button>
          </div>

          {/* Coments and Comments history*/}
          <div className="lead-comments mt-12 h-[300px] overflow-y-auto crm-scroll-none">
            <Comments Comments={leadDtls?.leadComments} />
          </div>
          <div className="lead-comments mt-12  h-[400px] overflow-y-auto crm-scroll-none ">
            <StatusShow leadDetails={leadDetails} />
          </div>
        </div>

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
