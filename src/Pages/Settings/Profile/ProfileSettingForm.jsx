import { message } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  handleProfileDetails,
  handleUpdateProfileDetails,
} from "../../../Components/services/auth";
import Icons from "../../../Components/Shared/Icons";

function ProfileSettingForm() {
  const ProfileDetails = useSelector((state) => state?.user);

  const initialState = {
    full_name: "",
    date_of_birth: "",
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
  // const [syncprofileData, setProfileData] = useState(initialState);

  useEffect(() => {
    (async () => {
      const userDetailResponse = await handleProfileDetails(
        ProfileDetails?.userInfo?.user_id
      );

      console.log("Onpage", userDetailResponse);

      if (userDetailResponse?.status === true) {
        const user = userDetailResponse?.data;
        setProfileData(user);
        //dispatch(setLoader(false));
      } else {
        setTimeout(() => {
          //dispatch(setLoader(false));
        }, 3000);
      }
    })();
  }, [ProfileDetails?.userInfo?.user_id]);

  const userData = (e) => {
    const data = { ...profileData };
    console.log("data", data);
    data[e.target.id] = e.target.value;
    setProfileData(data);
  };

  // useEffect(() => {
  //   console.log(ProfileDetails);
  // }, [ProfileDetails])

  /*   console.log({
    user_id: ProfileDetails?.user_id,
    ...profileData
  }); */

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

  return (
    <div>
      <div className="border rounded-lg bg-white m-auto shadow-sm py-6">
        <div className="w-4/5 font-poppins mt-6 m-auto">
          <div className="flex mb-4">
            <h1 className="text-2xl font-semibold">Profile Details</h1>
            {!toggleEditDetails ? (
              <label title="Edit">
                <Icons.Edit
                  className="mt-1 cursor-pointer ml-6"
                  onClick={() => setToggleEditDetails(true)}
                />
              </label>
            ) : null}
          </div>
          <div className="flex justify-evenly gap-10">
            <div className="w-full">
              <div className="text-lg text-[#808080] leading-8 mb-4 tracking-wide">
                <span>Full Name &nbsp;</span>
                <br />
                {toggleEditDetails ? (
                  <input
                    id="full_name"
                    name="full_name"
                    className={`mt-1 block w-full py-2 border-b border-gray-300 bg-zinc-50 focus:outline-none focus:ring-brand-color focus:border-b focus:border-brand-color sm:text-sm`}
                    type="text"
                    disabled={!toggleEditDetails ? "disabled" : ""}
                    onChange={userData}
                    defaultValue={profileData?.full_name}
                  />
                ) : (
                  <span className="text-sm text-black">
                    {profileData?.full_name
                      ? profileData?.full_name
                      : "Not Added"}
                  </span>
                )}
              </div>
              <div className="text-lg text-[#808080] leading-8 mb-4 tracking-wide">
                <span>Date of Birth &nbsp;</span>
                <br />
                {toggleEditDetails ? (
                  <input
                    id="date_of_birth"
                    name="date_of_birth"
                    className={`mt-1 block w-full py-2 border-b border-gray-300 bg-zinc-50 focus:outline-none focus:ring-brand-color focus:border-b focus:border-brand-color sm:text-sm`}
                    type="text"
                    disabled={!toggleEditDetails ? "disabled" : ""}
                    onChange={userData}
                    defaultValue={profileData?.date_of_birth}
                  />
                ) : (
                  <span className="text-sm text-black">
                    {profileData?.date_of_birth
                      ? profileData?.date_of_birth
                      : "Not Added"}
                  </span>
                )}
              </div>
              <div className="text-lg text-[#808080] leading-8 mb-4 tracking-wide">
                <span>Contact No &nbsp;</span>
                <br />
                {toggleEditDetails ? (
                  <input
                    id="secondary_contact"
                    name="secondary_contact"
                    className={`mt-1 block w-full py-2 border-b border-gray-300 bg-zinc-50 focus:outline-none focus:ring-brand-color focus:border-b focus:border-brand-color sm:text-sm`}
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
              <div className="text-lg text-[#808080] leading-8 mb-4 tracking-wide">
                <span>Location &nbsp;</span>
                <br />
                {toggleEditDetails ? (
                  <input
                    id="location"
                    name="location"
                    className={`mt-1 block w-full py-2 border-b border-gray-300 bg-zinc-50 focus:outline-none focus:ring-brand-color focus:border-b focus:border-brand-color sm:text-sm`}
                    type="text"
                    disabled={!toggleEditDetails ? "disabled" : ""}
                    onChange={userData}
                    defaultValue={profileData?.location}
                  />
                ) : (
                  <span className="text-sm text-black">
                    {profileData?.location
                      ? profileData?.location
                      : "Not Added"}
                  </span>
                )}
              </div>
              <div className="text-lg text-[#808080] leading-8 mb-4 tracking-wide">
                <span>Address &nbsp;</span>
                <br />
                {toggleEditDetails ? (
                  <input
                    id="address"
                    name="address"
                    className={`mt-1 block w-full py-2 border-b border-gray-300 bg-zinc-50 focus:outline-none focus:ring-brand-color focus:border-b focus:border-brand-color sm:text-sm`}
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
            </div>
            <div className="w-full">
              <div className="text-lg text-[#808080] leading-8 mb-4 tracking-wide">
                <span>Region &nbsp;</span>
                <br />
                {toggleEditDetails ? (
                  <input
                    id="region"
                    name="region"
                    className={`mt-1 block w-full py-2 border-b border-gray-300 bg-zinc-50 focus:outline-none focus:ring-brand-color focus:border-b focus:border-brand-color sm:text-sm`}
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
              <div className="text-lg text-[#808080] leading-8 mb-4 tracking-wide">
                <span>Post Code &nbsp;</span>
                <br />
                {toggleEditDetails ? (
                  <input
                    id="postcode"
                    name="postcode"
                    className={`mt-1 block w-full py-2 border-b border-gray-300 bg-zinc-50 focus:outline-none focus:ring-brand-color focus:border-b focus:border-brand-color sm:text-sm`}
                    type="text"
                    disabled={!toggleEditDetails ? "disabled" : ""}
                    onChange={userData}
                    defaultValue={profileData?.postcode}
                  />
                ) : (
                  <span className="text-sm text-black">
                    {profileData?.postcode
                      ? profileData?.postcode
                      : "Not Added"}
                  </span>
                )}
              </div>
              <div className="text-lg text-[#808080] leading-8 mb-4 tracking-wide">
                <span>Profession &nbsp;</span>
                <br />
                {toggleEditDetails ? (
                  <input
                    id="profession"
                    name="profession"
                    className={`mt-1 block w-full py-2 border-b border-gray-300 bg-zinc-50 focus:outline-none focus:ring-brand-color focus:border-b focus:border-brand-color sm:text-sm`}
                    type="text"
                    disabled={!toggleEditDetails ? "disabled" : ""}
                    onChange={userData}
                    defaultValue={profileData?.profession}
                  />
                ) : (
                  <span className="text-sm text-black">
                    {profileData?.profession
                      ? profileData?.profession
                      : "Not Added"}
                  </span>
                )}
              </div>
              <div className="text-lg text-[#808080] leading-8 mb-4 tracking-wide">
                <span>Work Experience &nbsp;</span>
                <br />
                {toggleEditDetails ? (
                  <input
                    id="work_experiences"
                    name="work_experiences"
                    className={`mt-1 block w-full py-2 border-b border-gray-300 bg-zinc-50 focus:outline-none focus:ring-brand-color focus:border-b focus:border-brand-color sm:text-sm`}
                    type="text"
                    disabled={!toggleEditDetails ? "disabled" : ""}
                    onChange={userData}
                    defaultValue={profileData?.work_experiences}
                  />
                ) : (
                  <span className="text-sm text-black">
                    {profileData?.work_experiences
                      ? profileData?.work_experiences
                      : "Not Added"}
                  </span>
                )}
              </div>
              <div className="text-lg text-[#808080] leading-8 mb-4 tracking-wide">
                <span>Qualification &nbsp;</span>
                <br />
                {toggleEditDetails ? (
                  <input
                    id="qualification"
                    name="qualification"
                    className={`mt-1 block w-full py-2 border-b border-gray-300 bg-zinc-50 focus:outline-none focus:ring-brand-color focus:border-b focus:border-brand-color sm:text-sm`}
                    type="text"
                    disabled={!toggleEditDetails ? "disabled" : ""}
                    onChange={userData}
                    defaultValue={profileData?.qualification}
                  />
                ) : (
                  <span className="text-sm text-black">
                    {profileData?.qualification
                      ? profileData?.qualification
                      : "Not Added"}
                  </span>
                )}
              </div>
            </div>
          </div>

          {toggleEditDetails ? (
            <div className="flex justify-center my-10 gap-1">
              <div>
                <button
                  className="h-10 px-5 w-full text-black bg-white border-2 border-black rounded-lg transition-colors duration-150 focus:shadow-outline hover:border-brand-color hover:text-brand-color tracking-wide"
                  onClick={() => setToggleEditDetails(false)}
                >
                  Cancel
                </button>
              </div>
              <div>
                <button
                  type="submit"
                  onClick={UpdateUserDetailsReq}
                  className="h-10 px-5 w-full text-white bg-black rounded-lg transition-colors duration-150 focus:shadow-outline hover:bg-brand-color tracking-wide"
                >
                  Save
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default ProfileSettingForm;
