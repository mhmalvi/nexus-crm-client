import React, { useState } from "react";
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
  mailProgress,
  setFileName,
  fileName,
}) => {
  const colorMode = useSelector((state) => state?.user)?.colorMode;

  const handleFileChange = (e) => {
    setError("");
    if (successMail === "success") {
      const inputFile = "";
      const fileExtension = inputFile?.type.split("/")[1];

      if (!allowedExtensions.includes(fileExtension)) {
        setError("Please input a csv file");
        return;
      }
      setData([]);
      setFileName("");
      setFile("");
    } else if (e.target.files.length) {
      const inputFile = e.target.files[0];
      const fileExtension = inputFile?.type.split("/")[1];

      if (!allowedExtensions.includes(fileExtension)) {
        setError("Please input a csv file");
        return;
      }

      setFileName(inputFile.name);
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

      const parsedData = csv?.data || [];

      const filteredData = parsedData.filter((row) =>
        row.some((cell) => cell.trim() !== "")
      );

      setData(filteredData);
    };

    reader.readAsText(file);
  };

  return (
    <div className="h-[77vh] flex flex-col gap-8">
      <div className="rounded-md shadow-md backdrop-blur-2xl bg-[#ffffff11] !z-1 h-3/4 overflow-hidden ">
        {error ? (
          error
        ) : (
          <div className="h-full m-0 p-0">
            <h2
              className={`${
                colorMode
                  ? "text-slate-300 bg-[#ffffff11]"
                  : "text-gray-800 bg-[#ffffff7f]"
              } m-0 p-0 text-xl px-8 py-2`}
            >
              Email To
            </h2>
            {mailProgress ? (
              <div className="px-8 py-0 my-0 flex flex-col items-center justify-center h-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlSpace="preserve"
                  viewBox="0 0 100 100"
                  id="check"
                  className={`${
                    successMail === "success"
                      ? "ready"
                      : successMail === "failed"
                      ? "failed"
                      : "progress"
                  }`}
                >
                  <circle
                    id="circle"
                    cx="50"
                    cy="50"
                    r="46"
                    fill="transparent"
                  />
                  <polyline
                    id="tick"
                    points="25,55 45,70 75,33"
                    fill="transparent"
                  />
                  <g>
                    <polyline
                      id="cross"
                      points="25,30 75,70"
                      fill="transparent"
                    />
                    <polyline
                      id="cross"
                      points="25,70 72,30"
                      fill="transparent"
                    />
                  </g>
                </svg>
              </div>
            ) : (
              <ol className="px-8 py-2 h-[55vh] overflow-y-scroll">
                {fileName === "" ? (
                  <h1
                    className={`${
                      colorMode ? "text-slate-300" : "text-gray-800"
                    } h-1/3 flex items-center justify-center`}
                  >
                    Your email list will appear here
                  </h1>
                ) : (
                  data.map((email, index) => (
                    <li
                      className={`border-b ${
                        colorMode ? "border-slate-300" : "border-gray-800"
                      } py-4 px-2 flex gap-8 `}
                      key={index}
                    >
                      <p
                        className={`${
                          colorMode ? "text-slate-300" : "text-gray-800"
                        } text-xs flex items-center justify-center p-0 m-0`}
                      >
                        {index + 1}
                      </p>
                      <h1
                        className={`${
                          colorMode ? "text-slate-300" : "text-gray-800"
                        } text-xs flex items-center justify-center p-0 m-0`}
                      >
                        {email[0]}
                      </h1>
                    </li>
                  ))
                )}
              </ol>
            )}
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
          <label
            className={`${
              fileName ? "" : colorMode ? "labelDark" : "labelLight"
            } label`}
          >
            {fileName !== "" ? (
              <h1
                className={`m-0 p-0 text-xs ${
                  colorMode ? "text-slate-300" : "text-gray-800"
                } flex flex-col items-center justify-center cursor-pointer`}
              >
                <span>{fileName}</span>
                <span
                  className="text-red-300 hover:scale-95 ease-in duration-100"
                  onClick={() => {
                    setFileName("");
                    setData([]);
                    setFile("");
                  }}
                >
                  Clear & Reupload
                </span>
              </h1>
            ) : (
              <>
                <input
                  onChange={(e) => {
                    handleFileChange(e);
                  }}
                  type="file"
                  className={`${
                    colorMode ? "text-slate-300" : "text-gray-800"
                  }`}
                />
                <span>Select file</span>
              </>
            )}
          </label>
          <button
            onClick={() => {
              handleParse();
              console.log(data);
            }}
            className={`w-1/3 py-2 px-4 rounded-md border text-xs hover:scale-95 ease-in duration-100 ${
              colorMode
                ? "border-slate-300 text-slate-300"
                : "border-gray-800 text-gray-800"
            }`}
          >
            Read CSV
          </button>
        </div>
      </div>
    </div>
  );
};

export default CSVParser;
