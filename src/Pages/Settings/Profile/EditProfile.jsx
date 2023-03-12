import React from "react";
import ProfileSettingForm from "./ProfileSettingForm";
import PasswordResetForm from "./PasswordResetForm";
import Icons from "../../../Components/Shared/Icons";
import { useNavigate } from "react-router-dom";

function EditProfile() {
  const navigate = useNavigate();

    const handleCancelEditing = () => {
      navigate("../user-profile");
    };
  return (
    <div className="m-10">
      <div
        onClick={handleCancelEditing}
        className="w-11/12 flex items-center m-auto text-lg pb-5 cursor-pointer"
      >
        <Icons.DownArrow className="rotate-90" />
        <span className="pl-2 underline">Profile</span>
      </div>
      <div>
        <ProfileSettingForm />
      </div>
      <div className="my-10">
        <PasswordResetForm />
      </div>
    </div>
  );
}

export default EditProfile;
