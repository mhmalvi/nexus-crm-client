import { message, Modal } from "antd";
import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import ReactStars from "react-stars";
import {
  handleLeadCommentUpdate,
  handleLeadReviewUpdate,
  handleLeadStatusUpdate,
} from "../../Components/services/leads";
import Icons from "../../Components/Shared/Icons";
import CheckList from "./CheckList";

const UserDetails = ({ leadDetails }) => {
  const userDetails = useSelector((state) => state?.user);
  const navigate = useNavigate();

  const [addSealsman, setAddSealsman] = useState(false);
  const [toggleChcekList, setToggleChcekList] = useState(false);
  const [toggleApplication, setToggleApplication] = useState(false);
  const [closeSealsman, setCloseSealsman] = useState(true);
  const [rating, setRating] = useState();
  const [comment, setComment] = useState("");

  useEffect(() => {
    setRating(leadDetails?.star_review);
    setComment(leadDetails?.lead_remarks);
  }, [leadDetails]);

  const handleCancel = () => {
    setToggleChcekList(false);
    setToggleApplication(false);
    setAddSealsman(false);
  };

  const ratingChanged = async (newRating) => {
    const reviewResponse = await handleLeadReviewUpdate(
      leadDetails?.lead_id,
      newRating,
      userDetails?.userInfo?.user_id
    );

    if (reviewResponse?.status) {
      message.success("Rating Added Successfully");
    }

    setRating(newRating);
  };

  const handleUpdateComment = async (e) => {
    e.preventDefault();

    const commentUpdateResponse = await handleLeadCommentUpdate(
      leadDetails?.lead_id,
      userDetails?.userInfo?.user_id,
      comment
    );

    if (commentUpdateResponse?.status) {
      message.success("Comment Added Successfully");
      document.getElementById("lead_comment").style.caretColor = "transparent";
    }
  };

  const handleCommentChange = (e) => {
    setComment(e?.target?.value);
    document.getElementById("lead_comment").style.caretColor = "black";
  };

  const handleLeadSuspend = async () => {
    const statusUpdateResponse = await handleLeadStatusUpdate(
      leadDetails?.lead_id,
      0,
      userDetails?.userInfo?.user_id
    );

    if (statusUpdateResponse?.status) {
      message.success("Lead Has Been Suspended Successfully");
      navigate("/dashboard");
    }
  };

  return (
    <div className="mx-6">
      <div>
        <div className="flex justify-between items-center">
          <h1 className="text-xl leading-8 font-poppins font-semibold mb-0">
            {leadDetails?.full_name}
          </h1>
          <div className="relative">
            {userDetails?.userInfo?.role_id === 5 && closeSealsman ? (
              <img
                title={
                  userDetails?.userInfo?.firstName +
                  " " +
                  userDetails?.userInfo?.lastName
                }
                className="w-10 rounded-full cursor-pointer"
                src={userDetails?.userInfo?.avatar}
                alt=""
              />
            ) : (
              <Icons.People
                className="cursor-pointer"
                onClick={() => {
                  !closeSealsman && setAddSealsman(true);
                }}
              />
            )}
            {closeSealsman && (
              <span
                className="absolute cursor-pointer -top-2 -right-2.5 text-xs px-1.5 border border-white pb-0.5 rounded-full bg-black text-white m-0"
                onClick={() => {
                  setCloseSealsman(!closeSealsman);
                }}
              >
                x
              </span>
            )}
          </div>

          {/* Sales Team List Modal */}
          <Modal visible={addSealsman} footer={null} onCancel={handleCancel}>
            <div>
              <h1 className="font-poppins text-xl font-extrabold">
                Seals Team
              </h1>
              <span className="font-poppins text-xs">
                <span className="text-red-600">*</span> Select a sales person to
                handle this lead
              </span>
            </div>
            {/* <div className="flex flex-col justify-center items-center py-6 "> */}
            <div className="grid grid-cols-2 justify-center items-center py-6 ">
              <div className="flex justify-center items-center my-2 cursor-pointer">
                <Icons.PeopleRounded />
                <div className="ml-2 text-lg font-poppins font-semibold">
                  Samin Hasan
                </div>
              </div>

              <div className="flex justify-center items-center my-2 cursor-pointer">
                <Icons.PeopleRounded />
                <div className="ml-2 text-lg font-poppins font-semibold">
                  Samin Hasan
                </div>
              </div>

              <div className="flex justify-center items-center my-2 cursor-pointer">
                <Icons.PeopleRounded />
                <div className="ml-2 text-lg font-poppins font-semibold">
                  Samin Hasan
                </div>
              </div>

              <div className="flex justify-center items-center my-2 cursor-pointer">
                <Icons.PeopleRounded />
                <div className="ml-2 text-lg font-poppins font-semibold">
                  Samin Hasan
                </div>
              </div>
            </div>
          </Modal>

          {/* Application Form Modal */}
          <Modal
            visible={toggleApplication}
            footer={null}
            onCancel={handleCancel}
          >
            <div>
              <h1 className="font-poppins text-xl font-extrabold">
                Answer of all Questions
              </h1>
            </div>
            {/* <div className="flex flex-col justify-center items-center py-6 "> */}
            <div className="py-6">
              {/* {JSON.parse(leadDetails?.form_data).map((question) => ( */}
              <div className="my-2">
                {leadDetails?.form_data?.map((question, i) => (
                  <div key={i} className="ml-2 font-poppins">
                    <li className="text-base list-disc font-semibold">
                      {/* for removing underscores and capitalize the first letter of the Question */}
                      {(question?.name).charAt(0).toUpperCase() +
                        (question?.name).replaceAll("_", " ").slice(1)}
                    </li>
                    <p className="ml-6 mt-2 font-normal">
                      -{" "}
                      {(question?.values[0]).charAt(0).toUpperCase() +
                        (question?.values[0]).replaceAll("_", " ").slice(1)}
                    </p>
                  </div>
                ))}
              </div>
              {/* // ))} */}
            </div>
          </Modal>
        </div>

        <h1 className="text-xl leading-8 font-poppins font-semibold mt-2">
          #{leadDetails?.lead_id}
        </h1>
      </div>
      <div>
        <ReactStars
          count={5}
          onChange={ratingChanged}
          size={24}
          value={rating}
          emptyIcon={<Icons.Star />}
          half={false}
          fullIcon={<Icons.Star />}
          color1="#E9E9E9"
          color2="#8C64D2"
        />
      </div>

      {/* User info */}
      <div className="mt-5">
        <div>
          <h4 className="text-lg leading-6 font-poppins font-semibold text-black text-opacity-80">
            Details
          </h4>
          <hr />
        </div>
        <div className="flex pt-4 pb-2">
          <div className="mt-1">
            <img
              className="w-16"
              src={`https://qrcode.tec-it.com/API/QRCode?data=tel%3a${leadDetails?.phone_number}&backcolor=%23ffffff`}
              alt=""
            />
            <div
              className="font-poppins my-2 text-center font-medium"
              style={{
                fontSize: "10px",
              }}
            >
              Scan To Call
            </div>
          </div>
          <div className="ml-5">
            <div className="font-normal text-sm 2xl:text-base leading-6 font-poppins">
              <span>Contact:&nbsp;&nbsp;</span>
              <span> {leadDetails?.phone_number}</span>
            </div>
            <div className="font-normal text-sm 2xl:text-base leading-6 font-poppins flex items-center mt-2">
              <span>Email:&nbsp;&nbsp;</span>
              <span>{leadDetails?.student_email}</span>
            </div>
            <div className="font-normal text-sm 2xl:text-base leading-6 font-poppins flex mt-2">
              <span>Courses:&nbsp;&nbsp;</span>
              <span>{leadDetails?.course_title}</span>
            </div>
            <div className="font-normal text-sm 2xl:text-base leading-6 font-poppins flex items-center mt-2">
              <span>Location:&nbsp;&nbsp;</span>
              <span className="uppercase">{leadDetails?.work_location}</span>
            </div>
          </div>
        </div>
        <div className="xl:ml-4 mt-5 flex">
          <button className="w-32 px-1.5 py-2 bg-green-500 text-white text-xs font-medium leading-4 font-poppins rounded-md">
            Edit
          </button>
          <button
            className={`w-32 px-1.5 py-2 border border-red-500 text-red-500 ml-4 text-xs font-medium leading-4 font-poppins rounded-md`}
            onClick={handleLeadSuspend}
          >
            Suspend
          </button>
        </div>

        {/* --------------- If user wants to Pay------------- */}
        <div className="mt-7.5">
          <div>
            <h1 className="text-xl leading-8 font-semibold font-poppins text-black text-opacity-50 mb-5">
              Application Form
            </h1>
          </div>
          <div className="xl:ml-4 mt-5 flex">
            <button
              className="w-32 px-1.5 py-2 bg-green-500 text-white text-xs font-medium leading-4 font-poppins rounded-md"
              onClick={() => setToggleApplication(!toggleApplication)}
            >
              View
            </button>
            {/* <button className="w-32 px-1.5 py-2 border border-black text-black ml-4 text-xs font-medium leading-4 font-poppins rounded-md">
              Edit
            </button> */}
          </div>
        </div>

        <div className="mt-7.5">
          <div>
            <h1 className="text-xl leading-8 font-semibold font-poppins text-black text-opacity-50 mb-5">
              Payment
            </h1>
          </div>
          <div className="ml-4 mt-5">
            <Link to={"/pay/16541"}>
              <button className="w-32 px-1.5 py-2 bg-green-500 text-white text-xs font-medium leading-4 font-poppins rounded-md">
                Pay
              </button>
            </Link>
          </div>
        </div>

        <div className="mt-7.5">
          <div>
            <h1 className="text-xl leading-8 font-semibold font-poppins text-black text-opacity-50 mb-5">
              Chek list
            </h1>
          </div>

          {/* Checklist Modal */}
          <Modal
            visible={toggleChcekList}
            footer={null}
            onCancel={handleCancel}
          >
            <CheckList leadDetails={leadDetails} />
          </Modal>

          <div className="ml-4 mt-5">
            <button
              className="w-32 px-1.5 py-2 border border-black text-black text-xs font-medium leading-4 font-poppins rounded-md"
              onClick={() => setToggleChcekList(true)}
            >
              View
            </button>
          </div>
        </div>
      </div>

      {/* Comments */}
      <div
        className="mt-12 border py-3 px-7"
        style={{
          borderRadius: "20px",
        }}
      >
        <div className="border-b mb-0">
          <h1 className="text-xl leading-8 font-semibold font-poppins text-black text-opacity-50">
            Comment
          </h1>
          {/* <Icons.PenUnderLine className="cursor-pointer" /> */}
        </div>
        <form
          onSubmit={(e) => handleUpdateComment(e)}
          className="2xl:w-84 mt-5 "
        >
          {userDetails?.userInfo?.role_id === 6 ? (
            <h1 className="bg-transparent text-base leading-6 font-semibold font-poppins text-black text-opacity-75">
              {leadDetails?.lead_remarks
                ? leadDetails?.lead_remarks
                : "No Comments Yet"}
            </h1>
          ) : (
            <>
              <input
                id="lead_comment"
                className="outline-none border-b border-brand-color bg-transparent text-base leading-6 font-semibold font-poppins text-black text-opacity-75"
                onChange={(e) => handleCommentChange(e)}
                value={comment ? comment : "No Comments Yet"}
              />
              <input
                type="submit"
                className="bg-black text-white px-2 py-0.5 rounded-md cursor-pointer"
                value="Save"
              ></input>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default UserDetails;
