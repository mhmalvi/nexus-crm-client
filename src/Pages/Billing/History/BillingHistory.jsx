import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useSelector } from "react-redux";
import { getCustomerTransactions } from "../../../Components/services/billing";
import "../billing.css"

const BillingHistory = () => {
    
  const colorMode = useSelector((state) => state?.user)?.colorMode;
  const [billDetails, setBillDetails] = useState(null);
  useEffect(() => {
    (async () => {
      const response = await getCustomerTransactions();
      setBillDetails(response.data.data);
      console.log(response.data.data);
    })();
  }, []);
  const columns = [
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (_, record) => (
        <p>
          {record.amount / 100} {record.currency.toUpperCase()}
        </p>
      ),
    },
    {
      title: "Card Type",
      dataIndex: "brand",
      key: "brand",
      render: (_, record) => <p>{record.payment_method_details.card.brand.toUpperCase()}</p>,
    },
    {
        title: "Country",
        dataIndex: "brand",
        key: "brand",
        render: (_, record) => <p>{record.payment_method_details.card.country}</p>,
      },
    {
      title: "Last 4 digits",
      dataIndex: "brand",
      key: "brand",
      render: (_, record) => (
        <p>************{record.payment_method_details.card.last4}</p>
      ),
    },
    {
      title: "Receipt Number",
      dataIndex: "receipt_number",
      key: "receipt_number",
      render: (_, record) => <p>{record.receipt_number}</p>,
    },
    {
      title: "Invoice Link",
      dataIndex: "receipt_url",
      key: "receipt_url",
      render: (_, record) => <a href={record.receipt_url}>Link</a>,
    },
  ];

  return (
    <div className="flex items-center justify-center w-full h-full" >
      <Table
        className={`${colorMode ? "billTableDark" : "billTableLight"} w-full h-full`}
        columns={columns}
        dataSource={billDetails || null}
      />
    </div>
  );
};

export default BillingHistory;
