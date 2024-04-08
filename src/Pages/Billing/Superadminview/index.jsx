import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  getAllProducts,
  deleteProduct,
  getProductPrice,
  createProduct,
} from "../../../Components/services/billing";
import {
  successNotification,
  warningNotification,
} from "../../../Components/Shared/Toast";
import { Modal } from "antd";
import PriceForm from "./PriceForm";

const Superadminview = () => {
  const colorMode = useSelector((state) => state?.user)?.colorMode;
  const [addMoreClicked, setAddMoreClicked] = useState(false);
  const [deleteClickedMap, setDeleteClickedMap] = useState({});
  const [checking, setChecking] = useState(false);
  const [packages, setPackages] = useState(null);
  const [packageData, setPackageData] = useState(null);
  const [packageNameAndId, setPackageNameAndId] = useState("");
  const [openPriceForm, setOpenPriceForm] = useState("");

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

  const handlePackageShow = async (packageID, name) => {
    const data = {
      prod_id: packageID,
    };
    setPackageNameAndId({
      name: name,
      id: packageID,
    });
    const response = await getProductPrice(data);
    setPackageData(response.data);
  };

  const handlePackageName = async () => {
    setChecking(true);
    const data = packages;
    const response = await createProduct(data);
    if (response.data?.error) {
      warningNotification(response.data.error.message);
      setChecking(false);
    } else {
      successNotification("Name available");

      setChecking(false);
    }
  };
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
            Create a package
          </button>
        </div>
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
                        onClick={() => handlePackageShow(items.id, items.name)}
                      >
                        View
                      </button>
                      <button
                        className={`w-1/4 px-2 py-1 border-b hover:border ease-in duration-100 ${
                          colorMode
                            ? "border-slate-300 text-slate-300"
                            : "border-gray-800 text-gray-800"
                        } disabled:opacity-50 disabled:cursor-not-allowed`}
                        onClick={() =>
                          setOpenPriceForm({
                            open: true,
                            id: items.id,
                            name: items.name,
                          })
                        }
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
          <div
            className={`${
              packageNameAndId ? "w-1/2 flex flex-col gap-4 " : "w-0 hidden"
            } border-l border-slate-300 px-4 text-slate-300`}
          >
            <h1
              className={`text-xl w-full m-0 p-0 ${
                colorMode ? "text-slate-300" : "text-gray-800"
              } flex`}
            >
              Package Name:
              <span className="pl-4">
                <h1
                  className={`${
                    colorMode ? "text-slate-300" : "text-gray-800"
                  } `}
                >
                  {packageNameAndId.name}
                </h1>
              </span>
            </h1>
            {packageData && packageData.length >= 1 ? (
              packageData.map((items, index) => {
                return (
                  items.active === true && (
                    <div
                      className={`flex items-center justify-between gap-2 border border-purple-600 p-2 rounded-md`}
                      key={index}
                    >
                      <div className="flex gap-2 flex-col">
                        <h1
                          className={` m-0 p-0 text-xl ${
                            colorMode ? "text-slate-300" : "text-gray-800"
                          }`}
                        >
                          Billed every {items.recurring.interval_count}{" "}
                          {items.recurring.interval.toUpperCase()}
                        </h1>
                        <h1
                          className={` m-0 p-0 text-xl ${
                            colorMode ? "text-slate-300" : "text-gray-800"
                          }`}
                        >
                          Price: $ {items.unit_amount}
                        </h1>
                        <h1
                          className={` m-0 p-0 text-lg ${
                            colorMode ? "text-slate-300" : "text-gray-800"
                          }`}
                        >
                          Currency: {items.currency.toUpperCase()}
                        </h1>
                      </div>
                      <div>
                        <h1
                          className={`text-4xl m-0 p-4 ${
                            colorMode ? "text-slate-300" : "text-gray-800"
                          }`}
                        >
                          {index + 1}
                        </h1>
                      </div>
                    </div>
                  )
                );
              })
            ) : (
              <h1>Loading</h1>
            )}
          </div>
        </div>
        <Modal
          className="billingModal"
          title="Create a package"
          footer={false}
          visible={addMoreClicked}
          onCancel={() => setAddMoreClicked(!addMoreClicked)}
        >
          <div className="h-full w-full flex items-center  gap-4">
            <input
              onChange={(e) => {
                setPackages(e.target.value);
              }}
              className={`w-full rounded-md bg-transparent border focus:outline-none focus:ring-0 outline-none px-2 py-1 ${
                colorMode
                  ? "border-slate-300 text-slate-300"
                  : "border-gray-800 text-gray-800"
              }`}
            />
            <button
              className={`px-2 py-1 border ${
                colorMode
                  ? "border-slate-300 text-slate-300"
                  : "border-gray-800 text-gray-800"
              } rounded-md`}
              onClick={handlePackageName}
            >
              Add{checking && "ing"}
            </button>
          </div>
        </Modal>
        <Modal
          className="billingModal z-10"
          title={`Add price to ${openPriceForm?.name}`}
          footer={false}
          visible={openPriceForm.open}
          onCancel={() =>
            setOpenPriceForm({
              open: false,
              id: "",
              name: "",
            })
          }
        >
          <PriceForm openPriceForm={openPriceForm} />
        </Modal>
      </div>
    </div>
  );
};

export default Superadminview;
