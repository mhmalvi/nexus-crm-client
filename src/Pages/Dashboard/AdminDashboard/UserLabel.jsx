import React from "react";
import { useSelector } from "react-redux";
import Avatar from "react-avatar";
const UserLabel = ({ setOpenProfile, openProfile }) => {
  const userDetails = useSelector((state) => state?.user);
  const colorMode = useSelector((state) => state?.user)?.colorMode;
  return (
    <div
      className={`ease-in duration-100 absolute group right-0 bg-gradient-to-b ${
        colorMode
          ? "from-[#100b1e] via-[#0b0815] to-[#000000] hover:from-[#7a51e3] hover:via-[#6e48cb] hover:to-[#55389f] "
          : "from-[#7a51e3] hover:from-[#100b1e] via-[#6e48cb] hover:via-[#0b0815] to-[#55389f] hover:to-[#000000]"
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
