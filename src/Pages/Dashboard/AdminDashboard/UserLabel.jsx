import React from "react";
import { useSelector } from "react-redux";
import Avatar from "react-avatar";
const UserLabel = ({ setOpenProfile, openProfile }) => {
  const userDetails = useSelector((state) => state?.user);
  const colorMode = useSelector((state) => state?.user)?.colorMode;
  return (
    <div
      className={`ease-in duration-100 absolute group right-0 m-2 p-2 rounded-lg shadow-md cursor-pointer hover:scale-95 shadow-md backdrop-blur-2xl bg-[#ffffff22]`}
      onClick={() => setOpenProfile(!openProfile)}
    >
      <Avatar
        className="rounded-md cursor-pointer"
        size="22"
        color="#ffffff"
        fgColor="#000000"
        name={
          userDetails?.userInfo?.full_name || userDetails?.userInfo?.name || ""
        }
      />
      <span
        className={`px-2 ${
          colorMode ? "text-white" : "text-gray-800"
        } py-0 m-0`}
      >
        {userDetails?.userInfo?.full_name || userDetails?.userInfo?.name || ""}
      </span>
    </div>
  );
};

export default UserLabel;
