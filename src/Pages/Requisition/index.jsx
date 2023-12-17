import { message, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { handleCreateCompanyRequisition } from "../../Components/services/company";
import Subscription from "../Subscription";
import SubsFooter from "../Subscription/SubsFooter";
import countries from "./countries.json";
import Dialog from "./SuccessRequisition";
import RequisitionForm from "./RequisitionForm";

const Requisition = () => {
  const [DataErr, setDataErr] = useState({});
  const [showRequisitionForm, setShowRequisitionForm] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [countryList, setCountryList] = useState([]);
  const [data, setData] = useState(initialRequisitionData);

  const handleChange = (e) => {
    e.preventDefault();
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setDataErr(validate(data));

    if (Object.keys(DataErr).length === 0) {
      const requisitionResponse = await handleCreateCompanyRequisition(data);

      console.log(requisitionResponse);

      if (requisitionResponse?.status === 201) {
        setShowRequisitionForm(false);
        setData(initialRequisitionData);
        setShowDialog(true);
      } else {
        message.warn(requisitionResponse?.data?.message);
      }
    }
  };

  useEffect(() => {
    document.title = "Requisition | Queleads CRM";

    (async () => {
      const cityDetails = [];
      countries.forEach((details) => {
        cityDetails.push({ value: `${details?.name}` });
      });
      setCountryList(cityDetails);
    })();
  }, []);

  const handleSetCountryname = (value) => {
    const reqData = { ...data };
    reqData.country_name = value;

    setData(reqData);
  };

  const validate = (values) => {
    //data.logo = ImgFile;
    const errors = {};
    if (!values.name) {
      errors.name = "Full name is required!";
    }
    if (!values.contact) {
      errors.contact = "Contact number is required!";
    }
    if (!values.address) {
      errors.address = "Address is required!";
    }
    if (!values.company_name) {
      errors.company_name = "Company name is required!";
    }
    if (!values.email) {
      errors.email = "Personal email is required!";
    }
    if (!values.business_email) {
      errors.business_email = "Personal email is required!";
    }
    if (!values.address) {
      errors.address = "Company address is required!";
    }
    if (!values.trading_name) {
      errors.trading_name = "Company trade name is required!";
    }
    if (!values.rto_code) {
      errors.rto_code = "RTO code is required!";
    }
    if (!values.abn) {
      errors.abn = "Australian business number is  required!";
    }
    if (!values.website) {
      errors.website = "Company website is required!";
    }
    if (!values.country_name) {
      errors.country_name = "Country is required!";
    }
    return errors;
  };

  const handleCancelModal = () => {
    setShowDialog(false);
    setShowRequisitionForm(false);
  };

  console.log(data);

  return (
    <div className="font-poppins scroll-smooth">
      <h1 className="font-poppins text-3xl font-semibold text-center pt-20 pb-10">
        Send Your Company Requisition
      </h1>
      <div className="w-10/12 mx-auto">
        <Subscription
          setShowRequisitionForm={setShowRequisitionForm}
          data={data}
          setData={setData}
        />
      </div>

      {/* Confirmation Message */}
      <Modal
        visible={showDialog}
        footer={null}
        onCancel={handleCancelModal}
        width={600}
      >
        <Dialog />
      </Modal>

      <Modal
        visible={showRequisitionForm}
        footer={null}
        onCancel={handleCancelModal}
        width={600}
      >
        <RequisitionForm
          handleSubmit={handleSubmit}
          data={data}
          handleChange={handleChange}
          DataErr={DataErr}
          handleSetCountryname={handleSetCountryname}
          countryList={countryList}
        />
      </Modal>


      <div>
        <SubsFooter />
      </div>
    </div>
  );
};

export default Requisition;

const initialRequisitionData = {
  // porsonal info
  name: "",
  email: "",
  contact: "",
  // company info
  packages_id: "",
  company_name: "",
  description: "",
  // logo_id: "",
  business_email: "",
  address: "",
  abn: "",
  website: "",
  trading_name: "",
  rto_code: "",
  country_name: "",
};
