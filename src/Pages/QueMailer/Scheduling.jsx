import React, { useEffect, useState } from "react";
import { Table, Modal } from "antd";
import { useSelector } from "react-redux";
import { getScheduledJobs, getScheduledJobsDetails } from "../../Components/services/que-mail";
import "./quemailer.css";
import Loading from "../../Components/Shared/Loader";
import Icons from "../../Components/Shared/Icons";
import "./quemailer.css";

const Scheduling = () => {
  const userDetails = useSelector((state) => state.user);
  const colorMode = useSelector((state) => state?.user)?.colorMode;

  const [perPage, setPerPage] = useState(2);
  const [scheduledItems, setScheduledItems] = useState(null);
  const [current, setCurrent] = useState(1);
  const [total, setTotal] = useState(1);

  useEffect(() => {
    // ScheduledJobs
    (async () => {
      try {
        const data = {
          per_page: perPage,
          user_id: userDetails?.userInfo.id,
        };
        const res = await getScheduledJobs(data, current);
        setScheduledItems(res.data);
        setTotal(res.data.total);
      } catch (error) {
        console.error("Error fetching email history:", error);
      }
    })();

    // Scheduled Details
    (async () => {
      try {
        const data = {
          per_page: perPage,
          user_id: userDetails?.userInfo.id,
          job_id: scheduledItems?.data
        };
        console.log(data)
        const res = await getScheduledJobsDetails(data, current);
        console.log(res)
        setScheduledItems(res.data);
        setTotal(res.data.total);
      } catch (error) {
        console.error("Error fetching email history:", error);
      }
    })();
  }, [current, perPage, scheduledItems?.id, userDetails?.userInfo.id]);

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
      title: "Job ID",
      dataIndex: "id",
    },
    {
      title: "CSV Name",
      dataIndex: "file_name",
    },
    {
      title: "Number of Mails",
      dataIndex: "number_of_mails",
      render: (_, record, idx) => (
        <h1
          className={`m-0 p-0 text-blue-500 underline underline-offset-2 cursor-pointer hover:text-blue-700`}
          onClick={() => {
            // setEmailId(record?.id);
            // setOpenCountModal(true);
          }}
        >
          {record?.counts}
        </h1>
      ),
    },
    {
      title: "Scheduled For",
      dataIndex: "schedule",
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
    // setOpenCountModal(false);
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
        dataSource={scheduledItems?.data}
        scroll={{
          y: "calc(65vh - 5em)",
        }}
        pagination={{
          onChange: (pageNum, pageSize) => {
            setCurrent(pageNum);
            setPerPage(pageSize);
            // setClicked(true);
          },

          defaultPageSize: 20,
          current: current,
          total: total,
        }}
      />
      <Modal
        // visible={openCountModal}
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
                // setHistoryInnerPagination(pageNum);
                setPerPage(pageSize);
                // setClicked(true);
              },
              // current: currentPage,
              // total: countInfo?.total,
            }}
            columns={innerTableColumns}
            // dataSource={countInfo?.data}
          />
        </div>
      </Modal>
    </>
  );
};
export default Scheduling;
