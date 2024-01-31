import { useState, useEffect } from "react";
import CsvParser from "./CsvParser";
import MailDashboard from "./MailDashboard";
import EmailHistory from "./EmailHistory";
import { useSelector } from "react-redux";
import EmailSettings from "./EmailSettings";
import { handleCurrentEmail } from "../../Components/services/que-mail";

function App() {
  const [data, setData] = useState([]);
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

  useEffect(() => {
    async function fetchCurrentEmail() {
      const res = await handleCurrentEmail(+userDetails.userInfo.id);
      setCurrentEmail(res?.data);
    }
    if (currentEmail === null) {
      fetchCurrentEmail();
    }
  }, [currentEmail, userDetails.userInfo.id]);

  return (
    <div className="flex items-center justify-center w-full h-screen gap-8">
      <div className="flex flex-col justify-start gap-8 w-full mx-5 h-[90vh]">
        {/* MENU BAR */}
        <div className="flex gap-8 w-full rounded-md shadow-md backdrop-blur-2xl bg-[#ffffff11] p-8">
          <button
            className={`${
              colorMode
                ? `hover:text-white ${
                    activeItem === "Email" ? "text-white" : "text-slate-300"
                  }`
                : `hover:text-gray-800 ${
                    activeItem === "Email" ? "text-gray-800" : "text-gray-500"
                  }`
            } px-4 text-base`}
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
            } px-4 text-base`}
            onClick={() => {
              setActiveItem("Email History");
            }}
          >
            Email History
          </button>
          <button
            disabled
            className={`${
              colorMode ? "text-slate-600" : "text-gray-300"
            } px-4 text-base`}
            // ${ colorMode
            //     ? `hover:text-white ${
            //         activeItem === "Statistics"
            //           ? "text-white"
            //           : "text-slate-300"
            //       }`
            //     : `hover:text-gray-800 ${
            //         activeItem === "Statistics"
            //           ? "text-gray-800"
            //           : "text-gray-500"
            //       }`}

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
                    activeItem === "Email Settings"
                      ? "text-white"
                      : "text-slate-300"
                  }`
                : `hover:text-gray-800 ${
                    activeItem === "Email Settings"
                      ? "text-gray-800"
                      : "text-gray-500"
                  }`
            } px-4 text-base`}
            onClick={() => {
              setActiveItem("Email Settings");
            }}
          >
            Email Settings
          </button>
        </div>
        {currentEmail?.status !== 404 ? (
          <>
            {/* EMAIL EDITING SECTION */}
            {activeItem === "Email" && (
              <div className="flex h-full justify-between gap-8 ">
                <div className="w-full rounded-md shadow-md backdrop-blur-2xl bg-[#ffffff11] max-h-[77vh] p-8 !z-4">
                  <MailDashboard
                    openMailModal={openMailModal}
                    setOpenMailModal={setOpenMailModal}
                    data={data}
                    setData={setData}
                    setSuccessMail={setSuccessMail}
                    currentEmail={currentEmail}
                    setMailProgress={setMailProgress}
                    mailProgress={mailProgress}
                    successMail={successMail}
                    setFileName={setFileName}
                    setFile={setFile}
                  />
                </div>
                <div className="w-1/3 ">
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
                  />
                </div>
              </div>
            )}
          </>
        ) : (
          <>
            {activeItem === "Email" && (
              <div className="flex items-center justify-center h-full">
                <h1>You need to set an email first</h1>
              </div>
            )}
          </>
        )}
        {activeItem === "Email History" && (
          <div className="flex h-full justify-between gap-8 ">
            <div className="w-full rounded-md shadow-md backdrop-blur-2xl bg-[#ffffff11] max-h-[77vh] p-8 !z-4">
              <EmailHistory />
            </div>
          </div>
        )}

        {activeItem === "Email Settings" && (
          <div className="flex h-full justify-between gap-8 ">
            <div className="w-full rounded-md shadow-md backdrop-blur-2xl bg-[#ffffff11] h-[77vh] p-8 !z-4 overflow-hidden">
              <EmailSettings currentEmail={currentEmail} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
