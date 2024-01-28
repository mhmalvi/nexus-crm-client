import React from "react";
import Papa from "papaparse";
import { useSelector } from "react-redux";
import "./quemailer.css";

const allowedExtensions = ["csv"];

const CSVParser = ({
  setError,
  setData,
  error,
  data,
  file,
  setFile,
  successMail,
}) => {
  const colorMode = useSelector((state) => state?.user)?.colorMode;
  const handleFileChange = (e) => {
    setError("");

    if (e.target.files.length) {
      const inputFile = e.target.files[0];
      const fileExtension = inputFile?.type.split("/")[1];

      if (!allowedExtensions.includes(fileExtension)) {
        setError("Please input a csv file");
        return;
      }

      setFile(inputFile);
    }
  };

  const handleParse = () => {
    if (!file) return alert("Enter a valid file");

    const reader = new FileReader();

    reader.onload = async ({ target }) => {
      const csv = Papa.parse(target.result, {
        header: false,
      });

      const parsedData = csv?.data;
      setData(parsedData || []);
    };

    reader.readAsText(file);
  };

  return (
    <div className="h-[77vh] flex flex-col gap-8">
      <div className="rounded-md shadow-md backdrop-blur-2xl bg-[#ffffff11] !z-1 h-full overflow-hidden">
        {error ? (
          error
        ) : (
          <div>
            <h2
              className={`${
                colorMode
                  ? "text-slate-300 bg-[#ffffff11]"
                  : "text-gray-800 bg-[#ffffff7f]"
              } m-0 p-0 text-xl px-8 py-2`}
            >
              Emails
            </h2>
            <ol className="px-8 py-2 h-[55vh] overflow-y-scroll">
              {data.map((email, index) => (
                <li
                  className={`border-b ${
                    colorMode ? "border-slate-300" : "border-gray-800"
                  } py-4 px-2 grid grid-cols-6 `}
                  key={index}
                >
                  <p
                    className={`${
                      colorMode ? "text-slate-300" : "text-gray-800"
                    } col-span-1 flex items-center justify-center p-0 m-0`}
                  >
                    {index + 1}
                  </p>
                  <h1
                    className={`${
                      colorMode ? "text-slate-300" : "text-gray-800"
                    } col-span-4 flex items-center justify-center p-0 m-0`}
                  >
                    {email[0]}
                  </h1>
                  <p
                    className={`${
                      colorMode ? "text-slate-300" : "text-gray-800"
                    } col-span-1 flex items-center justify-center p-0 m-0`}
                  >
                   {successMail[email] ? "Tick" : "Cross"}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>
      <div className="rounded-md shadow-md backdrop-blur-2xl bg-[#ffffff11] !z-1 h-1/4 overflow-hidden">
        <h3
          className={`${
            colorMode
              ? "text-slate-300 bg-[#ffffff11]"
              : "text-gray-800 bg-[#ffffff7f]"
          } px-8 py-2 text-xl`}
        >
          Upload a CSV file
        </h3>
        <div className="csvFile flex w-full items-center justify-between h-1/2 px-8">
          <input
            onChange={handleFileChange}
            name="file"
            type="file"
            className={`${colorMode ? "text-slate-300" : "text-gray-800"}`}
          />
          <button
            onClick={handleParse}
            className={`w-1/3 py-2 px-4 rounded-md border text-xs ${
              colorMode
                ? "border-slate-300 text-slate-300"
                : "border-gray-800 text-gray-800"
            }`}
          >
            Parse CSV
          </button>
        </div>
      </div>
    </div>
  );
};

export default CSVParser;
