import React from "react";

const AddLeadForm = () => {
  return (
    <div>
      <div>
        <div className="text-lg text-[#808080] leading-8 mb-4 tracking-wide">
          <span>Student's Full Name &nbsp;</span>
          <br />
          <input
            id="student_full_name"
            name="student_full_name"
            className={`mt-1 px-2 block w-full py-2 border-b border-gray-300 bg-zinc-50 focus:outline-none focus:ring-brand-color focus:border-b focus:border-brand-color sm:text-sm`}
            type="text"
            placeholder="Student Full Name"
            //   onChange={userData}
          />
        </div>
        <div className="text-lg text-[#808080] leading-8 mb-4 tracking-wide">
          <span>Student's Phone Number &nbsp;</span>
          <br />
          <input
            id="phone_number"
            name="phone_number"
            className={`mt-1 px-2 block w-full py-2 border-b border-gray-300 bg-zinc-50 focus:outline-none focus:ring-brand-color focus:border-b focus:border-brand-color sm:text-sm`}
            type="text"
            placeholder="Student's Phone Number"
            //   onChange={userData}
          />
        </div>

        <div className="text-lg text-[#808080] leading-8 mb-4 tracking-wide">
          <span>Student's Email Address &nbsp;</span>
          <br />
          <input
            id="student_email"
            name="student_email"
            className={`mt-1 px-2 block w-full py-2 border-b border-gray-300 bg-zinc-50 focus:outline-none focus:ring-brand-color focus:border-b focus:border-brand-color sm:text-sm`}
            type="text"
            placeholder="Student's Email"
            //   onChange={userData}
          />
        </div>
        <div className="text-lg text-[#808080] leading-8 mb-4 tracking-wide">
          <span>Student's Phone Number &nbsp;</span>
          <br />
          <input
            id="work_location"
            name="work_location"
            className={`mt-1 px-2 block w-full py-2 border-b border-gray-300 bg-zinc-50 focus:outline-none focus:ring-brand-color focus:border-b focus:border-brand-color sm:text-sm`}
            type="text"
            placeholder="Student's Location"
            //   onChange={userData}
          />
        </div>
      </div>
    </div>
  );
};

export default AddLeadForm;
