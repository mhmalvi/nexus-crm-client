import axios from "axios";

export const handleAddEwayPaymentDetails = async (
  userId,
  leadId,
  companyId,
  paymentMethod,
  accessCode,
  fullName,
  userEmail,
  roleId,
  courseCode,
  courseTitile
) => {
  try {
    const result = await axios.post(
      `${process.env?.REACT_APP_PAYMENT_URL}/api/eway/payment/response`,
      {
        user_id: userId,
        lead_id: leadId,
        company_id: companyId,
        payment_method: paymentMethod,
        accessCode: accessCode,
        full_name: fullName,
        user_email: userEmail,
        role_id: roleId,
        course_code: courseCode,
        course_title: courseTitile,
      }
    );
    return result.data;
  } catch (error) {
    return error.response;
  }
};

export const handlePaymentDetails = async (leadId) => {
  try {
    const result = await axios.get(
      `${process.env?.REACT_APP_PAYMENT_URL}/api/payment-details/${leadId}`
    );
    return result.data;
  } catch (error) {
    return error.response;
  }
};
