import React from "react";
import TopBarImg from "../../../assets/BackgroundPhotos/Topbar.png";
const Topbar = () => {
  return (
    <div
      className="w-full h-[5vh] grid grid-cols-4"
      style={{
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        backgroundSize: "cover",
        backgroundImage: `url(${TopBarImg})`,
      }}
    >
      <div className="col-span-2"></div>
      <div className="col-span-1 grid grid-cols-2 gap-4">
        <div className="grid-cols-1 text-right leading-[10px] my-auto ">
          <h6 className="text-white font-[100] text-xs m-0 p-0">Call Us</h6>
          <h1 className="text-white">+880 1997 101696</h1>
        </div>
        <div className="grid-cols-1 text-right leading-[10px] my-auto">
          <h6 className="text-white font-[100] text-xs m-0 p-0">Email Us</h6>
          <h1 className="text-white">queleadscrm@gmail.com</h1>
        </div>
      </div>
      <div className="col-span-1 grid">
        <div className="grid-cols-1 text-right leading-[10px] my-auto mx-10">
          <h6 className="text-white font-[100] text-xs m-0 p-0">Language</h6>
          <h1 className="text-white">Eng/Bn</h1>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
