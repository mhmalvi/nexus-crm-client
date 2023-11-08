import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { handleFetchLeads } from "../../../Components/services/leads";
import axios from "axios";

const ViewLeadCallDetails = ({ lead_id, setOpenCallCountDetailsModal }) => {
  console.log("leeeeeeeeeeeeeeeeeeeead", lead_id);
  const userDetails = useSelector((state) => state.user);
  const [syncLeads, setSyncLeads] = useState(false);
  const [callHistory, setCallHistory] = useState([""]);
  useEffect(() => {
    axios
      .post(`${process.env?.REACT_APP_LEAD_URL}/api/lead/details`, {
        lead_id: lead_id,
      })
      .then((response) => {
        console.log("lead_details", response);
        setCallHistory(response.data.leadCallHistory);
        //   dashboard_lead_id=""
      });
  });
  return (
    <div>
      <div className="items-center flex mb-2">
        <h3 className="m-auto font-bold underline  underline-offset-4">
          Call Details
        </h3>
      </div>

      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Remarks</th>
          </tr>
        </thead>
        <tbody className="text-center items-center w-[29rem] overflow-scroll">
          {callHistory.length > 0 ? (
            callHistory.map((history, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  {new Date(
                    new Date(history.call_start_time).getTime() +
                      6 * 60 * 60 * 1000
                  )
                    ?.toString()
                    ?.slice(0, 24)}
                </td>
                <td>
                  {new Date(
                    new Date(history.call_end_time).getTime() +
                      6 * 60 * 60 * 1000
                  )
                    ?.toString()
                    ?.slice(0, 24)}
                </td>
                <td>
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
  );
};

export default ViewLeadCallDetails;
