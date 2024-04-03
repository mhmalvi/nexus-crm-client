import React, { useState } from "react";
import { useSelector } from "react-redux";
import { addPrice } from "../../../Components/services/billing";
const PriceForm = () => {
  const colorMode = useSelector((state) => state?.user)?.colorMode;
  const [isActive, setIsActive] = useState(false);
  const [selected, setIsSelected] = useState("Choose one ▼");
  const [data, setData] = useState({
    unit_amount: null,
    currency: "",
    recurring: {
      interval: "",
      interval_count: null,
    },
  });
  const intervalOptions = [
    { interval: "day", intervalCount: 1 },
    { interval: "week", intervalCount: [1, 2] },
    { interval: "month", intervalCount: [1, 2, 3, 4, 5, 6] },
    { interval: "year", intervalCount: [1, 2, 3] },
  ];
  const handleAddPrice = async () => {
    const response = await addPrice();
  };
  console.log(data);
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
                        recurring: {
                          ...prevData,
                          interval: e.target.textContent,
                        },
                      }));
                      setIsActive(!isActive);
                    }}
                    className="item hover:bg-slate-300 hover:text-gray-800 cursor-pointer px-4 py-1"
                  >
                    {items.interval}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        {/* Interval Time */}
        <div className="flex  flex-col">
          <label className="text-sm">Interval Time</label>
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
                recurring: {
                  ...prevData,
                  interval_count: e.target.value,
                },
              }));
            }}
          />
        </div>
        {/* Save Button */}
        <button
          className="px-4 py-2 rounded-md border border-brand-color"
          // onClick={handleAddPrice}
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default PriceForm;
