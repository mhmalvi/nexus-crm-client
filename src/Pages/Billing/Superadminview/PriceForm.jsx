import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  addPrice,
} from "../../../Components/services/billing";
const PriceForm = ({ packageId }) => {
  const colorMode = useSelector((state) => state?.user)?.colorMode;
  const [isActive, setIsActive] = useState(false);
  const [selected, setIsSelected] = useState("Choose one ▼");

  const [data, setData] = useState({
    unit_amount: null,
    currency: null,
    interval: null,
    prod_id: packageId.id,
  });
  const intervalOptions = ["day", "week", "month", "year"];
  console.log(data);
  const handleAddPrice = async () => {
    const response = await addPrice(data);
    console.log(response);
  };
  return (
    <div>
      <form
        className={`flex justify-between flex-grow items-end gap-4 ${
          colorMode ? "text-slate-300" : "text-gray-800"
        }`}
      >
        {/* Price */}
        <div className="flex flex-col">
          <label className="text-sm">Amount</label>
          <input
            type="number"
            className={`w-full rounded-md bg-transparent border focus:outline-none focus:ring-0 outline-none p-2 ${
              colorMode
                ? "border-slate-300 text-slate-300"
                : "border-gray-800 text-gray-800"
            }`}
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                unit_amount: e.target.value,
              }));
            }}
          />
        </div>
        {/* Currency */}
        <div className="flex flex-col">
          <label className="text-sm">Currency</label>
          <input
            type="text"
            className={`w-full rounded-md bg-transparent border focus:outline-none focus:ring-0 outline-none p-2 ${
              colorMode
                ? "border-slate-300 text-slate-300"
                : "border-gray-800 text-gray-800"
            }`}
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                currency: e.target.value,
              }));
            }}
          />
        </div>
        {/* Interval */}
        <div className="flex  flex-col">
          <label className="text-sm">Interval</label>
          <div className=" text-sm border rounded-md cursor-pointer p-1">
            <div
              onClick={(e) => {
                setIsActive(!isActive);
              }}
              className="cursor-pointer flex items-center justify-center border-b py-2 px-2 min-w-1/5"
            >
              {selected}
              <span
                className={isActive ? "fas fa-caret-up" : "fas fa-caret-down"}
              />
            </div>

            {intervalOptions.map((items, index) => {
              return (
                <div
                  key={index}
                  className={`cursor-pointer ${isActive ? "block" : "hidden"}`}
                >
                  <div
                    onClick={(e) => {
                      setIsSelected(e.target.textContent);
                      setData((prevData) => ({
                        ...prevData,
                        interval: e.target.textContent,
                      }));
                      setIsActive(!isActive);
                    }}
                    className="item hover:bg-slate-300 hover:text-gray-800 cursor-pointer px-4 py-1"
                  >
                    {items}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        {/* Save Button */}
        <button
          disabled={
            data.currency === "" ||
            data.unit_amount === "" ||
            data.interval === ""
          }
          className="px-4 py-2 rounded-md border border-brand-color disabled:opacity-50"
          onClick={handleAddPrice}
          type="button"
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default PriceForm;
