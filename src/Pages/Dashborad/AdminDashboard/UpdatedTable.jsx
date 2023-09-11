import { Select, Table, Tooltip, Upload, message } from "antd";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { CSVLink } from "react-csv";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loading from "../../../Components/Shared/Loader";
import { setLoader } from "../../../features/user/userSlice";
import { handleUploadLeadFile } from "../../../Components/services/leads";
import {
  handleCompanyList,
  handleCompanyWiseLeadList,
  handleFetchSales,
} from "../../../Components/services/utils";
import { addLeads } from "../../../features/Leads/leadsSlice";

const UpdatedTable = ({
  table_title,
  tableHeaders,
  data,
  filterOptions,
  setSyncLeads,
  syncLeads,
  activeFilter,
  setIsAddLeadFormOpen,
  searchInput,
  handleSyncLeadsReq,
  salesOptions,
  setSalesOptions,
  selectedSales,
  setSelectedSales,
}) => {
  const navigate = useNavigate();

  const userDetails = useSelector((state) => state?.user?.userInfo);
  const loadingDetails = useSelector((state) => state?.user)?.loading;
  const dispatch = useDispatch();

  const [list, setList] = useState([]);
  const [leadFile, setLeadFile] = useState([]);
  const [companyList, setCompanyList] = useState([]);
  const [companyWiseListData, setCompanyWiseListData] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState({});

  useEffect(() => {
    (async () => {
      dispatch(setLoader(true));
      if (data?.length === 0) {
        setTimeout(() => {
          dispatch(setLoader(false));
        }, 3000);
      } else {
        setTimeout(() => {
          dispatch(setLoader(false));
        }, 1000);
      }
    })();
  }, [data, data?.length, dispatch]);

  useEffect(() => {
    if (table_title !== "Payment History") {
      if (!searchInput?.length) {
        setList(
          userDetails?.role_id === 5 && activeFilter !== 8
            ? data?.filter((lead) => parseInt(lead.lead_details_status) === 1)
            : data
        );
      } else {
        setList(
          data?.filter((lead) =>
            (lead?.lead_id).toString().includes(searchInput.toString())
          )
        );
      }
    } else {
      setList(data);
    }
    console.log(data);
  }, [data, searchInput, activeFilter, userDetails, table_title]);

  const handleLeadFileUploadReq = async (e) => {
    const fileData = new FormData();

    fileData.append("file", e?.file?.originFileObj);
    fileData.append("client_id", userDetails?.client_id);

    const leadFileUploadResp = await handleUploadLeadFile(fileData);

    if (leadFileUploadResp?.status === 200) {
      message.success("Lead uploaded successfully");
      setSyncLeads(!syncLeads);
    } else if (leadFileUploadResp?.status === 403) {
      message.warn("Data already exists");
    } else if (leadFileUploadResp?.status === 400) {
      message.warn("Please reformat excel sheet columnss");
    } else {
      message.warn("Someting went wrong. Please try again");
    }
  };

  // new work down

  const onSelectCompanyData = (v, option) => {
    setSelectedCompany(option);
  };

  useEffect(() => {
    (async () => {
      const res = await handleCompanyList(userDetails?.role_id);
      if (res?.status === 200) {
        const data = [{ value: "", label: "Select Company" }];
        res?.data?.forEach((item, idx) =>
          data.push({ value: item?.id, label: item.name })
        );
        setCompanyList(data);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      dispatch(setLoader(true));
      const res = await handleCompanyWiseLeadList(
        userDetails?.user_id,
        selectedCompany?.value
      );
      if (res?.status === 200) {
        dispatch(setLoader(false));
        dispatch(addLeads(res?.data));
        setCompanyWiseListData(res?.data);
      } else {
        dispatch(setLoader(false));
      }
    })();
  }, [selectedCompany]);

  const companyColomun = [];

  return (
    <div className="border rounded-xl px-4 xl:px-6 2xl:px-10  py-4 xl:py-6 2xl:py-7.5 mt-5">
      <div>
        <div className="flex justify-between items-center">
          <div className="flex items-start">
            <div>
              <h1 className="text-xl leading-7 font-poppins font-semibold">
                {table_title}
              </h1>
            </div>
            <div className="ml-6">
              <CSVLink
                data={list?.length ? list : "Empty"}
                target="_blank"
                filename={
                  typeof activeFilter === "number"
                    ? `${
                        filterOptions?.find(
                          (option) => option.id === activeFilter
                        )?.title
                      }.csv`
                    : table_title
                }
              >
                <div
                  className="bg-black text-white px-2 py-1 rounded-full cursor-pointer font-semibold font-poppins border border-black"
                  style={{
                    fontSize: "10px",
                  }}
                >
                  Export CSV
                </div>
              </CSVLink>
            </div>
          </div>

          <div className="flex items-center">
            {(userDetails?.role_id === 1 || userDetails?.role_id === 3) && (
              <>
                {!window.location.pathname.includes("campaigns") && (
                  <div className="mr-4">
                    <Select
                      defaultValue={""}
                      onChange={(v) => {
                        localStorage.setItem("sales_id", v);
                      }}
                      options={salesOptions || []}
                      placeholder="Select Sales"
                    />
                  </div>
                )}
              </>
            )}
            {userDetails?.role_id === 5 && (
              <div className="mr-4">
                <Select
                  className=" min-w-[150px]"
                  defaultValue={""}
                  onChange={onSelectCompanyData}
                  options={companyList || []}
                  placeholder="Select Company"
                />
              </div>
            )}

            {table_title === "Lead List" ? (
              <div className="mr-4">
                <Upload
                  onChange={(e) => handleLeadFileUploadReq(e)}
                  fileList={leadFile}
                  accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                >
                  <div
                    htmlFor="upload_lead_file"
                    className={`cursor-pointer px-3 py-1 rounded-lg shadow-md bg-[#76bfff] text-white`}
                  >
                    Upload File
                  </div>
                </Upload>

                <Tooltip align={"top"} title="Add lead by uploading file">
                  <span className="px-1.5 font-semibold border border-gray-500 rounded-full text-xs ml-2 cursor-help">
                    ?
                  </span>
                </Tooltip>
              </div>
            ) : null}

            {setIsAddLeadFormOpen ? (
              <>
                {userDetails?.role_id !== 5 && (
                  <div className="mr-4">
                    <button
                      id="add_leads"
                      className={`cursor-pointer px-3 py-1 rounded-lg shadow-md bg-[#ff9d88] text-white`}
                      onClick={() => setIsAddLeadFormOpen(true)}
                    >
                      Add Lead
                    </button>
                    <Tooltip align={"top"} title="Add lead manually">
                      <span className="px-1.5 font-semibold border border-gray-500 rounded-full text-xs ml-2 cursor-help">
                        ?
                      </span>
                    </Tooltip>
                  </div>
                )}
              </>
            ) : null}

            {handleSyncLeadsReq ? (
              <div>
                {(userDetails?.role_id === 1 ||
                  userDetails?.role_id === 2 ||
                  userDetails?.role_id === 3 ||
                  userDetails?.role_id === 4) &&
                  table_title === "Lead List" && (
                    <div className="mr-12">
                      <button
                        id="sync_leads"
                        className={`cursor-pointer px-3 py-1 rounded-lg shadow-md bg-[#a57cff] text-white`}
                        onClick={() => handleSyncLeadsReq()}
                      >
                        Sync Leads
                      </button>
                      <Tooltip
                        align={"top"}
                        title="Please do not press it for multiple times. Sync Leads 3/4 time in a day."
                      >
                        <span className="px-1.5 font-semibold border border-gray-500 rounded-full text-xs ml-2 cursor-help">
                          ?
                        </span>
                      </Tooltip>
                    </div>
                  )}
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <div className="pt-6">
        {loadingDetails ? (
          <div className="w-full h-100 z-50 flex justify-center items-center bg-white bg-opacity-70">
            <Loading />
          </div>
        ) : (
          <div>
            <Table
              columns={tableHeaders}
              dataSource={list || companyWiseListData}
              pagination={true}
              // loading
              showSorterTooltip={true}
              sortDirections={["ascend", "descend"]}
              scroll={{
                x: 1700,
                y: 600,
              }}
              rowClassName={(record, idx) =>
                idx % 2 === 0 ? "bg-[#f5f7ff]" : "bg-[#eff1ff]"
              }
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default UpdatedTable;
