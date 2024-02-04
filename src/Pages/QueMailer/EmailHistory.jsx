import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useSelector } from "react-redux";
import "./quemailer.css";
import Loading from "../../Components/Shared/Loader";
import { getEmailHistory } from "../../Components/services/que-mail";
const columns = [
  {
    title: "ID",
    render: (_, record, idx) => {
      return (
        <>
          <h1 className="m-0 p-0">{idx + 1}</h1>
        </>
      );
    },
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

  const userDetails = useSelector((state) => state.user.userInfo);
  const colorMode = useSelector((state) => state?.user)?.colorMode;
  console.log(userDetails.userInfo?.id);
  useEffect(() => {
    async function fetchEmailHistory() {
      const data = {
        user_id: userDetails.id,
        per_page: pagination,
      };
      const res = await getEmailHistory(data, currentPage);
      setEmailSessionRow(res?.data);
    }
    if (emailSessionRow === null || clicked) {
      fetchEmailHistory();
      setClicked(false);
    }
  }, [clicked, currentPage, emailSessionRow, pagination, userDetails]);
  let locale = {
    emptyText: (
      <div className="min-h-[10vh] mt-24">
        <Loading />
      </div>
    ),
  };
  return (
    <Table
      locale={locale}
      className={`${colorMode ? "emailTableDark" : "emailTableLight"}`}
      columns={columns}
      dataSource={emailSessionRow?.data}
      scroll={{
        y: "calc(75vh - 5em)",
      }}
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
