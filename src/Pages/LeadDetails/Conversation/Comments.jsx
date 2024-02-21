import { message } from "antd";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { handleDeleteComment } from "../../../Components/services/leads";
import Icons from "../../../Components/Shared/Icons";

const Comments = ({ Comments }) => {
  const [allComents, setAllComents] = useState([]);
  const colorMode = useSelector((state) => state?.user)?.colorMode;

  useEffect(() => {
    setAllComents(Comments);
  }, [Comments]);
  const handleDeleteCommentReq = async (id) => {
    const commentDeleteRes = await handleDeleteComment(id);
    if (commentDeleteRes?.status === 200) {
      message.success("Comment Deleted Successfully");
      const currentComments = [...allComents]?.filter((c) => c.id !== id);
      setAllComents(currentComments);
    }
  };
  return (
    <div className="h-full flex flex-col w-full shadow-md backdrop-blur-2xl bg-[#ffffff11] rounded-xl">
      <div className="w-full flex justify-between items-center backdrop-blur-2xl bg-[#ffffff11] px-5 py-2 rounded-t-xl overflow-hidden">
        <h1 className={`text-lg m-0 p-0 ${colorMode ? "text-slate-300" :"text-gray-800"}`}>Comments History</h1>
      </div>

      <div className="flex items-end p-5">
        <div className={`w-full ${colorMode ?"text-slate-300":"text-gray-800"}  text-opacity-40`}>
          {allComents?.length
            ? allComents?.map((history) => (
                <div className="flex w-full border rounded-xl p-2 my-2 shadow justify-between items-center">
                  <div>
                    <div className="text-base">{history?.comments}</div>
                    <div className="text-xs">
                      {new Date(history.created_at).toLocaleString()}
                    </div>
                  </div>
                  <div
                    className="mr-2"
                    onClick={() => handleDeleteCommentReq(history?.id)}
                  >
                    <Icons.Cross className="w-3 text-red-600 hover:text-red-500 cursor-pointer" />
                  </div>
                </div>
              ))
            : "No comments yet"}
        </div>
      </div>
    </div>
  );
};

export default Comments;
