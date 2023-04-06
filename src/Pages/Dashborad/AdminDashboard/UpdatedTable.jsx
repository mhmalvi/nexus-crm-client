import { Table, Tooltip, Upload, message } from "antd";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { CSVLink } from "react-csv";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loading from "../../../Components/Shared/Loader";
import { setLoader } from "../../../features/user/userSlice";
import { handleUploadLeadFile } from "../../../Components/services/leads";

const UpdatedTable = ({
  table_title,
  tableHeaders,
  data,
  companyEmployeeList,
  filterOptions,
  ratings,
  activeFilter,
  setIsAddLeadFormOpen,
  searchInput,
  handleSyncLeadsReq,
}) => {
  const navigate = useNavigate();

  const userDetails = useSelector((state) => state?.user?.userInfo);
  const loadingDetails = useSelector((state) => state?.user)?.loading;
  const dispatch = useDispatch();

  const [list, setList] = useState([]);
  const [leadFile, setLeadFile] = useState([]);

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
    console.log(data);
  }, [data, searchInput, activeFilter, userDetails?.role_id]);

  const handleLeadFileUploadReq = async (e) => {
    const fileData = new FormData();

    fileData.append("file", e?.file?.originFileObj);
    fileData.append("client_id", userDetails?.client_id);

    const leadFileUploadResp = await handleUploadLeadFile(fileData);

    if (leadFileUploadResp?.status === 200) {
      message.success("Lead uploaded successfully");
    } else if (leadFileUploadResp?.status === 403) {
      message.warn("Data already exists");
    } else {
      message.warn("Someting went wrong. Please try again");
    }
  };

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
                  className="text-black bg-white px-2 py-1 rounded-full cursor-pointer font-semibold font-poppins border border-black"
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
            <div className="mr-4">
              <Upload
                onChange={(e) => handleLeadFileUploadReq(e)}
                fileList={leadFile}
                accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
              >
                <div
                  htmlFor="upload_lead_file"
                  className={`cursor-pointer px-3 py-1 rounded-lg shadow-md`}
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

            <div className="mr-4">
              <button
                id="add_leads"
                className={`cursor-pointer px-3 py-1 rounded-lg shadow-md`}
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

            <div>
              {(userDetails?.role_id === 1 ||
                userDetails?.role_id === 2 ||
                userDetails?.role_id === 3 ||
                userDetails?.role_id === 4) &&
                table_title === "Lead List" && (
                  <div className="mr-12">
                    <button
                      id="sync_leads"
                      className={`cursor-pointer px-3 py-1 rounded-lg shadow-md`}
                      onClick={handleSyncLeadsReq}
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
          </div>
        </div>
      </div>

      <div className="pt-6">
        {loadingDetails ? (
          <div className="w-full h-100 z-50 flex justify-center items-center bg-white bg-opacity-70">
            <Loading />
          </div>
        ) : (
          <Table
            columns={tableHeaders}
            dataSource={list}
            pagination={false}
            // loading
            showSorterTooltip={true}
            sortDirections={["ascend", "descend"]}
            scroll={{
              x: 1700,
              y: 600,
            }}
            onRow={(record, rowIndex) => {
              return {
                onClick: () => {
                  navigate(`/lead/${record?.lead_id}`);
                },
              };
            }}
          />
        )}
      </div>
    </div>
  );
};

export default UpdatedTable;
