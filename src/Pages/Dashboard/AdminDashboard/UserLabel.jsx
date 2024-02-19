import React from "react";
import { useSelector } from "react-redux";
import Avatar from "react-avatar";
const UserLabel = ({ setOpenProfile, openProfile }) => {
  const userDetails = useSelector((state) => state?.user);
  const colorMode = useSelector((state) => state?.user)?.colorMode;
  return (
    <div
      className={` absolute group right-0 m-1 p-1 rounded-lg shadow-md cursor-pointer hover:scale-95 shadow-md bg-gradient-to-b from-[#8B7CFD] via-[#8B7CFD] to-[#159AFB]`}
      onClick={() => setOpenProfile(!openProfile)}
    >
      <Avatar
        className="rounded-md cursor-pointer"
        size="30"
        color="#ffffff"
        fgColor="#000000"
        name={
          userDetails?.userInfo?.full_name || userDetails?.userInfo?.name || ""
        }
      />
      <span
        className={`px-2 text-white py-0 m-0`}
      >
        {userDetails?.userInfo?.full_name || userDetails?.userInfo?.name || ""}
      </span>
    </div>
  );
};

export default UserLabel;
