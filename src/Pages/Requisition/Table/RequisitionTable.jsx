import React, { useEffect, useRef, useState } from "react";
import { CSVLink } from "react-csv";
import Dialog from "../Dialog";

const RequisitionTable = ({
  title,
  tableHeaders,
  data,
  activeFilter,
  searchInput,
}) => {
  // const navigate = useNavigate();
  const [list, setList] = useState([]);
  const [dialog, setdialog] = useState({
    message: "",
    isLoading: false,
    user: "",
  });

  useEffect(() => {
    if (!searchInput?.length) {
      setList(data);
    } else {
      setList(data.filter((lead) => lead.lead_id.includes(searchInput)));
    }
  }, [data, searchInput]);

  // const handleNavigate = (id) => {
  //   navigate(`/profile/${id}`);
  // };

  const statusBadge = [
    {
      id: 0,
      title: "Approved",
      color: "bg-green-500",
    },
    {
      id: 1,
      title: "Pending",
      color: "bg-orange-500",
    },
  ];

  const handleDialog = (message, isLoading, user) => {
    setdialog({
      message,
      isLoading,
      user,
    });
  };

  const idRef = useRef();
  const HandleDelete = (id) => {
    idRef.current = id;
    const index = data.findIndex((p) => p.user_id === idRef.current);
    console.log(index);
    handleDialog(
      "Are you sure you want to delete",
      true,
      data[index].user_name
    );
  };

  const DoubleConfirmDelete = (choice) => {
    if (choice) {
      const newList = [...list];
      const index = newList.findIndex((c) => c.user_id === idRef.current);
      newList.splice(index, 1);
      setList(newList);
      console.log(newList);
      handleDialog("", false);
    } else {
      handleDialog("", false);
    }
  };

  const HandleApprove = (id) => {
    const newList = [...list];
    const index = newList.findIndex((c) => c.user_id === id);
    newList[index].status = 0;
    setList(newList);
  };

  return (
    <div className="mt-0.5">
      <div className="border rounded-xl px-10 py-7.5 mt-5">
        <div className="flex justify-between items-center">
          <div className="flex items-start">
            <div>
              <h1 className="text-xl leading-7 font-poppins font-semibold">
                {title}
              </h1>
            </div>
            <div className="ml-6">
              <CSVLink
                data={data}
                target="_blank"
                filename={
                  activeFilter ? `${activeFilter}.csv` : "Payment-lists.csv"
                }
              >
                <h1
                  className="text-black bg-white px-2 py-1 rounded-full cursor-pointer font-semibold font-poppins border border-black"
                  style={{
                    fontSize: "10px",
                  }}
                >
                  Export CSV
                </h1>
              </CSVLink>
            </div>
          </div>
          <div className="mr-12">
            <button
              id="sync_leads"
              className={`cursor-pointer px-3 py-1 rounded-lg shadow-md`}
            >
              Sync Requisitions
            </button>
          </div>
        </div>

        <div className="tbl-header">
          <table cellPadding="0" cellSpacing="0" border="0">
            <thead>
              <tr>
                {tableHeaders.map((header, i) =>
                  header === "ID" ? (
                    <th className="w-19" key={i}>
                      {header}
                    </th>
                  ) : (
                    <th key={i}>{header}</th>
                  )
                )}
              </tr>
            </thead>
          </table>
        </div>
        <div className="tbl-content">
          <form action="">
            <table
              className="custom-table"
              cellPadding="0"
              cellSpacing="0"
              border="0"
            >
              <tbody>
                {list.map((list, i) => (
                  <tr key={list.user_id}>
                    <td className="w-19">{i + 1}</td>
                    <td>{list.user_name}</td>
                    <td>{list.company_name}</td>
                    <td>{list.company_contact}</td>
                    <td>{list.business_email}</td>
                    <td>{list.trade_name}</td>
                    {/* <td>{list.abn}</td>
                    <td>{list.rto_code}</td> */}
                    {statusBadge.find((status) => status.id === list.status) ? (
                      <td>
                        {statusBadge
                          .filter((status) => status.id === list.status)
                          .map((status, index) => (
                            <div
                              key={index}
                              className="w-24 flex items-center py-1.5 px-2 rounded-lg shadow-md"
                            >
                              {list.status === "1" ? (
                                <>
                                  <div
                                    className={`w-2 h-2 ${status.color} rounded-full`}
                                  ></div>
                                  <div className="ml-1">{status.title}</div>
                                </>
                              ) : (
                                <>
                                  <div
                                    className={`w-2 h-2 ${status.color} rounded-full`}
                                  ></div>
                                  <div className="ml-1">{status.title}</div>
                                </>
                              )}
                            </div>
                          ))}
                      </td>
                    ) : (
                      <td>{list.payment_via}</td>
                    )}
                    {list.status === 1 ? (
                      <td className="flex flex-col justify-center items-start gap-1">
                        <div
                          className="flex items-center py-1.5 px-7 rounded-lg shadow-md border border-green-400 justify-center hover:border-green-500"
                          onClick={() => HandleApprove(list.user_id)}
                        >
                          <div className="text-green-500 font-extrabold">✔</div>
                        </div>
                        <div
                          className="flex items-center py-1.5 px-7 rounded-lg shadow-md border border-red-400 justify-center hover:border-red-500"
                          onClick={() => HandleDelete(list.user_id)}
                        >
                          <div className="text-red-500 font-extrabold">✖</div>
                        </div>
                      </td>
                    ) : (
                      <td className="flex flex-col justify-center items-start">
                        <div
                          className="flex justify-center items-center py-1.5 px-7 rounded-lg shadow-md border border-red-500"
                          onClick={() => HandleDelete(list.user_id)}
                        >
                          <div className="text-red-500 font-extrabold">✖</div>
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
                {dialog.isLoading && (
                  <Dialog
                    user={dialog.user}
                    onDialog={DoubleConfirmDelete}
                    message={dialog.message}
                  />
                )}
              </tbody>
            </table>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RequisitionTable;
