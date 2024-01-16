import React, { useEffect, useState } from "react";
import { DatePicker, Dropdown, Menu, message } from "antd";
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

    console.log("UpdateResponse", updateResponse);

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
          {!toggleEditDetails && (
            <button
              className="bg-brand-color text-white font-poppins text-sm rounded-md px-6 py-2 flex items-center"
              onClick={() => {
                setToggleEditDetails(true);
              }}
            >
              <Icons.Edit className="text-white" />
              <span className="ml-2">Edit</span>
            </button>
          )}
        </div>
      </div>
      <div className="flex flex-col mt-4">
        <div className="text-base text-white mb-2 border-b">
          <span>Full Name &nbsp;</span>
          <br />
          {toggleEditDetails ? (
            <input
              id="full_name"
              name="full_name"
              className={`w-full p-0 m-0 bg-transparent text-[#808080] text-sm`}
              type="text"
              disabled={!toggleEditDetails ? "disabled" : ""}
              onChange={userData}
              defaultValue={profileData?.full_name}
            />
          ) : (
            <span className="text-sm text-black">
              {profileData?.full_name ? profileData?.full_name : "Not Added"}
            </span>
          )}
        </div>
        <div className="text-base text-white mb-2 border-b">
          <span>Date of Birth &nbsp;</span>
          <br />
          {toggleEditDetails ? (
            <div className="m-0 p-0 w-full bg-transparent flex items-center justify-between text-[#808080] text-sm">
              <div>{profileData?.date_of_birth}</div>
              <DatePicker
                bordered={false}
                onChange={onChange}
                onOk={onOk}
                format={"DD/MM/YYYY"}
              />
            </div>
          ) : (
            <span className="text-sm text-black">
              {profileData?.date_of_birth
                ? profileData?.date_of_birth
                : "Not Added"}
            </span>
          )}
        </div>
        <div className="text-base text-white mb-2 border-b">
          <span>Contact No &nbsp;</span>
          <br />
          {toggleEditDetails ? (
            <input
              id="secondary_contact"
              name="secondary_contact"
              className={`w-full p-0 m-0 bg-transparent text-[#808080] text-sm`}
              type="text"
              disabled={!toggleEditDetails ? "disabled" : ""}
              onChange={userData}
              defaultValue={profileData?.secondary_contact}
            />
          ) : (
            <span className="text-sm text-black">
              {profileData?.secondary_contact
                ? profileData?.secondary_contact
                : "Not Added"}
            </span>
          )}
        </div>
        <div className="text-base text-white mb-2 border-b">
          <span>Location &nbsp;</span>
          <br />
          {toggleEditDetails ? (
            <input
              id="location"
              name="location"
              className={`w-full p-0 m-0 bg-transparent text-[#808080] text-sm`}
              type="text"
              disabled={!toggleEditDetails ? "disabled" : ""}
              onChange={userData}
              defaultValue={profileData?.location}
            />
          ) : (
            <span className="text-sm text-black">
              {profileData?.location ? profileData?.location : "Not Added"}
            </span>
          )}
        </div>
        <div className="text-base text-white mb-2 border-b">
          <span>Address &nbsp;</span>
          <br />
          {toggleEditDetails ? (
            <input
              id="address"
              name="address"
              className={`w-full p-0 m-0 bg-transparent text-[#808080] text-sm`}
              type="text"
              disabled={!toggleEditDetails ? "disabled" : ""}
              onChange={userData}
              defaultValue={profileData?.address}
            />
          ) : (
            <span className="text-sm text-black">
              {profileData?.address ? profileData?.address : "Not Added"}
            </span>
          )}
        </div>
        <div className="text-base text-white mb-2 border-b">
          <span>Region &nbsp;</span>
          <br />
          {toggleEditDetails ? (
            <input
              id="region"
              name="region"
              className={`w-full p-0 m-0 bg-transparent text-[#808080] text-sm`}
              type="text"
              disabled={!toggleEditDetails ? "disabled" : ""}
              onChange={userData}
              defaultValue={profileData?.region}
            />
          ) : (
            <span className="text-sm text-black">
              {profileData?.region ? profileData?.region : "Not Added"}
            </span>
          )}
        </div>
        <div className="text-base text-white mb-2 border-b">
          <span>Post Code &nbsp;</span>
          <br />
          {toggleEditDetails ? (
            <input
              id="postcode"
              name="postcode"
              className={`w-full p-0 m-0 bg-transparent text-[#808080] text-sm`}
              type="text"
              disabled={!toggleEditDetails ? "disabled" : ""}
              onChange={userData}
              defaultValue={profileData?.postcode}
            />
          ) : (
            <span className="text-sm text-black">
              {profileData?.postcode ? profileData?.postcode : "Not Added"}
            </span>
          )}
        </div>
        <div className="text-base text-white mb-2 border-b">
          <span>Profession &nbsp;</span>
          <br />
          {toggleEditDetails ? (
            <input
              id="profession"
              name="profession"
              className={`w-full p-0 m-0 bg-transparent text-[#808080] text-sm`}
              type="text"
              disabled={!toggleEditDetails ? "disabled" : ""}
              onChange={userData}
              defaultValue={profileData?.profession}
            />
          ) : (
            <span className="text-sm text-black">
              {profileData?.profession ? profileData?.profession : "Not Added"}
            </span>
          )}
        </div>
        <div className="text-base text-white mb-2 border-b">
          <span>Work Experience &nbsp;</span>
          <br />
          {toggleEditDetails ? (
            <Dropdown
              overlay={workExperience}
              trigger={["click"]}
              defaultValue={profileData?.work_experiences}
              className="text-black"
            >
              <div className="cursor-pointer text-base text-[#808080] bg-transparent text-sm">
                {profileData?.work_experiences
                  ? profileData?.work_experiences
                  : "Select Location"}
              </div>
            </Dropdown>
          ) : (
            <span className="text-sm text-black">
              {profileData?.work_experiences
                ? profileData?.work_experiences
                : "Not Added"}
            </span>
          )}
        </div>
        <div className="text-base text-white mb-2">
          <span>Qualification &nbsp;</span>
          <br />
          {toggleEditDetails ? (
            <input
              id="qualification"
              name="qualification"
              className={`w-full p-0 m-0 bg-transparent text-[#808080] text-sm `}
              type="text"
              disabled={!toggleEditDetails ? "disabled" : ""}
              onChange={userData}
              defaultValue={profileData?.qualification}
            />
          ) : (
            <span className="text-sm text-black">
              {profileData?.qualification
                ? profileData?.qualification
                : profileData?.qualification
                ? profileData?.qualification
                : "Not Added"}
            </span>
          )}
        </div>
      </div>

      {toggleEditDetails ? (
        <div className="flex justify-center my-2 gap-1">
          <div>
            <button
              className="h-10 px-5 w-full hover:text-black bg-white border-2 hover:border-black rounded-lg transition-colors duration-150 focus:shadow-outline border-brand-color text-brand-color tracking-wide"
              onClick={cancelEdit}
            >
              Cancel
            </button>
          </div>
          <div>
            <button
              type="submit"
              onClick={UpdateUserDetailsReq}
              className="h-10 px-5 w-full text-white hover:bg-black rounded-lg transition-colors duration-150 focus:shadow-outline bg-brand-color tracking-wide"
            >
              Save
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ProfileSettings;
