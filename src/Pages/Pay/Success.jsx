import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import successBlower from "../../assets/Images/success_blower.gif";
import { handleAddEwayPaymentDetails } from "../../Components/services/leads";
import { Storage } from "../../Components/Shared/utils/store";

const Success = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [leadInfo, setLeadInfo] = useState([]);
  const userDetails = useSelector((state) => state.user)?.userInfo;
  const [searchParams] = useSearchParams();

  // console.log(userDetails);
  // console.log(id.split("-"));
  // console.log(searchParams.get("AccessCode"));

  useEffect(() => {
    console.log(Storage.getItem("l_Details"));
    setLeadInfo(Storage.getItem("l_Details"));
  }, [id]);

  useEffect(() => {
    console.log({
      user_id: userDetails?.user_id,
      lead_id: id.split("-")?.[0],
      company_id: parseInt(id.split("-")?.[1]),
      payment_method: "eWay",
      accessCode: searchParams.get("AccessCode"),
      full_name: userDetails?.full_name,
      user_email: userDetails?.email,
      role_id: userDetails?.role_id,
      course_code: leadInfo?.course_code,
      course_title: leadInfo?.course_title,
    });

    // console.log(parseInt(leadInfo?.[1]));

    if (searchParams?.get("AccessCode")) {
      (async () => {
        const addEwayPaymentHistory = await handleAddEwayPaymentDetails(
          userDetails?.user_id,
          parseInt(id.split("-")?.[0]),
          parseInt(id.split("-")?.[1]),
          "eWay",
          searchParams.get("AccessCode"),
          userDetails?.full_name,
          userDetails?.email,
          userDetails?.role_id,
          leadInfo?.course_code,
          leadInfo?.course_title
        );

        if (addEwayPaymentHistory?.key === "success") {
          Storage.removeItem("l_Details");
          navigate(`/success/${id}`);
        }
      })();
    }
  }, [
    id,
    leadInfo?.course_code,
    leadInfo?.course_title,
    navigate,
    searchParams,
    userDetails,
  ]);

  return (
    <div className="lg:px-4 2xl:px-6 pt-25 pt-1 pb-10 flex justify-center items-center bg-gray-100 h-screen">
      <div
        className="bg-gray-100 shadow-lg"
        style={{
          width: "45%",
        }}
      >
        <div className="bg-white p-10 md:mx-auto rounded-md">
          <div className="flex justify-center items-center">
            <img src={successBlower} alt="" />
          </div>

          <div className="text-center">
            <h3 className="md:text-2.5xl text-base text-gray-900 font-semibold text-center">
              You Payment Has Been Done Successfully!
            </h3>
            <p className="text-gray-600 my-2">
              Thank you for completing your secure online payment.
            </p>
            <p className="text-xl font-semibold text-brand-color italic">
              Have a great day!
            </p>
            <div className="py-10 text-center">
              <Link
                to={`/lead/${id.split("-")?.[0]}`}
                className="px-12 bg-brand-color hover:bg-opacity-90 text-white hover:text-white rounded-full font-semibold py-3"
              >
                GO BACK
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Success;
