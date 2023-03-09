import React from "react";
import GoogleMail from "../../assets/Images/gmail-bg.png";
import { useDispatch } from "react-redux";
import { signin } from "./features/mailUserSlice";
import { auth, provider } from "./Firebase/firebase";
import { signInWithPopup } from "firebase/auth";

const GmailLogin = () => {
  const dispatch = useDispatch();
  const Login = () => {
    signInWithPopup(auth, provider)
      .then(({ user }) => {
        dispatch(signin({
          displayName: user.displayName,
          photoUrl: user.photoURL,
          email: user.email
      }))
        // console.log("auth", user);
      })
      .catch((error) => {
        const errorMessage = error.message;
        alert(errorMessage);
      });
  };
  return (
    <div className="w-full h-[100vh] flex justify-center items-center">
      <div>
        <img src={GoogleMail} alt="" className="w-[40%] m-auto" />
        <div
          onClick={Login}
          
          className="w-[15rem] bg-[#4285F4] px-4 py-2 text-white text-lg text-center rounded-md border m-auto cursor-pointer"
        >
          LOGIN WITH GMAIL
        </div>
      </div>
    </div>
  );
};

export default GmailLogin;
