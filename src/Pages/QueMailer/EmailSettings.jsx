import { useEffect, useState } from "react";
import { message } from "antd";
import { handleAddSenderEmail } from "../../Components/services/que-mail";
import { useSelector } from "react-redux";

const EmailSettings = ({ currentEmail }) => {
  const userDetails = useSelector((state) => state.user);
  const colorMode = useSelector((state) => state?.user)?.colorMode;
  const [senderEmailData, setSenderEmailData] = useState({
    email: null,
    password: null,
    from_name: null,
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
      const response = await handleAddSenderEmail(currentEmailData);

      const result = await response.json();

      if (result?.status === 200) {
        message.success(`Mail saved successfully to ${senderEmailData.email}`);
      } else {
        message.error(result?.message);
      }
    } catch (error) {
      message.error("Something went wrong while sending mails");
    }
  };
  const handleInputChange = (fieldName, value) => {
    setSenderEmailData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };
  return (
    <div className="flex items-center justify-center h-full w-full">
      <div className="h-full w-full rounded-md">
        <form
          className="flex flex-col gap-8"
          onSubmit={() => handleSaveCurrentMail()}
        >
          <div className="flex gap-4 items-center justify-between w-1/3 ">
            <h1
              className={`text-xl m-0 p-0 ${
                colorMode ? "text-slate-300" : "text-gray-800"
              }`}
            >
              Email:
            </h1>
            <input
              type="text"
              defaultValue={
                currentEmail?.status !== 404
                  ? currentEmail.from_mail_address
                  : ""
              }
              className="w-2/3 ml-4"
              required
              onChange={(e) => handleInputChange("email", e.target.value)}
            />
          </div>
          <div className="flex gap-4 items-center justify-between w-1/3 ">
            <h1
              className={`text-xl m-0 p-0 ${
                colorMode ? "text-slate-300" : "text-gray-800"
              }`}
            >
              APP Password:
            </h1>
            <input
              type="password"
              defaultValue={
                currentEmail?.status !== 404 ? currentEmail.password : ""
              }
              className="w-2/3 ml-4"
              required
              onChange={(e) => handleInputChange("password", e.target.value)}
            />
          </div>
          <div className="flex gap-4 items-center justify-between w-1/3 ">
            <h1
              className={`text-xl m-0 p-0 ${
                colorMode ? "text-slate-300" : "text-gray-800"
              }`}
            >
              From Name:
            </h1>
            <input
              type="text"
              defaultValue={
                currentEmail?.status !== 404 ? currentEmail.from_name : ""
              }
              className={`w-2/3 ml-4 `}
              required
              onChange={(e) => handleInputChange("from_name", e.target.value)}
            />
          </div>

          <div className="w-1/3 flex justify-end items-center">
            {editEmailData ? (
              <div className="flex gap-4">
                <button
                  type="submit"
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
                className={`px-4 py-2 ${
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
      </div>
    </div>
  );
};

export default EmailSettings;
