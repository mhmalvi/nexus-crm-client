import { Select, Table, Tooltip, Upload } from "antd";
import React, { useEffect, useState, useCallback } from "react";
import { CSVLink } from "react-csv";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../../Components/Shared/Loader";
import { setLoader } from "../../../features/user/userSlice";
import { handleUploadLeadFile } from "../../../Components/services/leads";
import {
  handleCompanyList,
  handleCompanyWiseLeadList,
} from "../../../Components/services/utils";
import { handleSyncLeads } from "../../../Components/services/leads";

import { addLeads } from "../../../features/Leads/leadsSlice";
import "./dashboard.css";
import {
  successNotification,
  warningNotification,
} from "../../../Components/Shared/Toast";
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
  salesOptions,
}) => {
  const colorMode = useSelector((state) => state?.user)?.colorMode;
  const userDetails = useSelector((state) => state?.user?.userInfo);
  const leadList = useSelector((state) => state.leads)?.leads;
  const dispatch = useDispatch();

  const [list, setList] = useState([]);
  const [leadFile, setLeadFile] = useState([]);
  const [companyList, setCompanyList] = useState([]);
  const [companyWiseListData, setCompanyWiseListData] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState({});
  const [currentPage, setCurrentPage] = useState();

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
  }, [data?.length, dispatch]);

  useEffect(() => {
    if (table_title !== "Payment History") {
      if (!searchInput?.length) {
        setList(
          userDetails?.role_id === 5 && activeFilter !== 8
            ? Object.values(data)?.filter(
                (lead) => parseInt(lead.lead_details_status) === 1
              )
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
  }, [data, searchInput, activeFilter, userDetails, table_title]);

  const handleLeadFileUploadReq = useCallback(
    async (e) => {
      const fileData = new FormData();

      fileData.append("file", e?.file?.originFileObj);
      fileData.append("client_id", userDetails?.client_id);

      const leadFileUploadResp = await handleUploadLeadFile(fileData);

      if (leadFileUploadResp?.status === 200) {
        successNotification("Lead uploaded successfully");
        setSyncLeads(!syncLeads);
      } else if (leadFileUploadResp?.status === 403) {
        warningNotification("Data already exists");
      } else if (leadFileUploadResp?.status === 400) {
        warningNotification("Please reformat excel sheet columns");
      } else {
        warningNotification("Something went wrong. Please try again");
      }
    },
    [userDetails?.client_id, setSyncLeads, syncLeads]
  );

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
  }, [userDetails?.role_id, data]);

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
  }, [dispatch, selectedCompany?.value, userDetails?.user_id]);

  const [loadingTime, setLoadingTime] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoadingTime(false);
    }, [5000]);
  });

  let locale = {
    emptyText: (
      <>
        {loadingTime ? (
          <div className="min-h-[50vh] mt-24">
            <Loading />
          </div>
        ) : (
          <div className="min-h-[50vh] mt-24">
            <h1 className="m-0 p-0">No data</h1>
          </div>
        )}
      </>
    ),
  };

  const handleSyncLeadsReq = async () => {
    successNotification("Sync in progress...");
    const syncResponse = await handleSyncLeads(
      userDetails?.client_id,
      userDetails?.ac_k
    );
    if (syncResponse) {
      setSyncLeads(!syncLeads);
      window.location.reload();
    }
  };

  return (
    <div className={`!rounded-md py-4`}>
      <div className="flex justify-between items-center">
        <h1
          className={`text-2xl ${
            colorMode ? "text-slate-300" : "text-gray-800"
          } px-0 m-0 font-poppins`}
        >
          {table_title}
        </h1>
        <div className="flex items-center">
          {(userDetails?.role_id === 1 || userDetails?.role_id === 3) && (
            <>
              {window.location.pathname.includes("campaigns") ||
              window.location.pathname.includes("payments") ? (
                ""
              ) : (
                <div
                  className={`mr-4 ${
                    colorMode ? "selectSalesDark" : "selectSalesLight"
                  }`}
                >
                  <Select
                    defaultValue={""}
                    className="min-w-36"
                    onChange={(v) => {
                      localStorage.setItem("sales_id", v);
                    }}
                    options={salesOptions}
                    placeholder="Select Sales"
                  />
                </div>
              )}
            </>
          )}
          {userDetails?.role_id === 5 && (
            <>
              {window.location.pathname.includes("campaigns") ||
              window.location.pathname.includes("payments") ? (
                ""
              ) : (
                <div
                  className={`mr-4 ${
                    colorMode ? "selectSalesDark" : "selectSalesLight"
                  }`}
                >
                  <Select
                    className=" min-w-[150px] "
                    defaultValue={""}
                    onChange={onSelectCompanyData}
                    options={companyList}
                    placeholder="Select Company"
                  />
                </div>
              )}
            </>
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
                  className={`cursor-pointer px-2 py-1 rounded-lg shadow-md border hover:border-brand-color ${
                    colorMode
                      ? "text-slate-300 border-slate-300"
                      : "text-gray-800 border-gray-800"
                  } `}
                >
                  Upload File
                </div>
              </Upload>

              <Tooltip align={"top"} title="Add lead by uploading file">
                <span
                  className={`px-1.5 font-semibold border border-${
                    colorMode ? "slate-300" : "gray-800"
                  } text-${
                    colorMode ? "slate-300" : "gray-800"
                  } rounded-full text-xs ml-2 cursor-help`}
                >
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
                    className={`cursor-pointer px-2 py-1 rounded-lg shadow-md border hover:border-brand-color ${
                      colorMode
                        ? "text-slate-300 border-slate-300"
                        : "text-gray-800 border-gray-800"
                    } `}
                    onClick={() => setIsAddLeadFormOpen(true)}
                  >
                    Add Lead
                  </button>
                  <Tooltip align={"top"} title="Add lead manually">
                    <span
                      className={`px-1.5 font-semibold border border-${
                        colorMode ? "slate-300" : "gray-800"
                      } text-${
                        colorMode ? "slate-300" : "gray-800"
                      } rounded-full text-xs ml-2 cursor-help`}
                    >
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
                      className={`cursor-pointer px-2 py-1 rounded-lg shadow-md border hover:border-brand-color ${
                        colorMode
                          ? "text-slate-300 border-slate-300"
                          : "text-gray-800 border-gray-800"
                      } `}
                      onClick={() => handleSyncLeadsReq()}
                    >
                      Sync Leads
                    </button>
                    <Tooltip
                      align={"top"}
                      title="Please do not press it for multiple times. Sync Leads 3/4 time in a day."
                    >
                      <span
                        className={`px-1.5 font-semibold border border-${
                          colorMode ? "slate-300" : "gray-800"
                        } text-${
                          colorMode ? "slate-300" : "gray-800"
                        } rounded-full text-xs ml-2 cursor-help`}
                      >
                        ?
                      </span>
                    </Tooltip>
                  </div>
                )}
            </div>
          ) : null}
        </div>
        <div className="">
          <CSVLink
            data={list?.length ? list : "Empty"}
            target="_blank"
            filename={
              typeof activeFilter === "number"
                ? `${
                    filterOptions?.find((option) => option.id === activeFilter)
                      ?.title
                  }.csv`
                : table_title
            }
          >
            <div className="bg-gradient-to-b from-[#8B7CFD] via-[#8B7CFD] to-[#159AFB] px-2 py-1 rounded-md cursor-pointer font-semibold font-poppins">
              <h1 className="m-0 p-0 text-white text-xs">Export CSV</h1>
            </div>
          </CSVLink>
        </div>
      </div>

      <div className="w-full pt-3">
        <Table
          locale={locale}
          columns={tableHeaders}
          className={`${colorMode ? "updatedTableDark" : "updatedTableLight"}`}
          dataSource={Array.isArray(list) ? list : ""}
          pagination={{
            defaultPageSize:
              table_title === "Lead List"
                ? 10
                : table_title === "Payment History"
                ? 20
                : 10,
            onChange: (pageNum) => {
              setCurrentPage(pageNum);
            },
            total: list.length,
            current: currentPage,
          }}
          scroll={{
            x: 2000,
            y: table_title === "Lead List" ? `calc(55vh - 4em)` : `calc(71vh)`,
          }}
          rowClassName={(record) => {
            if (
              (record.work_location === "wa" ||
                record.work_location === "WA") &&
              record.campaign_id >= 0 &&
              record.form_data &&
              JSON.parse(record.form_data)[2].values[0] !== "vietnam" &&
              JSON.parse(record.form_data)[2].values[0] !== "philippines"
            ) {
              let color = `${colorMode ? "bg-[#26D4AB7f]" : "bg-[#26D4AB7f]"}`;
              return color;
            } else if (
              record.form_data &&
              (JSON.parse(record.form_data)[2].values[0] === "vietnam" ||
                JSON.parse(record.form_data)[2].values[0] === "Vietnam") &&
              record.campaign_id >= 0
            ) {
              let color = `${colorMode ? "bg-[#F3E45B7f]" : "bg-[#F3E45B7f]"}`;
              return color;
            } else if (
              record.form_data &&
              (JSON.parse(record.form_data)[2].values[0] === "philippines" ||
                JSON.parse(record.form_data)[2].values[0] === "Philippines") &&
              record.campaign_id >= 0
            ) {
              let color = `${colorMode ? "bg-[#FF8A8A7f]" : "bg-[#FF8A8A7f]"}`;
              return color;
            } else {
              let color = `bg-transparent`;
              return color;
            }
          }}
        />
      </div>
    </div>
  );
};

export default UpdatedTable;
