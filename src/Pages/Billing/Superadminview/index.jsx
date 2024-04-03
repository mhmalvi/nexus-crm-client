import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  getAllProducts,
  deleteProduct,
} from "../../../Components/services/billing";
import SuperBillingForm from "./SuperBillingForm";
import {
  successNotification,
  warningNotification,
} from "../../../Components/Shared/Toast";

const Superadminview = () => {
  const colorMode = useSelector((state) => state?.user)?.colorMode;
  const userDetails = useSelector((state) => state?.user);
  const [addMoreClicked, setAddMoreClicked] = useState(false);
  const [deleteClickedMap, setDeleteClickedMap] = useState({});

  const [productList, setProductList] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const response = await getAllProducts();
      setProductList(response);
    };
    fetchData();
  }, []);

  const handlePackageDelete = async (packageID) => {
    setDeleteClickedMap((prevMap) => ({
      ...prevMap,
      [packageID]: true, // Set deleteClicked state for this particular item to true
    }));

    const response = await deleteProduct(packageID);
    if (response.deleted === true) {
      successNotification("Deleted successfully.");
      setTimeout(() => {
        setDeleteClickedMap((prevMap) => ({
          ...prevMap,
          [packageID]: false,
        }));
        window.location.reload();
      }, 2000);
    } else {
      warningNotification(
        response.data.error.message ||
          "Something went wrong. Please try again after reloading the page."
      );
      setTimeout(() => {
        setDeleteClickedMap((prevMap) => ({
          ...prevMap,
          [packageID]: false,
        }));
      }, 2000);
    }
  };

  return (
    <div className="flex flex flex-grow gap-4 w-full h-full mx-5 ">
      <div className="flex flex-col gap-8 w-full h-full rounded-md shadow-md backdrop-blur-2xl bg-[#ffffff11] p-4">
        <div className="flex justify-between">
          <div className="flex flex-col  ">
            <h1
              className={`text-2xl ${
                colorMode ? "text-slate-300" : "text-gray-800"
              }`}
            >
              Please read before use:
            </h1>
            <ol
              className={`text-lg ${
                colorMode ? "text-slate-300" : "text-gray-800"
              } m-0`}
            >
              <li> - You can modify a subsciption </li>
              <li>
                - You can <span className="font-bold">ONLY</span> delete a
                subscription if no price is assigned to it.
              </li>
            </ol>
          </div>
          <button
            className={`px-4 border  rounded-md ${
              colorMode
                ? "text-slate-300 border-slate-300"
                : "text-gray-800 border-gray-800"
            } `}
            onClick={() => setAddMoreClicked(!addMoreClicked)}
          >
            {addMoreClicked ? "View Package List" : "Add a package"}
          </button>
        </div>
        {addMoreClicked ? (
          <div
            className={`w-full h-full border ${
              colorMode ? "border-brand-color " : "border-gray-800"
            } rounded-md p-4`}
          >
            <SuperBillingForm productList={productList} />
          </div>
        ) : (
          <div className="w-full h-full flex flex-col gap-4 border border-brand-color rounded-md p-4">
            {productList &&
              productList.data.map((items, index) => {
                return (
                  <div
                    key={index}
                    className={`w-full flex items-center justify-between border bg-transparent items-center gap-4 px-2 py-2 ${
                      colorMode ? "border-slate-300" : "border-gray-800"
                    } rounded-md`}
                  >
                    <h1
                      className={`m-0 p-0 ${
                        colorMode ? "text-slate-300" : "text-gray-800"
                      }`}
                    >
                      {items.name}
                    </h1>
                    <button
                      disabled={deleteClickedMap[items.id]}
                      className="px-2 py-1 border border-red-500 text-red-500 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                      onClick={() => handlePackageDelete(items.id)}
                    >
                      {deleteClickedMap[items.id] ? "Processing" : "Delete"}
                    </button>
                  </div>
                );
              })}
          </div>
        )}
      </div>
      {/* Price */}
      <div className="flex flex-col w-1/3 h-full rounded-md shadow-md backdrop-blur-2xl bg-[#ffffff11] p-4">
        BILLING LIST
        <hr />
        (to be added in a later release)
      </div>
    </div>
  );
};

export default Superadminview;
