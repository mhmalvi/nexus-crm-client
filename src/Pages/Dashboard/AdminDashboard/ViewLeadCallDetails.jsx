import React, { useEffect, useState } from "react";
import axios from "axios";

const ViewLeadCallDetails = ({ lead_id, setOpenCallCountDetailsModal }) => {
  const [callHistory, setCallHistory] = useState([""]);
  useEffect(() => {
    axios
      .post(`${process.env?.REACT_APP_LEAD_URL}/api/lead/details`, {
        lead_id: lead_id,
      })
      .then((response) => {
        setCallHistory(response.data.leadCallHistory);
      });
  }, [lead_id]);
  return (
    <div className="flex flex-col gap-4 h-[60vh] overflow-hidden">
      <h3 className="w-full text-center font-bold underline  underline-offset-2 text-slate-300">
        Call Details
      </h3>
      <div
        className={`h-[60vh] ${
          callHistory.length > 0 ? "overflow-y-scroll" : "overflow-hidden"
        }`}
      >
        <table className="">
          <thead className="">
            <tr className="border-b border-brand-color">
              <th className="text-center">No</th>
              <th className="text-center">Start Time</th>
              <th className="text-center">End Time</th>
              <th className="text-center">Remarks</th>
            </tr>
          </thead>
          <tbody className="text-center items-center ">
            {callHistory.length > 0 ? (
              callHistory.map((history, index) => (
                <tr key={index} className="border-b border-brand-color">
                  <td className="text-slate-300 text-center border-r border-brand-color">
                    {index + 1}
                  </td>
                  <td className="text-slate-300 text-center  border-r border-brand-color">
                    {new Date(
                      new Date(history.call_start_time).getTime() +
                        6 * 60 * 60 * 1000
                    )
                      ?.toString()
                      ?.slice(0, 24)}
                  </td>
                  <td className="text-slate-300 text-center  border-r border-brand-color">
                    {new Date(
                      new Date(history.call_end_time).getTime() +
                        6 * 60 * 60 * 1000
                    )
                      ?.toString()
                      ?.slice(0, 24)}
                  </td>
                  <td className="text-slate-300 text-center">
                    {history.call_remark ? history.call_remark : "No remarks"}
                  </td>
                </tr>
              ))
            ) : (
              <tr className="items-center w-[400%]">
                <div className="text-center m-auto flex flex-row items-center w-[400%]">
                  <p className="m-auto">No data</p>
                </div>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewLeadCallDetails;
