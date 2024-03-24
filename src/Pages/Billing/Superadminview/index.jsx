import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAllSubscriptionList } from "../../../Components/services/billing";
const Superadminview = () => {
  const colorMode = useSelector((state) => state?.user)?.colorMode;
  const userDetails = useSelector((state) => state?.user);
  const [addMoreClicked, setAddMoreClicked] = useState(false);

  useEffect(() => {
    (async () => {
      const response = await getAllSubscriptionList();
      console.log(response);
    })();
  });

  return (
    <div className="flex flex flex-grow gap-4 w-full h-full mx-5 ">
      <div className="flex flex-col w-full h-full rounded-md shadow-md backdrop-blur-2xl bg-[#ffffff11] p-4">
        <div
          className={`flex justify-between items-center bg-gray-800 w-full p-4 rounded-t-md`}
        >
          <h1 className={`text-slate-300 m-0 p-0`}>Packages</h1>
          <button
            className="px-4 border border-slate-300 rounded-md text-slate-300"
            onClick={() => setAddMoreClicked(!addMoreClicked)}
          >
            Add More
          </button>
        </div>
        {addMoreClicked ? (
          <div className="w-full h-full bg-brand-color rounded-b-md p-4">
            FORM HERE
          </div>
        ) : (
          <div className="w-full h-full bg-brand-color rounded-b-md p-4">
            List here
          </div>
        )}
      </div>
      <div className="flex flex-col w-full h-full rounded-md shadow-md backdrop-blur-2xl bg-[#ffffff11] p-4">
        BILLING LIST
        <hr />
        (to be added in a later release)
      </div>
      <div className="flex flex-col w-full h-full rounded-md shadow-md backdrop-blur-2xl bg-[#ffffff11] p-4">
        CUSTOMER LIST
        <hr />
        (to be added in a later release)
      </div>
    </div>
  );
};

export default Superadminview;
