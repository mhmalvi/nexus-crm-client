import React, { useState, useEffect } from "react";
import { Modal, message } from "antd";
import Notice from "./Notice";
import { useSelector } from "react-redux";
import {
  handleAddNotice,
  handleDeleteNotices,
  handleFetchNotices,
} from "../../../Components/services/company";
import { useMediaQuery } from "react-responsive";

const NoticeForm = () => {
  const colorMode = useSelector((state) => state?.user)?.colorMode;
  const userDetails = useSelector((state) => state?.user?.userInfo);

  const [syncNotices, setSyncNotices] = useState(true);
  const [syncNotifications, setSyncNotifications] = useState(false);
  const [noticeDescription, setNoticeDescription] = useState("");
  const [noticeTitle, setNoticeTitle] = useState("");
  const [showNotices, setShowNotices] = useState(false);
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await handleFetchNotices(userDetails?.client_id);
      if (response?.data) {
        setNotices(response?.data?.filter((notice) => notice.status));
      }
    })();
  }, [userDetails, syncNotices]);

  const handleSendNotice = async (e) => {
    e.preventDefault();
    if (noticeDescription !== "") {
      const handleAddNotile = await handleAddNotice(
        userDetails?.client_id,
        noticeTitle,
        noticeDescription
      );

      if (handleAddNotile?.status) {
        setSyncNotices(!syncNotices);
        message.success("Notice updated Successfully");
      }
      setSyncNotifications(!syncNotifications);
      setNoticeTitle("");
      setNoticeDescription("");
    }
  };

  const handleDeleteNoticeReq = async (id) => {
    const response = await handleDeleteNotices(id);
    if (response?.status) setSyncNotices(!syncNotices);
  };

  const isBigScreen = useMediaQuery({ query: "(min-width: 1824px)" });

  return (
    <div>
      <Modal
        visible={showNotices}
        onCancel={() => setShowNotices(false)}
        footer={null}
        width="1000px"
      >
        <div className="">
          <div
            className={`font-poppins text-xl text-${
              colorMode ? "slate-300" : "gray-800"
            } mb-6`}
          >
            Notices
          </div>
          {notices.length ? (
            <div>
              {notices?.map((notice) => (
                <Notice
                  key={notice.id}
                  notice={notice}
                  handleDeleteNoticeReq={handleDeleteNoticeReq}
                />
              ))}
            </div>
          ) : (
            <h1 className="font-poppins text-center">No Notices</h1>
          )}
        </div>
      </Modal>

      {(userDetails?.role_id === 3 ||
        userDetails?.role_id === 4 ||
        userDetails?.role_id === 5) && (
        <div>
          {userDetails?.role_id === 3 ? (
            <div className="lg:w-full p-3 rounded-xl shadow-md backdrop-blur-2xl bg-[#ffffff11] ">
              <div className="mb-2 flex justify-between items-center">
                <h1
                  className={`text-${
                    isBigScreen ? "xl" : "base"
                  } text-start text-${
                    colorMode ? "slate-300" : "gray-800"
                  } font-poppins m-0 p-0`}
                >
                  Notice Board
                </h1>
                <button
                  onClick={() => {
                    setShowNotices(true);
                  }}
                  className="ease-in duration-200 bg-[#7037FF] hover:bg-black px-2 py-1 text-slate-300 rounded-md "
                >
                  Preview Notices
                </button>
              </div>
              <div>
                <form
                  onSubmit={(e) => handleSendNotice(e)}
                  className="flex items-center flex-col justify-center "
                >
                  <input
                    className={`w-full px-3 py-1 rounded-md bg-transparent outline-none border mb-3 ${
                      colorMode
                        ? "placeholder:text-slate-300"
                        : "placeholder:text-gray-800"
                    }`}
                    type="text"
                    placeholder="Notice Title"
                    value={noticeTitle}
                    onChange={(e) => setNoticeTitle(e.target.value)}
                  />
                  <textarea
                    className={`w-full outline-none border px-3 py-1 rounded-md bg-transparent ${
                      colorMode
                        ? "placeholder:text-slate-300"
                        : "placeholder:text-gray-800"
                    }`}
                    name=""
                    style={{ resize: "none" }}
                    id="notice_input"
                    value={noticeDescription}
                    onChange={(e) => setNoticeDescription(e.target.value)}
                    rows={isBigScreen ? "3" : "1"}
                    placeholder="Details"
                  ></textarea>
                  <button
                    className=" ease-in duration-200 w-1/3 px-3 py-2 mt-2 font-poppins font-semibold text-xs cursor-pointer text-slate-300 bg-[#2596FB] hover:bg-black rounded-md"
                    type="submit"
                    value="Post"
                  >
                    Post
                  </button>
                </form>
              </div>
            </div>
          ) : (
            <div>
              <div className="lg:w-full p-3 rounded-xl shadow-md backdrop-blur-2xl bg-[#ffffff11] ">
                <div className="mb-2 flex justify-between items-center">
                  <h1
                    className={`text-${
                      isBigScreen ? "xl" : "base"
                    } text-start text-${
                      colorMode ? "slate-300" : "gray-800"
                    } font-poppins m-0 p-0`}
                  >
                    Notice Board
                  </h1>
                  <button
                    onClick={() => {
                      setShowNotices(true);
                    }}
                    className="ease-in duration-200 bg-[#7037FF] hover:bg-black px-2 py-1 text-slate-300 rounded-md "
                  >
                    Preview Notices
                  </button>
                </div>
                
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NoticeForm;
