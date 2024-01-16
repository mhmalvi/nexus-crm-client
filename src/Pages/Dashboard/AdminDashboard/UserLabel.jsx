import React from "react";
import { useSelector } from "react-redux";
import Avatar from "react-avatar";
const UserLabel = ({ setOpenProfile, openProfile }) => {
  const userDetails = useSelector((state) => state?.user);
  return (
    <div
      className={`ease-in duration-100 absolute group right-0 bg-${
        openProfile ? "black" : "brand-color"
      } m-1 p-1 rounded-lg shadow-md cursor-pointer hover:bg-black`}
      onClick={() => setOpenProfile(!openProfile)}
    >
      <Avatar
        className="rounded-md cursor-pointer"
        size="32"
        color="#ffffff"
        fgColor="#000000"
        name={
          userDetails?.userInfo?.full_name || userDetails?.userInfo?.name || ""
        }
      />
      <span className="px-2 text-white py-0 m-0">
        {userDetails?.userInfo?.full_name || userDetails?.userInfo?.name || ""}
      </span>
    </div>
  );
};

export default UserLabel;
