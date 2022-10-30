import { Modal } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { CSVLink } from "react-csv";
import { useDispatch } from "react-redux";
import { handleFetchPackages } from "../../../Components/services/company";
import { handleUpdateRequisitions } from "../../../Components/services/crmAdmin";
import { setLoader } from "../../../features/user/userSlice";

const RequisitionTable = ({
  title,
  tableHeaders,
  data,
  syncRequisitionsData,
  setSyncRequisitionsData,
}) => {
  const dispatch = useDispatch();

  const [list, setList] = useState([]);
  const [requisitionDetails, setRequisitionDetails] = useState();
  const [requisitionPackageDetails, setRequisitionPackageDetails] = useState(
    {}
  );
  const [showRequisitionDetails, setShowRequisitionDetails] = useState(false);

  useEffect(() => {
    dispatch(setLoader(true));

    (async () => {
      const packagesResponse = await handleFetchPackages();

      if (Object.keys(requisitionDetails).length !== 0) {
        const packageDetails = packagesResponse.packages.find(
          (pack) => pack.id === requisitionDetails?.id
        );
        console.log("packageDetails", packageDetails);
        setRequisitionPackageDetails(packageDetails);

        dispatch(setLoader(false));
      }
    })();

    setList(data);
  }, [data, requisitionDetails]);

  console.log("Requisitions", data);

  // const handleDialog = (message, isLoading, user) => {
  //   setdialog({
  //     message,
  //     isLoading,
  //     user,
  //   });
  // };

  const HandleDelete = async (id) => {
    console.log(id);
    const removeRequisitionResponse = await handleUpdateRequisitions(id, 2);

    console.log("removeRequisitionResponse", removeRequisitionResponse);

    if (removeRequisitionResponse?.key === "success") {
      setSyncRequisitionsData(!syncRequisitionsData);
    }
  };

  // const DoubleConfirmDelete = (choice) => {
  //   if (choice) {
  //     const newList = [...list];
  //     const index = newList.findIndex((c) => c.user_id === idRef.current);
  //     newList.splice(index, 1);
  //     setList(newList);
  //     console.log(newList);
  //   }
  // };

  const HandleApprove = async (id) => {
    const approveRequisitionResponse = await handleUpdateRequisitions(id, 1);

    console.log(approveRequisitionResponse);

    if (approveRequisitionResponse?.key === "success") {
      setSyncRequisitionsData(!syncRequisitionsData);
    }
  };

  const handleRequisitionDetails = (requisitionId) => {
    const requisitionDetails = list.find(
      (requisition) => requisition?.id === requisitionId
    );

    setRequisitionDetails(requisitionDetails);

    setShowRequisitionDetails(true);
  };

  return (
    <div className="border rounded-xl px-10 py-7.5 font-poppins">
      {/* Requisition Details */}
      <Modal
        visible={showRequisitionDetails}
        footer={null}
        onCancel={() => setShowRequisitionDetails(false)}
        width={600}
      >
        <div className="font-poppins py-6 px-10">
          <h1 className="text-lg font-semibold text-center pb-2 mb-12">
            <span>Requisition for </span>
            <span className="text-brand-color">
              {" "}
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
              <h1 className="text-sm font-semibold mb-3 underline">
                Company Information:
              </h1>

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
              className={`w-72 mt-4 mx-auto cursor-pointer flex flex-col border-4 border-[#966dff] shadow bg-[#f3efff] text-white p-8 rounded-xl text-center`}
            >
              <div className="flex justify-between gap-2">
                <div className="border-brand-color border rounded-full w-20 h-6 my-2">
                  <span className="text-brand-color text-sm font-bold">
                    active
                  </span>
                </div>
              </div>
              <h3 className="font-bold py-10 text-[20px]">
                Package
                {requisitionPackageDetails?.package_name}
              </h3>
              <h1 className="ml-3 text-4xl text-brand-color mb-0">
                $100
                <br />
              </h1>
              <span className="text-brand-color text-sm ml-5">/Monthly</span>
              <div className="flex-1 text-slate-500 text-xs py-4">
                {requisitionPackageDetails?.package_details}
              </div>
            </div>
          </div>
        </div>
      </Modal>

      <div className="flex justify-between items-center">
        <div className="flex items-start">
          <div>
            <h1 className="text-xl leading-7 font-poppins font-semibold">
              {title}
            </h1>
          </div>
          <div className="ml-6">
            <CSVLink data={data} target="_blank" filename={"Requisitions.csv"}>
              <h1
                className="text-black bg-white px-2 py-1 rounded-full cursor-pointer font-semibold font-poppins border border-black"
                style={{
                  fontSize: "10px",
                }}
              >
                Export CSV
              </h1>
            </CSVLink>
          </div>
        </div>
        <div className="mr-12">
          <button
            id="sync_leads"
            className={`cursor-pointer px-3 py-1 rounded-lg shadow-md`}
          >
            Sync Requisitions
          </button>
        </div>
      </div>
      <div className="tbl-header">
        <table cellPadding="0" cellSpacing="0" border="0">
          <thead>
            <tr>
              {tableHeaders.map((header, i) =>
                header === "ID" ? (
                  <th className="w-19" key={i}>
                    {header}
                  </th>
                ) : (
                  <th key={i}>{header}</th>
                )
              )}
            </tr>
          </thead>
        </table>
      </div>
      <div className="tbl-content">
        <form action="">
          <table
            className="custom-table"
            cellPadding="0"
            cellSpacing="0"
            border="0"
          >
            <tbody>
              {list.map((list, i) => (
                <tr key={i}>
                  <td
                    onClick={() => handleRequisitionDetails(list?.id)}
                    className="w-19"
                  >
                    {i + 1}
                  </td>
                  <td onClick={() => handleRequisitionDetails(list?.id)}>
                    {list.name}
                  </td>
                  <td onClick={() => handleRequisitionDetails(list?.id)}>
                    {list.company_name}
                  </td>
                  <td onClick={() => handleRequisitionDetails(list?.id)}>
                    {list.contact}
                  </td>
                  <td onClick={() => handleRequisitionDetails(list?.id)}>
                    {list.email}
                  </td>
                  <td
                    className="pl-8"
                    onClick={() => handleRequisitionDetails(list?.id)}
                  >
                    {list.trading_name}
                  </td>
                  <td onClick={() => handleRequisitionDetails(list?.id)}>
                    {list.created_at.replace("T", " ").toString().slice(0, 19)}
                    {/* {list.trading_name} */}
                  </td>
                  {/* <td onClick={() => handleRequisitionDetails(list?.id)}>
                    {list.created_at.toString().slice(0, 31)}
                  </td> */}

                  <td onClick={() => handleRequisitionDetails(list?.id)}>
                    {list.status === 2  ? (
                      <div className="flex items-center">
                        <div
                          className={`w-2 h-2 bg-red-500 rounded-full`}
                        ></div>
                        <div className="ml-1">Cancelled</div>
                      </div>
                    ) : (
                      <>
                        {list.status === 1 ? (
                          <div className="flex items-center">
                            <div
                              className={`w-2 h-2 bg-green-500 rounded-full`}
                            ></div>
                            <div className="ml-1">Approved</div>
                          </div>
                        ) : (
                          // : list.status === "0" ? (
                          <div className="flex items-center">
                            <div
                              className={`w-2 h-2 bg-orange-500 rounded-full`}
                            ></div>
                            <div className="ml-1">Pending</div>
                          </div>
                        )}
                      </>
                    )}
                  </td>
                  <td className="py-2 px-0">
                    {
                      list.status === 0 ? (
                        <td className="flex p-0 justify-start items-start gap-1">
                          {/* <td className="border-none p-0"> */}
                          {/* <td className="flex  gap-1"> */}
                          <div
                            className="flex items-center py-1.5 px-4 rounded-lg shadow-md border border-green-400 justify-center hover:border-green-500"
                            onClick={() => HandleApprove(list.id)}
                          >
                            <div className="text-green-500 font-extrabold">
                              ✔
                            </div>
                          </div>
                          <div
                            className="flex items-center py-1.5 px-4 rounded-lg shadow-md border border-red-400 justify-center hover:border-red-500"
                            onClick={() => HandleDelete(list.id)}
                          >
                            <div className="text-red-500 font-extrabold">✖</div>
                          </div>
                          {/* </td> */}
                        </td>
                      ) : null
                      // <td className="flex flex-col justify-center items-start">
                      //   <div
                      //     className="flex justify-center items-center py-1.5 px-7 rounded-lg shadow-md border border-red-500"
                      //     onClick={() => HandleDelete(list.user_id)}
                      //   >
                      //     <div className="text-red-500 font-extrabold">✖</div>
                      //   </div>
                      // </td>
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </form>
      </div>
    </div>
  );
};

export default RequisitionTable;
