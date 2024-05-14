import React, { useEffect, useState } from "react";
import { handleShowStatusLogs } from "../../../Components/services/utils";
import { Button } from "antd";
import { useSelector } from "react-redux";

const StatusShow = ({ leadDetails }) => {
  const [statusLogs, setStatusLogs] = useState([]);
  const colorMode = useSelector((state) => state?.user)?.colorMode;

  const getStatusLogs = async () => {
    const data = {
      lid: leadDetails?.leadDetails?.lead_id,
    };
    const res = await handleShowStatusLogs(data);
    if (res?.status === 200) {
      setStatusLogs(res?.data);
    }
  };
  useEffect(() => {
    (async () => {
      const data = {
        lid: leadDetails?.leadDetails?.lead_id,
      };
      const res = await handleShowStatusLogs(data);
      if (res?.status === 200) {
        setStatusLogs(res?.data);
      }
    })();
  }, [leadDetails?.leadDetails?.lead_id]);
  return (
    <div className="h-full flex flex-col w-full shadow-md backdrop-blur-2xl bg-[#ffffff11] rounded-md">
      <div className="w-full flex justify-between items-center backdrop-blur-2xl bg-[#ffffff11] !px-5 !py-4 rounded-t-md overflow-hidden">
        <h1
          className={`text-lg m-0 p-0 ${
            colorMode ? "text-slate-300" : "text-gray-800"
          }`}
        >
          Status Logs
        </h1>
        <Button
          size="small"
          className="!rounded-md"
          onClick={() => {
            getStatusLogs();
          }}
        >
          Sync
        </Button>
      </div>

      <div
        className={`flex flex-col  ${
          colorMode ? "text-slate-300" : "text-gray-800"
        } w-full p-5 gap-4 max-h-[20vh] overflow-y-scroll overflow-x-hidden`}
      >
        {statusLogs?.length
          ? statusLogs?.map((log) => (
              <div className="flex flex-col w-full border-b shadow justify-between items-start gap-2 pb-2">
                <div className="text-sm flex items-center gap-4">
                  <h1
                    className={`m-0 p-0 ${
                      colorMode ? "text-slate-300" : "text-gray-800"
                    }`}
                  >
                    Status:{" "}
                  </h1>
                  <p
                    className={`m-0 p-0 ${
                      log?.lead_status === 1
                        ? "text-green-400"
                        : log?.lead_status === 2
                        ? "text-orange-400"
                        : log?.lead_status === 3
                        ? "text-blue-400"
                        : log?.lead_status === 4
                        ? "text-teal-400"
                        : log?.lead_status === 5
                        ? "text-purple-400"
                        : log?.lead_status === 6
                        ? "text-violet-400"
                        : "text-black"
                    }`}
                  >
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
                  <div className="text-xs flex items-center gap-4">
                    <h1
                      className={`m-0 p-0 ${
                        colorMode ? "text-slate-300" : "text-gray-800"
                      }`}
                    >
                      Selected by:{" "}
                    </h1>
                    <p
                      className={`m-0 p-0 ${
                        colorMode ? "text-slate-300" : "text-gray-800"
                      }`}
                    >
                      {log?.selected_by}
                    </p>
                  </div>
                )}
                <div className="text-xs flex items-center gap-4">
                  <h1
                    className={`m-0 p-0 ${
                      colorMode ? "text-slate-300" : "text-gray-800"
                    }`}
                  >
                    Created at:{" "}
                  </h1>
                  <p
                    className={`m-0 p-0 ${
                      colorMode ? "text-slate-300" : "text-gray-800"
                    }`}
                  >
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
