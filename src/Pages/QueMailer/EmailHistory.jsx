import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useSelector } from "react-redux";
import "./quemailer.css";
import { getEmailHistory } from "../../Components/services/que-mail";
const columns = [
  {
    title: "ID",
    dataIndex: "id",
  },
  {
    title: "Sent From",
    dataIndex: "sender",
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
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState(10);
  const [clicked, setClicked] = useState(false);

  const colorMode = useSelector((state) => state?.user)?.colorMode;

  useEffect(() => {
    async function fetchEmailHistory() {
      const data = {
        per_page: pagination,
      };
      const res = await getEmailHistory(data, currentPage);
      setEmailSessionRow(res?.data);
      console.log(emailSessionRow.data);
    }
    if (emailSessionRow === null || clicked) {
      fetchEmailHistory();
      setClicked(false);
    }
  }, [clicked, currentPage, emailSessionRow, pagination]);

  return (
    <Table
      className={`${colorMode ? "emailTableDark" : "emailTableLight"}`}
      columns={columns}
      dataSource={emailSessionRow?.data}
      pagination={{
        onChange: (pageNum) => {
          setCurrentPage(pageNum);
          setClicked(true);
        },
        current: currentPage,
        total: emailSessionRow?.total,
        
      }}
    />
  );
};
export default EmailHistory;
