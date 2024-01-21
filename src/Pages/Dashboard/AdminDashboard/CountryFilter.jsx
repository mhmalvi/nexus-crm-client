import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { HexColorPicker } from "react-colorful";
import { handleUpdateLocation } from "../../../Components/services/locationFilter";

const CountryFilter = ({ locationColor, setLocationColor }) => {
  const colorMode = useSelector((state) => state?.user)?.colorMode;
  const [color, setColor] = useState("");
  const [updateLocation, setUpdateLocation] = useState(null);

  return (
    <div
      className={`h-full font-poppins shadow-md backdrop-blur-2xl bg-[#ffffff11] flex flex-col justify-center items-center text-${
        colorMode ? "slate-300" : "gray-800"
      }`}
    >
      <h1 className=" text-xl ">Edit Location</h1>
      <table>
        <thead>
          <tr
            className={`w-full ${
              colorMode ? "text-slate-300" : "text-gray-800"
            }`}
          >
            <th className="w-1/5">Id</th>
            <th className="w-1/3">Location</th>
            <th className="w-1/3">Color</th>
            <th className="w-1/3">Action</th>
          </tr>
        </thead>
        <tbody>
          {locationColor
            ? locationColor.map((items, index) => {
                return (
                  <tr className="" key={index}>
                    <td className="">
                      <div className="text-slate-300 text-center">
                        {index + 1}
                      </div>
                    </td>
                    <td>
                      <input
                        className="rounded-md p-4 w-full placeholder:text-center"
                        placeholder={`${items.location}`}
                        onChange={(e) => {
                          setUpdateLocation(e.target.value);
                        }}
                      />
                    </td>
                    <td className="w-full ">
                      <div className="colorPicker rounded-full flex justify-center items-center">
                        <HexColorPicker
                          color={items.color}
                          onChange={setColor}
                        />
                      </div>
                    </td>
                    <td className="w-full">
                      <div className="flex justify-between items-center bg-[#00dbde]">
                        <button
                          onClick={() => {
                            handleUpdateLocation(
                              items.id,
                              updateLocation ? updateLocation : items.location,
                              color ? color : items.color
                            );
                            setTimeout(() => {
                              window.location.reload();
                            }, 1000);
                          }}
                        >
                          Save
                        </button>
                        <button>Delete</button>
                      </div>
                    </td>
                  </tr>
                );
              })
            : "No data"}
        </tbody>
      </table>
    </div>
  );
};

export default CountryFilter;
