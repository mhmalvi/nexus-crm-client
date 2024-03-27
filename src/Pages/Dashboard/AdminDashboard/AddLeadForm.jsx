import { Button, Dropdown, Menu, Radio, Select } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  handleAddLead,
  handleFetchCourses,
} from "../../../Components/services/leads";
import { addLeads } from "../../../features/Leads/leadsSlice";
import { setLoader } from "../../../features/user/userSlice";
import {
  successNotification,
  warningNotification,
} from "../../../Components/Shared/Toast";

const AddLeadForm = ({ setIsAddLeadFormOpen }) => {
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.user?.userInfo);
  const leads = useSelector((state) => state.leads?.leads);

  const [courses, setCourses] = useState([]);
  const [courseList, setCourseList] = useState([]);
  const [isCreating, setIsCreating] = useState(false);

  console.log("userDetails", userDetails);

  const [leadData, setLeadData] = useState({
    full_name: "",
    phone_number: "",
    student_email: "",
    client_id: userDetails?.client_id,
    industry: "",
    lead_from: "",
    form_data: "",
    industry_qualified_immediately: "",
    industry_work_experience: "",
    academic_qualifications: "",
    course_id: null,
    work_location: "",
    work_experiences_location: "",
  });

  useEffect(() => {
    (async () => {
      const courseResponse = await handleFetchCourses();

      if (courseResponse?.status === 200) {
        const courseOption = [{ value: "", label: "Select Course" }];

        courseResponse?.data?.forEach((course) => {
          courseOption.push({
            id: course?.id,
            value: course?.course_title,
            label: course?.course_title,
          });
        });
        setCourses(courseOption);
        setCourseList(courseResponse?.data);
      }
    })();
  }, [dispatch, userDetails]);

  const handleCourseSearch = async (value) => {
    const courseId = courses?.find((course) =>
      course?.value?.toLowerCase().includes(value?.toLowerCase())
    );

    const data = { ...leadData };
    data.course_id = courseId?.id;
    setLeadData(data);
  };

  const handleInputData = (e) => {
    const data = { ...leadData };
    data[e.target.id] = e.target.value;
    setLeadData(data);
  };

  console.log("leadData", leadData);

  const handleAddLeadReq = async () => {
    const details = { ...leadData };
    details.form_data = JSON.stringify([
      {
        name: "Industry",
        values: [leadData.industry],
      },
      {
        name: "How many years of relevent work experience do you have ?",
        values: [leadData.industry_work_experience],
      },
      {
        name: "Are you ready to become industry qualified immediately?",
        values: [leadData.industry_qualified_immediately],
      },
      {
        name: "Do you hold any academic qualifications relating to the course being enquired?",
        values: [leadData.academic_qualifications],
      },
      {
        name: "Where is your work experience?",
        values: [leadData.work_experiences_location],
      },

      {
        name: "Where do you live in?",
        values: [leadData.work_location],
      },
    ]);
    if (leadData.full_name === "") {
      warningNotification("Student Name Required");
    } else if (leadData.phone_number === "") {
      warningNotification("Student Phone Number Required");
    } else if (leadData.student_email === "") {
      warningNotification("Student Mail Required");
    } else if (
      !leadData.student_email.includes("@") &&
      !leadData.student_email.includes(".")
    ) {
      warningNotification(
        "Email are not Valid it should be like this example@mail.com"
      );
    } else if (leadData.industry === "") {
      warningNotification("Industry Required");
    } else if (leadData.work_location === "") {
      warningNotification("Living Location Required");
    } else if (leadData.course_id === "") {
      warningNotification("Course Name Required");
    } else {
      setIsCreating(true);
      dispatch(setLoader(true));
      const addLeadResponse = await handleAddLead(details);

      if (addLeadResponse?.status === 201) {
        setIsCreating(false);
        dispatch(setLoader(false));
        successNotification("Lead added successfully");
        setIsAddLeadFormOpen(false);

        const responseData = { ...addLeadResponse.data };

        responseData["course_code"] = `${
          courses?.find(
            (course) => course?.id === addLeadResponse?.data?.course_id
          )?.course_title
        }`;

        responseData["course_title"] = `${
          courses?.find(
            (course) => course?.id === addLeadResponse?.data?.course_id
          )?.course_title
        }`;

        dispatch(
          addLeads([
            {
              ...addLeadResponse?.data,
              course_title: courseList?.find(
                (course) => course?.id === addLeadResponse?.data?.course_id
              )?.course_title,
              course_code: courseList?.find(
                (course) => course?.id === addLeadResponse?.data?.course_id
              )?.course_code,
            },
            ...leads,
          ])
        );
        setLeadData({
          full_name: "",
          phone_number: "",
          student_email: "",
          client_id: userDetails?.client_id,
          industry: "",
          lead_from: "",
          form_data: "",
          industry_qualified_immediately: "",
          industry_work_experience: "",
          academic_qualifications: "",
          course_id: null,
          work_location: "",
          work_experiences_location: "",
        });

        dispatch(setLoader(false));
        window.location.reload();
      } else {
        warningNotification(
          addLeadResponse?.data?.errors?.student_email[0] ||
            "Something went wrong"
        );

        setIsCreating(false);
      }
    }
  };

  const handleWorkLocationChange = (e) => {
    const data = { ...leadData };
    data.work_experiences_location = e.key;
    setLeadData(data);
  };

  const handleLeadSourceChange = (e) => {
    const data = { ...leadData };
    data.lead_from = e.key;
    setLeadData(data);
  };

  const handleIndustryChange = (e) => {
    const data = { ...leadData };
    data.industry = e.key;
    setLeadData(data);
  };

  const handleLivingLocationChange = (e) => {
    const data = { ...leadData };
    data.work_location = e.key;
    setLeadData(data);
  };

  const onIndustryWorkExperience = (e) => {
    const data = { ...leadData };
    data.industry_work_experience = e.target.value;
    setLeadData(data);
  };

  const isIndustryQualified = (e) => {
    const data = { ...leadData };
    data.industry_qualified_immediately = e.target.value;
    setLeadData(data);
  };

  const ifAcademicQalification = (e) => {
    const data = { ...leadData };
    data.academic_qualifications = e.target.value;
    setLeadData(data);
  };
  const onCancle = () => {
    dispatch(setLoader(false));
    setLeadData({
      full_name: "",
      phone_number: "",
      student_email: "",
      client_id: userDetails?.client_id,
      industry: "",
      lead_from: "",
      form_data: "",
      industry_qualified_immediately: "",
      industry_work_experience: "",
      academic_qualifications: "",
      course_id: null,
      work_location: "",
      work_experiences_location: "",
    });
    setIsAddLeadFormOpen(false);
  };

  const workLocation = (
    <Menu onClick={handleWorkLocationChange}>
      <Menu.Item key="Australia">Australia</Menu.Item>
      <Menu.Item key="Overseas">Overseas</Menu.Item>
      <Menu.Item key="Others">Others</Menu.Item>
    </Menu>
  );

  const leadSource = (
    <Menu onClick={handleLeadSourceChange}>
      {leadSourceOption?.map((source) => (
        <Menu.Item key={source}>{source}</Menu.Item>
      ))}
    </Menu>
  );

  const industy = (
    <Menu className="w-56" onClick={handleIndustryChange}>
      {industyData?.map((ind) => (
        <Menu.Item title={ind} key={ind}>
          {ind}
        </Menu.Item>
      ))}
    </Menu>
  );

  const livingLocationOption = (
    <Menu className="w-56" onClick={handleLivingLocationChange}>
      {livingLocation?.map((location) => (
        <Menu.Item title={location} key={location}>
          {location}
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <div>
      <div id="add_lead_manually">
        <div className="text-xl font-semibold font-poppins mb-6">Add Lead</div>
        <div className="flex items-center gap-4">
          <div className="w-1/2 text-lg text-[#808080] leading-8 mb-4 tracking-wide">
            <h1 className="text-sm mb-1">Student's Full Name:</h1>
            <input
              id="full_name"
              name="full_name"
              className={`mt-1 px-2 block w-full py-2 border-b border-gray-300 bg-zinc-50 focus:outline-none focus:ring-brand-color focus:border-b focus:border-brand-color sm:text-sm`}
              type="text"
              placeholder="Jhon Doe"
              value={leadData.full_name}
              onChange={handleInputData}
            />
          </div>
          <div className="w-1/2 text-lg text-[#808080] leading-8 mb-4 tracking-wide">
            <h1 className="text-sm mb-1">Student's Phone Number:</h1>
            <input
              id="phone_number"
              name="phone_number"
              className={`mt-1 px-2 block w-full py-2 border-b border-gray-300 bg-zinc-50 focus:outline-none focus:ring-brand-color focus:border-b focus:border-brand-color sm:text-sm`}
              type="text"
              placeholder="XXXXXXXXXXXX"
              value={leadData.phone_number}
              onChange={handleInputData}
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="w-1/2 text-lg text-[#808080] leading-8 mb-4 tracking-wide">
            <h1 className="text-sm mb-1">Student's Email:</h1>
            <input
              id="student_email"
              name="student_email"
              className={`mt-1 px-2 block w-full py-2 border-b border-gray-300 bg-zinc-50 focus:outline-none focus:ring-brand-color focus:border-b focus:border-brand-color sm:text-sm`}
              type="email"
              placeholder="example@gmail.com"
              value={leadData.student_email}
              onChange={handleInputData}
            />
          </div>
          <div className="w-1/2 text-lg text-[#808080] leading-8 mb-4 tracking-wide">
            <h1 className="text-sm mb-1">Industry:</h1>

            <Dropdown overlay={industy} trigger={["click"]}>
              <div className="cursor-pointer py-2 px-1 text-base text-[#808080] bg-zinc-50 border-b border-gray-300 outline-none focus:ring-brand-color focus:border-b focus:border-brand-color sm:text-sm">
                {leadData?.industry ? leadData?.industry : "Select Industry"}
              </div>
            </Dropdown>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-1/2 text-lg text-[#808080] leading-8 mb-4 tracking-wide">
            <h1 className="text-sm mb-1">Relevent Work Experience</h1>
            <input
              id="work_experience"
              name="work_experience"
              className={`mt-1 px-2 block w-full py-2 border-b border-gray-300 bg-zinc-50 focus:outline-none focus:ring-brand-color focus:border-b focus:border-brand-color sm:text-sm`}
              type="text"
              placeholder="1-2 Years"
              value={leadData.work_experience}
              onChange={handleInputData}
            />
          </div>

          <div className="w-1/2 text-lg text-[#808080] leading-8 mb-4 tracking-wide">
            <h1 className="text-sm mb-1">Work Location</h1>

            <Dropdown overlay={workLocation} trigger={["click"]}>
              <div className="cursor-pointer py-2 px-1 text-base text-[#808080] bg-zinc-50 border-b border-gray-300 outline-none focus:ring-brand-color focus:border-b focus:border-brand-color sm:text-sm">
                {leadData?.work_experiences_location
                  ? leadData?.work_experiences_location
                  : "Select Location"}
              </div>
            </Dropdown>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="w-1/2 text-lg text-[#808080] leading-8 mb-4 tracking-wide">
            <h1 className="text-sm mb-1">Academic Qualifications</h1>
            <Radio.Group
              onChange={ifAcademicQalification}
              value={leadData?.academic_qualifications}
            >
              <Radio value={"Yes"}>Yes</Radio>
              <Radio value={"No"}>No</Radio>
            </Radio.Group>
          </div>

          <div className="w-1/2 text-lg text-[#808080] leading-8 mb-4 tracking-wide">
            <h1 className="text-sm mb-1">Industry Work Experience</h1>

            <div>
              <Radio.Group
                onChange={onIndustryWorkExperience}
                value={leadData?.industry_work_experience}
              >
                <Radio value={"Yes"}>Yes</Radio>
                <Radio value={"No"}>No</Radio>
              </Radio.Group>
            </div>
          </div>
        </div>

        <div className="text-lg text-[#808080] leading-8 mb-4 tracking-wide">
          <h1 className="text-sm mb-1">
            Ready For Industry Qualified Immediately
          </h1>
          <Radio.Group
            onChange={isIndustryQualified}
            value={leadData.industry_qualified_immediately}
          >
            <Radio value={"Yes"}>Yes</Radio>
            <Radio value={"No"}>No</Radio>
          </Radio.Group>
        </div>

        <div className="w-1/2 mb-4">
          <h1 className="mb-1">Enter Living Location:</h1>

          <Dropdown overlay={livingLocationOption} trigger={["click"]}>
            <div className="cursor-pointer py-2 px-1 text-base text-[#808080] bg-zinc-50 border-b border-gray-300 outline-none focus:ring-brand-color focus:border-b focus:border-brand-color sm:text-sm">
              {leadData?.work_location
                ? leadData?.work_location
                : "Select Location"}
            </div>
          </Dropdown>
        </div>

        <div className="w-1/2 mb-4">
          <h1 className="mb-1">Lead Source:</h1>

          <Dropdown overlay={leadSource} trigger={["click"]}>
            <div className="cursor-pointer py-2 px-1 text-base text-[#808080] bg-zinc-50 border-b border-gray-300 outline-none focus:ring-brand-color focus:border-b focus:border-brand-color sm:text-sm">
              {leadData?.lead_from ? leadData?.lead_from : "Select Source"}
            </div>
          </Dropdown>
        </div>

        <div className="w-1/2 mb-4">
          <h1 className="mb-1">Course Name:</h1>

          {courses ? (
            <div>
              <Select
                showSearch
                optionFilterProp="children"
                style={{
                  width: 400,
                  textTransform: "uppercase",
                }}
                id="course_id"
                onChange={handleCourseSearch}
                options={courses}
                placeholder="Search with course name"
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
              />
            </div>
          ) : (
            "No Courses"
          )}
        </div>

        <div className="flex items-center justify-end py-4">
          <div
            className="px-4 py-1.5 mr-4 bg-red-600 text-white text-sm font-normal font-poppins rounded-md cursor-pointer shadow"
            onClick={onCancle}
          >
            Cancel
          </div>
          <Button
            loading={isCreating}
            className="!border-none !text-white !bg-green-500 !rounded"
            onClick={handleAddLeadReq}
          >
            {isCreating ? "Adding" : "Add"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddLeadForm;

const industyData = [
  "Automotive",
  "Air Conditioning & Electrician",
  "Business",
  "Beauty therapy and fitness services",
  "Health and Support/Community Services",
  "Hospitality/Commercial Cookery Services",
  "Meat Processing",
  "Real Estate",
  "Short Courses",
  "Trade Courses",
];

const leadSourceOption = [
  "Google",
  "Website",
  "Tiktok",
  "Messenger",
  "Whatsapp",
  "Instagram",
  "Others",
];

const livingLocation = [
  "NSW",
  "WA",
  "VIC",
  "QLD",
  "SA",
  "ACT",
  "NT",
  "TAS",
  "OVERSEAS",
];
