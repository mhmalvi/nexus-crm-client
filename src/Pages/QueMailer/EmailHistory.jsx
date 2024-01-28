import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useSelector } from "react-redux";
import "./quemailer.css";
import { getEmailHistory } from "../../Components/services/que-mail";
const columns = [
  {
    title: "ID",
    dataIndex: "id",
    sortDirections: ["descend"],
  },
  {
    title: "Sent From",
    dataIndex: "sender",
    defaultSortOrder: "descend",
    // sorter: (a, b) => a.sender.length - b.sender.length,
  },
  {
    title: "Email Count",
    dataIndex: "counts",
    // sorter: (a, b) => a.counts - b.counts,
  },
  {
    title: "Time",
    dataIndex: "created_at",
    render: (created_at) => {
      const date = new Date(created_at);
      const formattedDate = date.toLocaleDateString();
      const formattedTime = date.toLocaleTimeString();
      return `${formattedDate} ${formattedTime}`;
    },
  },
];

const EmailHistory = () => {
  const [emailSessionRow, setEmailSessionRow] = useState(null);
  const colorMode = useSelector((state) => state?.user)?.colorMode;

  useEffect(() => {
    async function fetchEmailHistory() {
      const res = await getEmailHistory();
      setEmailSessionRow(res?.data);
    }
    if (emailSessionRow === null) {
      fetchEmailHistory();
    }
  }, [emailSessionRow]);

  return (
    <Table
      className={`${colorMode ? "emailTableDark" : "emailTableLight"}`}
      columns={columns}
      dataSource={emailSessionRow}
    />
  );
};
export default EmailHistory;
