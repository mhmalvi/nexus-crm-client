import { Modal } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { CSVLink } from "react-csv";
import { handleFetchPackages } from "../../../Components/services/company";

const RequisitionTable = ({
  title,
  tableHeaders,
  data,
  // activeFilter,
  // searchInput,
}) => {
  // const navigate = useNavigate();
  const [list, setList] = useState([]);
  const [requisitionDetails, setRequisitionDetails] = useState();
  const [requisitionPackageDetails, setRequisitionPackageDetails] = useState(
    {}
  );
  const [showRequisitionDetails, setShowRequisitionDetails] = useState(false);

  useEffect(() => {
    (async () => {
      const packagesResponse = await handleFetchPackages();

      if (Object.keys(requisitionDetails).length !== 0) {
        const packageDetails = packagesResponse.packages.find(
          (pack) => pack.id === requisitionDetails?.id
        );

        console.log("packageDetails", packageDetails);

        setRequisitionPackageDetails(packageDetails);
      }
    })();

    setList(data);
  }, [data, requisitionDetails]);

  console.log("requisitionPackageDetails", requisitionPackageDetails);
  // const handleNavigate = (id) => {
  //   navigate(`/profile/${id}`);
  // };

  // const handleDialog = (message, isLoading, user) => {
  //   setdialog({
  //     message,
  //     isLoading,
  //     user,
  //   });
  // };

  const idRef = useRef();
  const HandleDelete = (id) => {
    idRef.current = id;
    const index = data.findIndex((p) => p.user_id === idRef.current);
  };

  const DoubleConfirmDelete = (choice) => {
    if (choice) {
      const newList = [...list];
      const index = newList.findIndex((c) => c.user_id === idRef.current);
      newList.splice(index, 1);
      setList(newList);
      console.log(newList);
    }
  };

  const HandleApprove = (id) => {
    const newList = [...list];
    const index = newList.findIndex((c) => c.user_id === id);
    newList[index].status = 0;
    setList(newList);
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
                <span>{requisitionDetails?.website}</span>
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
                <tr key={i} onClick={() => handleRequisitionDetails(list?.id)}>
                  <td className="w-19">{i + 1}</td>
                  <td>{list.name}</td>
                  <td>{list.company_name}</td>
                  <td>{list.contact}</td>
                  <td>{list.email}</td>
                  <td>{list.trading_name}</td>

                  <td>
                    {list.status === "1" ? (
                      <div className="flex items-center">
                        <div
                          className={`w-2 h-2 bg-green-500 rounded-full`}
                        ></div>
                        <div className="ml-1">Approved</div>
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <div
                          className={`w-2 h-2 bg-orange-500 rounded-full`}
                        ></div>
                        <div className="ml-1">Pending</div>
                      </div>
                    )}
                  </td>
                  {list.status === "0" ? (
                    <td className="flex flex-wrap justify-center items-start gap-1">
                      <div
                        className="flex items-center py-1.5 px-7 rounded-lg shadow-md border border-green-400 justify-center hover:border-green-500"
                        onClick={() => HandleApprove(list.user_id)}
                      >
                        <div className="text-green-500 font-extrabold">✔</div>
                      </div>
                      <div
                        className="flex items-center py-1.5 px-7 rounded-lg shadow-md border border-red-400 justify-center hover:border-red-500"
                        onClick={() => HandleDelete(list.user_id)}
                      >
                        <div className="text-red-500 font-extrabold">✖</div>
                      </div>
                    </td>
                  ) : (
                    <td className="flex flex-col justify-center items-start">
                      <div
                        className="flex justify-center items-center py-1.5 px-7 rounded-lg shadow-md border border-red-500"
                        onClick={() => HandleDelete(list.user_id)}
                      >
                        <div className="text-red-500 font-extrabold">✖</div>
                      </div>
                    </td>
                  )}
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
