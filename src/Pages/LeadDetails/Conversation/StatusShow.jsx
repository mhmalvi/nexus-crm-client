import React, { useEffect, useState } from "react";
import { handleShowStatusLogs } from "../../../Components/services/utils";
import { Button } from "antd";

const StatusShow = ({ leadDetails }) => {
  console.log("leadlist: ", leadDetails?.leadDetails?.lead_id);
  const [statusLogs, setStatusLogs] = useState([]);
  const [statusLogLoading, setStatusLogloading] = useState(false);
  const getStatusLogs = async () => {
    const data = {
      lid: leadDetails?.leadDetails?.lead_id,
    };
    setStatusLogloading(true);
    const res = await handleShowStatusLogs(data);
    if (res?.status === 200) {
      setStatusLogs(res?.data);
      setStatusLogloading(false);
    } else {
      setStatusLogloading(false);
    }
  };
  useEffect(() => {
    (async () => {
      const data = {
        lid: leadDetails?.leadDetails?.lead_id,
      };
      setStatusLogloading(true);
      const res = await handleShowStatusLogs(data);
      if (res?.status === 200) {
        setStatusLogs(res?.data);
        setStatusLogloading(false);
      } else {
        setStatusLogloading(false);
      }
    })();
  }, [leadDetails?.leadDetails?.lead_id]);
  return (
    <div className="h-full flex flex-col w-full shadow-md backdrop-blur-2xl bg-[#ffffff11] rounded-xl">
      <div className="w-full flex justify-between items-center backdrop-blur-2xl bg-[#ffffff11] text-white p-5 rounded-t-xl overflow-hidden">
        <h1 className="text-lg m-0 p-0 text-white ">Status Logs</h1>
        <Button
          size="small"
          className="!rounded-xl"
          onClick={() => {
            getStatusLogs();
          }}
        >
          Sync
        </Button>
      </div>

      <div className="flex flex-col w-full p-5 gap-4 overflow-scroll">
        {statusLogs?.length
          ? statusLogs?.map((log) => (
              <div className="flex flex-col w-full border-b shadow justify-between items-start pb-2 ">
                <div className="text-xs flex items-center gap-2">
                  <h1 className="m-0 p-0 text-white">Status: </h1>
                  <p className="m-0 p-0 text-white">
                    {(log?.lead_status === 1 && "New Lead") ||
                      (log?.lead_status === 2 && "Skilled") ||
                      (log?.lead_status === 3 && "Called") ||
                      (log?.lead_status === 4 && "Paid") ||
                      (log?.lead_status === 5 && "Verified") ||
                      (log?.lead_status === 6 && "Completed") ||
                      (log?.lead_status === 7 && "Canceled")}
                  </p>
                </div>
                {log?.selected_by && (
                  <div className="text-xs flex items-center gap-2">
                    <h1 className="m-0 p-0 text-white">Selected by: </h1>
                    <p className="m-0 p-0 text-white ">{log?.selected_by}</p>
                  </div>
                )}
                <div className="text-xs flex items-center gap-2">
                  <h1 className="m-0 p-0 text-white">Created at: </h1>
                  <p className="m-0 p-0 text-white">
                    {new Date(log.created_at).toLocaleString()}
                  </p>
                </div>
              </div>
            ))
          : "No Status Log"}
      </div>
    </div>
  );
};

export default StatusShow;
