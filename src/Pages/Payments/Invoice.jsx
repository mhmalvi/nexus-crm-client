import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { handleFetchInvoiceDetails } from "../../Components/services/company";
import { setLoader } from "../../features/user/userSlice";
import companyIcon from "../../assets/Images/company_icon.png";
import Loading from "../../Components/Shared/Loader";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

const Invoice = () => {
  const { id } = useParams();
  const printRef = React.useRef();
  const dispatch = useDispatch();
  const loadingDetails = useSelector((state) => state.user.loading);

  const [invoiceDetails, setInvoiceDetails] = useState([]);

  useEffect(() => {
    dispatch(setLoader(true));

    (async () => {
      const invoiceDetailsResponse = await handleFetchInvoiceDetails(id);

      if (invoiceDetailsResponse?.status === true) {
        setInvoiceDetails(invoiceDetailsResponse.data?.[0]);

        setTimeout(() => {
          dispatch(setLoader(false));
        }, 1000);
      }
    })();
  }, [dispatch, id]);

  const handleDownloadPdf = async () => {
    const element = printRef.current;
    const canvas = await html2canvas(element);
    const data = canvas.toDataURL("image/png");

    const pdf = new jsPDF();
    const imgProperties = pdf.getImageProperties(data);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;
    pdf.setFillColor(255, 255, 255, 255);
    pdf.rect(50, 50, 160, 170, "F");
    pdf.addImage(
      data,
      "PNG",
      window.innerWidth < 1366 ? 0 : window.innerWidth < 1550 ? -15 : -52.5,
      20,
      window.innerWidth < 1366
        ? pdfWidth
        : window.innerWidth < 1550
        ? 240
        : 315,
      window.innerWidth < 1366
        ? pdfHeight + 10
        : window.innerWidth < 1550
        ? 220
        : 220
    );
    pdf.save(`${invoiceDetails?.payer_name?.replace(" ", "-")}-Invoice.pdf`);
  };

  return (
    <div className="mx-6 2xl:mx-16 py-24 float-right">
      {loadingDetails && (
        <div className="w-full h-screen text-7xl absolute z-50 flex justify-center items-center bg-white bg-opacity-70">
          <Loading />
        </div>
      )}

      <div className="flex items-end justify-end space-x-3 print:hidden">
        <button
          className="px-3.5 py-2 text-xs leading-4 font-medium font-poppins border border-black bg-black text-white rounded-full cursor-pointer"
          onClick={handleDownloadPdf}
        >
          Download
        </button>
      </div>

      <div
        className="min-h-fit flex items-center justify-center bg-white py-16"
        ref={printRef}
      >
        <div className="w-11/12 xl:w-4/5 2xl:w-3/5 min-h-full bg-white px-10 py-12 rounded-md border border-brand-color border-opacity-30 print:border-none">
          <div className="flex justify-between bg-white">
            <div className="w-84">
              <img
                className="w-22"
                src={`${
                  invoiceDetails?.company_logo
                    ? process.env.REACT_APP_FILE_SERVER_URL +
                      "/public/" +
                      invoiceDetails?.company_logo
                    : companyIcon
                }`}
                alt="Company Logo"
              />
              <div className="text-base text-brand-color font-semibold my-2">
                {invoiceDetails?.company_name}
              </div>
            </div>
            <div className="p-4 ml-4 bg-white">
              <ul className="flex">
                <li className="flex flex-col items-center p-2 border-l-2 border-indigo-200">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-gray-500 mb-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                    />
                  </svg>

                  {invoiceDetails?.company_website && (
                    <div className="text-sm">
                      <span>Website : </span>
                      <span>
                        {invoiceDetails?.company_website
                          ? invoiceDetails?.company_website
                          : "Not Provided"}
                      </span>
                    </div>
                  )}

                  {invoiceDetails?.company_email && (
                    <div className="text-sm">
                      <span>Emial : </span>
                      <a
                        href={`mailto:${invoiceDetails?.company_email}`}
                        className="text-sm text-black hover:text-black"
                      >
                        {invoiceDetails?.company_email
                          ? invoiceDetails?.company_email
                          : "Not Provided"}
                      </a>
                    </div>
                  )}
                </li>
              </ul>
            </div>
          </div>
          <div className="w-full h-0.5 bg-brand-color"></div>
          <div className="flex justify-between p-4 my-4 bg-white">
            <div>
              <h6 className="font-bold">
                Payment Date :{" "}
                <span className="text-sm font-medium">
                  {new Date(invoiceDetails?.created_at).toLocaleString()}
                </span>
              </h6>
              <h6 className="font-bold">
                Invoice ID :{" "}
                <span className="text-sm font-medium">
                  {" "}
                  {invoiceDetails?.invoice_id}
                </span>
              </h6>
              <h6 className="font-bold">
                Transection ID :{" "}
                <span className="text-sm font-medium">
                  {" "}
                  {invoiceDetails?.transaction_id}
                </span>
              </h6>
            </div>
            <div className="w-48">
              <span className="text-sm">
                <div className="mb-1.5">
                  <span className="font-bold">Paid By :</span>
                  <span> {invoiceDetails?.payer_name}</span>
                </div>
                <div className="mb-1.5">
                  <span className="font-bold">Payment Method :</span>
                  <span className="uppercase">
                    {" "}
                    {invoiceDetails?.payment_method}
                  </span>
                </div>
              </span>
            </div>

            <div className="w-40">
              <div className="text-sm mb-1.5">
                <span className="font-bold">Paid To :</span>
                <span> {invoiceDetails?.company_name}</span>
              </div>
              <div className="text-sm mb-1.5">
                <span className="font-bold">Contact :</span>
                <span> {invoiceDetails?.company_contact}</span>
              </div>
            </div>
            <div></div>
          </div>
          <div className="flex justify-center p-4 bg-white">
            <div className="border-b border-gray-200 shadow">
              <table className="">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="w-10 px-4 py-2 text-xs text-gray-500">#</th>
                    <th className="w-79 px-4 py-2 text-xs text-gray-500 min-w-fit">
                      Course Name
                    </th>
                    <th className="px-4 py-2 text-xs text-gray-500 ">
                      Course Code
                    </th>
                    <th className="px-4 py-2 text-xs text-gray-500 ">&nbsp;</th>
                    <th className="px-4 py-2 text-xs text-gray-500 ">Fee</th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  <tr>
                    <td className="px-6 py-4 text-sm text-gray-500 text-left">
                      1
                    </td>
                    <td className="w-79 p-4">
                      <div className="text-sm text-gray-900 min-w-fit uppercase">
                        {invoiceDetails?.course_title ? (
                          invoiceDetails?.course_title
                        ) : (
                          <h1 className="italic">No Title</h1>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-500 uppercase">
                        {invoiceDetails?.course_code ? (
                          invoiceDetails?.course_code
                        ) : (
                          <h1 className="italic">No Code</h1>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">&nbsp;</td>
                    <td className="px-6 py-4">
                      ${invoiceDetails?.payment_amount}
                    </td>
                  </tr>

                  <tr className="">
                    <td colSpan="3"></td>
                    <td className="text-sm font-bold">Sub Total</td>
                    <td className="text-sm font-bold tracking-wider">
                      <b>
                        $
                        {invoiceDetails?.payment_amount -
                          invoiceDetails?.payment_amount * 0.035}
                      </b>
                    </td>
                  </tr>
                  <tr>
                    <th colSpan="3"></th>
                    <td className="text-sm font-bold">
                      <b>Tax Rate</b>
                    </td>
                    <td className="text-sm font-bold">
                      <b>3.5%</b>
                    </td>
                  </tr>
                  <tr className="text-white bg-gray-800">
                    <th colSpan="3"></th>
                    <td className="text-sm text-white font-bold">
                      <b>Total</b>
                    </td>
                    <td className="text-sm font-bold text-white">
                      <b>${invoiceDetails?.payment_amount}</b>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="flex justify-between p-4 bg-white">
            <div>
              <h3 className="text-xl">Terms And Condition :</h3>
              <ul className="text-xs list-disc list-inside">
                <li>
                  All accounts are to be paid within 7 days from receipt of
                  invoice.
                </li>
                <li>
                  To be paid by cheque or credit card or direct payment online.
                </li>
                <li>
                  If account is not paid within 7 days the credits details
                  supplied.
                </li>
              </ul>
            </div>
          </div>
          <div className="w-full h-0.5 bg-brand-color"></div>

          <div className="p-4 bg-white">
            <div className="flex items-center justify-center">
              Thanks for being with us.
            </div>
            <div
              className="flex items-center justify-center italic text-brand-color"
              style={{
                fontSize: "10px",
              }}
            >
              -QQ CRM
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
