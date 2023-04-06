import { message, Modal } from "antd";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleFetchCompanyEmployees } from "../../../Components/services/company";
import { handleLeadAssign } from "../../../Components/services/leads";
import Icons from "../../../Components/Shared/Icons";
import Loading from "../../../Components/Shared/Loader";
import { setLoader } from "../../../features/user/userSlice";

const SalesEmployees = ({
  addSealsman,
  setAddSealsman,
  handleCancel,
  leadDetails,
  syncDetails,
  setSyncDetails,
}) => {
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.user);
  const loadingDetails = useSelector((state) => state?.user)?.loading;

  const [companySalesEmployees, setCompanySalesEmployees] = useState([]);

  useEffect(() => {
    dispatch(setLoader(true));

    (async () => {
      const employeeResponse = await handleFetchCompanyEmployees(
        userDetails?.userInfo?.client_id
      );

      // console.log("employeeResponse", employeeResponse);

      if (employeeResponse?.status === true) {
        // console.log("employeeResponse?.data", employeeResponse?.data);
        // console.log(
        //   "leadDetails?.leadSalesEmployeeHistory",
        //   leadDetails?.leadSalesEmployeeHistory
        // );

        if (employeeResponse?.data?.length) {
          const sales = (employeeResponse?.data).filter(
            (employee) => employee?.role_id === 5 && employee?.status === 1
          );

          var unAssignedEmployee = sales.filter(function (o1) {
            // filter out (!) items in result2
            return !leadDetails?.leadSalesEmployeeHistory?.some(function (o2) {
              return o1.id === o2.sales_user_id; // assumes unique id
            });
          });

          setCompanySalesEmployees(unAssignedEmployee);
        }
        dispatch(setLoader(false));
      } else {
        setTimeout(() => {
          dispatch(setLoader(false));
        }, 3000);
      }
    })();
  }, [dispatch, userDetails?.userInfo?.client_id]);

  console.log(leadDetails?.leadDetails);
  console.log(companySalesEmployees.length);

  const handleLeadAssignReq = async (id) => {
    console.log(id);

    const assignEmployeeResponse = await handleLeadAssign(
      leadDetails?.leadDetails?.lead_id,
      id,
      userDetails?.userInfo?.user_id
    );

    if (assignEmployeeResponse?.status === true) {
      setAddSealsman(false);
      message.success(assignEmployeeResponse?.message);
      setSyncDetails(!syncDetails);
    }
  };

  return (
    <Modal visible={addSealsman} footer={null} onCancel={handleCancel}>
      <div>
        <h1 className="font-poppins text-xl font-extrabold">Seals Team</h1>
        <span className="font-poppins text-xs">
          <span className="text-red-600">*</span> Select a sales person to
          handle this lead
        </span>
      </div>

      {loadingDetails ? (
        <div className="w-full h-100 z-50 flex justify-center items-center bg-white bg-opacity-70">
          <Loading />
        </div>
      ) : (
        <>
          {companySalesEmployees?.legth === 0 ? (
            <div className="py-10 text-center text-xl font-light">
              No Sales Employee Yet
            </div>
          ) : (
            <div className="grid grid-cols-2 justify-center items-center py-6 ">
              {companySalesEmployees?.map((employee) => (
                <div
                  key={employee?.id}
                  className="flex justify-center items-center my-2 cursor-pointer"
                  onClick={() => handleLeadAssignReq(employee?.id)}
                >
                  <Icons.PeopleRounded />
                  <div className="ml-2 text-lg font-poppins font-semibold">
                    {employee?.full_name}
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </Modal>
  );
};

export default SalesEmployees;
