import { AutoComplete } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  handleFetchCourses,
  handleUpdateLeadContact,
} from "../../../Components/services/leads";
import { successNotification } from "../../../Components/Shared/Toast";

const EditDetails = ({
  leadDetails,
  setToggleEditDetials,
  syncDetails,
  setSyncDetails,
}) => {
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.user?.userInfo);

  const [contactDetails, setContactDetails] = useState();

  const [courses, setCourses] = useState([]);
  const [courseList, setCourseList] = useState([]);

  useEffect(() => {
    const courseOption = [];

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

    setCourses(courseOption);
  }, [dispatch, userDetails]);

  useEffect(() => {
    const course_name = courseList?.find(
      (course) => course?.id === leadDetails?.leadDetails?.course_id
    );

    setContactDetails({
      contact: leadDetails?.leadDetails?.phone_number,
      email: leadDetails?.leadDetails?.student_email,
      campaign_id: leadDetails?.leadDetails?.campaign_id,
      course_id: leadDetails?.leadDetails?.course_id,
      course_name: course_name?.course_title,
      work_location: leadDetails?.leadDetails?.work_location,
    });
  }, [courseList, leadDetails]);

  const handleEditData = (e) => {
    const data = { ...contactDetails };
    data[e.target.id] = e.target.value;

    setContactDetails(data);
  };

  const handleLocationSearch = async (value) => {
    const data = { ...contactDetails };
    data.work_location = value;
    setContactDetails(data);
  };

  const handleCourseSearch = async (value) => {
    const courseId = courses?.find((course) =>
      course?.value?.toLowerCase().includes(value?.toLowerCase())
    );

    const data = { ...contactDetails };
    data.course_id = courseId?.id;
    data.course_name = courseId?.course_title;
    setContactDetails(data);
  };

  const handleAddLeadDetailsUpdateReq = async () => {
    const contactUpdateResp = await handleUpdateLeadContact(
      leadDetails?.leadDetails?.lead_id,
      contactDetails
    );

    if (contactUpdateResp?.status === 200) {
      successNotification("Contact updated successfully.");
      setToggleEditDetials(false);
      setSyncDetails(!syncDetails);
    }
  };

  return (
    <div>
      <h1 className="text-lg font-semibold mb-8 mt-4">Edit Contact Details</h1>

      <div>
        <div className="flex items-center gap-6">
          <div className="w-1/2 text-lg text-[#808080] leading-8 mb-4 tracking-wide">
            <input
              id="contact"
              name="contact"
              className={`mt-1 px-2 block w-full py-2 border-b border-gray-300 bg-zinc-50 focus:outline-none focus:ring-brand-color focus:border-b focus:border-brand-color sm:text-sm`}
              type="text"
              placeholder="Student Full Name"
              value={contactDetails?.contact}
              onChange={handleEditData}
            />
          </div>
          <div className="w-1/2 text-lg text-[#808080] leading-8 mb-4 tracking-wide">
            <input
              id="email"
              name="email"
              className={`mt-1 px-2 block w-full py-2 border-b border-gray-300 bg-zinc-50 focus:outline-none focus:ring-brand-color focus:border-b focus:border-brand-color sm:text-sm`}
              type="email"
              placeholder="Student's Phone Number"
              value={contactDetails?.email}
              onChange={handleEditData}
            />
          </div>
        </div>

        <div className="w-1/2 mb-4">
          <h1 className="mb-1">Course Name:</h1>

          <AutoComplete
            style={{
              width: 400,
            }}
            id="course_id"
            value={contactDetails?.course_name}
            onChange={handleCourseSearch}
            options={courses}
            placeholder="Search with course name"
            filterOption={(inputValue, option) =>
              option?.value
                ?.toLowerCase()
                ?.indexOf(inputValue?.toLowerCase()) !== -1
            }
          />
        </div>

        <div className="w-1/2 mb-4">
          <h1 className="mb-1">Enter Location:</h1>
          <AutoComplete
            style={{
              width: 400,
            }}
            id="work_location"
            value={contactDetails?.work_location}
            onChange={handleLocationSearch}
            options={cityOptions}
            placeholder="Search with location initial"
            filterOption={(inputValue, option) =>
              option?.value
                ?.toLowerCase()
                ?.indexOf(inputValue?.toLowerCase()) !== -1
            }
          />
        </div>

        <div className="flex items-center justify-end py-4">
          <div
            className="px-4 py-1.5 mr-4 bg-red-600 text-slate-300 text-sm font-normal font-poppins rounded-md cursor-pointer shadow"
            onClick={() => {
              setToggleEditDetials(false);
            }}
          >
            Cancel
          </div>
          <div
            className="px-4 py-1.5 bg-black text-slate-300 text-sm font-normal font-poppins rounded-md cursor-pointer shadow"
            onClick={handleAddLeadDetailsUpdateReq}
          >
            Update
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditDetails;

const cityOptions = [
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
];
