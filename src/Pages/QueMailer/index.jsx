import { useState } from "react";
import CsvParser from "./CsvParser";
import MailDashboard from "./MailDashboard";
import { useSelector } from "react-redux";

function App() {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [file, setFile] = useState("");
  const [activeItem, setActiveItem] = useState("Email");
  const [openMailModal, setOpenMailModal] = useState(false);
  const [successMail, setSuccessMail] = useState({ id: 1, success: false });
  const colorMode = useSelector((state) => state?.user)?.colorMode;

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
        </div>

        {/* EMAIL EDITING SECTION */}
        {activeItem === "Email" && (
          <div className="flex h-full justify-between gap-8 ">
            <div className="w-full rounded-md shadow-md backdrop-blur-2xl bg-[#ffffff11] max-h-[77vh] p-8 !z-4">
              <MailDashboard
                openMailModal={openMailModal}
                setOpenMailModal={setOpenMailModal}
                data={data}
                setSuccessMail={setSuccessMail}
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
                successMail={successMail}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
