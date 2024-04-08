import React, { useState } from "react";
import { useSelector } from "react-redux";
import { addPrice } from "../../../Components/services/billing";
import {
  successNotification,
  warningNotification,
} from "../../../Components/Shared/Toast";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
const PriceForm = ({ openPriceForm }) => {
  const colorMode = useSelector((state) => state?.user)?.colorMode;
  const [isActive, setIsActive] = useState(false);
  const [selected, setIsSelected] = useState("Choose one ▼");
  const [clicked, setClicked] = useState(false);

  const [data, setData] = useState({
    unit_amount: null,
    currency: null,
    interval: null,
    prod_id: openPriceForm.id,
  });
  const intervalOptions = ["day", "week", "month", "year"];
  const handleAddPrice = async () => {
    setClicked(true);
    const response = await addPrice(data);
    if (response.status === 201) {
      successNotification(response.message);
      setClicked(false);
    } else {
      warningNotification(response.message);
      setClicked(false);
    }
  };
  return (
    <form
      className={` flex flex-col justify-between flex-grow items-start gap-4 ${
        colorMode ? "text-slate-300" : "text-gray-800"
      }`}
    >
      <div className="w-full">
        {/* Price */}
        <div className="w-full flex flex-col">
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
        <div className="flex flex-col">
          <label className="text-sm">Interval</label>
          <div className=" h-full text-sm border rounded-md cursor-pointer p-1 relative z-30">
            <div
              onClick={() => {
                setIsActive(!isActive);
              }}
              className="cursor-pointer flex items-center justify-center py-2 px-2 min-w-1/5  z-30"
            >
              {selected}
            </div>

            {intervalOptions.map((items, index) => {
              return (
                <div
                  key={index}
                  className={`cursor-pointer z-50 ${
                    isActive ? " block " : "hidden"
                  }`}
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
      </div>
      {/* Save Button */}
      <button
        disabled={
          data.currency === "" ||
          data.unit_amount === "" ||
          data.interval === ""
        }
        className="px-4 py-2 text-center rounded-md border border-brand-color disabled:opacity-50 w-full hover:bg-brand-color ease-in duration-100"
        onClick={handleAddPrice}
        type="button"
      >
        {clicked ? (
          <Spin
            indicator={
              <LoadingOutlined
                style={{
                  fontSize: 24,
                }}
                spin
                className="!text-slate-300"
              />
            }
          />
        ) : (
          "Add"
        )}
      </button>
    </form>
  );
};

export default PriceForm;
