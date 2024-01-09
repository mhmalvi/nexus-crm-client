import React from "react";
import { useSelector } from "react-redux";
import Avatar from "react-avatar";
const UserLabel = () => {
  const userDetails = useSelector((state) => state?.user);
  return (
    <div className="absolute group right-0 mr-4 p-1 rounded-full shadow-md ">
      <Avatar
        className="rounded-full cursor-pointer mr-1 text-white"
        size="38"
        name={
          userDetails?.userInfo?.full_name || userDetails?.userInfo?.name || ""
        }
      />
      <span className="px-2 text-white">
        {userDetails?.userInfo?.full_name || userDetails?.userInfo?.name || ""}
      </span>

      <div className="hidden group-hover:block min-w-40 h-16 bg-white shadow-md absolute right-0 top-[52px] rounded-md">
        <div className="flex flex-col p-2 text-xs z-50">
          <div>
            {userDetails?.userInfo?.full_name ||
              userDetails?.userInfo?.name ||
              ""}
          </div>
          <div>{userDetails?.userInfo?.email}</div>
          <div>
            {userDetails?.userInfo?.contact_number ||
              userDetails?.userInfo?.phone_number ||
              ""}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLabel;
