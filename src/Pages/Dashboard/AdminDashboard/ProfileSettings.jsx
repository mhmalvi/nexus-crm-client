import React, { useEffect, useState } from "react";
import { DatePicker, Space, Dropdown, Menu, message } from "antd";
import Avatar from "react-avatar";
import {
  handleProfileDetails,
  handleUpdateProfileDetails,
} from "../../../Components/services/auth";
import { useSelector } from "react-redux";
import Icons from "../../../Components/Shared/Icons";
// import { setLoader } from "../../../features/user/userSlice";

const ProfileSettings = ({
  openProfile,
  setToggleEditDetails,
  toggleEditDetails,
}) => {
  const ProfileDetails = useSelector((state) => state?.user?.userInfo);
  const colorMode = useSelector((state) => state?.user)?.colorMode;

  const initialState = {
    full_name: "",
    date_of_birth: "Select Date",
    secondary_contact: "",
    location: "",
    address: "",
    region: "",
    postcode: "",
    profession: "",
    work_experiences: "",
    qualification: "",
  };

  const [profileData, setProfileData] = useState(initialState);
  const [originalProfileData, setOriginalProfileData] = useState({});

  useEffect(() => {
    (async () => {
      const userDetailResponse = await handleProfileDetails(
        ProfileDetails?.user_id
      );

      if (userDetailResponse?.status === true) {
        const user = userDetailResponse?.data;
        setProfileData(user);
        setOriginalProfileData(user);
      } else {
        setTimeout(() => {}, 3000);
      }
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const userData = (e) => {
    const data = { ...profileData };
    console.log("data", data);
    data[e.target.id] = e.target.value;
    setProfileData(data);
  };

  const UpdateUserDetailsReq = async () => {
    const updateResponse = await handleUpdateProfileDetails({
      user_id: ProfileDetails?.user_id,
      ...profileData,
    });

    if (updateResponse?.data?.status === true) {
      setToggleEditDetails(false);
      message.success("Profile Update Success");
    } else {
      message.warn("There was an error updating!");
    }
  };

  const onChange = (value, dateString) => {
    const selectedDate =
      dateString?.split("/")[0] +
      "-" +
      dateString?.split("/")[1] +
      "-" +
      dateString?.split("/")[2];

    const currentData = { ...profileData };
    currentData["date_of_birth"] = selectedDate;
    setProfileData(currentData);
  };

  const onOk = (value) => {
    console.log("onOk: ", value);
  };

  const cancelEdit = () => {
    // Reset the profileData to the original state when cancelling edits
    setProfileData(originalProfileData);
    setToggleEditDetails(false);
  };

  const handleWorkLocationChange = (e) => {
    const data = { ...profileData };
    data.work_experiences = e.key;
    setProfileData(data);
  };

  const workExperience = (
    <Menu onClick={handleWorkLocationChange}>
      <Menu.Item key="1 Year">1 Year</Menu.Item>
      <Menu.Item key="2 Years">2 Years</Menu.Item>
      <Menu.Item key="5+ Years">5+ Years</Menu.Item>
      <Menu.Item key="10+ Years">10+ Years</Menu.Item>
    </Menu>
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center ">
        <div className="flex gap-2">
          <div className="rounded-full w-1/3 mr-4">
            <Avatar
              className="rounded-md cursor-pointer"
              size="60"
              color="#cbd5e1"
              fgColor="#000"
              name={profileData?.full_name}
            />
          </div>
          <div className="flex-col font-poppins my-auto">
            <div
              className={`2xl:text-lg text-base ${
                colorMode ? "text-slate-300" : "text-gray-800"
              }`}
            >
              {profileData?.full_name}
            </div>
            <div
              className={`text-xs ${
                colorMode ? "text-slate-300" : "text-gray-800"
              }`}
            >
              My role
              <span className="2xl-font-semibold px-1">
                {ProfileDetails?.role_id === 1 && "Super Admin"}
                {ProfileDetails?.role_id === 2 && "CRM Sales"}
                {ProfileDetails?.role_id === 3 && "Admin"}
                {ProfileDetails?.role_id === 4 && "Advisor"}
                {ProfileDetails?.role_id === 5 && "Sales Employee"}
                {ProfileDetails?.role_id === 6 && "Students"}
              </span>
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          {openProfile && toggleEditDetails ? (
            <div className="flex 2xl:flex-row flex-col justify-center gap-2">
              <div>
                <button
                  className="2xl:py-2 py-1 2xl:px-4 px-2 w-full hover:text-gray-800 bg-white border-2 hover:border-black rounded-lg transition-colors duration-150 focus:shadow-outline border-none"
                  onClick={cancelEdit}
                >
                  Cancel
                </button>
              </div>
              <div>
                <button
                  type="submit"
                  onClick={UpdateUserDetailsReq}
                  className="2xl:py-2 py-1 2xl:px-4 px-2 w-full text-white hover:bg-black rounded-lg transition-colors duration-150 focus:shadow-outline bg-gradient-to-b from-[#8B7CFD] via-[#8B7CFD] to-[#159AFB] tracking-wide"
                >
                  Save
                </button>
              </div>
            </div>
          ) : (
            <button
              className={`bg-gradient-to-b from-[#8B7CFD] via-[#8B7CFD] to-[#159AFB] font-poppins text-sm rounded-md 2xl:py-2 py-1 2xl:px-4 px-2 flex items-center`}
              onClick={() => {
                setToggleEditDetails(true);
              }}
            >
              <Icons.Edit className="text-white" />
              <h1 className="m-0 p-0 text-white">Edit</h1>
            </button>
          )}
        </div>
      </div>
      <div className=" w-full h-[60vh] overflow-y-scroll">
        <div className="w-full flex flex-col items-center text-white py-2 border-b">
          <h1
            className={`text-sm font-normal m-0 p-0 ${
              colorMode ? "text-slate-300" : "text-gray-800"
            }  w-full text-start`}
          >
            Full Name
          </h1>
          {toggleEditDetails ? (
            <input
              id="full_name"
              name="full_name"
              className={`text-start w-full px-2 py-0 m-0 bg-transparent font-semibold ${
                colorMode ? "text-slate-300" : "text-gray-800"
              } 2xl:text-base text-sm rounded-md`}
              type="text"
              disabled={!toggleEditDetails ? "disabled" : ""}
              onChange={userData}
              defaultValue={profileData?.full_name}
            />
          ) : (
            <h1
              className={`w-full m-0 p-0 2xl:text-base text-sm  text-white text-start font-bold ${
                colorMode ? "text-slate-300" : "text-gray-800"
              } `}
            >
              {profileData?.full_name ? profileData?.full_name : "Not Added"}
            </h1>
          )}
        </div>
        <div className="w-full flex flex-col items-center text-white py-2 border-b">
          <h1
            className={`text-sm font-normal m-0 p-0 ${
              colorMode ? "text-slate-300" : "text-gray-800"
            }  w-full text-start`}
          >
            Date of Birth
          </h1>

          {toggleEditDetails ? (
            <div
              className={`m-0 p-0 w-full bg-transparent flex items-center justify-between ${
                colorMode ? "text-slate-300" : "text-gray-800"
              } 2xl:text-base text-sm `}
            >
              <DatePicker
                onChange={onChange}
                onOk={onOk}
                format={"DD/MM/YYYY"}
                className="w-full"
                placeholder={profileData?.date_of_birth}
              />
            </div>
          ) : (
            <h1
              className={`w-full m-0 p-0 2xl:text-base text-sm text-white text-start font-bold ${
                colorMode ? "text-slate-300" : "text-gray-800"
              } `}
            >
              {profileData?.date_of_birth
                ? profileData?.date_of_birth
                : "Not Added"}
            </h1>
          )}
        </div>
        <div className="w-full flex flex-col items-center text-white py-2 border-b">
          <h1
            className={`text-sm font-normal m-0 p-0 ${
              colorMode ? "text-slate-300" : "text-gray-800"
            }  w-full text-start`}
          >
            Contact Number
          </h1>

          {toggleEditDetails ? (
            <input
              id="secondary_contact"
              name="secondary_contact"
              className={`text-start w-full px-2 py-0  m-0 bg-transparent font-semibold ${
                colorMode ? "text-slate-300" : "text-gray-800"
              } 2xl:text-base text-sm  rounded-md`}
              type="text"
              disabled={!toggleEditDetails ? "disabled" : ""}
              onChange={userData}
              defaultValue={profileData?.secondary_contact}
            />
          ) : (
            <h1
              className={`w-full m-0 p-0 2xl:text-base text-sm  text-white text-start font-bold ${
                colorMode ? "text-slate-300" : "text-gray-800"
              } `}
            >
              {profileData?.secondary_contact
                ? profileData?.secondary_contact
                : "Not Added"}
            </h1>
          )}
        </div>
        <div className="w-full flex flex-col items-center text-white py-2 border-b">
          <h1
            className={`text-sm font-normal m-0 p-0 ${
              colorMode ? "text-slate-300" : "text-gray-800"
            }  w-full text-start`}
          >
            Location
          </h1>
          {toggleEditDetails ? (
            <input
              id="location"
              name="location"
              className={`text-start w-full px-2 py-0 m-0 bg-transparent font-semibold ${
                colorMode ? "text-slate-300" : "text-gray-800"
              }  2xl:text-base text-sm rounded-md`}
              type="text"
              disabled={!toggleEditDetails ? "disabled" : ""}
              onChange={userData}
              defaultValue={profileData?.location}
            />
          ) : (
            <h1
              className={`w-full m-0 p-0 2xl:text-base text-sm text-white text-start font-bold ${
                colorMode ? "text-slate-300" : "text-gray-800"
              } `}
            >
              {profileData?.location ? profileData?.location : "Not Added"}
            </h1>
          )}
        </div>
        <div className="w-full flex flex-col items-center text-white py-2 border-b">
          <h1
            className={`text-sm font-normal m-0 p-0 ${
              colorMode ? "text-slate-300" : "text-gray-800"
            }  w-full text-start`}
          >
            Address
          </h1>

          {toggleEditDetails ? (
            <input
              id="address"
              name="address"
              className={`text-start w-full px-2 py-0  m-0 bg-transparent font-semibold ${
                colorMode ? "text-slate-300" : "text-gray-800"
              } 2xl:text-base text-sm rounded-md`}
              type="text"
              disabled={!toggleEditDetails ? "disabled" : ""}
              onChange={userData}
              defaultValue={profileData?.address}
            />
          ) : (
            <h1
              className={`w-full m-0 p-0 2xl:text-base text-sm text-white text-start font-bold ${
                colorMode ? "text-slate-300" : "text-gray-800"
              } `}
            >
              {profileData?.address ? profileData?.address : "Not Added"}
            </h1>
          )}
        </div>
        <div className="w-full flex flex-col items-center text-white py-2 border-b">
          <h1
            className={`text-sm font-normal m-0 p-0 ${
              colorMode ? "text-slate-300" : "text-gray-800"
            }  w-full text-start`}
          >
            Region
          </h1>
          {toggleEditDetails ? (
            <input
              id="region"
              name="region"
              className={`text-start w-full px-2 py-0 m-0 bg-transparent font-semibold ${
                colorMode ? "text-slate-300" : "text-gray-800"
              } 2xl:text-base text-sm rounded-md`}
              type="text"
              disabled={!toggleEditDetails ? "disabled" : ""}
              onChange={userData}
              defaultValue={profileData?.region}
            />
          ) : (
            <h1
              className={`w-full m-0 p-0 2xl:text-base text-sm text-white text-start font-bold ${
                colorMode ? "text-slate-300" : "text-gray-800"
              } `}
            >
              {profileData?.region ? profileData?.region : "Not Added"}
            </h1>
          )}
        </div>
        <div className="w-full flex flex-col items-center text-white py-2 border-b">
          <h1
            className={`text-sm font-normal m-0 p-0 ${
              colorMode ? "text-slate-300" : "text-gray-800"
            }  w-full text-start`}
          >
            Post Code
          </h1>
          {toggleEditDetails ? (
            <input
              id="postcode"
              name="postcode"
              className={`text-start w-full px-2 py-0 m-0 bg-transparent font-semibold ${
                colorMode ? "text-slate-300" : "text-gray-800"
              } 2xl:text-base text-sm rounded-md`}
              type="text"
              disabled={!toggleEditDetails ? "disabled" : ""}
              onChange={userData}
              defaultValue={profileData?.postcode}
            />
          ) : (
            <h1
              className={`w-full m-0 p-0 2xl:text-base text-sm text-white text-start font-bold ${
                colorMode ? "text-slate-300" : "text-gray-800"
              } `}
            >
              {profileData?.postcode ? profileData?.postcode : "Not Added"}
            </h1>
          )}
        </div>
        <div className="w-full flex flex-col items-center text-white py-2 border-b">
          <h1
            className={`text-sm font-normal m-0 p-0 ${
              colorMode ? "text-slate-300" : "text-gray-800"
            }  w-full text-start`}
          >
            Profession
          </h1>
          {toggleEditDetails ? (
            <input
              id="profession"
              name="profession"
              className={`text-start w-full px-2 py-0  m-0 bg-transparent font-semibold ${
                colorMode ? "text-slate-300" : "text-gray-800"
              } 2xl:text-base text-sm rounded-md`}
              type="text"
              disabled={!toggleEditDetails ? "disabled" : ""}
              onChange={userData}
              defaultValue={profileData?.profession}
            />
          ) : (
            <h1
              className={`w-full m-0 p-0 2xl:text-base text-sm text-white text-start font-bold ${
                colorMode ? "text-slate-300" : "text-gray-800"
              } `}
            >
              {profileData?.profession ? profileData?.profession : "Not Added"}
            </h1>
          )}
        </div>
        <div className="w-full flex flex-col items-center text-white py-2 border-b">
          <h1
            className={`text-sm font-normal m-0 p-0 ${
              colorMode ? "text-slate-300" : "text-gray-800"
            }  w-full text-start`}
          >
            Work Experience
          </h1>
          {toggleEditDetails ? (
            <Dropdown
              overlay={workExperience}
              trigger={["click"]}
              defaultValue={profileData?.work_experiences}
              className="cursor-pointer border-slate-300"
            >
              <div
                className={`text-start w-full px-2 py-0  m-0 bg-transparent font-semibold ${
                  colorMode ? "text-slate-300" : "text-gray-800"
                } 2xl:text-base text-sm rounded-md`}
              >
                {profileData?.work_experiences
                  ? profileData?.work_experiences
                  : "Select Location"}
              </div>
            </Dropdown>
          ) : (
            <h1
              className={`w-full m-0 p-0 2xl:text-base text-sm text-white text-start font-bold ${
                colorMode ? "text-slate-300" : "text-gray-800"
              } `}
            >
              {profileData?.work_experiences
                ? profileData?.work_experiences
                : "Not Added"}
            </h1>
          )}
        </div>
        <div className="w-full flex flex-col items-center text-white py-2">
          <h1
            className={`text-sm font-normal m-0 p-0 ${
              colorMode ? "text-slate-300" : "text-gray-800"
            }  w-full text-start`}
          >
            Qualification
          </h1>
          {toggleEditDetails ? (
            <input
              id="qualification"
              name="qualification"
              className={`text-start w-full px-2 py-0  m-0 bg-transparent font-semibold ${
                colorMode ? "text-slate-300" : "text-gray-800"
              } 2xl:text-base text-sm rounded-md`}
              type="text"
              disabled={!toggleEditDetails ? "disabled" : ""}
              onChange={userData}
              defaultValue={profileData?.qualification}
            />
          ) : (
            <h1
              className={`w-full m-0 p-0 2xl:text-base text-sm text-white text-start font-bold ${
                colorMode ? "text-slate-300" : "text-gray-800"
              } `}
            >
              {profileData?.qualification
                ? profileData?.qualification
                : profileData?.qualification
                ? profileData?.qualification
                : "Not Added"}
            </h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
