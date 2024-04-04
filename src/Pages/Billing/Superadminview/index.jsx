import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  getAllProducts,
  deleteProduct,
  getProductPrice,
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
  const [packageData, setPackageData] = useState(null);
  const [packageName, setPackageName] = useState("");

  const [productList, setProductList] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const response = await getAllProducts();
      setProductList(response);
      console.log(response);
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

  const handlePackageShow = async (packageID, name) => {
    const data = {
      prod_id: packageID,
    };
    const response = await getProductPrice(data);
    setPackageData(response.data);
    setPackageName(name);
  };
  console.log(packageData);

  return (
    <div className="flex flex flex-grow gap-4 w-full h-full mx-5 ">
      <div className="flex flex-col gap-8 w-full h-full rounded-md shadow-md backdrop-blur-2xl bg-[#ffffff11] p-4">
        <div className="flex justify-between items-center">
          <div className="flex flex-col  ">
            <h1
              className={`text-sm ${
                colorMode ? "text-slate-300" : "text-gray-800"
              }`}
            >
              Please read before use:
            </h1>
            <ol
              className={`text-sm ${
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
            className={`px-4 py-2 border rounded-md ${
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
          <div className="w-full h-full flex justify-between gap-4 border border-brand-color rounded-md p-4">
            <div className="w-1/2 flex flex-wrap gap-4">
              {productList !== null &&
                productList.map((items, index) => {
                  return (
                    <div
                      key={index}
                      className={`w-full flex flex-wrap flex-grow items-center p-2 shadow-md backdrop-blur-2xl bg-[#ffffff11] rounded-md`}
                    >
                      <h1
                        className={`w-full text-center text-lg m-0 p-0 ${
                          colorMode
                            ? "text-slate-300 border-slate-300"
                            : "text-gray-800 border-gray-800"
                        }`}
                      >
                        Package Name: {items.name}
                      </h1>
                      <div className="w-full flex flex-wrap flex-grow items-center justify-center gap-8">
                        <button
                          className={`w-1/4 px-2 py-1 border-b hover:border ease-in duration-100 ${
                            colorMode
                              ? "border-slate-300 text-slate-300"
                              : "border-gray-800 text-gray-800"
                          }  disabled:opacity-50 disabled:cursor-not-allowed`}
                          onClick={() =>
                            handlePackageShow(items.id, items.name)
                          }
                        >
                          View
                        </button>
                        <button
                          className={`w-1/4 px-2 py-1 border-b hover:border ease-in duration-100 ${
                            colorMode
                              ? "border-slate-300 text-slate-300"
                              : "border-gray-800 text-gray-800"
                          } disabled:opacity-50 disabled:cursor-not-allowed`}
                          onClick={() => handlePackageShow(items.id)}
                        >
                          Add Price
                        </button>
                        <button
                          disabled={deleteClickedMap[items.id]}
                          className="w-1/4 px-2 py-1 border-b hover:border ease-in duration-100 border-red-500 text-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
                          onClick={() => handlePackageDelete(items.id)}
                        >
                          {deleteClickedMap[items.id] ? "Processing" : "Delete"}
                        </button>
                      </div>
                    </div>
                  );
                })}
            </div>
            <div className="w-1/2 border-l border-slate-300 px-4 text-slate-300">
              {packageData && packageData.length > 1 ? (
                <div className="bg-orange-300 flex h-full w-full">
                  <h1 className="text-xl w-full m-0 p-0 flex">
                    Package Name:
                    <span className="pl-4">{packageName && <h1>{packageName}</h1>}</span>
                  </h1>
                </div>
              ) : (
                <h1>Loading</h1>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Superadminview;
