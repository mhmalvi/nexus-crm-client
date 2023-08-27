import React, { useCallback, useEffect, useState } from "react";
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
    <div>
      <div>
        <div className="">
          <div className="font-poppins text-base font-semibold mb-2 sticky top-0 bg-gray-300 flex justify-between items-center p-2">
            <h1 className="m-0 p-0 font-bold">Status Logs</h1>
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

          <div className="flex items-end mb-4">
            <div className="w-full">
              {statusLogs?.length
                ? statusLogs?.map((log) => (
                    <div className="flex w-full border rounded-lg p-2 my-2 shadow justify-between items-center">
                      <div>
                        <div className="text-base flex items-center gap-2">
                          <h1 className="m-0 p-0 font-bold">Status: </h1>
                          <p className="m-0 p-0">
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
                          <div className="text-base flex items-center gap-2">
                            <h1 className="m-0 p-0 font-bold">Selected by: </h1>
                            <p className="m-0 p-0">{log?.selected_by}</p>
                          </div>
                        )}

                        <div className="text-base flex items-center gap-2">
                          <h1 className="m-0 p-0 font-bold">Created at: </h1>
                          <p className="m-0 p-0 text-sm">
                            {new Date(log.created_at).toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <div
                        className="mr-2"
                        // onClick={() => handleDeleteCommentReq(history?.id)}
                      >
                        {/* <Icons.Cross className="w-3 text-red-600 hover:text-red-500 cursor-pointer" /> */}
                      </div>
                    </div>
                  ))
                : "No Status Log"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusShow;
