import axios from "axios";

export const handleConfirmRegistration = async (full_name, email, password) => {
  console.log("DATAAAA", {
    full_name: full_name,
    email: "megatanjib@gmail.com",
    password: password,
  });

  try {
    const sendConfimationMail = await axios.post(
      `${process.env?.REACT_APP_EMAIL_URL}/api/send-registration-mail`,
      // email: registrationDetails?.email,
      {
        full_name: full_name,
        email: "megatanjib@gmail.com",
        password: password,
      }
    );
    console.log("sendConfimationMail >>>>>", sendConfimationMail);
  } catch (error) {
    return error.response;
  }
};
