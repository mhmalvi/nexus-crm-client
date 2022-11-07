import React from "react";

const RequisitionDetails = ({
  requisitionDetails,
  requisitionPackageDetails,
}) => {
  return (
    <div className="font-poppins py-6 px-10">
      <h1 className="text-lg font-semibold text-center pb-2 mb-12">
        <span>Requisition for </span>
        <span className="text-brand-color">
          {requisitionDetails?.company_name}
        </span>
      </h1>
      <div>
        <div className="flex  justify-between">
          <div>
            <h1 className="text-sm font-semibold mb-3 underline">
              Admin Information:
            </h1>
            <h1 className="text-sm">
              <span>Name : </span>
              <span>{requisitionDetails?.name}</span>
            </h1>
            <h1 className="text-sm">
              <span>Personal Email : </span>
              <span>{requisitionDetails?.email}</span>
            </h1>
            <h1 className="text-sm">
              <span>Contact : </span>
              <span>{requisitionDetails?.contact}</span>
            </h1>
          </div>

          <div className="mt-1">
            <img
              className="w-20"
              src={`https://qrcode.tec-it.com/API/QRCode?data=tel%3a${requisitionDetails?.contact}&backcolor=%23ffffff`}
              alt=""
            />
            <div
              className="font-poppins text-center my-2 font-medium"
              style={{
                fontSize: "10px",
              }}
            >
              Scan & Call
            </div>
          </div>
        </div>

        <div className="mt-6">
          <div>
            <h1 className="text-sm font-semibold mb-3 underline">
              Company Information:
            </h1>
          </div>

          <h1 className="text-sm">
            <span>Comapny Name : </span>
            <span>{requisitionDetails?.company_name}</span>
          </h1>

          <h1 className="text-sm">
            <span>Business Email : </span>
            <span>{requisitionDetails?.business_email}</span>
          </h1>

          <h1 className="text-sm">
            <span>Description : </span>
            <span>{requisitionDetails?.description}</span>
          </h1>

          <h1 className="text-sm">
            <span>Country Name : </span>
            <span>{requisitionDetails?.country_name}</span>
          </h1>

          <h1 className="text-sm">
            <span>RTO Code : </span>
            <span>{requisitionDetails?.rto_code}</span>
          </h1>

          <h1 className="text-sm">
            <span>Trading Name : </span>
            <span>{requisitionDetails?.trading_name}</span>
          </h1>

          <h1 className="text-sm">
            <span>Website : </span>
            <a
              href={requisitionDetails?.website}
              target="_blank"
              rel="noreferrer"
            >
              {requisitionDetails?.website
                ? requisitionDetails?.website
                : "Not Submitted"}
            </a>
          </h1>
        </div>
      </div>

      <div>
        <h1 className="text-sm">
          <span>Package : </span>
        </h1>
        <div
          className={`w-72 mt-4 mx-auto flex flex-col border-4 border-[#966dff] shadow bg-[#f3efff] text-white p-8 rounded-xl text-center`}
        >
          <h3 className="font-bold py-10 text-[20px]">
            {requisitionPackageDetails?.package_name}
          </h3>
          <h1 className="ml-3 text-4xl text-brand-color mb-0">
            ${requisitionPackageDetails?.price}
            <br />
          </h1>
          <span className="text-brand-color text-sm ml-5">/Monthly</span>
          <div className="flex-1 text-slate-500 text-xs py-4">
            {requisitionPackageDetails?.package_details}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequisitionDetails;
