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
  handleLeadCommentUpdate,
  handleLeadReviewUpdate,
  handleLeadStatusUpdate,
} from "../../../Components/services/leads";
import Icons from "../../../Components/Shared/Icons";
import CheckList from "./CheckList";
import EmployeeHistory from "./EmployeeHistory";
import SalesEmployees from "./SalesEmployees";

const UserDetails = ({ leadDetails, syncDetails, setSyncDetails }) => {
  const userDetails = useSelector((state) => state?.user);
  const navigate = useNavigate();

  const [addSealsman, setAddSealsman] = useState(false);
  const [salesEmployeeName, setSalesEmployeeName] = useState("");
  const [closeSealsman, setCloseSealsman] = useState(false);
  const [toggleSalesEmployeeHistory, setToggleSalesEmployeeHistory] =
    useState(false);
  const [prevSalesEmployeesName, setPrevSalesEmployeesName] = useState([]);
  const [toggleChcekList, setToggleChcekList] = useState(false);
  const [toggleApplication, setToggleApplication] = useState(false);
  const [rating, setRating] = useState();
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (leadDetails?.leadSalesEmployeeHistory?.length) {
      console.log(leadDetails?.leadSalesEmployeeHistory);
      const salesman = leadDetails?.leadSalesEmployeeHistory?.find(
        (employee) =>
          employee?.sales_user_id === leadDetails?.leadDetails?.sales_user_id
      );
      // const previousSalesman = leadDetails?.leadSalesEmployeeHistory?.filter(
      //   (employee) =>
      //     employee?.sales_user_id !== leadDetails?.leadDetails?.sales_user_id
      // );

      const previousSalesmans = [];

      leadDetails?.leadSalesEmployeeHistory?.forEach((employee) => {
        if (
          employee?.sales_user_id !== leadDetails?.leadDetails?.sales_user_id
        ) {
          previousSalesmans.push(employee?.sales_user_name);
        }
      });

      setPrevSalesEmployeesName(previousSalesmans);
      // setSalesEmployeeName(salesman?.sales_user_id);
      setCloseSealsman(true);
      setSalesEmployeeName(salesman?.sales_user_name);
    }

    setRating(leadDetails?.leadDetails?.star_review);
    setComment(leadDetails?.leadDetails?.lead_remarks);
  }, [leadDetails]);

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

    console.log("reviewResponse", reviewResponse);

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

  console.log(prevSalesEmployeesName);

  const confirm = async (e) => {
    const statusUpdateResponse = await handleLeadStatusUpdate(
      leadDetails?.leadDetails?.lead_id,
      0,
      userDetails?.userInfo?.user_id
    );

    if (statusUpdateResponse?.status) {
      message.success("Lead Has Been Suspended Successfully");
      navigate("/dashboard");
    }
  };

  const confirmCancleSalesEmployee = async (e) => {
    setCloseSealsman(false);
  };

  const cancel = (e) => {
    console.log(e);
  };

  return (
    <div className="mx-6">
      <div>
        <div className="flex justify-between items-center">
          <h1 className="text-xl leading-8 font-poppins font-semibold mb-0">
            {leadDetails?.leadDetails?.full_name}
          </h1>

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
                        color={Avatar.getRandomColor("sitebase", [
                          "red",
                          "green",
                          "#728FCE",
                          "violet",
                          "#2B547E",
                          "black",
                          "#87AFC7",
                          "Lime",
                          "#D5D6EA",
                          "#77BFC7",
                          "orange",
                          "#FDD017",
                          "#665D1E",
                        ])}
                        name={prevSalesEmployeesName?.[0]}
                      />
                      {prevSalesEmployeesName?.length > 1 ? (
                        <Tooltip
                          title="Previous Sales Employee"
                          placement="top"
                        >
                          {prevSalesEmployeesName.slice(1).map((name, i) => (
                            <Avatar
                              key={i}
                              className="rounded-full shadow-sm cursor-pointer"
                              size="30"
                              color={Avatar.getRandomColor("sitebase", [
                                "red",
                                "green",
                                "#728FCE",
                                "violet",
                                "#2B547E",
                                "black",
                                "#87AFC7",
                                "Lime",
                                "#D5D6EA",
                                "#77BFC7",
                                "orange",
                                "#FDD017",
                                "#665D1E",
                              ])}
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
                    color={Avatar.getRandomColor("sitebase", [
                      "red",
                      "green",
                      "#728FCE",
                      "violet",
                      "#2B547E",
                      "black",
                      "#87AFC7",
                      "Lime",
                      "#D5D6EA",
                      "#77BFC7",
                      "orange",
                      "#FDD017",
                      "#665D1E",
                    ])}
                    name={salesEmployeeName}
                  />
                  <div className="absolute right-0.5 bottom-0.5 w-2.5 h-2.5 border border-white shadow-md bg-green-500 rounded-full">
                    &nbsp;
                  </div>
                </div>
              ) : (
                <div
                  className="px-4 py-2 rounded-full bg-brand-color font-semibold text-xl text-white cursor-pointer"
                  onClick={() => {
                    setAddSealsman(true);
                  }}
                >
                  +
                </div>
              ))}

            {closeSealsman &&
            (userDetails?.userInfo?.role_id === 3 ||
              userDetails?.userInfo?.role_id === 4) ? (
              <Popconfirm
                title="Are you sure to remove this Salesman?"
                onConfirm={confirmCancleSalesEmployee}
                onCancel={cancel}
                okText="Yes"
                cancelText="No"
              >
                <span className="absolute cursor-pointer -top-1 -right-2 text-xs px-1.5 border border-white pb-0.5 rounded-full bg-black text-white m-0">
                  x
                </span>
              </Popconfirm>
            ) : null}
          </div>

          {/* Sales Team List Modal */}
          <SalesEmployees
            addSealsman={addSealsman}
            setAddSealsman={setAddSealsman}
            handleCancel={handleCancel}
            leadDetails={leadDetails}
            syncDetails={syncDetails}
            setSyncDetails={setSyncDetails}
          />

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
              {/* {JSON.parse(leadDetails?.leadDetails?.form_data).map((question) => ( */}
              <div className="my-2">
                {leadDetails?.leadDetails?.form_data?.map((question, i) => (
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
          #{leadDetails?.leadDetails?.lead_id}
        </h1>
      </div>
      <div>
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
          {(userDetails?.userInfo?.role_id === 3 ||
            userDetails?.userInfo?.role_id === 4 ||
            userDetails?.userInfo?.role_id === 5) && (
            <div className="w-1/3 2xl:w-20 mt-1">
              <img
                className="w-full"
                src={`https://qrcode.tec-it.com/API/QRCode?data=tel%3a${leadDetails?.leadDetails?.phone_number}&backcolor=%23ffffff`}
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
          )}
          <div className="w-2/3 ml-5">
            <div className="font-normal text-sm 2xl:text-base leading-6 flex flex-wrap font-poppins">
              <span>Contact:&nbsp;&nbsp;</span>
              <span> {leadDetails?.leadDetails?.phone_number}</span>
            </div>
            <div className="font-normal text-sm 2xl:text-base leading-6 font-poppins flex flex-wrap mt-2">
              <span>Email:&nbsp;&nbsp;</span>
              <span>{leadDetails?.leadDetails?.student_email}</span>
            </div>
            <div className="font-normal text-sm 2xl:text-base leading-6 font-poppins mt-2 flex flex-wrap">
              <span>Courses:&nbsp;&nbsp;</span>
              <span className="text-xs">
                {leadDetails?.leadDetails?.course_title}
              </span>
            </div>
            <div className="font-normal text-sm 2xl:text-base leading-6 font-poppins flex items-center mt-2">
              <span>Location:&nbsp;&nbsp;</span>
              <span className="uppercase">
                {leadDetails?.leadDetails?.work_location}
              </span>
            </div>
          </div>
        </div>

        {(userDetails?.userInfo?.role_id === 3 ||
          userDetails?.userInfo?.role_id === 4 ||
          userDetails?.userInfo?.role_id === 5) && (
          <div className="xl:ml-4 mt-5">
            <Popconfirm
              title="Are you sure to Suspend this lead?"
              onConfirm={confirm}
              onCancel={cancel}
              okText="Yes"
              cancelText="No"
            >
              <button
                className={`w-32 px-1.5 py-2 border border-red-500 text-red-500 text-xs font-medium leading-4 font-poppins rounded-md`}
                // onClick={handleLeadSuspend}
              >
                Suspend
              </button>
            </Popconfirm>
          </div>
        )}

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

        {userDetails?.userInfo?.role_id === 6 && (
          <div className="mt-7.5">
            <div>
              <h1 className="text-xl leading-8 font-semibold font-poppins text-black text-opacity-50 mb-5">
                Payment
              </h1>
            </div>
            <div className="ml-4 mt-5">
              <Link to={`/pay/${leadDetails?.leadDetails?.lead_id}`}>
                <button className="w-32 px-1.5 py-2 bg-green-500 text-white text-xs font-medium leading-4 font-poppins rounded-md">
                  Pay
                </button>
              </Link>
            </div>
          </div>
        )}

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
            <CheckList leadDetails={leadDetails?.leadDetails} />
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
          {userDetails?.userInfo?.role_id === 1 ||
          userDetails?.userInfo?.role_id === 2 ||
          userDetails?.userInfo?.role_id === 6 ? (
            <h1 className="bg-transparent text-base leading-6 font-semibold font-poppins text-black text-opacity-75">
              {leadDetails?.leadDetails?.lead_remarks
                ? leadDetails?.leadDetails?.lead_remarks
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
