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

const ProfileSettings = () => {
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

  const [toggleEditDetails, setToggleEditDetails] = useState(false);
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
    <div className="h-[83vh] max-h-full p-3 rounded-xl shadow-md backdrop-blur-2xl bg-[#ffffff55] overflow-y-scroll">
      <div className="flex justify-between items-center ">
        <div className="flex">
          <div className="rounded-full mr-4">
            <Avatar
              className="rounded-md cursor-pointer"
              size="80"
              color="#fff"
              fgColor="#000"
              name={profileData?.full_name}
            />
          </div>
          <div className="flex-col font-poppins my-auto">
            <div className="text-lg text-white">{profileData?.full_name}</div>
            <div className="text-xs text-white">
              My role
              <span className="font-semibold px-1">
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
        <div className="flex justify-end h-[5vh]">
          {toggleEditDetails ? (
            <div className="flex justify-center my-2 gap-1">
              <div>
                <button
                  className="py-2 px-4 w-full hover:text-black bg-white border-2 hover:border-black rounded-lg transition-colors duration-150 focus:shadow-outline border-none"
                  onClick={cancelEdit}
                >
                  Cancel
                </button>
              </div>
              <div>
                <button
                  type="submit"
                  onClick={UpdateUserDetailsReq}
                  className="py-2 px-4 w-full text-white hover:bg-black rounded-lg transition-colors duration-150 focus:shadow-outline bg-gradient-to-b from-[#8B7CFD] via-[#8B7CFD] to-[#159AFB] tracking-wide"
                >
                  Save
                </button>
              </div>
            </div>
          ) : (
            <button
              className={`bg-gradient-to-b from-[#8B7CFD] via-[#8B7CFD] to-[#159AFB] font-poppins text-sm rounded-md py-2 px-4 flex items-center`}
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
      <div className="mt-4 w-full">
        <div className="w-full flex flex-col items-center text-base text-white py-2 border-b text-center">
          <h1
            className={`text-sm m-0 p-0 ${
              colorMode ? "text-slate-300" : "text-gray-800"
            }  w-full text-center`}
          >
            Full Name
          </h1>
          {toggleEditDetails ? (
            <input
              id="full_name"
              name="full_name"
              className={`text-center w-full p-0 m-0 bg-transparent font-semibold text-gray-800 text-base rounded-md`}
              type="text"
              disabled={!toggleEditDetails ? "disabled" : ""}
              onChange={userData}
              defaultValue={profileData?.full_name}
            />
          ) : (
            <h1
              className={`w-full m-0 p-0 text-base text-white text-center font-bold ${
                colorMode ? "text-slate-300" : "text-black"
              } `}
            >
              {profileData?.full_name ? profileData?.full_name : "Not Added"}
            </h1>
          )}
        </div>
        <div className="w-full flex flex-col items-center text-base text-white py-2 border-b text-center">
          <h1
            className={`text-sm m-0 p-0 ${
              colorMode ? "text-slate-300" : "text-gray-800"
            }  w-full text-center`}
          >
            Date of Birth
          </h1>

          {toggleEditDetails ? (
            <div className="m-0 p-0 w-full bg-transparent flex items-center justify-between text-white text-base">
              <DatePicker
                onChange={onChange}
                onOk={onOk}
                format={"DD/MM/YYYY"}
                className="w-full bg-[#fc00ff]"
                placeholder={profileData?.date_of_birth}
              />
            </div>
          ) : (
            <h1
              className={`w-full m-0 p-0 text-base text-white text-center font-bold ${
                colorMode ? "text-slate-300" : "text-black"
              } `}
            >
              {profileData?.date_of_birth
                ? profileData?.date_of_birth
                : "Not Added"}
            </h1>
          )}
        </div>
        <div className="w-full flex flex-col items-center text-base text-white py-2 border-b text-center">
          <h1
            className={`text-sm m-0 p-0 ${
              colorMode ? "text-slate-300" : "text-gray-800"
            }  w-full text-center`}
          >
            Contact Number
          </h1>

          {toggleEditDetails ? (
            <input
              id="secondary_contact"
              name="secondary_contact"
              className={`text-center w-full p-0 m-0 bg-transparent font-semibold text-gray-800 text-base rounded-md`}
              type="text"
              disabled={!toggleEditDetails ? "disabled" : ""}
              onChange={userData}
              defaultValue={profileData?.secondary_contact}
            />
          ) : (
            <h1
              className={`w-full m-0 p-0 text-base text-white text-center font-bold ${
                colorMode ? "text-slate-300" : "text-black"
              } `}
            >
              {profileData?.secondary_contact
                ? profileData?.secondary_contact
                : "Not Added"}
            </h1>
          )}
        </div>
        <div className="w-full flex flex-col items-center text-base text-white py-2 border-b text-center">
          <h1
            className={`text-sm m-0 p-0 ${
              colorMode ? "text-slate-300" : "text-gray-800"
            }  w-full text-center`}
          >
            Location
          </h1>
          {toggleEditDetails ? (
            <input
              id="location"
              name="location"
              className={`text-center w-full p-0 m-0 bg-transparent font-semibold text-gray-800 text-base rounded-md`}
              type="text"
              disabled={!toggleEditDetails ? "disabled" : ""}
              onChange={userData}
              defaultValue={profileData?.location}
            />
          ) : (
            <h1
              className={`w-full m-0 p-0 text-base text-white text-center font-bold ${
                colorMode ? "text-slate-300" : "text-black"
              } `}
            >
              {profileData?.location ? profileData?.location : "Not Added"}
            </h1>
          )}
        </div>
        <div className="w-full flex flex-col items-center text-base text-white py-2 border-b text-center">
          <h1
            className={`text-sm m-0 p-0 ${
              colorMode ? "text-slate-300" : "text-gray-800"
            }  w-full text-center`}
          >
            Address
          </h1>

          {toggleEditDetails ? (
            <input
              id="address"
              name="address"
              className={`text-center w-full p-0 m-0 bg-transparent font-semibold text-gray-800 text-base rounded-md`}
              type="text"
              disabled={!toggleEditDetails ? "disabled" : ""}
              onChange={userData}
              defaultValue={profileData?.address}
            />
          ) : (
            <h1
              className={`w-full m-0 p-0 text-base text-white text-center font-bold ${
                colorMode ? "text-slate-300" : "text-black"
              } `}
            >
              {profileData?.address ? profileData?.address : "Not Added"}
            </h1>
          )}
        </div>
        <div className="w-full flex flex-col items-center text-base text-white py-2 border-b text-center">
          <h1
            className={`text-sm m-0 p-0 ${
              colorMode ? "text-slate-300" : "text-gray-800"
            }  w-full text-center`}
          >
            Region
          </h1>
          {toggleEditDetails ? (
            <input
              id="region"
              name="region"
              className={`text-center w-full p-0 m-0 bg-transparent font-semibold text-gray-800 text-base rounded-md`}
              type="text"
              disabled={!toggleEditDetails ? "disabled" : ""}
              onChange={userData}
              defaultValue={profileData?.region}
            />
          ) : (
            <h1
              className={`w-full m-0 p-0 text-base text-white text-center font-bold ${
                colorMode ? "text-slate-300" : "text-black"
              } `}
            >
              {profileData?.region ? profileData?.region : "Not Added"}
            </h1>
          )}
        </div>
        <div className="w-full flex flex-col items-center text-base text-white py-2 border-b text-center">
          <h1
            className={`text-sm m-0 p-0 ${
              colorMode ? "text-slate-300" : "text-gray-800"
            }  w-full text-center`}
          >
            Post Code
          </h1>
          {toggleEditDetails ? (
            <input
              id="postcode"
              name="postcode"
              className={`text-center w-full p-0 m-0 bg-transparent font-semibold text-gray-800 text-base rounded-md`}
              type="text"
              disabled={!toggleEditDetails ? "disabled" : ""}
              onChange={userData}
              defaultValue={profileData?.postcode}
            />
          ) : (
            <h1
              className={`w-full m-0 p-0 text-base text-white text-center font-bold ${
                colorMode ? "text-slate-300" : "text-black"
              } `}
            >
              {profileData?.postcode ? profileData?.postcode : "Not Added"}
            </h1>
          )}
        </div>
        <div className="w-full flex flex-col items-center text-base text-white py-2 border-b text-center">
          <h1
            className={`text-sm m-0 p-0 ${
              colorMode ? "text-slate-300" : "text-gray-800"
            }  w-full text-center`}
          >
            Profession
          </h1>
          {toggleEditDetails ? (
            <input
              id="profession"
              name="profession"
              className={`text-center w-full p-0 m-0 bg-transparent font-semibold text-gray-800 text-base rounded-md`}
              type="text"
              disabled={!toggleEditDetails ? "disabled" : ""}
              onChange={userData}
              defaultValue={profileData?.profession}
            />
          ) : (
            <h1
              className={`w-full m-0 p-0 text-base text-white text-center font-bold ${
                colorMode ? "text-slate-300" : "text-black"
              } `}
            >
              {profileData?.profession ? profileData?.profession : "Not Added"}
            </h1>
          )}
        </div>
        <div className="w-full flex flex-col items-center text-base text-white py-2 border-b text-center">
          <h1
            className={`text-sm m-0 p-0 ${
              colorMode ? "text-slate-300" : "text-gray-800"
            }  w-full text-center`}
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
                className={`text-center w-full p-0 m-0 bg-transparent font-semibold text-gray-800 text-base rounded-md`}
              >
                {profileData?.work_experiences
                  ? profileData?.work_experiences
                  : "Select Location"}
              </div>
            </Dropdown>
          ) : (
            <h1
              className={`w-full m-0 p-0 text-base text-white text-center font-bold ${
                colorMode ? "text-slate-300" : "text-black"
              } `}
            >
              {profileData?.work_experiences
                ? profileData?.work_experiences
                : "Not Added"}
            </h1>
          )}
        </div>
        <div className="w-full flex flex-col items-center text-base text-white py-2 border-b text-center">
          <h1
            className={`text-sm m-0 p-0 ${
              colorMode ? "text-slate-300" : "text-gray-800"
            }  w-full text-center`}
          >
            Qualification
          </h1>
          {toggleEditDetails ? (
            <input
              id="qualification"
              name="qualification"
              className={`text-center w-full p-0 m-0 bg-transparent font-semibold text-gray-800 text-base rounded-md`}
              type="text"
              disabled={!toggleEditDetails ? "disabled" : ""}
              onChange={userData}
              defaultValue={profileData?.qualification}
            />
          ) : (
            <h1
              className={`w-full m-0 p-0 text-base text-white text-center font-bold ${
                colorMode ? "text-slate-300" : "text-black"
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
