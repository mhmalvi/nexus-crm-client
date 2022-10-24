import React, { useState } from "react";
import { useSelector } from "react-redux";
import { handleUpdateNotice } from "../../../Components/services/company";
import Icons from "../../../Components/Shared/Icons";

const Notice = ({ notice, handleDeleteNoticeReq }) => {
  const userDetails = useSelector((state) => state?.user?.userInfo);

  const [editNotice, setEditNotice] = useState(false);
  // const [updatedNoticeTitle, setUpdatedNoticeTitle] = useState("");
  // const [updatedNoticeDescription, setUpdatedNoticeDescription] = useState("");

  const handleUpdateNoticeReq = async (id) => {
    const noticeTitle = document.getElementById(
      `notice_title${notice?.id}`
    )?.innerText;
    const noticeDescription = document.getElementById(
      `notice_description${notice?.id}`
    )?.innerText;

    const updateNotice = await handleUpdateNotice(
      id,
      noticeTitle,
      noticeDescription
    );

    if (updateNotice?.status) {
      setEditNotice(false);
    }
  };

  return (
    <div className="relative font-poppins border border-gray-200 my-4 flex items-center rounded-lg shadow">
      <div className="h-full w-full  px-3 py-2 flex flex-col justify-center">
        <li className="list-disc text-black font-semibold text-base leading-6 my-1">
          <span
            id={`notice_title${notice?.id}`}
            contentEditable={editNotice}
            suppressContentEditableWarning={true}
            className={`${
              editNotice
                ? "bg-gray-100 border border-gray-300 outline-none px-1 py-0.5 rounded-lg"
                : "bg-white cursor-default"
            }`}
            // onChange={(e) => setUpdatedNoticeTitle(e.target.value)}
          >
            {notice?.notice_title}
          </span>
        </li>
        <div className="flex justify-between">
          <div
            id={`notice_description${notice?.id}`}
            contentEditable={editNotice}
            suppressContentEditableWarning={true}
            className={`outline-none w-full h-auto text-black mt-1 font-normal text-sm ml-6 ${
              editNotice
                ? "bg-gray-100 border border-gray-300 outline-none px-1 py-0.5 rounded-lg"
                : "bg-white cursor-default"
            }`}
            // onChange={(e) => setUpdatedNoticeDescription(e.target.value)}
          >
            {notice?.notice_description}
          </div>
          {userDetails?.role_id === 3 && (
            <div>
              {editNotice ? (
                <button
                  className="text-xs bg-black text-white px-2 py-1 rounded-lg ml-2"
                  onClick={() => handleUpdateNoticeReq(notice?.id)}
                >
                  Save
                </button>
              ) : (
                <Icons.PenUnderLine
                  className="w-3.5 cursor-pointer"
                  onClick={() => setEditNotice(true)}
                />
              )}
            </div>
          )}
        </div>
      </div>
      {userDetails?.role_id === 3 && (
        <div
          className="absolute -top-1.5 -right-1.5 w-4 py-0.5 ml-2 flex justify-center items-center bg-red-500 text-white rounded-full cursor-pointer"
          onClick={() => handleDeleteNoticeReq(notice?.id)}
        >
          <Icons.Cross className="w-2 cursor-pointer" />
        </div>
      )}
      {/* <li className="list-disc text-base font-semibold">
                    {notice?.notice_title}{" "}
                    <span className="font-normal text-xs">
                      {"("}
                      {(notice?.updated_at).replace("T", " ").slice(0, 19)}
                      {")"}
                    </span>
                  </li> */}
    </div>
  );
};

export default Notice;
