import React, { useState } from "react";
import { useSelector } from "react-redux";
import { createProduct } from "../../../Components/services/billing";
import {
  successNotification,
  warningNotification,
} from "../../../Components/Shared/Toast";
import PriceForm from "./PriceForm";

const SuperBillingForm = () => {
  const colorMode = useSelector((state) => state?.user)?.colorMode;
  const [packageName, setPackageName] = useState(null);
  const [checking, setChecking] = useState(false);
  const [packageInfo, setPackageInfo] = useState(null);

  const handlePackageName = async () => {
    setChecking(true);
    const data = packageName;
    const response = await createProduct(data);
    if (response.data?.error) {
      warningNotification(response.data.error.message);
      setChecking(false);
    } else {
      successNotification("Name available");
      setPackageInfo({
        name: response.name,
      });
      setChecking(false);
    }
  };

  return (
    <div className="flex flex-col gap-8 w-full">
      <div className="flex flex-col text-lg w-full">
        {/* Prdct nm n strp || Keeping Package Name for the users */}

        {packageInfo === null ? (
          <div className="w-full flex items-center gap-4">
            <div className="w-full flex items-center">
              <label
                className={`w-1/6 ${
                  colorMode ? "text-slate-300" : "text-gray-800"
                }`}
              >
                Package Name
              </label>
              <input
                onChange={(e) => {
                  setPackageName(e.target.value);
                }}
                className={`w-full rounded-md bg-transparent border focus:outline-none focus:ring-0 outline-none px-2 py-1 ${
                  colorMode
                    ? "border-slate-300 text-slate-300"
                    : "border-gray-800 text-gray-800"
                }`}
              />
            </div>
            <button
              className={`px-2 py-1 border ${
                colorMode
                  ? "border-slate-300 text-slate-300"
                  : "border-gray-800 text-gray-800"
              } rounded-md`}
              onClick={handlePackageName}
            >
              Add{checking && "ing"}
            </button>
          </div>
        ) : (
          <div
            className={`flex flex-col gap-8 ${
              colorMode ? "text-slate-300" : "text-gray-800"
            }`}
          >
            <div className="flex gap-4 items-center border-b border-brand-color ">
              <label
                className={`${colorMode ? "text-slate-300" : "text-gray-800"} `}
              >
                Package Name:
              </label>
              <h2
                className={`${
                  colorMode ? "text-slate-300" : "text-gray-800"
                } m-0 p-0`}
              >
                {packageInfo.name}
              </h2>
            </div>
            <div className="flex flex-col gap-1">
              <label
                className={`${
                  colorMode ? "text-slate-300" : "text-gray-800"
                } m-0 p-0 `}
              >
                Price
              </label>
              <div className="w-full flex flex-col gap-8 h-full ">
                <PriceForm />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SuperBillingForm;
