import React, { useState } from "react";
import companyLogo from "../../../assets/Images/QQ.png";
import { Link } from "react-router-dom";
import { Button, Modal } from "antd";

const Companies = () => {
  const [toggleAddCompany, setToggleAddCompany] = useState(false);

  const handleCancel = () => {
    setToggleAddCompany(false);
  };

  const handleSubmit = () => {
    setToggleAddCompany(false);
  };

  return (
    <div className="font-poppins">
      <div className="flex items-center mb-5">
        <h1 className="text-xl leading-8 font-semibold font-poppins text-black text-opacity-50 mb-0">
          Companies
        </h1>
        <button
          className="ml-28 py-1 text-base leading-6 font-medium bg-blue-500 rounded-md text-white"
          style={{
            width: "75px",
          }}
          onClick={() => setToggleAddCompany(true)}
        >
          Add
        </button>
      </div>

      <div className="grid grid-cols-4 2xl:grid-cols-5 gap-8">
        {Array.from({ length: 6 }, () => Math.random()).map(() => (
          <Link
            to={"company/itec"}
            className="border border-gray-600 border-opacity-70 px-4 py-3 rounded-2xl cursor-pointer"
          >
            <div className=" my-4">
              <img className="mx-auto" src={companyLogo} alt="" />
            </div>
            <div className="ml-4">
              <h1 className="font-semibold text-xl text-center">ITECH</h1>
            </div>
          </Link>
        ))}
      </div>

      {/* Add company modal */}

      <div>
        <Modal
          title="Create Company Profile"
          centered
          visible={toggleAddCompany}
          onSubmit={() => setToggleAddCompany(false)}
          onCancel={() => setToggleAddCompany(false)}
          footer={[
            <Button key="back" onClick={handleCancel}>
              Cancle
            </Button>,
            <Button key="submit" type="primary" onClick={handleSubmit}>
              Submit
            </Button>,
          ]}
        >
          <p>Company informations</p>
        </Modal>
      </div>
    </div>
  );
};

export default Companies;
