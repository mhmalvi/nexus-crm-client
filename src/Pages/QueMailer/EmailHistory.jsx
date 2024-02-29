import React, { useEffect, useState } from "react";
import { Table, Modal } from "antd";
import { useSelector } from "react-redux";
import "./quemailer.css";
import Loading from "../../Components/Shared/Loader";
import Icons from "../../Components/Shared/Icons";
import "./quemailer.css";

const EmailHistory = ({
  emailSessionRow,
  setCurrentPage,
  currentPage,
  setClicked,
  setOpenCountModal,
  openCountModal,
  countInfo,
  setEmailId,
  setHistoryInnerPagination,
  totalEmail,
  setEmailsPerPage,
  emailsPerPage,
}) => {
  const colorMode = useSelector((state) => state?.user)?.colorMode;

  const mainTableColumns = [
    {
      title: "S/N",
      render: (_, record, idx) => {
        return (
          <>
            <h1
              className={`m-0 p-0 ${
                colorMode ? "text-slate-300" : "text-gray-800"
              }`}
            >
              {idx + 1}
            </h1>
          </>
        );
      },
    },
    {
      title: "Campaign ID",
      dataIndex: "id",
    },
    {
      title: "Sent From",
      dataIndex: "sender",
    },
    {
      title: "Email Count",
      dataIndex: "counts",
      render: (_, record, idx) => (
        <h1
          className={`m-0 p-0 text-blue-500 underline underline-offset-2 cursor-pointer hover:text-blue-700`}
          onClick={() => {
            setEmailId(record?.id);
            setOpenCountModal(true);
          }}
        >
          {record?.counts}
        </h1>
      ),
    },
    {
      title: "Sending Time",
      dataIndex: "created_at",
      render: (created_at) => {
        const date = new Date(created_at);
        const formattedDate = date.toLocaleDateString();
        const formattedTime = date.toLocaleTimeString();
        return `${formattedDate} ${formattedTime}`;
      },
    },
  ];
  const innerTableColumns = [
    {
      title: "Recipient",
      dataIndex: "recipients_mail",
    },
    // {
    //   title: "Clicked",
    //   dataIndex: "click",
    //   render: (_, record, idx) => (
    //     <div className="w-full flex items-center justify-center">
    //       {record?.click === 1 ? <Icons.Tick /> : "No clicks yet"}
    //     </div>
    //   ),
    // },
    {
      title: "Opened",
      dataIndex: "open",
      render: (_, record, idx) => (
        <div className="w-full flex items-center justify-center">
          {record?.open === 1 ? <Icons.Tick /> : "Not opened yet"}
        </div>
      ),
    },
    {
      title: "Sending Time",
      dataIndex: "created_at",
      render: (created_at) => {
        const date = new Date(created_at);
        const formattedDate = date.toLocaleDateString();
        const formattedTime = date.toLocaleTimeString();
        return `${formattedDate} ${formattedTime}`;
      },
    },
    {
      title: "Subscriber",
      dataIndex: "subscribed_or_unsubscribed",
      render: (_, record, idx) => (
        <div className="w-full flex items-center justify-center">
          {record?.subscribed_or_unsubscribed === 1 ? (
            <Icons.Tick />
          ) : (
            "Unsubscribed"
          )}
        </div>
      ),
    },
  ];
  const handleCancel = () => {
    setOpenCountModal(false);
  };
  let locale = {
    emptyText: (
      <div className="min-h-[10vh] mt-24">
        <Loading />
      </div>
    ),
  };
  return (
    <>
      <Table
        locale={locale}
        className={`${colorMode ? "emailTableDark" : "emailTableLight"}`}
        columns={mainTableColumns}
        dataSource={emailSessionRow?.data}
        scroll={{
          y: "calc(65vh - 5em)",
        }}
        pagination={{
          onChange: (pageNum, pageSize) => {
            setCurrentPage(pageNum);
            setEmailsPerPage(pageSize);
            setClicked(true);
          },

          defaultPageSize: 20,
          current: currentPage,
          total: totalEmail,
        }}
      />
      <Modal
        visible={openCountModal}
        onCancel={handleCancel}
        footer={false}
        className={`${colorMode ? "emailCountModal" : ""}`}
        width="60%"
      >
        <div className="mt-8">
          <Table
            locale={locale}
            className={`${colorMode ? "emailTableDark" : "emailTableLight"}`}
            scroll={{
              x: "1000",
              y: "calc(75vh - 5em)",
            }}
            pagination={{
              onChange: (pageNum, pageSize) => {
                setHistoryInnerPagination(pageNum);
                setEmailsPerPage(pageSize);
                setClicked(true);
              },
              current: currentPage,
              total: countInfo?.total,
            }}
            columns={innerTableColumns}
            dataSource={countInfo?.data}
          />
        </div>
      </Modal>
    </>
  );
};
export default EmailHistory;
