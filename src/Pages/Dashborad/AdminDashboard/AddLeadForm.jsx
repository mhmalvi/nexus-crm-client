import { AutoComplete, message } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  handleAddLead,
  handleFetchCourses,
} from "../../../Components/services/leads";
import { addLeads } from "../../../features/Leads/leadsSlice";
import { setLoader } from "../../../features/user/userSlice";

const AddLeadForm = ({ setIsAddLeadFormOpen }) => {
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.user?.userInfo);
  const leads = useSelector((state) => state.leads?.leads);

  const [courses, setCourses] = useState([]);
  const [courseList, setCourseList] = useState([]);
  // const [campaigns, setCampaigns] = useState([]);
  // const [campaignList, setCampaignList] = useState([]);

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
  // const [checklistTitle, setChecklistTitle] = useState("");

  useEffect(() => {
    const courseOption = [];
    // const campaigns = [];

    (async () => {
      const courseResponse = await handleFetchCourses();
      console.log("courseResponse", courseResponse);

      if (courseResponse?.status) {
        courseResponse?.data?.forEach((course) => {
          courseOption.push({
            id: course?.id,
            value: course?.course_title,
          });
        });
        setCourseList(courseResponse?.data);
      }
    })();

    // (async () => {
    //   const campaignResponse = await handleFetchCampaigns(
    //     userDetails?.client_id
    //   );

    //   console.log("campaignResponse", campaignResponse);

    //   if (campaignResponse?.status) {
    //     campaignResponse?.data?.forEach((campaign) => {
    //       campaigns.push({
    //         id: campaign?.id,
    //         value: campaign?.campaign_name,
    //       });
    //     });
    //     setCampaignList(campaignResponse?.data);
    //   }
    // })();

    setCourses(courseOption);
    // setCampaigns(campaigns);
  }, [dispatch, userDetails]);

  const handleCourseSearch = async (value) => {
    const courseId = courses?.find((course) =>
      course?.value?.toLowerCase().includes(value?.toLowerCase())
    );

    const data = { ...leadData };
    data.course_id = courseId?.id;
    setLeadData(data);
  };

  // const handleCampaignSearch = async (value) => {
  //   const campaignId = campaignList?.find((cmapaign) =>
  //     cmapaign?.campaign_name?.toLowerCase().includes(value?.toLowerCase())
  //   );

  //   const data = { ...leadData };
  //   data.campaign_id = campaignId?.campaign_id;
  //   setLeadData(data);
  // };

  const handleLocationSearch = async (value) => {
    const data = { ...leadData };
    data.work_location = value;
    setLeadData(data);
  };

  const handleInputData = (e) => {
    const data = { ...leadData };
    // console.log("data", data);
    data[e.target.id] = e.target.value;
    setLeadData(data);
  };

  console.log("leadData", leadData);

  const handleAddLeadReq = async () => {
    dispatch(setLoader(true));

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
        name: "Where is your work experience?",
        values: [leadData.work_experiences_location],
      },
      {
        name: "Where do you live in?",
        values: [leadData.work_location],
      },
    ]);

    const addLeadResponse = await handleAddLead(details);

    if (addLeadResponse?.status === 201) {
      message.success("Lead added successfully");
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
    }
  };

  return (
    <div>
      <div>
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
            <input
              id="industry"
              name="industry"
              className={`mt-1 px-2 block w-full py-2 border-b border-gray-300 bg-zinc-50 focus:outline-none focus:ring-brand-color focus:border-b focus:border-brand-color sm:text-sm`}
              type="text"
              placeholder="Trade/Hospitality/Health"
              value={leadData.industry}
              onChange={handleInputData}
            />
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
            <input
              id="work_experiences_location"
              name="work_experiences_location"
              className={`mt-1 px-2 block w-full py-2 border-b border-gray-300 bg-zinc-50 focus:outline-none focus:ring-brand-color focus:border-b focus:border-brand-color sm:text-sm`}
              type="text"
              placeholder="Australia, Overseas, Other"
              value={leadData.work_experiences_location}
              onChange={handleInputData}
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="w-1/2 text-lg text-[#808080] leading-8 mb-4 tracking-wide">
            <h1 className="text-sm mb-1">Academic Qualifications</h1>
            <input
              id="academic_qualifications"
              name="academic_qualifications"
              className={`mt-1 px-2 block w-full py-2 border-b border-gray-300 bg-zinc-50 focus:outline-none focus:ring-brand-color focus:border-b focus:border-brand-color sm:text-sm`}
              type="text"
              placeholder="Yes/No"
              value={leadData.academic_qualifications}
              onChange={handleInputData}
            />
          </div>

          <div className="w-1/2 text-lg text-[#808080] leading-8 mb-4 tracking-wide">
            <h1 className="text-sm mb-1">Industry Work Experience</h1>
            <input
              id="industry_work_experience"
              name="industry_work_experience"
              className={`mt-1 px-2 block w-full py-2 border-b border-gray-300 bg-zinc-50 focus:outline-none focus:ring-brand-color focus:border-b focus:border-brand-color sm:text-sm`}
              type="text"
              placeholder="Yes/No (Reference letters, pay slips, pictures, videos and more)"
              value={leadData.industry_work_experience}
              onChange={handleInputData}
            />
          </div>
        </div>

        <div className="text-lg text-[#808080] leading-8 mb-4 tracking-wide">
          <h1 className="text-sm mb-1">
            Ready For Industry Qualified Immediately
          </h1>
          <input
            id="industry_qualified_immediately"
            name="industry_qualified_immediately"
            className={`mt-1 px-2 block w-full py-2 border-b border-gray-300 bg-zinc-50 focus:outline-none focus:ring-brand-color focus:border-b focus:border-brand-color sm:text-sm`}
            type="text"
            placeholder="Yes/No (Reference letters, pay slips, pictures, videos and more)"
            value={leadData.industry_qualified_immediately}
            onChange={handleInputData}
          />
        </div>

        <div className="w-1/2 mb-4">
          <h1 className="mb-1">Enter Living Location:</h1>
          <AutoComplete
            style={{
              width: 400,
            }}
            id="work_location"
            value={leadData.work_location}
            onChange={handleLocationSearch}
            options={[
              {
                id: 1,
                value: "NSW",
              },
              {
                id: 2,
                value: "WA",
              },
              {
                id: 3,
                value: "VIC",
              },
              {
                id: 4,
                value: "QLD",
              },
              {
                id: 5,
                value: "SA",
              },
              {
                id: 6,
                value: "ACT",
              },
              {
                id: 7,
                value: "NT",
              },
              {
                id: 8,
                value: "TAS",
              },
            ]}
            placeholder="Search with location initial"
            filterOption={(inputValue, option) =>
              option.value.toLowerCase().indexOf(inputValue.toLowerCase()) !==
              -1
            }
          />
        </div>

        <div className="w-1/2 mb-4">
          <h1 className="mb-1">Lead Source:</h1>
          <input
            id="lead_from"
            name="lead_from"
            className={`mt-1 px-2 block w-full py-2 border-b border-gray-300 bg-zinc-50 focus:outline-none focus:ring-brand-color focus:border-b focus:border-brand-color sm:text-sm`}
            type="text"
            placeholder="Onsite, Instagram, Tiktok,"
            value={leadData.lead_from}
            onChange={handleInputData}
          />
        </div>

        <div className="w-1/2 mb-4">
          <h1 className="mb-1">Course Name:</h1>

          <AutoComplete
            style={{
              width: 400,
            }}
            id="course_id"
            // value={
            //   courses?.find((course) => course?.id === leadData.course_id)
            //     ?.course_title
            // }
            onChange={handleCourseSearch}
            options={courses}
            placeholder="Search with course name"
            filterOption={(inputValue, option) =>
              option.value.toLowerCase().indexOf(inputValue.toLowerCase()) !==
              -1
            }
          />
        </div>

        <div className="flex items-center justify-end py-4">
          <div
            className="px-4 py-1.5 mr-4 bg-red-600 text-white text-sm font-normal font-poppins rounded-md cursor-pointer shadow"
            onClick={() => setIsAddLeadFormOpen(false)}
          >
            Cancel
          </div>
          <div
            className="px-4 py-1.5 bg-black text-white text-sm font-normal font-poppins rounded-md cursor-pointer shadow"
            onClick={handleAddLeadReq}
          >
            Add
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddLeadForm;
