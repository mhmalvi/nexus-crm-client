import { Select, Table, Tooltip, Upload, message } from "antd";
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
import { handleFetchLocation } from "../../../Components/services/locationFilter";

import { addLeads } from "../../../features/Leads/leadsSlice";
import { useMediaQuery } from "react-responsive";
import "./dashboard.css";
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
}) => {
  const isBigScreen = useMediaQuery({ query: "(min-width: 1824px)" });

  const colorMode = useSelector((state) => state?.user)?.colorMode;
  const userDetails = useSelector((state) => state?.user?.userInfo);
  const loadingDetails = useSelector((state) => state?.user)?.loading;
  const dispatch = useDispatch();

  const [list, setList] = useState([]);
  const [leadFile, setLeadFile] = useState([]);
  const [companyList, setCompanyList] = useState([]);
  const [companyWiseListData, setCompanyWiseListData] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState({});
  const [currentPage, setCurrentPage] = useState();
  const [locationColor, setLocationColor] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await handleFetchLocation(userDetails?.client_id);
      if (response?.data) {
        setLocationColor(response?.data?.filter((item) => item.location));
      }
    })();
  }, [userDetails?.client_id]);

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
        message.success("Lead uploaded successfully");
        setSyncLeads(!syncLeads);
      } else if (leadFileUploadResp?.status === 403) {
        message.warn("Data already exists");
      } else if (leadFileUploadResp?.status === 400) {
        message.warn("Please reformat excel sheet columns");
      } else {
        message.warn("Something went wrong. Please try again");
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

  return (
    <div
      className={`!rounded-xl ${table_title === "Leads" ? "mt-0" : "mt-12"}`}
    >
      <div>
        <div className="flex justify-between items-center">
          <h1
            className={`text-2xl text-${
              colorMode ? "slate-300" : "gray-800"
            } px-3 m-0 font-poppins`}
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
                      className="min-w-[150px] "
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
              <div className="mr-4 selectSales">
                <Select
                  className=" min-w-[150px] "
                  defaultValue={""}
                  onChange={onSelectCompanyData}
                  options={companyList}
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
                    className={`cursor-pointer px-3 py-1 rounded-lg shadow-md border ${
                      colorMode
                        ? "text-slate-300 border-slate-300 hover:bg-black"
                        : "text-gray-800 border-gray-800 hover:bg-black hover:text-slate-300"
                    } ease-in duration-200 `}
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
                      className={`cursor-pointer px-3 py-1 rounded-lg shadow-md border ${
                        colorMode
                          ? "text-slate-300 border-slate-300 hover:bg-black"
                          : "text-gray-800 border-gray-800 hover:bg-black hover:text-slate-300"
                      } ease-in duration-200 `}
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
                        className={`cursor-pointer px-3 py-1 rounded-lg shadow-md border ${
                          colorMode
                            ? "text-slate-300 border-slate-300 hover:bg-black"
                            : "text-gray-800 border-gray-800 hover:bg-black hover:text-slate-300"
                        } ease-in duration-200 `}
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
                      filterOptions?.find(
                        (option) => option.id === activeFilter
                      )?.title
                    }.csv`
                  : table_title
              }
            >
              <div className="bg-gradient-to-b from-[#8B7CFD] via-[#8B7CFD] to-[#159AFB] px-4 py-2 rounded-md cursor-pointer font-semibold font-poppins">
                <h1 className="m-0 p-0 text-white text-xs">Export CSV</h1>
              </div>
            </CSVLink>
          </div>
        </div>
      </div>
      <div className="pt-3">
        {loadingDetails ? (
          <div className="w-full h-100 z-50 flex justify-center items-center bg-transparent">
            <Loading />
          </div>
        ) : (
          <div>
            <Table
              columns={tableHeaders}
              className={`${
                colorMode ? "updatedTableDark" : "updatedTableLight"
              }`}
              dataSource={Array.isArray(list) ? list : [""]}
              pagination={{
                defaultPageSize: table_title === "Lead List" ? 10 : 20,
                onChange: (pageNum) => {
                  setCurrentPage(pageNum);
                },
                total: list.length,
                current: currentPage,
              }}
              showSorterTooltip={true}
              sortDirections={["ascend", "descend"]}
              scroll={{
                x: 2200,
                y: isBigScreen
                  ? table_title === "Lead List"
                    ? 390
                    : 580
                  : table_title === "Lead List"
                  ? 270
                  : 400,
              }}
              rowClassName={
                (record) => {
                  // console.log(JSON.parse(record.form_data))
                  if (
                    (record.work_location === "wa" ||
                      record.work_location === "WA") &&
                    record.campaign_id >= 0 &&
                    record.form_data &&
                    JSON.parse(record.form_data)[2].values[0] !== "vietnam" &&
                    JSON.parse(record.form_data)[2].values[0] !== "philippines"
                  ) {
                    let color = `${
                      colorMode ? "bg-[#26D4AB7f]" : "bg-[#26D4AB]"
                    }`;
                    return color;
                  } else if (
                    record.form_data &&
                    JSON.parse(record.form_data)[2].values[0] === "vietnam" &&
                    record.campaign_id >= 0
                  ) {
                    let color = `${
                      colorMode ? "bg-[#F3E45B7f]" : "bg-[#F3E45B]"
                    }`;
                    return color;
                  } else if (
                    record.form_data &&
                    JSON.parse(record.form_data)[2].values[0] ===
                      "philippines" &&
                    record.campaign_id >= 0
                  ) {
                    let color = `${
                      colorMode ? "bg-[#FF8A8A7f]" : "bg-[#FF8A8A]"
                    }`;
                    return color;
                  } else {
                    let color = `bg-transparent`;
                    return color;
                  }
                }

                //
                // CURRENT ONE
                //

                // if (
                //   (record.work_location === "wa" ||
                //     record.work_location === "WA") &&
                //   record.campaign_id >= 0 &&
                //   record.form_data &&
                //   JSON.parse(record.form_data)[2].values[0] !== "vietnam" &&
                //   JSON.parse(record.form_data)[2].values[0] !== "philippines"
                // ) {
                //   let color = "bg-[#26D4AB7f]";
                //   return color;
                // } else if (
                //   record.form_data &&
                //   JSON.parse(record.form_data)[2].values[0] === "vietnam" &&
                //   record.campaign_id >= 0
                // ) {
                //   let color = "bg-[#F3E45B7f]";
                //   return color;
                // } else if (
                //   record.form_data &&
                //   JSON.parse(record.form_data)[2].values[0] ===
                //     "philippines" &&
                //   record.campaign_id >= 0
                // ) {
                //   let color = "bg-[#FF8A8A7f]";
                //   return color;
                // } else {
                //   let color = "bg-[#9ed8ff7f]";
                //   return color;
                // }

                // CHANGE THIS LATER

                // if (table_title === "Lead List") {
                //   // Philipines-1
                //   if(record.campaign_id === +'120203649998840200'){
                //         let color = "bg-[#d7f7ff]";
                //         return color;
                //   }
                //   // Philipines-2
                //   else if(record.campaign_id === +'120203634722410190'){
                //         let color = "bg-[#d7f7ff]";
                //         return color;
                //   }
                //   // Vietnam
                //   else if(record.campaign_id === +'120203650508850190'){
                //     let color = "bg-[#f2d7ff]";
                //     return color;
                //   }
                //   // WA-1
                //   else if(record.campaign_id === +'120203063277230190'){
                //     let color = "bg-[#fef08a]";
                //     return color;
                //   }
                //   // WA-2
                //   else if(record.campaign_id === +'120203632110450190'){
                //     let color = "bg-[#fef08a]";
                //     return color;
                //   }
                //   // WA-3
                //   else if(record.campaign_id === +'120203635487850190'){
                //     let color = "bg-[#fef08a]";
                //     return color;
                //   }
                //   // WA-4
                //   else if(record.campaign_id === +'120204159219510190'){
                //     let color = "bg-[#fef08a]";
                //     return color;
                //   }
                //   // WA-4
                //   else if(record.campaign_id === +'120203634722410190'){
                //     let color = "bg-[#fef08a]";
                //     return color;
                //   }
                //   // WA-5
                //   else if(record.campaign_id === +'120203635184280200'){
                //     let color = "bg-[#fef08a]";
                //     return color;
                //   }
                //   // WA-6
                //   else if(record.campaign_id === +'120202830768260200'){
                //     let color = "bg-[#fef08a]";
                //     return color;
                //   }
                //   // WA-7
                //   else if(record.campaign_id === +'120203107332280200'){
                //     let color = "bg-[#fef08a]";
                //     return color;
                //   }
                //   // WA-8
                //   else if(record.campaign_id === +'120203044035210190'){
                //     let color = "bg-[#fef08a]";
                //     return color;
                //   }
                //   // WA-9
                //   else if(record.campaign_id === +'120202831124020200'){
                //     let color = "bg-[#fef08a]";
                //     return color;
                //   }
                //   // WA-10
                //   else if(record.campaign_id === +'120203208346430190'){
                //     let color = "bg-[#fef08a]";
                //     return color;
                //   }
                //   // WA-11
                //   else if(record.campaign_id === +'120202967409090190'){
                //     let color = "bg-[#fef08a]";
                //     return color;
                //   }
                //   // WA-12
                //   else if(record.campaign_id === +'23858487569630196'){
                //     let color = "bg-[#fef08a]";
                //     return color;
                //   }
                //   // WA-13
                //   else if(record.campaign_id === +'23860071184420196'){
                //     let color = "bg-[#fef08a]";
                //     return color;
                //   }
                //   // WA-14
                //   else if(record.campaign_id === +'23858278860450756'){
                //     let color = "bg-[#fef08a]";
                //     return color;
                //   }
                //   // others
                //   else {
                //     let color = "bg-[#d9f99d]";
                //     return color;
                //   }
                // }
              }
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default UpdatedTable;
