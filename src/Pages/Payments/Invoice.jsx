import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { setLoader } from "../../features/user/userSlice";

const Invoice = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [invoiceDetails, setInvoiceDetails] = useState([]);

  
//   useEffect(() => {
//     dispatch(setLoader(true));

//     (async () => {
//       const invoiceResponse = await handleLeadDetails(id);

//       console.log("response", invoiceResponse);

//       if (invoiceResponse) {
//         dispatch(setLoader(false));
//       }
//     })();
//   }, [dispatch, id, syncDetails]);

  console.log(id);

  return <div className="mx-6 2xl:ml-12 2xl:mr-16 py-24">Invoice {id}</div>;
};

export default Invoice;
