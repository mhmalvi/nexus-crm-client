import { message, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import { useDispatch, useSelector } from "react-redux";
import { handleRegistration } from "../../../Components/services/auth";
import {
  handleCreateCompany,
  handleFetchPackages,
} from "../../../Components/services/company";
import { handleUpdateRequisitions } from "../../../Components/services/crmAdmin";
import Loading from "../../../Components/Shared/Loader";
import { setLoader } from "../../../features/user/userSlice";
import RequisitionDetails from "./RequisitionDetails";

const RequisitionTable = ({
  title,
  tableHeaders,
  data,
  syncRequisitionsData,
  setSyncRequisitionsData,
}) => {
  const dispatch = useDispatch();
  const loadingDetails = useSelector((state) => state?.user)?.loading;

  const [list, setList] = useState([]);
  const [requisitionDetails, setRequisitionDetails] = useState();
  const [requisitionPackageDetails, setRequisitionPackageDetails] = useState(
    {}
  );
  const [showRequisitionDetails, setShowRequisitionDetails] = useState(false);

  useEffect(() => {
    dispatch(setLoader(true));
    if (data) {
      setTimeout(() => {
        dispatch(setLoader(false));
      }, 1000);
    } else {
      setTimeout(() => {
        dispatch(setLoader(false));
      }, 3000);
    }
  }, [data, dispatch]);

  useEffect(() => {
    (async () => {
      const packagesResponse = await handleFetchPackages();

      // if (Object.keys(requisitionDetails).length !== 0) {
      if (requisitionDetails) {
        const packageDetails = packagesResponse.packages.find(
          (pack) => pack.id === requisitionDetails?.id
        );
        console.log("packageDetails", packageDetails);
        setRequisitionPackageDetails(packageDetails);
      }
    })();

    setList(data);
  }, [data, dispatch, requisitionDetails]);

  const HandleDelete = async (id) => {
    const removeRequisitionResponse = await handleUpdateRequisitions(id, 2);
    if (removeRequisitionResponse?.key === "success") {
      setSyncRequisitionsData(!syncRequisitionsData);
    }
  };

  const HandleApprove = async (id) => {
    const approveRequisitionResponse = await handleUpdateRequisitions(id, 1);

    if (approveRequisitionResponse?.key === "success") {
      setSyncRequisitionsData(!syncRequisitionsData);
      message.success("Requisition Accepeted & Company Added Successfully");
    }

    const reqDetails = data.find((requisition) => requisition?.id === id);
    const registrationDetails = {
      email: reqDetails?.email,
      role_id: 3,
      contact_number: reqDetails?.contact,
      full_name: reqDetails?.name,
      qualification: "Not Added",
      work_experiences: "Not Added",
      location: "Not Added",
    };
    const handleUserRegistration = await handleRegistration(
      registrationDetails
    );

    if (handleUserRegistration?.data?.user_id) {
      const createCompany = await handleCreateCompany({
        name: reqDetails?.company_name,
        description: reqDetails?.description,
        logo_id: "",
        contact: reqDetails?.contact,
        business_email: reqDetails?.business_email,
        address: reqDetails?.address,
        abn: reqDetails?.abn,
        website: reqDetails?.website,
        trading_name: reqDetails?.trading_name,
        rto_code: reqDetails?.rto_code,
        country_name: reqDetails?.country_name,
        admin: handleUserRegistration?.data?.user_id,
        fb_ac_credential: "Not Added Yet",
        secret_key: "Not Added Yet",
        form: "Not Added Yet",
        subscription_id: reqDetails?.packages_id,
        business_type: 1,
      });

      console.log("createCompany", createCompany);
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
        <RequisitionDetails
          requisitionDetails={requisitionDetails}
          requisitionPackageDetails={requisitionPackageDetails}
          showRequisitionDetail={showRequisitionDetails}
          setShowRequisitionDetails={setShowRequisitionDetails}
        />
      </Modal>

      <div className="flex justify-between items-center">
        <div className="flex items-start">
          <div>
            <h1 className="text-xl leading-7 font-poppins font-semibold">
              {title}
            </h1>
          </div>
          <div className="ml-6">
            <CSVLink
              data={data.length ? data : "Empty"}
              target="_blank"
              filename={"Requisitions.csv"}
            >
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

      {loadingDetails ? (
        <div className="w-full h-100 z-50 flex justify-center items-center bg-white bg-opacity-70">
          <Loading />
        </div>
      ) : (
        <div className="tbl-content">
          {data.length ? (
            <table
              className="custom-table"
              cellPadding="0"
              cellSpacing="0"
              border="0"
            >
              <tbody>
                {list?.map((list, i) => (
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
                      {new Date(list.created_at).toString().slice(4, 21)}{" "}
                      {new Date(list.created_at).toString().slice(25, 31)}
                      {/* {list.created_at
                        .replace("T", " ")
                        .toString()
                        .slice(0, 19)} */}
                      {/* {list.trading_name} */}
                    </td>
                    {/* <td onClick={() => handleRequisitionDetails(list?.id)}>
                    {list.created_at.toString().slice(0, 31)}
                  </td> */}

                    <td onClick={() => handleRequisitionDetails(list?.id)}>
                      {list.status === 2 ? (
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
                      {list.status === 0 ? (
                        <td className="flex p-0 justify-start items-start gap-1">
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
                      ) : null}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <h1 className="text-lg font-medium text-center py-16">
              No Requisition Yet
            </h1>
          )}
        </div>
      )}
    </div>
  );
};

export default RequisitionTable;
