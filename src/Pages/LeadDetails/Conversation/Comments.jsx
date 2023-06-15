import { message } from "antd";
import React, { useState } from "react";
import { useEffect } from "react";
import { handleDeleteComment } from "../../../Components/services/leads";
import Icons from "../../../Components/Shared/Icons";

const Comments = ({ Comments }) => {
  const [allComents, setAllComents] = useState([]);

  useEffect(() => {
    setAllComents(Comments);
  }, [Comments]);
  console.log("all comments:", allComents);
  const handleDeleteCommentReq = async (id) => {
    const commentDeleteRes = await handleDeleteComment(id);
    if (commentDeleteRes?.status === 200) {
      message.success("Comment Deleted Successfully");
      const currentComments = [...allComents]?.filter((c) => c.id !== id);
      setAllComents(currentComments);
    }
  };
  return (
    <div>
      <div>
        <div className="">
          <div className="font-poppins text-base font-semibold mb-2">
            Comments History
          </div>

          <div className="flex items-end mb-4">
            <div className="w-full">
              {/* <h1 className="text-sm font-poppins">Comments:</h1> */}
              {allComents?.length
                ? allComents?.map((history) => (
                    <div className="flex w-full border rounded-lg p-2 my-2 shadow justify-between items-center">
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
      </div>
    </div>
  );
};

export default Comments;
