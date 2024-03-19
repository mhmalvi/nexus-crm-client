import { useState, useEffect } from "react";
import CsvParser from "./CsvParser";
import MailDashboard from "./MailDashboard";
import EmailHistory from "./EmailHistory";
import { useSelector } from "react-redux";
import EmailSettings from "./EmailSettings";
import Scheduling from "./Scheduling";
import {
  getEmailHistory,
  getEmailDetailsCount,
  handleCurrentEmail,
  dailyEmailCount,
} from "../../Components/services/que-mail";
import { useNavigate } from "react-router-dom";
import { Storage } from "../../Components/Shared/utils/store";

const QueMailer = () => {
  const [data, setData] = useState([]);
  const [attachment, setAttachment] = useState([]);
  const [error, setError] = useState("");
  const [file, setFile] = useState("");
  const [activeItem, setActiveItem] = useState("Email");
  const [openMailModal, setOpenMailModal] = useState(false);
  const [successMail, setSuccessMail] = useState("");
  const [mailProgress, setMailProgress] = useState("");
  const colorMode = useSelector((state) => state?.user)?.colorMode;
  const userDetails = useSelector((state) => state.user);
  const [currentEmail, setCurrentEmail] = useState(null);
  const [fileName, setFileName] = useState("");
  const [csvFileName, setCSVFileName] = useState("");

  const [bounced, setBounced] = useState([]);

  const navigate = useNavigate();
  const [emailsPerPage, setEmailsPerPage] = useState(20);
  const [emailSessionRow, setEmailSessionRow] = useState(null);
  const [clicked, setClicked] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [emailId, setEmailId] = useState(null);
  const [countInfo, setCountInfo] = useState("");
  const [openCountModal, setOpenCountModal] = useState(false);
  const [dailyCount, setDailyCount] = useState(null);
  const [historyInnerPagination, setHistoryInnerPagination] = useState(1);
  const [totalEmail, setTotalEmail] = useState(null);
  const [headerData, setHeaderData] = useState();
  const [categorizedData, setCategorizedData] = useState();

  useEffect(() => {
    async function fetchCurrentEmail() {
      const res = await handleCurrentEmail(+userDetails.userInfo.id);
      setCurrentEmail(res?.data);
    }
    if (currentEmail === null) {
      fetchCurrentEmail();
    }
  }, [currentEmail, userDetails.userInfo.id]);

  useEffect(() => {
    (async () => {
      try {
        const data = {
          per_page: emailsPerPage,
          user_id: userDetails?.userInfo.id,
        };
        const res = await getEmailHistory(data, currentPage);
        setEmailSessionRow(res.data);
        setTotalEmail(res.data.total);
      } catch (error) {
        console.error("Error fetching email history:", error);
      }
    })();
  }, [currentPage, emailsPerPage, userDetails?.userInfo.id]);

  useEffect(() => {
    async function fetchEmailCount() {
      const data = {
        id: emailId,
        per_page: emailsPerPage,
      };
      const res = await getEmailDetailsCount(data, historyInnerPagination);
      console.log("TOTAL_COUNT", res);
      setCountInfo(res?.data);
    }
    if (openCountModal || successMail) {
      fetchEmailCount();
    }
  }, [
    emailId,
    emailsPerPage,
    historyInnerPagination,
    openCountModal,
    successMail,
  ]);
  useEffect(() => {
    async function fetchDailyEmailCount() {
      const data = {
        user_id: userDetails?.userInfo.id,
      };
      const res = await dailyEmailCount(data);
      if (res?.status === 200) {
        setDailyCount(res?.data);
      }
    }
    if (
      userDetails?.userInfo.id &&
      (dailyCount === null ||
        userDetails.userInfo.id !== dailyCount.user_id ||
        successMail)
    ) {
      fetchDailyEmailCount();
    }
  }, [dailyCount, userDetails?.userInfo.id, successMail]);
  useEffect(() => {
    if (
      userDetails?.userInfo?.verification_status === 1 &&
      Storage.getItem("auth_tok")
    ) {
      navigate("/setup-your-profile");
    } else if (
      userDetails?.userInfo?.verification_status === 2 &&
      Storage.getItem("auth_tok")
    ) {
      navigate("/que-mailer");
    } else if (!Storage.getItem("auth_tok")) {
      navigate("/login");
    }
  }, [navigate, userDetails]);
  return (
    <div className="flex items-start justify-center w-full h-screen py-8">
      <div className="flex flex-col flex-grow gap-4 w-full h-full mx-5 ">
        {/* MENU BAR */}
        <div className="flex justify-between items-center w-full rounded-md shadow-md backdrop-blur-2xl bg-[#ffffff11] py-4">
          <div className="flex gap-4">
            <button
              className={`${
                colorMode
                  ? `hover:text-white ${
                      activeItem === "Email" ? "text-white" : "text-slate-300"
                    }`
                  : `hover:text-gray-800  ${
                      activeItem === "Email" ? "text-gray-800" : "text-gray-500"
                    }`
              } px-4 text-2xl`}
              onClick={() => {
                setActiveItem("Email");
              }}
            >
              Email
            </button>
            <button
              className={`${
                colorMode
                  ? `hover:text-white ${
                      activeItem === "Email History"
                        ? "text-white"
                        : "text-slate-300"
                    }`
                  : `hover:text-gray-800 ${
                      activeItem === "Email History"
                        ? "text-gray-800"
                        : "text-gray-500"
                    }`
              } px-4 text-2xl`}
              onClick={() => {
                setActiveItem("Email History");
              }}
            >
              Email History
            </button>
            <button
              disabled
              className={`${
                colorMode
                  ? "text-slate-600 disabled:text-slate-500"
                  : "text-gray-300 disabled:text-gray-500"
              } px-4 text-2xl cursor-not-allowed`}
              onClick={() => {
                setActiveItem("Statistics");
              }}
            >
              Statistics
            </button>
            <button
              className={`${
                colorMode
                  ? `hover:text-white ${
                      activeItem === "Scheduling"
                        ? "text-white"
                        : "text-slate-300"
                    }`
                  : `hover:text-gray-800 ${
                      activeItem === "Scheduling"
                        ? "text-gray-800"
                        : "text-gray-500"
                    }`
              } px-4 text-2xl`}
              onClick={() => {
                setActiveItem("Scheduling");
              }}
            >
              Scheduling
            </button>
            <button
              className={`${
                colorMode
                  ? `hover:text-white ${
                      activeItem === "Email Settings"
                        ? "text-white"
                        : "text-slate-300"
                    }`
                  : `hover:text-gray-800 ${
                      activeItem === "Email Settings"
                        ? "text-gray-800"
                        : "text-gray-500"
                    }`
              } px-4 text-2xl`}
              onClick={() => {
                setActiveItem("Email Settings");
              }}
            >
              Email Settings
            </button>
          </div>
          <div>
            <h1
              className={`m-0 px-4 py-0 m-0 text-xl ${
                colorMode ? "text-slate-300" : "text-gray-800"
              }`}
            >
              Emails Remaining: {1000 - dailyCount}
            </h1>
          </div>
        </div>
        {activeItem === "Email" &&
          (currentEmail?.status === 404 ||
          currentEmail === null ||
          currentEmail === "" ? (
            <div className="p-0 m-0 ease-in duration-100">
              <div className="flex items-center justify-center h-full">
                <h1
                  className={`${
                    colorMode ? "text-slate-300" : "text-gray-800"
                  }`}
                >
                  You need to set an email first
                </h1>
              </div>
            </div>
          ) : (
            <div className="p-0 m-0 ease-in duration-100 h-full">
              {/* EMAIL EDITING SECTION */}

              <div className="flex h-full justify-between gap-4 z-5 ">
                <div
                  className={`${
                    data.length <= 0 ? "hidden" : "content"
                  } w-3/4 ease-in duration-200 rounded-md shadow-md backdrop-blur-2xl bg-[#ffffff11] p-8 z-10`}
                >
                  <MailDashboard
                    openMailModal={openMailModal}
                    setOpenMailModal={setOpenMailModal}
                    data={data}
                    setData={setData}
                    successMail={successMail}
                    setSuccessMail={setSuccessMail}
                    currentEmail={currentEmail}
                    setMailProgress={setMailProgress}
                    mailProgress={mailProgress}
                    setFileName={setFileName}
                    attachment={attachment}
                    setAttachment={setAttachment}
                    setFile={setFile}
                    csvFileName={csvFileName}
                    setError={setError}
                    categorizedData={categorizedData}
                    headerData={headerData}
                    bounced={bounced}
                  />
                </div>
                <div
                  className={`${
                    data.length <= 0 ? "w-full" : "w-1/4"
                  } flex flex-col z-0`}
                >
                  <CsvParser
                    data={data}
                    setData={setData}
                    error={error}
                    setError={setError}
                    file={file}
                    setFile={setFile}
                    mailProgress={mailProgress}
                    successMail={successMail}
                    fileName={fileName}
                    setFileName={setFileName}
                    setCSVFileName={setCSVFileName}
                    setHeaderData={setHeaderData}
                    setCategorizedData={setCategorizedData}
                    setBounced={setBounced}
                  />
                </div>
              </div>
            </div>
          ))}
        {activeItem === "Email History" && (
          <div className=" rounded-md shadow-md backdrop-blur-2xl bg-[#ffffff11] h-full p-8 !z-4 h-full overflow-hidden">
            <EmailHistory
              emailSessionRow={emailSessionRow}
              setCurrentPage={setCurrentPage}
              setClicked={setClicked}
              setOpenCountModal={setOpenCountModal}
              openCountModal={openCountModal}
              countInfo={countInfo}
              setEmailId={setEmailId}
              setHistoryInnerPagination={setHistoryInnerPagination}
              totalEmail={totalEmail}
              setEmailsPerPage={setEmailsPerPage}
              emailsPerPage={emailsPerPage}
            />
          </div>
        )}

        {activeItem === "Email Settings" && (
          <div className="w-full rounded-md shadow-md backdrop-blur-2xl bg-[#ffffff11] h-full p-8 !z-4 h-full overflow-hidden">
            <EmailSettings currentEmail={currentEmail} />
          </div>
        )}

        {activeItem === "Scheduling" && (
          <div className="w-full rounded-md shadow-md backdrop-blur-2xl bg-[#ffffff11] h-full p-8 !z-4 h-full overflow-hidden">
            <Scheduling />
          </div>
        )}
      </div>
    </div>
  );
};

export default QueMailer;
