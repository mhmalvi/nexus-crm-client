import React from "react";
import ProfileSettingForm from "./ProfileSettingForm";
import PasswordResetForm from "./PasswordResetForm";

function EditProfile() {
  return (
    <div className="m-10">
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
