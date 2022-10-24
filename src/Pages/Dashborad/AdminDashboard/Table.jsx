import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Menu, Space } from "antd";
import React, { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLoader } from "../../../features/user/userSlice";
import Loading from "../../../Components/Shared/Loader";

const Table = ({
  title,
  tableHeaders,
  data,
  activeFilter,
  searchInput,
  filterOptions,
}) => {
  const leads = useSelector((state) => state?.leads)?.leads;
  const loadingDetails = useSelector((state) => state?.user)?.loading;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [list, setList] = useState([]);

  useEffect(() => {
    dispatch(setLoader(true));
    if (data.length === 0) {
      setTimeout(() => {
        dispatch(setLoader(false));
      }, 4000);
    } else {
      dispatch(setLoader(false));
    }
  }, [data, data.length, dispatch]);

  useEffect(() => {
    if (!searchInput?.length) {
      setList(data);
    } else {
      setList(
        data.filter((lead) =>
          (lead?.lead_id).toString().includes(searchInput.toString())
        )
      );
    }
    console.log(data);
  }, [data, leads, searchInput, activeFilter]);

  // console.log("list...........", list);

  const handleNavigate = (id) => {
    navigate(`/lead/${id}`);
  };

  return (
    <div className="mt-0.5">
      <div className="border rounded-xl px-10 py-7.5 mt-5">
        <div className="flex justify-between items-center">
          <div className="flex items-start">
            <div>
              <h1 className="text-xl leading-7 font-poppins font-semibold">
                {title}
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
                    : "Payment-lists.csv"
                }
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
            <Dropdown
              className="cursor-pointer px-3 py-1 rounded-lg shadow-md"
              overlay={menu}
              trigger={["click"]}
            >
              <Space>
                Latest
                <DownOutlined />
              </Space>
            </Dropdown>
          </div>
        </div>

        <div className="tbl-header">
          <table cellPadding="0" cellSpacing="0" border="0">
            <thead>
              <tr>
                {tableHeaders.map((hedaer, i) => (
                  <th key={i}>{hedaer}</th>
                ))}
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
            {data?.length ? (
              <table
                className="custom-table"
                cellPadding="0"
                cellSpacing="0"
                border="0"
              >
                <tbody>
                  {list.map(
                    (list) => (
                      // list?.sales_user_id !== 0 && (
                      <tr
                        key={list.lead_id}
                        onClick={() => handleNavigate(list.lead_id)}
                      >
                        <td>{list.lead_id}</td>
                        <td>{list.lead_apply_date}</td>
                        <td>{list.full_name}</td>
                        <td>{list.course_code}</td>
                        <td className="uppercase">{list.work_location}</td>
                        <td>{list.campaign_id}</td>

                        {statusColor.find(
                          (status) => status.id === list?.lead_details_status
                        ) ? (
                          <td>
                            {statusColor
                              .filter(
                                (status) =>
                                  status.id === list?.lead_details_status
                              )
                              .map((lead_status, index) => (
                                <div
                                  key={index}
                                  className="w-24 flex items-center py-1.5 px-2 rounded-lg shadow-md"
                                >
                                  <div
                                    className={`w-2 h-2 ${lead_status.color} rounded-full`}
                                  ></div>
                                  <div className="ml-1">
                                    {lead_status.title}
                                  </div>
                                </div>
                              ))}
                          </td>
                        ) : (
                          <td>{list?.payment_via}</td>
                        )}
                      </tr>
                    )
                    // )
                  )}
                </tbody>
              </table>
            ) : (
              <div className="py-20 flex justify-center items-center">
                <h1 className="text-xl font-light">No Leads</h1>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Table;

const statusColor = [
  {
    id: 0,
    title: "Suspended",
    color: "bg-black",
  },
  {
    id: 1,
    title: "New Lead",
    color: "bg-green-500",
  },
  {
    id: 2,
    title: "Skilled",
    color: "bg-orange-500",
  },
  {
    id: 3,
    title: "Called",
    color: "bg-blue-500",
  },
  {
    id: 4,
    title: "Paid",
    color: "bg-teal-500",
  },
  {
    id: 5,
    title: "Verified",
    color: "bg-violet-500",
  },
  {
    id: 6,
    title: "Completed",
    color: "bg-red-500",
  },
];

const menu = (
  <Menu
    items={[
      {
        label: "7 Days",
        key: "0",
      },
      {
        label: "30 Days",
        key: "1",
      },
    ]}
  />
);
