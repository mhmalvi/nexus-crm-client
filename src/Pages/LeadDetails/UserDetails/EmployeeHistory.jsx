import React from "react";

const EmployeeHistory = ({ employeeList }) => {
  return (
    <div>
      <div>
        <h1 className="font-poppins text-base font-semibold text-center pb-1 pt-4">
          Sales Employee History
        </h1>
      </div>
      <div className="tbl-header">
        <table cellPadding="0" cellSpacing="0" border="0">
          <thead>
            <tr>
              <th className="w-16">No.</th>
              <th>Employee Name</th>
              <th>Date Time</th>
              <th>Assigned By</th>
            </tr>
          </thead>
        </table>
      </div>
      <div className="">
        {employeeList?.length > 0 ? (
          <table
            className="custom-table"
            cellPadding="0"
            cellSpacing="0"
            border="0"
          >
            <tbody>
              {employeeList?.map((employeeHistory, i) => (
                <tr key={i} className="cursor-none">
                  <td className="w-16">{i + 1}</td>
                  <td className="cursor-none">
                    {employeeHistory.sales_user_name}
                  </td>
                  <td>
                    {new Date(employeeHistory.created_at).toDateString()}{" "}
                    {new Date(employeeHistory.created_at).toLocaleTimeString()}
                  </td>
                  <td>{employeeHistory.assignee_user_name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="py-20 flex justify-center items-center">
            <h1 className="text-xl font-light">No Call History</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeHistory;
