import React, { useEffect, useState } from "react";
import Papa from "papaparse";
import * as XLSX from "xlsx"; // Import XLSX as named exports
import { useSelector } from "react-redux";
import "./quemailer.css";

const allowedExtensions = ["csv", "xlsx"]; // Add xlsx to the allowed extensions

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
  setHeaderData,
  setCategorizedData,
  setBounced,
  setCSVFileName,
}) => {
  const colorMode = useSelector((state) => state?.user)?.colorMode;

  const handleFileChange = (e) => {
    setError("");
    if (successMail === "success") {
      const inputFile = "";
      const fileExtension = inputFile?.name.split(".").pop().toLowerCase(); // Get file extension

      if (!allowedExtensions.includes(fileExtension)) {
        setError("Please input a csv or xlsx file");
        return;
      }
      setData([]);
      setFileName("");
      setFile("");
    } else if (e.target.files.length) {
      const inputFile = e.target.files[0];
      const fileExtension = inputFile?.name.split(".").pop().toLowerCase(); // Get file extension

      if (!allowedExtensions.includes(fileExtension)) {
        setError("Please input a csv or xlsx file");
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
      let parsedData = [];
      const fileExtension = file.name.split(".").pop().toLowerCase(); // Get file extension
      if (fileExtension === "csv") {
        parsedData =
          Papa.parse(target.result, {
            header: false,
          })?.data || [];

        setCSVFileName(file.name);
        const headerRow = parsedData.length > 0 ? parsedData[0] : [];
        setHeaderData(headerRow);

        const dataRows = parsedData
          .slice(1)
          .filter((row) => row.some((cell) => cell.trim() !== ""));

        const organizedData = dataRows.map((row) => {
          const rowData = {};
          headerRow.forEach((header, index) => {
            rowData[header] = row[index];
          });
          return rowData;
        });

        const validEmailsData = organizedData.filter((row) =>
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(row["Email"])
        );

        setCategorizedData(validEmailsData);

        const emailData = organizedData.map((row) => {
          const emailKeys = ["email", "EMAIL", "EmailAddress", "Email"];
          let email = null;
          emailKeys.some((key) => {
            if (row[key]) {
              email = row[key];
              return true; // stop searching once email is found
            }
            return false;
          });
          return email;
        });

        const validEmails = emailData.filter((email) =>
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
        );

        const filteredOutEmails = emailData.filter(
          (email) => !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
        );

        setData(validEmails);
        setBounced(filteredOutEmails);
      } else if (fileExtension === "xlsx") {
        const workbook = XLSX.read(target.result, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        parsedData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        setCSVFileName(file.name);
        const headerRow = parsedData.length > 0 ? parsedData[0] : [];
        setHeaderData(headerRow);
        console.log(headerRow);
        const dataRows = parsedData.slice(1).filter((row) => {
          return row.some((cell) => {
            return typeof cell === "string" && cell.trim() !== "";
          });
        });
        const organizedData = dataRows.map((row) => {
          const rowData = {};
          headerRow.forEach((header, index) => {
            rowData[header] = row[index];
          });
          return rowData;
        });
        const validEmailsData = organizedData.filter((row) =>
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(row["Email"])
        );

        setCategorizedData(validEmailsData);

        const emailData = organizedData.map((row) => {
          const emailKeys = ["email", "EMAIL", "EmailAddress", "Email"];
          let email = null;
          emailKeys.some((key) => {
            if (row[key]) {
              email = row[key];
              return true; // stop searching once email is found
            }
            return false;
          });
          return email;
        });

        const validEmails = emailData.filter((email) =>
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
        );

        const filteredOutEmails = emailData.filter(
          (email) => !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
        );

        setData(validEmails);
        setBounced(filteredOutEmails);
      }
    };
    reader.readAsBinaryString(file);
  };

  return (
    <div className="h-[77vh] flex flex-col flex-grow gap-8 !z-1">
      <div
        className={`${
          data.length <= 0 ? "hidden" : "content"
        } rounded-md shadow-md backdrop-blur-2xl bg-[#ffffff11] !z-1 h-3/4 overflow-hidden `}
      >
        {error ? (
          error
        ) : (
          <div className="h-full m-0 p-0">
            <h2
              className={`flex justify-between items-center ${
                colorMode
                  ? "text-slate-300 bg-[#ffffff11]"
                  : "text-gray-800 bg-[#ffffff7f]"
              } 2xl:text-xl text-sm px-4 py-2`}
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
              <ol className="px-8 py-2 h-5/6 overflow-y-scroll">
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
                        {email}
                      </h1>
                    </li>
                  ))
                )}
              </ol>
            )}
          </div>
        )}
      </div>
      <div
        className={`flex flex-col shadow-md backdrop-blur-2xl bg-[#ffffff11] !z-1 ${
          data.length <= 0 ? "h-full" : "h-1/4"
        } overflow-hidden`}
      >
        <h3
          className={`rounded-t-md shadow-md backdrop-blur-2xl bg-[#ffffff11] ${
            colorMode
              ? "text-slate-300 bg-[#ffffff11]"
              : "text-gray-800 bg-[#ffffff7f]"
          } px-4 py-2 2xl:text-xl text-sm`}
        >
          {data.length <= 0 ? (
            <span>
              Upload a CSV or XLSX file{" "}
              <span className="text-sm">
                - (Row 1 must contain all the headers)
              </span>
            </span>
          ) : (
            "Reupload and add more emails"
          )}
        </h3>
        <div
          className={`ease-in duration-200 flex gap-4 w-full h-full items-center ${
            data.length <= 0 ? "justify-center" : "justify-between"
          } px-8`}
        >
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
            className={`py-2 px-4 rounded-md border text-xs hover:scale-95 ease-in duration-100 ${
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
