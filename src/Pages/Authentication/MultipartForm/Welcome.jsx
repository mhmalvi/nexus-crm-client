import React, { useEffect } from "react";
import Icons from "../../../Components/Shared/Icons";
import { useNavigate } from "react-router-dom";
import Loading from "../../../Components/Shared/Loader";

const Welcome = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/dashboard");
    }, [3000]);
  });

  return (
    <div className="h-screen w-full flex flex-col gap-4 items-center justify-center formBackground font-poppins">
      <div className="w-1/3 flex flex-col items-center justify-center">
        <Icons.WelcomeEnd className="w-full ease-in duration-200 w-full" />
        <h1 className="2xl:text-6xl text-5xl text-slate-300 m-0 p-0 text-center ">
          Welcome
        </h1>
        <h1 className="2xl:text-lg text-sm text-slate-300 m-0 p-0 text-center w-full">
          Explore the vast possibilities that Queleads CRM has to offer.
        </h1>
        <Loading/>
      </div>
    </div>
  );
};

export default Welcome;
