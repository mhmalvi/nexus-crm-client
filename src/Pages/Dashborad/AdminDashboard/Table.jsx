import React, { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Skeleton from "react-skeleton-loader";
import Loading from "../../../Components/Shared/Loader";
import { setLoader } from "../../../features/user/userSlice";

const Table = ({
  title,
  tableHeaders,
  data,
  activeFilter,
  searchInput,
  filterOptions,
  handleSyncLeadsReq,
}) => {
  // const leads = useSelector((state) => state?.leads)?.leads;
  const userDetails = useSelector((state) => state?.user?.userInfo);
  const loadingDetails = useSelector((state) => state?.user)?.loading;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [list, setList] = useState([]);

  useEffect(() => {
    dispatch(setLoader(true));
    if (data?.length === 0) {
      setTimeout(() => {
        dispatch(setLoader(false));
      }, 4000);
    } else {
      dispatch(setLoader(false));
    }
  }, [data, data?.length, dispatch]);

  useEffect(() => {
    if (!searchInput?.length) {
      setList(
        userDetails?.role_id === 5 && activeFilter !== 8
          ? data.filter((lead) => parseInt(lead.lead_details_status) === 1)
          : data
      );
      // setList(data);
    } else {
      setList(
        data.filter((lead) =>
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
                data={list?.length ? list : "Empty"}
                target="_blank"
                filename={
                  typeof activeFilter === "number"
                    ? `${
                        filterOptions?.find(
                          (option) => option.id === activeFilter
                        )?.title
                      }.csv`
                    : "Payment-lists.csv"
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
          {userDetails?.role_id !== 1 && (
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
                {tableHeaders?.map((header, i) => (
                  <th key={i}>{header}</th>
                ))}
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
                <tbody>
                  {list?.map(
                    (list) => (
                      // list?.sales_user_id !== 0 && (
                      // <LazyLoad height={200} offset={100}>
                      <tr
                        key={list.lead_id}
                        onClick={() => handleNavigate(list.lead_id)}
                      >
                        <td>
                          {list.lead_id ? (
                            list.lead_id
                          ) : (
                            <Skeleton color="#F0EFEF" />
                          )}
                        </td>
                        <td>
                          {list.lead_apply_date ? (
                            // new Date(list.lead_apply_date)
                            //   .toString()
                            //   .slice(0, 31)
                            new Date(list.lead_apply_date)
                              .toString()
                              .slice(4, 21) +
                            " " +
                            new Date(list.lead_apply_date)
                              .toString()
                              .slice(25, 31)
                          ) : (
                            <Skeleton color="#F0EFEF" />
                          )}
                        </td>
                        <td>
                          {list.course_code ? (
                            list.course_code
                          ) : (
                            <Skeleton color="#F0EFEF" />
                          )}
                        </td>
                        <td>
                          {list.full_name ? (
                            list.full_name
                          ) : (
                            <Skeleton color="#F0EFEF" />
                          )}
                        </td>
                        <td className="uppercase">
                          {list.work_location ? (
                            list.work_location
                          ) : (
                            <Skeleton color="#F0EFEF" />
                          )}
                        </td>
                        <td>
                          {list.campaign_id ? (
                            list.campaign_id
                          ) : (
                            <Skeleton color="#F0EFEF" />
                          )}
                        </td>

                        {statusColor.find(
                          (status) => status.id === list?.lead_details_status
                        ) ? (
                          <td>
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
                          </td>
                        ) : (
                          <td>{list?.payment_via}</td>
                        )}
                      </tr>
                      // </LazyLoad>
                    )
                    // )
                  )}
                </tbody>
              </table>
            ) : (
              <div className="py-20 flex justify-center items-center">
                <h1 className="text-xl font-light">No Leads Yet</h1>
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
