import {
  message,
  Modal,
  Popconfirm,
  Tooltip,
  Avatar as AntdAvatar,
} from "antd";
import React, { useState } from "react";
import { useEffect } from "react";
import Avatar from "react-avatar";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import ReactStars from "react-stars";
import {
  handleDeleteComment,
  handleLeadCommentUpdate,
  handleLeadReviewUpdate,
  handleLeadStatusUpdate,
  handleReviewRemarksSubmitReq,
} from "../../../Components/services/leads";
import Icons from "../../../Components/Shared/Icons";
import { Storage } from "../../../Components/Shared/utils/store";
import CheckList from "./CheckList";
import Conversation from "../Conversation";
import Comments from "../Conversation/Comments";
import EditDetails from "./EditDetails";
import EmployeeHistory from "./EmployeeHistory";
import SalesEmployees from "./SalesEmployees";
import { useParams } from "react-router-dom";
import { handleSalesManRemove } from "../../../Components/services/utils";
import { handleLeadDetails } from "../../../Components/services/leads";
import StatusShow from "../Conversation/StatusShow";
import "../userDetails.css";

const UserDetails = ({
  leadDetails,
  syncDetails,
  setSyncDetails,
  totalPaid,
}) => {
  const userDetails = useSelector((state) => state?.user);
  const colorMode = useSelector((state) => state?.user)?.colorMode;

  const navigate = useNavigate();
  const [addSealsman, setAddSealsman] = useState(false);
  const [salesEmployeeName, setSalesEmployeeName] = useState("");
  const [closeSealsman, setCloseSealsman] = useState(false);
  const [toggleSalesEmployeeHistory, setToggleSalesEmployeeHistory] =
    useState(false);
  const [prevSalesEmployeesName, setPrevSalesEmployeesName] = useState([]);
  const [toggleChcekList, setToggleChcekList] = useState(false);
  const [toggleApplication, setToggleApplication] = useState(false);
  const [toggleEditDetials, setToggleEditDetials] = useState(false);
  const [isCommentHistoryOpen, setIsCommentHistoryOpen] = useState(false);
  const [rating, setRating] = useState();
  const [comment, setComment] = useState("");
  const [allComents, setAllComents] = useState([]);
  const [ratingRemarks, setRatingRemarks] = useState("");
  const [experience, setExperience] = useState("");
  const [leadDtls, setLeadDtls] = useState({});

  const params = useParams();

  useEffect(() => {
    console.log(leadDetails);
    if (leadDetails?.leadSalesEmployeeHistory?.length) {
      if (leadDetails?.leadDetails?.sales_user_id) {
        const salesman = leadDetails?.leadSalesEmployeeHistory?.find(
          (employee) =>
            employee?.sales_user_id === leadDetails?.leadDetails?.sales_user_id
        );
        setSalesEmployeeName(salesman?.sales_user_name);
        setCloseSealsman(true);
      }
      const relevantFormData = leadDetails?.leadDetails?.form_data.find(
        (data) =>
          data?.name ===
          "how_many_years_of_relevant_work_experience_do_you_have?"
      );

      if (relevantFormData) {
        const unprocessedData = relevantFormData.values[0];
        const sanitizedString = unprocessedData.replace(/[_\+]/g, " ");
        setExperience(sanitizedString);
      }

      const previousSalesmans = [];
      leadDetails?.leadSalesEmployeeHistory?.forEach((employee) => {
        if (
          employee?.sales_user_id !== leadDetails?.leadDetails?.sales_user_id
        ) {
          previousSalesmans.push(employee?.sales_user_name);
        }
      });

      setPrevSalesEmployeesName(previousSalesmans);
    }

    setRating(leadDetails?.leadDetails?.star_review);

    if (leadDetails?.leadComments?.length) {
      setAllComents(leadDetails?.leadComments);
    }
    setRatingRemarks(
      leadDetails?.leadDetails?.comment === null
        ? ""
        : leadDetails?.leadDetails?.comment
    );
  }, [leadDetails]);

  useEffect(() => {
    (async () => {
      const lDtails = await handleLeadDetails(params?.id);
      if (lDtails) {
        setLeadDtls(lDtails);
      }
    })();
  }, [params?.id]);

  const handleCancel = () => {
    setToggleChcekList(false);
    setToggleApplication(false);
    setAddSealsman(false);
  };

  const ratingChanged = async (newRating) => {
    const reviewResponse = await handleLeadReviewUpdate(
      leadDetails?.leadDetails?.lead_id,
      newRating,
      userDetails?.userInfo?.user_id
    );

    if (reviewResponse?.status === true) {
      message.success("Rating Added Successfully");
    } else {
      message.warn("Lead is not assigned yet or something went wrong  ");
    }
    setRating(newRating);
  };

  const handleUpdateComment = async (e) => {
    e.preventDefault();

    const commentUpdateResponse = await handleLeadCommentUpdate(
      leadDetails?.leadDetails?.lead_id,
      /* userDetails?.userInfo?.user_id, */
      comment
    );

    if (commentUpdateResponse?.status) {
      setAllComents(commentUpdateResponse?.data);
      setComment("");
      message.success("Comment Added Successfully");
      document.getElementById("lead_comment").style.caretColor = "transparent";
    }
    window.location.reload();
  };

  const handleCommentChange = (e) => {
    setComment(e?.target?.value);
    document.getElementById("lead_comment").style.caretColor = "black";
  };

  // const handleCommentHistory = () => {};

  const confirm = async (e) => {
    const statusUpdateResponse = await handleLeadStatusUpdate({
      lead_id: leadDetails?.leadDetails?.lead_id,
      lead_status: 0,
      sales_user_id: userDetails?.userInfo?.user_id,
      client_id: userDetails?.userInfo?.client_id,
      response: null,
    });

    if (statusUpdateResponse?.status) {
      message.success("Lead Has Been Suspended Successfully");
      navigate("/dashboard");
    }
  };

  const confirmCancleSalesEmployee = async (sid) => {
    const res = await handleSalesManRemove(sid);
    if (res?.status === 201) {
      message.success(res?.message || "Salesman has been successfully removed");
      setCloseSealsman(false);
    } else {
      message.warn(res?.message || "Something went wrong");
    }
  };

  const cancel = (e) => {
    console.log(e);
  };

  const handleReviewRemarksSubmit = async () => {
    const reviewRemarksResponse = await handleReviewRemarksSubmitReq(
      ratingRemarks,
      leadDetails?.leadDetails?.lead_id
    );

    if (reviewRemarksResponse?.status === 200) {
      message.success("Remark added successfully");
    } else {
      message.warn("Something went wrong. Unable to add remark");
    }
    console.log("reviewRemarksResponse", reviewRemarksResponse);
  };

  const handleDeleteCommentReq = async (id) => {
    const commentDeleteRes = await handleDeleteComment(id);
    if (commentDeleteRes?.status === 200) {
      message.success("Comment Deleted Successfully");
      const currentComments = [...allComents]?.filter((c) => c.id !== id);
      setAllComents(currentComments);
    }
  };
  const { id } = useParams();
  return (
    <div className="h-full flex flex-grow">
      <div className="w-full h-full flex flex-grow gap-4">
        {/* Column 1 */}
        <div className="w-full flex flex-col justify-between items-center gap-4">
          <div className="h-full w-full rounded-md shadow-md backdrop-blur-2xl bg-[#ffffff11]">
            <h4
              className={`text-lg px-5 py-2 m-0 font-poppins ${
                colorMode ? "text-slate-300" : "text-gray-800"
              } backdrop-blur-2xl bg-[#ffffff11] shadow-md rounded-t-md`}
            >
              Details
            </h4>
            <div className="relative flex justify-center items-center gap-4 p-5 overflow-hidden">
              {(userDetails?.userInfo?.role_id === 3 ||
                userDetails?.userInfo?.role_id === 4 ||
                userDetails?.userInfo?.role_id === 5) && (
                <div className="w-1/3 flex flex-col justify-center items-center gap-4">
                  <img
                    className="w-3/4"
                    src={`https://qrcode.tec-it.com/API/QRCode?data=tel%3a${leadDetails?.leadDetails?.phone_number}&backcolor=%23ffffff`}
                    alt=""
                  />
                  <div
                    className={`text-[10px] ${
                      colorMode ? "text-slate-300" : "text-gray-800"
                    } font-poppins mt-1 text-center font-medium`}
                  >
                    Scan To Call
                  </div>

                  <div className="">
                    <Popconfirm
                      title="Are you sure to Suspend this lead?"
                      onConfirm={confirm}
                      onCancel={cancel}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Tooltip
                        placement="right"
                        title={"If it's a bad lead then you can Suspend it"}
                      >
                        <button
                          className={`ease-in duration-200 w-32 px-1.5 py-2 border border-red-500 hover:bg-red-500 hover:text-slate-300 text-red-500 text-xs font-medium leading-4 font-poppins rounded-md`}
                          // onClick={handleLeadSuspend}
                        >
                          Suspend
                        </button>
                      </Tooltip>
                    </Popconfirm>
                  </div>
                </div>
              )}
              <div className=" w-full flex flex-col justify-around">
                <div
                  className={`font-normal 2xl:text-base ${
                    colorMode ? "text-slate-300" : "text-gray-800"
                  } font-poppins flex flex-wrap `}
                >
                  <span>Contact:&nbsp;&nbsp;</span>
                  <span> {leadDetails?.leadDetails?.phone_number}</span>
                </div>
                <div
                  className={`font-normal 2xl:text-base ${
                    colorMode ? "text-slate-300" : "text-gray-800"
                  } font-poppins flex flex-wrap pt-1`}
                >
                  <span>Email:&nbsp;&nbsp;</span>
                  <span>{leadDetails?.leadDetails?.student_email}</span>
                </div>
                <div
                  className={`font-normal 2xl:text-base ${
                    colorMode ? "text-slate-300" : "text-gray-800"
                  } font-poppins flex flex-wrap items-center pt-1`}
                >
                  <span>Courses:&nbsp;&nbsp;</span>
                  <span className="text-xs uppercase">
                    {leadDetails?.leadDetails?.course_title}
                  </span>
                </div>
                <div
                  className={`font-normal 2xl:text-base ${
                    colorMode ? "text-slate-300" : "text-gray-800"
                  } font-poppins flex items-center pt-1`}
                >
                  <span>Location:&nbsp;&nbsp;</span>
                  <span className="uppercase">
                    {leadDetails?.leadDetails?.work_location}
                  </span>
                </div>
                <div
                  className={`font-normal 2xl:text-base ${
                    colorMode ? "text-slate-300" : "text-gray-800"
                  } font-poppins flex items-center pt-1`}
                >
                  <span>Experience:&nbsp;&nbsp;</span>
                  <span className="uppercase">
                    <div>{experience}</div>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start justify-center gap-4 w-full h-full rounded-md p-5 shadow-md backdrop-blur-2xl bg-[#ffffff11]">
            <div className="w-full flex justify-between items-center">
              <h1
                className={`text-xl font-poppins ${
                  colorMode ? "text-slate-300" : "text-gray-800"
                }`}
              >
                {leadDetails?.leadDetails?.full_name}
              </h1>
              <div className="relative flex items-center">
                {userDetails?.userInfo?.role_id === 3 ||
                userDetails?.userInfo?.role_id === 4 ? (
                  <div onClick={() => setToggleSalesEmployeeHistory(true)}>
                    <AntdAvatar.Group
                      className="mr-1 cursor-pointer"
                      maxCount={1}
                      maxStyle={{
                        color: "#f56a00",
                        backgroundColor: "#fde3cf",
                      }}
                    >
                      {prevSalesEmployeesName?.length ? (
                        <>
                          <Avatar
                            className="rounded-full shadow-sm cursor-pointer"
                            size="30"
                            name={prevSalesEmployeesName?.[0]}
                          />
                          {prevSalesEmployeesName?.length > 1 ? (
                            <Tooltip
                              title="Previous Sales Employee"
                              placement="top"
                            >
                              {prevSalesEmployeesName
                                .slice(1)
                                .map((name, i) => (
                                  <Avatar
                                    key={i}
                                    className="rounded-full shadow-sm cursor-pointer"
                                    size="30"
                                    name={name}
                                  />
                                ))}
                            </Tooltip>
                          ) : null}
                        </>
                      ) : null}
                    </AntdAvatar.Group>
                  </div>
                ) : null}

                {(userDetails?.userInfo?.role_id === 3 ||
                  userDetails?.userInfo?.role_id === 4 ||
                  userDetails?.userInfo?.role_id === 5) &&
                  (leadDetails?.leadDetails?.sales_user_id !== 0 &&
                  closeSealsman ? (
                    <div className="relative">
                      <Avatar
                        className="rounded-full shadow-sm cursor-pointer"
                        size="45"
                        name={salesEmployeeName}
                      />
                      <div className="absolute right-0.5 bottom-0.5 w-2.5 h-2.5 border border-slate-300 shadow-md bg-green-500 rounded-full">
                        &nbsp;
                      </div>
                    </div>
                  ) : userDetails?.userInfo?.role_id === 3 ||
                    userDetails?.userInfo?.role_id === 4 ? (
                    <div
                      className="px-4 py-2 rounded-full bg-brand-color font-semibold text-xl text-slate-300 cursor-pointer"
                      onClick={() => {
                        setAddSealsman(true);
                      }}
                    >
                      +
                    </div>
                  ) : null)}

                {closeSealsman &&
                (userDetails?.userInfo?.role_id === 3 ||
                  userDetails?.userInfo?.role_id === 4) ? (
                  <Popconfirm
                    title="Are you sure to remove this Salesman?"
                    onConfirm={() => {
                      confirmCancleSalesEmployee(
                        leadDetails?.leadDetails?.lead_id
                      );
                    }}
                    onCancel={cancel}
                    okText="Yes"
                    cancelText="No"
                  >
                    <span className="absolute cursor-pointer -top-1 -right-2 text-xs px-1.5 border border-slate-300 pb-0.5 rounded-full bg-black text-slate-300 m-0">
                      x
                    </span>
                  </Popconfirm>
                ) : null}
              </div>
            </div>
            <h1
              className={`text-xl font-poppins ${
                colorMode ? "text-slate-300" : "text-gray-800"
              }`}
            >
              #{leadDetails?.leadDetails?.lead_id}
            </h1>
            {userDetails?.userInfo?.role_id !== 6 ? (
              <div className="w-full flex flex-col">
                <ReactStars
                  edit={
                    userDetails?.userInfo?.role_id === 3 ||
                    userDetails?.userInfo?.role_id === 4 ||
                    userDetails?.userInfo?.role_id === 5
                      ? true
                      : false
                  }
                  count={5}
                  onChange={ratingChanged}
                  size={24}
                  value={rating}
                  emptyIcon={<Icons.Star />}
                  half={false}
                  fullIcon={<Icons.Star />}
                  color1="#cbd5e1"
                  color2="#8C64D2"
                />
                <form className="flex justify-between items-center w-full gap-4">
                  <input
                    className={`w-5/6 outline-none border-b ${
                      colorMode
                        ? "border-slate-300 placeholder:!text-slate-300 !text-slate-300"
                        : "border-gray-800 placeholder:!text-gray-800 !text-gray-800"
                    } bg-transparent text-sm font-poppins`}
                    onChange={(e) => setRatingRemarks(e.currentTarget.value)}
                    value={ratingRemarks}
                    placeholder="No comments yet"
                  />
                  <button
                    className={`border ${
                      colorMode
                        ? "border-slate-300 text-slate-300"
                        : "border-gray-800 text-gray-800"
                    }  px-3 py-0.5 rounded-md cursor-pointer`}
                    onClick={handleReviewRemarksSubmit}
                  >
                    Save
                  </button>
                </form>
              </div>
            ) : null}
          </div>
        </div>
        {/* FORMS */}
        <div className="w-full flex flex-col justify-between items-center gap-4">
          {userDetails?.role_id !== 6 && (
            <Conversation leadDetails={leadDetails} id={id} />
          )}

          <div className="w-full h-full flex flex-col rounded-md shadow-md backdrop-blur-2xl bg-[#ffffff11] ">
            <div className="w-full flex justify-between items-center backdrop-blur-2xl bg-[#ffffff11] text-slate-300 px-5 py-2 rounded-t-md overflow-hidden font=">
              <h1
                className={`text-lg m-0 p-0 ${
                  colorMode ? "text-slate-300" : "text-gray-800"
                } `}
              >
                Documents
              </h1>
            </div>
            <div className="w-full h-full flex flex-col gap-4 items-center p-5 justify-around">
              <div className="w-full flex justify-between items-center">
                <h1
                  className={`w-full 2xl:text-lg text-base font-poppins ${
                    colorMode ? "text-slate-300" : "text-gray-800"
                  } m-0 p-0`}
                >
                  Lead Generation Form
                </h1>
                <button
                  className={`w-1/2 py-2 bg-transparent border ${
                    colorMode
                      ? "text-slate-300 border-slate-300"
                      : "text-gray-800 border-gray-800"
                  } text-base font-poppins rounded-md`}
                  onClick={() => setToggleApplication(!toggleApplication)}
                >
                  View
                </button>
              </div>
              <div className="w-full flex justify-between items-center">
                <h1
                  className={`w-full 2xl:text-lg text-base ${
                    colorMode ? "text-slate-300" : "text-gray-800"
                  } m-0 p-0`}
                >
                  Application Form
                </h1>

                <button
                  onClick={() => message.success("No file available")}
                  className={`w-1/2 px-1.5 py-2 bg-transparent border ${
                    colorMode
                      ? "text-slate-300 border-slate-300"
                      : "text-gray-800 border-gray-800"
                  } text-base font-medium font-poppins rounded-md flex items-center justify-center`}
                >
                  <Icons.DownArrow className="w-6 rounded-full text-slate-300 text-opacity-50" />
                  <span className="ml-2">Download</span>
                </button>
              </div>
              <div className="w-full flex justify-between items-center">
                <h1
                  className={`w-full 2xl:text-lg text-base font-poppins ${
                    colorMode ? "text-slate-300" : "text-gray-800"
                  } m-0 p-0`}
                >
                  Check Lists
                </h1>

                <Modal
                  title="Documents"
                  className="applicationFormModal"
                  visible={toggleChcekList}
                  footer={null}
                  onCancel={handleCancel}
                >
                  <CheckList leadDetails={leadDetails?.leadDetails} />
                </Modal>

                <button
                  className={`w-1/2 px-1.5 py-2 bg-transparent border ${
                    colorMode
                      ? "text-slate-300 border-slate-300"
                      : "text-gray-800 border-gray-800"
                  } text-base font-medium font-poppins rounded-md flex items-center justify-center`}
                  onClick={() => setToggleChcekList(true)}
                >
                  View
                </button>
              </div>
              {userDetails?.userInfo?.role_id === 6 && (
                <div className="flex flex-col justify-between items-center">
                  <h1 className="text-xl leading-8 font-semibold font-poppins text-black text-opacity-50 mb-5">
                    Payment
                  </h1>
                  <Link to={`/pay/${leadDetails?.leadDetails?.lead_id}`}>
                    <button
                      className="w-full px-1.5 py-2 bg-transparent border border-slate-300 text-slate-300 text-base font-medium font-poppins rounded-md flex items-center justify-center"
                      onClick={() => {
                        Storage.setItem("_tp_", totalPaid);
                      }}
                    >
                      Pay
                    </button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* Column 3 */}
        <div className="w-full flex flex-col justify-between items-center gap-4">
          {userDetails?.userInfo?.role_id !== 6 ? (
            <div className="h-1/3 flex flex-col w-full shadow-md backdrop-blur-2xl bg-[#ffffff11] rounded-md">
              <div className="w-full flex justify-between items-center backdrop-blur-2xl bg-[#ffffff11] text-slate-300 px-5 py-2 rounded-t-md overflow-hidden">
                <h1
                  className={`text-lg m-0 p-0 ${
                    colorMode ? "text-slate-300" : "text-gray-800"
                  } `}
                >
                  Comments
                </h1>
                <Icons.History
                  className={`${
                    colorMode ? "text-slate-300" : "text-gray-800"
                  } hover:text-brand-color w-6 cursor-pointer`}
                  onClick={() => {
                    setIsCommentHistoryOpen(true);
                    // setSyncDetails(!syncDetails);
                  }}
                />
              </div>
              <form
                onSubmit={handleUpdateComment}
                className="w-full flex justify-between items-center gap-4 p-5"
              >
                {userDetails?.userInfo?.role_id === 1 ||
                userDetails?.userInfo?.role_id === 2 ||
                userDetails?.userInfo?.role_id === 6 ? (
                  <h1 className="bg-transparent text-base font-semibold font-poppins">
                    {leadDetails?.leadComments?.length
                      ? leadDetails?.leadComments[
                          leadDetails?.leadComments.length - 1
                        ]?.comments
                      : "No comments yet"}
                  </h1>
                ) : (
                  <>
                    <input
                      id="lead_comment"
                      className={`w-full outline-none border-b ${
                        colorMode
                          ? "border-slate-300 text-slate-300  placeholder:!text-slate-300"
                          : "border-gray-800 text-gray-800 placeholder:!text-gray-800"
                      } bg-transparent text-base font-poppins placeholder:text-base`}
                      onChange={(e) => handleCommentChange(e)}
                      placeholder={"Write your comment"}
                      value={comment}
                    />
                    <button
                      type="submit"
                      className={`bg-transparent border ${
                        colorMode
                          ? "text-slate-300 border-slate-300"
                          : "text-gray-800 border-gray-800"
                      } px-2 py-0.5 rounded-md cursor-pointer`}
                      value="Post"
                    >
                      Post
                    </button>
                  </>
                )}
              </form>
            </div>
          ) : null}
          <div className="h-1/3 w-full rounded-md">
            <Comments Comments={leadDtls?.leadComments} />
          </div>
          <div className="h-1/3 w-full rounded-md">
            <StatusShow leadDetails={leadDetails} />
          </div>
        </div>

        {/* Sales Employee History */}
        <Modal
          visible={toggleSalesEmployeeHistory}
          onCancel={() => setToggleSalesEmployeeHistory(false)}
          footer={false}
        >
          <EmployeeHistory
            employeeList={leadDetails?.leadSalesEmployeeHistory}
          />
        </Modal>

        {/* Edit Lead Contact Details Section */}
        <Modal
          visible={toggleEditDetials}
          onCancel={() => setToggleEditDetials(false)}
          footer={false}
        >
          <EditDetails
            leadDetails={leadDetails}
            setToggleEditDetials={setToggleEditDetials}
            setSyncDetails={setSyncDetails}
            syncDetails={syncDetails}
          />
        </Modal>

        {/* Application Form Modal */}
        <Modal
          className="applicationFormModal"
          title="Answer of all Questions"
          visible={toggleApplication}
          footer={null}
          onCancel={handleCancel}
          width={"60%"}
        >
          <div className="my-2 py-8">
            {leadDetails?.leadDetails?.form_data?.map((question, i) => (
              <div key={i} className="ml-2 font-poppins">
                <li className="text-base list-disc font-semibold">
                  {question?.name?.charAt(0)?.toUpperCase() +
                    question?.name?.replaceAll("_", " ")?.slice(1)}
                </li>
                <p className="mx-8 my-2 font-normal">
                  -{" "}
                  {question?.values[0]?.includes("_")
                    ? question?.values[0]?.charAt(0)?.toUpperCase() +
                      question?.values[0]?.replaceAll("_", " ")?.slice(1)
                    : question?.values[0]}
                </p>
              </div>
            ))}
          </div>
        </Modal>

        {/* Sales Team List Modal */}
        <SalesEmployees
          addSealsman={addSealsman}
          setAddSealsman={setAddSealsman}
          handleCancel={handleCancel}
          leadDetails={leadDetails}
          syncDetails={syncDetails}
          setSyncDetails={setSyncDetails}
        />
      </div>

      {/* Comments History */}
      <Modal
        visible={isCommentHistoryOpen}
        onCancel={() => setIsCommentHistoryOpen(false)}
        footer={false}
      >
        <div>
          <div className="">
            <div className="font-poppins text-base font-semibold mb-6">
              Comments History
            </div>

            <div className="flex items-end mb-4">
              <div className="w-full">
                {allComents?.length
                  ? allComents?.map((history) => (
                      <div className="flex w-full border rounded-lg p-2 my-2 shadow justify-between items-center">
                        <div>
                          <div className="text-base">{history?.comments}</div>
                          <div className="text-xs">
                            {new Date(history.created_at).toLocaleString()}
                          </div>
                        </div>
                        <div
                          className="mr-2"
                          onClick={() => handleDeleteCommentReq(history?.id)}
                        >
                          <Icons.Cross className="w-3 text-red-600 hover:text-red-500 cursor-pointer" />
                        </div>
                      </div>
                    ))
                  : "No comments yet"}
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default UserDetails;
