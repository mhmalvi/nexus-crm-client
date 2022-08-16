import { Dropdown, Menu, Space } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { DownOutlined } from "@ant-design/icons";

const Table = ({ title, tableHeaders, data }) => {
  const navigate = useNavigate();

  const handleNavigate = (id) => {
    navigate(`/lead/${id}`);
  };

  const statusColor = [
    {
      id: 0,
      title: "New Lead",
      color: "bg-green-500",
    },
    {
      id: 1,
      title: "Skilled",
      color: "bg-orange-500",
    },
    {
      id: 2,
      title: "Called",
      color: "bg-blue-500",
    },
    {
      id: 3,
      title: "Verified",
      color: "bg-teal-500",
    },
    {
      id: 4,
      title: "Paid",
      color: "bg-violet-500",
    },
    {
      id: 5,
      title: "Completed",
      color: "bg-red-500",
    },
  ];

  const menu = (
    <Menu
      items={[
        {
          label: <a href="https://www.antgroup.com">First</a>,
          key: "0",
        },
        {
          label: <a href="https://www.aliyun.com">Middle</a>,
          key: "1",
        },
      ]}
    />
  );

  return (
    <div className="mt-0.5">
      <div className="border rounded-xl px-10 py-7.5 mt-5">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-xl leading-7 font-poppins font-semibold">
              {title}
            </h1>
          </div>
          <div className="mr-12">
            <Dropdown
              className="cursor-pointer px-3 py-1 rounded-lg shadow-md"
              overlay={menu}
              trigger={["click"]}
            >
              <Space>
                Last
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
        <div className="tbl-content">
          <table
            className="custom-table"
            cellPadding="0"
            cellSpacing="0"
            border="0"
          >
            <tbody>
              {data.map((list) => (
                <tr
                  key={list.lead_id}
                  onClick={() => handleNavigate(list.lead_id)}
                >
                  <td>{list.lead_id}</td>
                  <td>{list.date}</td>
                  <td>{list.coustomer_name}</td>
                  <td>{list.course_code}</td>
                  <td>{list.location}</td>
                  <td>{list.amount}</td>
                  {statusColor.find(
                    (status) => status.title === list.order_status
                  ) ? (
                    <td>
                      {statusColor
                        .filter((status) => status.title === list.order_status)
                        .map((lead_status, index) => (
                          <div
                            key={index}
                            className="w-24 flex items-center py-1.5 px-2 rounded-lg shadow-md"
                          >
                            <div
                              className={`w-2 h-2 ${lead_status.color} rounded-full`}
                            ></div>
                            <div className="ml-1">{lead_status.title}</div>
                          </div>
                        ))}
                    </td>
                  ) : (
                    <td>{list.payment_via}</td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Table;
