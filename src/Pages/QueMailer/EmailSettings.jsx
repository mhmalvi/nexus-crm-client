import { useState } from "react";
import { Popconfirm } from "antd";
import {
  handleAddSenderEmail,
  handleUpdateSenderEmail,
  deleteEmailSettings,
} from "../../Components/services/que-mail";
import { useSelector } from "react-redux";
import {
  errorNotification,
  successNotification,
} from "../../Components/Shared/Toast";

const EmailSettings = ({ currentEmail }) => {
  const userDetails = useSelector((state) => state.user);
  const colorMode = useSelector((state) => state?.user?.colorMode);
  const [senderEmailData, setSenderEmailData] = useState({
    email: currentEmail.username || null,
    password: currentEmail.password || null,
    from_name: currentEmail.from_name || null,
  });
  const [editEmailData, setEditEmailData] = useState(false);

  const handleSaveCurrentMail = async () => {
    const currentEmailData = {
      driver: "smtp",
      host: "smtp.gmail.com",
      port: 587,
      username: senderEmailData.email,
      password: senderEmailData.password,
      encryption: "tls",
      from_mail_address: senderEmailData.email,
      from_name: senderEmailData.from_name,
      user_id: +userDetails.userInfo.id,
    };

    try {
      let response;
      if (currentEmail?.status !== 404) {
        response = await handleUpdateSenderEmail(
          currentEmailData,
          currentEmail.id
        );
      } else {
        response = await handleAddSenderEmail(currentEmailData);
      }
      const result = await response;
      if (result?.status === 201) {
        successNotification(
          `Mail saved successfully to ${senderEmailData.email}`
        );
        window.location.reload();
      } else {
        errorNotification(result?.data?.message);
      }
    } catch (errors) {
      errorNotification(errors);
    }
  };

  const handleDeleteMail = async () => {
    const res = deleteEmailSettings({ id: currentEmail.id });
    if (res.status === 201) {
      window.location.reload();
    }
  };
  const handleInputChange = (fieldName, value) => {
    setSenderEmailData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };
  return (
    <div className="flex items-center justify-center h-full w-full relative">
      <form className="flex flex-col gap-8 w-2/5">
        {editEmailData && (
          <>
            <div className="flex gap-4 items-center justify-between w-full">
              <h1
                className={`text-base m-0 p-0 ${
                  colorMode ? "text-slate-300" : "text-gray-800"
                }`}
              >
                Email:
              </h1>
              {editEmailData ? (
                <input
                  type="text"
                  defaultValue={
                    currentEmail?.status !== 404
                      ? currentEmail.from_mail_address
                      : ""
                  }
                  className={`w-3/5 !m-0 px-2 py-0 h-[4vh] rounded-md border-none bg-gray-800 text-right text-slate-300`}
                  required
                  onChange={(e) => handleInputChange("email", e.target.value)}
                />
              ) : (
                <h1
                  className={`w-3/5 ${
                    colorMode ? "text-slate-300" : "text-gray-800"
                  } flex items-center justify-end m-0 px-2 py-0 h-[4vh] text-base`}
                >
                  {currentEmail.from_mail_address}
                </h1>
              )}
            </div>
            <div className="flex gap-4 items-center justify-between w-full h-full ">
              <h1
                className={`text-base m-0 p-0 ${
                  colorMode ? "text-slate-300" : "text-gray-800"
                } `}
              >
                APP Password:
              </h1>
              {editEmailData ? (
                <input
                  type="text"
                  defaultValue={
                    currentEmail?.status !== 404 ? currentEmail.password : ""
                  }
                  className={`w-3/5 m-0  px-2 py-0 h-[4vh] rounded-md border-transparent bg-gray-800 text-right text-slate-300`}
                  required
                  onChange={(e) =>
                    handleInputChange("password", e.target.value)
                  }
                />
              ) : (
                <h1
                  className={`w-3/5 ${
                    colorMode ? "text-slate-300" : "text-gray-800"
                  } m-0 flex items-center justify-end px-2 py-0 h-[4vh] text-base`}
                >
                  {currentEmail.password}
                </h1>
              )}
            </div>
            <div className="flex gap-4 items-center justify-between w-full ">
              <h1
                className={` text-base m-0 p-0 ${
                  colorMode ? "text-slate-300" : "text-gray-800"
                }`}
              >
                From Name:
              </h1>
              {editEmailData ? (
                <input
                  type="text"
                  defaultValue={
                    currentEmail?.status !== 404 ? currentEmail.from_name : ""
                  }
                  className={`w-3/5 m-0  px-2 py-0 h-[4vh] rounded-md border-none bg-gray-800 text-right text-slate-300`}
                  required
                  onChange={(e) =>
                    handleInputChange("from_name", e.target.value)
                  }
                />
              ) : (
                <h1
                  className={`w-3/5 ${
                    colorMode ? "text-slate-300" : "text-gray-800"
                  } flex items-center justify-end m-0 px-2 py-0 h-[4vh] text-base `}
                >
                  {currentEmail.from_name}
                </h1>
              )}
            </div>
          </>
        )}
        <div className={`w-full flex ${editEmailData ? "justify-end": "justify-center"} items-center`}>
          {editEmailData ? (
            <div className="flex gap-4">
              <button
                onClick={() => {
                  handleSaveCurrentMail();
                }}
                type="button"
                className={`px-4 py-2 ${
                  colorMode
                    ? "bg-slate-300 text-gray-800"
                    : "bg-gray-800 text-slate-300"
                } rounded-md`}
              >
                Save
              </button>
              <div
                onClick={() => {
                  setEditEmailData(false);
                }}
                className={`px-4 py-2 cursor-pointer ${
                  colorMode
                    ? "bg-slate-300 text-gray-800"
                    : "bg-gray-800 text-slate-300"
                } rounded-md`}
              >
                Close
              </div>
            </div>
          ) : (
            <div
              className={`${editEmailData ? "px-4 py-2" : "px-8 py-2 text-xl animate-bounce"}  ${
                colorMode
                  ? "bg-slate-300 text-gray-800"
                  : "bg-gray-800 text-slate-300"
              } rounded-md cursor-pointer`}
              onClick={() => {
                setEditEmailData(true);
              }}
            >
              Edit
            </div>
          )}
        </div>
      </form>
      {currentEmail.status !== 404 ? (
        <Popconfirm
          title="Are you sure to delete this email?"
          onConfirm={handleDeleteMail}
        >
          <button
            className={`absolute right-0 top-0 px-4 py-2 bg-red-500 border-none rounded-md text-slate-300 hover:text-gray-800 ease-in duration-100`}
          >
            Delete Mail
          </button>
        </Popconfirm>
      ) : (
        ""
      )}
    </div>
  );
};

export default EmailSettings;
