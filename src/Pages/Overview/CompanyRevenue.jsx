import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import * as rcElement from "recharts";
import { fetchMonthPaymentDataOfCompany } from "../../Components/services/payment";
import Loading from "../../Components/Shared/Loader";
import * as chartUtils from "./utils";

const CompanyRevenue = ({ activeCompany }) => {
  const userDetails = useSelector((state) => state.user)?.userInfo;
  const loadingDetails = useSelector((state) => state.user)?.loading;

  const [monthlyRevenue, setMonthlyRevenue] = useState([]);

  useEffect(() => {
    (async () => {
      const monthlyRevenue = await fetchMonthPaymentDataOfCompany(
        userDetails?.role_id === 3 ? userDetails?.client_id : activeCompany
      );

      if (monthlyRevenue?.status === 200) {
        setMonthlyRevenue((monthlyRevenue?.data).reverse());
      }
    })();
  }, [activeCompany, userDetails]);


  return (
    <div className="py-10">
      {loadingDetails && (
        <div className="w-full h-screen text-7xl absolute z-50 flex justify-center items-center bg-white bg-opacity-70">
          <Loading />
        </div>
      )}
      <div className="mt-4">
        <div className="relative">
          <div className="relative">
            <h1 className="text-xl font-semibold mb-6 leading-8 font-poppins">
              Company Monthly Revenue Details
            </h1>
          </div>
        </div>
        <div>
          <rcElement.ResponsiveContainer width="100%" height={300}>
            <rcElement.LineChart
              width={500}
              height={200}
              data={monthlyRevenue}
              margin={{
                top: 20,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <rcElement.CartesianGrid strokeDasharray="3 3" />
              <rcElement.XAxis dataKey="month" />
              <rcElement.YAxis />
              <rcElement.Tooltip />
              <rcElement.Legend />
              <rcElement.Line
                connectNulls
                type="monotone"
                dataKey="Income"
                stroke="#8884d8"
                label={<chartUtils.CampaignRevenueCustomizedLabel />}
                activeDot={{ r: 5.5 }}
              />
            </rcElement.LineChart>
          </rcElement.ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default CompanyRevenue;
