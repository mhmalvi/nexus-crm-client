import React, { useEffect, useState } from "react";
import { Table, Modal } from "antd";
import { useSelector } from "react-redux";
import {
  getScheduledJobs,
  getScheduledJobsDetails,
} from "../../Components/services/que-mail";
import "./quemailer.css";
import Loading from "../../Components/Shared/Loader";
import "./quemailer.css";

const Scheduling = () => {
  const userDetails = useSelector((state) => state.user);
  const colorMode = useSelector((state) => state?.user)?.colorMode;

  const [loadingTime, setLoadingTime] = useState(true);
  const [perPage, setPerPage] = useState(20);
  const [scheduledItems, setScheduledItems] = useState(null);
  const [scheduledItemsInner, setScheduledItemsInner] = useState(null);
  const [openMailCount, setOpenMailCount] = useState({
    open: false,
    job_id: null,
  });
  const [current, setCurrent] = useState(1);
  const [total, setTotal] = useState(1);
  const [currentInner, setCurrentInner] = useState(1);
  const [totalInner, setTotalInner] = useState(1);

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
          job_id: openMailCount.job_id,
        };
        const res = await getScheduledJobsDetails(data, currentInner);
        setScheduledItemsInner(res.data);
        setTotalInner(res.data.total);
      } catch (error) {
        console.error("Error fetching email history:", error);
      }
    })();
  }, [current, currentInner, openMailCount.job_id, perPage, userDetails?.userInfo.id]);
  

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
            setOpenMailCount({
              open: true,
              job_id: record.id,
            });
          }}
        >
          {record?.number_of_mails}
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
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Bounce",
      dataIndex: "bounce_status",
    },
    {
      title: "Delivery Status",
      dataIndex: "delivery_status",
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
    // {
    //   title: "Opened",
    //   dataIndex: "open",
    //   render: (_, record, idx) => (
    //     <div className="w-full flex items-center justify-center">
    //       {record?.open === 1 ? <Icons.Tick /> : "Not opened yet"}
    //     </div>
    //   ),
    // },
    // {
    //   title: "Sending Time",
    //   dataIndex: "created_at",
    //   render: (created_at) => {
    //     const date = new Date(created_at);
    //     const formattedDate = date.toLocaleDateString();
    //     const formattedTime = date.toLocaleTimeString();
    //     return `${formattedDate} ${formattedTime}`;
    //   },
    // },
    // {
    //   title: "Subscriber",
    //   dataIndex: "subscribed_or_unsubscribed",
    //   render: (_, record, idx) => (
    //     <div className="w-full flex items-center justify-center">
    //       {record?.subscribed_or_unsubscribed === 1 ? (
    //         <Icons.Tick />
    //       ) : (
    //         "Unsubscribed"
    //       )}
    //     </div>
    //   ),
    // },
  ];

  const handleCancel = () => {
    setOpenMailCount(false);
  };

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
            <h1
              className={`m-0 p-0 ${
                colorMode ? "text-slate-300" : "text-gray-800"
              }`}
            >
              No data
            </h1>
          </div>
        )}
      </>
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
          },

          defaultPageSize: 20,
          current: current,
          total: total,
        }}
      />
      <Modal
        visible={openMailCount.open}
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
            dataSource={scheduledItemsInner?.data}
            columns={innerTableColumns}
            pagination={{
              onChange: (pageNum, pageSize) => {
                setCurrentInner(pageNum);
                setPerPage(pageSize);
              },
              current: currentInner,
              total: totalInner,
            }}
          />
        </div>
      </Modal>
    </>
  );
};
export default Scheduling;
