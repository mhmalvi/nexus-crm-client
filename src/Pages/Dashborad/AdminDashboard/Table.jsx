import React, { useEffect, useState } from "react";
import Avatar from "react-avatar";
import { CSVLink } from "react-csv";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Skeleton from "react-skeleton-loader";
import Loading from "../../../Components/Shared/Loader";
import { setLoader } from "../../../features/user/userSlice";
import Icons from "../../../Components/Shared/Icons";

const Table = ({
  title,
  tableHeaders,
  data,
  activeFilter,
  searchInput,
  filterOptions,
  handleSyncLeadsReq,
  companyEmployeeList,
}) => {
  console.log(companyEmployeeList);

  // const leads = useSelector((state) => state?.leads)?.leads;
  const userDetails = useSelector((state) => state?.user?.userInfo);
  const loadingDetails = useSelector((state) => state?.user)?.loading;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [list, setList] = useState([]);

  console.log("data", data);

  useEffect(() => {
    (async () => {
      dispatch(setLoader(true));
      if (data?.length === 0) {
        setTimeout(() => {
          dispatch(setLoader(false));
        }, 3000);
      } else {
        setTimeout(() => {
          dispatch(setLoader(false));
        }, 1000);
      }
    })();
  }, [data, data?.length, dispatch]);

  useEffect(() => {
    if (!searchInput?.length) {
      setList(
        userDetails?.role_id === 5 && activeFilter !== 8
          ? data?.filter((lead) => parseInt(lead.lead_details_status) === 1)
          : data
      );
    } else {
      setList(
        data?.filter((lead) =>
          (lead?.lead_id).toString().includes(searchInput.toString())
        )
      );
    }
    console.log(data);
  }, [data, searchInput, activeFilter, userDetails?.role_id]);

  // console.log("list...........", list);

  const handleNavigate = (id) => {
    navigate(`/lead/${id}`);
  };

  const handleNavigateInvoiceDetails = (e, id) => {
    e.stopPropagation();
    console.log(list.id);
    navigate(`/invoice/${id}`);
  };

  return (
    <div className="mt-0.5">
      <div className="border rounded-xl px-4 xl:px-6 2xl:px-10  py-4 xl:py-6 2xl:py-7.5 mt-5">
        <div className="flex justify-between items-center">
          <div className="flex items-start">
            <div>
              <h1 className="text-xl leading-7 font-poppins font-semibold">
                {title}
              </h1>
            </div>
            <div className="ml-6">
              <CSVLink
                data={list?.length ? list : "Empty"}
                target="_blank"
                filename={
                  typeof activeFilter === "number"
                    ? `${
                        filterOptions?.find(
                          (option) => option.id === activeFilter
                        )?.title
                      }.csv`
                    : title
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

          {(userDetails?.role_id !== 1 || userDetails?.role_id !== 2) &&
            title === "Lead List" && (
              <div className="mr-12">
                <button
                  id="sync_leads"
                  className={`cursor-pointer px-3 py-1 rounded-lg shadow-md`}
                  onClick={handleSyncLeadsReq}
                >
                  Sync Leads
                </button>
              </div>
            )}
        </div>

        <div className="tbl-header">
          <table cellPadding="0" cellSpacing="0" border="0">
            <thead>
              <tr>
                {tableHeaders?.map((header, i) =>
                  header === "Location" ? (
                    <th className="w-22" key={i}>
                      {header}
                    </th>
                  ) : header === "Course Code" ? (
                    <th className="w-36" key={i}>
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

        {loadingDetails ? (
          <div className="w-full h-100 z-50 flex justify-center items-center bg-white bg-opacity-70">
            <Loading />
          </div>
        ) : (
          <div className="tbl-content">
            {data?.length ? (
              <table
                className="custom-table"
                cellPadding="0"
                cellSpacing="0"
                border="0"
              >
                {title === "Payment History" ? (
                  <tbody>
                    {list?.map((list, i) => (
                      <tr
                        className="relative"
                        key={i}
                        onClick={() => handleNavigate(list.lead_id)}
                      >
                        <td>
                          {list.lead_id ? (
                            list.lead_id
                          ) : (
                            <Skeleton width={"100px"} color="#F0EFEF" />
                          )}
                        </td>

                        <td>
                          {list.created_at ? (
                            new Date(list.created_at).toString().slice(4, 21) +
                            " " +
                            new Date(list.created_at).toString().slice(25, 31)
                          ) : (
                            <Skeleton width={"100px"} color="#F0EFEF" />
                          )}
                        </td>

                        <td className="uppercase">
                          {list.transaction_id ? (
                            list.transaction_id
                          ) : (
                            <Skeleton width={"100px"} color="#F0EFEF" />
                          )}
                        </td>

                        <td>
                          {list.payment_amount ? (
                            list.payment_amount
                          ) : (
                            <Skeleton width={"100px"} color="#F0EFEF" />
                          )}
                        </td>

                        <td className="uppercase">
                          {list.payment_method ? (
                            list.payment_method
                          ) : (
                            <Skeleton width={"100px"} color="#F0EFEF" />
                          )}
                        </td>

                        <td
                          className={`font-semibold ${
                            list.payment_status === "COMPLETED" &&
                            "text-green-500"
                          } ${
                            list.payment_status === "FAILED" && "text-red-500"
                          }`}
                        >
                          {list.payment_status ? (
                            list.payment_status
                          ) : (
                            <Skeleton width={"100px"} color="#F0EFEF" />
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                ) : title === "Invoice History" ? (
                  <tbody>
                    {list?.map((list) => (
                      <tr
                        className="relative"
                        key={list.invoice_id}
                        onClick={() => handleNavigate(list.lead_id)}
                      >
                        <td>
                          {list.invoice_id ? (
                            list.invoice_id
                          ) : (
                            <Skeleton width={"100px"} color="#F0EFEF" />
                          )}
                        </td>

                        <td>
                          {list.lead_id ? (
                            list.lead_id
                          ) : (
                            <Skeleton width={"100px"} color="#F0EFEF" />
                          )}
                        </td>

                        <td>
                          {list.payer_name ? (
                            list.payer_name
                          ) : (
                            <Skeleton width={"100px"} color="#F0EFEF" />
                          )}
                        </td>

                        <td>
                          {list.created_at ? (
                            new Date(list.created_at).toString().slice(4, 21) +
                            " " +
                            new Date(list.created_at).toString().slice(25, 31)
                          ) : (
                            <Skeleton width={"100px"} color="#F0EFEF" />
                          )}
                        </td>

                        <td>
                          {list.course_code ? (
                            list.course_code
                          ) : (
                            <Skeleton width={"100px"} color="#F0EFEF" />
                          )}
                        </td>

                        {/* <td>
                          {list.full_name ? (
                            list.full_name
                          ) : (
                            <Skeleton width={"100px"} color="#F0EFEF" />
                          )}
                        </td> */}

                        <td>
                          {list.payment_amount ? (
                            list.payment_amount
                          ) : (
                            <Skeleton width={"100px"} color="#F0EFEF" />
                          )}
                        </td>

                        <td className="uppercase flex items-center">
                          {list.payment_method ? (
                            list.payment_method
                          ) : (
                            <Skeleton width={"100px"} color="#F0EFEF" />
                          )}

                          <button
                            className="ml-10 text-black hover:text-brand-color font-semibold"
                            onClick={(e) => {
                              handleNavigateInvoiceDetails(e, list.id);
                            }}
                          >
                            <Icons.Eye className="w-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                ) : (
                  <tbody>
                    {list?.map((list) => (
                      <tr
                        className="relative"
                        key={list.lead_id}
                        onClick={() => handleNavigate(list.lead_id)}
                      >
                        <td>
                          {list.lead_id ? (
                            list.lead_id
                          ) : (
                            <Skeleton width={"100px"} color="#F0EFEF" />
                          )}
                        </td>
                        <td>
                          {list.lead_apply_date ? (
                            new Date(list.lead_apply_date)
                              .toString()
                              .slice(4, 21) +
                            " " +
                            new Date(list.lead_apply_date)
                              .toString()
                              .slice(25, 31)
                          ) : (
                            <Skeleton width={"100px"} color="#F0EFEF" />
                          )}
                        </td>
                        <td className="w-36 mr-auto">
                          {list.course_code ? (
                            list.course_code
                          ) : (
                            <Skeleton width={"100px"} color="#F0EFEF" />
                          )}
                        </td>
                        <td>
                          {list.full_name ? (
                            list.full_name
                          ) : (
                            <Skeleton width={"100px"} color="#F0EFEF" />
                          )}
                        </td>
                        <td className="uppercase w-16">
                          {list.work_location ? (
                            list.work_location
                          ) : (
                            <Skeleton width={"100px"} color="#F0EFEF" />
                          )}
                        </td>
                        <td>
                          {list.campaign_id ? (
                            list.campaign_id
                          ) : (
                            <Skeleton width={"100px"} color="#F0EFEF" />
                          )}
                        </td>

                        {statusColor.find(
                          (status) => status.id === list?.lead_details_status
                        ) ? (
                          <td className="flex items-center">
                            {statusColor
                              .filter(
                                (status) =>
                                  status.id === list?.lead_details_status
                              )
                              .map((lead_status, index) => (
                                <div
                                  key={index}
                                  className="w-24 flex items-center py-1.5 px-2 rounded-lg shadow-md"
                                >
                                  <div
                                    className={`w-2 h-2 ${lead_status.color} rounded-full`}
                                  ></div>
                                  <div className="ml-1">
                                    {lead_status.title}
                                  </div>
                                </div>
                              ))}
                            {(userDetails?.role_id === 3 ||
                              userDetails?.role_id === 4) &&
                            list?.sales_user_id ? (
                              <div className="ml-3">
                                <Avatar
                                  className="rounded-full shadow-sm cursor-pointer"
                                  size="30"
                                  color="#1f262a"
                                  name={
                                    companyEmployeeList?.find(
                                      (employee) =>
                                        employee?.id === list?.sales_user_id
                                    )?.full_name
                                  }
                                />
                              </div>
                            ) : null}
                          </td>
                        ) : (
                          <td>{list?.payment_via}</td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                )}
              </table>
            ) : (
              <div className="py-20 flex justify-center items-center">
                {title === "Payment List" ? (
                  <h1 className="text-xl font-light">No Payments Yet</h1>
                ) : (
                  <h1 className="text-xl font-light">No Leads Yet</h1>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Table;

const statusColor = [
  {
    id: 0,
    title: "Suspended",
    color: "bg-black",
  },
  {
    id: 1,
    title: "New Lead",
    color: "bg-green-500",
  },
  {
    id: 2,
    title: "Skilled",
    color: "bg-orange-500",
  },
  {
    id: 3,
    title: "Called",
    color: "bg-blue-500",
  },
  {
    id: 4,
    title: "Paid",
    color: "bg-teal-500",
  },
  {
    id: 5,
    title: "Verified",
    color: "bg-violet-500",
  },
  {
    id: 6,
    title: "Completed",
    color: "bg-red-500",
  },
];

// const colorArray = [
//   "red",
//   "green",
//   "#728FCE",
//   "violet",
//   "#2B547E",
//   "black",
//   "#87AFC7",
//   "Lime",
//   "#D5D6EA",
//   "#77BFC7",
//   "orange",
//   "#FDD017",
//   "#665D1E",
// ];
// const random = () => Math.floor(Math.random() * (30 - 0)) + 0;
