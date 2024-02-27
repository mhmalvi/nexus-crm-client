import { message, Modal, Popconfirm } from "antd";
import Axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleFetchPackages } from "../../Components/services/company";
import Icons from "../../Components/Shared/Icons";
import Loading from "../../Components/Shared/Loader";
import { setLoader } from "../../features/user/userSlice";
import PackageForm from "../Package/PackageForm";
import PackageUpdate from "../Package/PackageUpdate";

const Package = ({ setShowRequisitionForm, data, setData }) => {
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state?.user);
  const loadingDetails = useSelector((state) => state?.user?.loading);

  const [Plans, setPlans] = useState([]);
  const [activePackages, setActivePackages] = useState([]);
  const [inActivePackages, setInActivePackages] = useState([]);
  const [updatePackageDate, setUpdatePackageDate] = useState({});
  const [selected1, setSelected1] = useState([]);
  const [togglePackageUpdate, setTogglePackageUpdate] = useState(false);
  const [togglePackageCreate, setTogglePackageCreate] = useState(false);
  const [syncPackages, setSyncPackages] = useState(false);

  const updateSelected1 = (plan) => {
    if (!selected1?.includes(plan) && selected1?.length < 2) {
      setSelected1([plan]);
      const requisitionDetails = { ...data };
      requisitionDetails.packages_id = plan;
      // console.log(requisitionDetails);
      setData(requisitionDetails);
    } else {
      let newSelected1 = selected1.filter((t) => t !== plan);
      setSelected1(newSelected1);
    }
  };

  const getPackageTypeLimit = (typeLimit) => {
    if (typeLimit === 30) {
      return 0;
    } else if (typeLimit === 90) {
      return 1;
    } else if (typeLimit === 180) {
      return 2;
    } else if (typeLimit === 360) {
      return 3;
    }
  };

  useEffect(() => {
    dispatch(setLoader(true));

    (async () => {
      const fetchPackages = await handleFetchPackages();

      // dispatch(addPackages(fetchPackages?.packages));

      console.log("fetchPackages", fetchPackages);

      if (fetchPackages?.packages.length) {
        setActivePackages(
          (fetchPackages?.packages).filter((pack) => pack.active)
        );
        setInActivePackages(
          (fetchPackages?.packages).filter((pack) => !pack.active)
        );
        setPlans(fetchPackages?.packages);

        dispatch(setLoader(false));
      }
    })();
  }, [dispatch, selected1, syncPackages]);

  const idRef = useRef();

  const handleDelete = (id) => {
    idRef.current = id;
    // const index = Plans.findIndex((p) => p.id === idRef.current);
  };

  const doubleConfirmDelete = (choice) => {
    if (choice) {
      Axios.get(
        `${process.env?.REACT_APP_COMPANY_URL}/api/delete/package/${idRef.current}/5`
      )
        .then((res) => message.success("Package Deleted Successfully"))
        .catch((err) => console.log(err.response.data.message));
    }
  };

  const handleUpdate = (id) => {
    setUpdatePackageDate(Plans.find((plan) => plan.id === id));
    setTogglePackageUpdate(true);
    idRef.current = id;
  };

  const handleCancelPackageCreate = () => {
    setTogglePackageCreate(false);
  };

  const handleCancelPackageUpdate = () => {
    setTogglePackageUpdate(false);
  };

  const confirm = () => {
    doubleConfirmDelete(true);
  };

  const cancel = (e) => {
    console.log(e);
  };

  return (
    <div className="pb-16">
      <div className="text-2xl py-5 px-20">
        <div className="flex text-xl py-5">
          <div className="whitespace-nowrap">Subscription</div>
          <div className="flex bg-slate-200 h-1 w-full mx-4 my-4"></div>
        </div>

        <br />

        <span className="text-slate-500 text-sm">
          Choose your desired plan to get access to our content easily. We like
          to offer special offers to our valuable users.
          <br />
          <br />
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Culpa vero
          veritatis quae adipisci dolorum nisi! Culpa nisi reiciendis sed itaque
          debitis eum iusto, numquam deleniti molestias quaerat necessitatibus
          rerum sint, cupiditate nostrum. Minima adipisci libero dolor corporis
          illum quisquam ab aut officiis! Maxime, voluptates exercitationem.
          Quam iusto officiis nostrum excepturi repudiandae animi at explicabo
          culpa atque placeat. Reprehenderit ex ducimus tempore nesciunt nisi
          excepturi odio reiciendis necessitatibus sed corporis!
        </span>
      </div>

      {/* Active packages div */}
      <div className="flex text-xl py-5 px-20">
        <div className="whitespace-nowrap">Active Packages</div>
        <div className="flex bg-slate-200 h-1 w-full mx-4 my-4"></div>
      </div>

      {/* Package Create Modal */}
      <Modal
        visible={togglePackageCreate}
        footer={null}
        onCancel={handleCancelPackageCreate}
        width={650}
      >
        <PackageForm
          setSyncPackages={setSyncPackages}
          syncPackages={syncPackages}
          setTogglePackageCreate={setTogglePackageCreate}
        />
      </Modal>

      {(userDetails?.userInfo?.role_id === 1 ||
        userDetails?.userInfo?.role_id === 2) && (
        <div className="relative w-full mb-20">
          <button
            className="absolute xl:right-24 2xl:right-24 w-36 py-2 bg-black text-white text-center rounded-md"
            onClick={() => setTogglePackageCreate(true)}
          >
            Create Package
          </button>
        </div>
      )}

      {/* Package Update Modal */}
      <Modal
        visible={togglePackageUpdate}
        footer={null}
        onCancel={handleCancelPackageUpdate}
        width={650}
      >
        <PackageUpdate
          setTogglePackageUpdate={setTogglePackageUpdate}
          updatePackageDate={updatePackageDate}
          setSyncPackages={setSyncPackages}
          syncPackages={syncPackages}
        />
      </Modal>

      <div className="w-[98%] mx-auto relative">
        {loadingDetails && (
          // <div className="w-screen h-screen text-7xl absolute z-50 flex justify-center items-center bg-white bg-opacity-70">
          <div className="w-full h-96 text-7xl absolute z-50 flex justify-center mx-auto items-center bg-white bg-opacity-70">
            <Loading />
          </div>
        )}
        <div className="grid lg:grid-cols-3 2xl:grid-cols-4 gap-4 px-20 my-4">
          {activePackages.length ? (
            activePackages?.map((plan, i) => (
              <div key={i}>
                <div
                  className={`cursor-pointer ${
                    selected1.includes(plan.id)
                      ? "flex flex-col border-4 border-[#966dff] shadow bg-[#f3efff] text-white p-8 rounded-md text-center"
                      : "flex flex-col border-2 border-slate-200 shadow p-8 bg-white rounded-md text-center hover:border-[#5625dc] hover:shadow-md hover:transition ease-in-out delay-160"
                  }`}
                  onClick={() => updateSelected1(plan.id)}
                >
                  {(userDetails?.userInfo?.role_id === 1 ||
                    userDetails?.userInfo?.role_id === 2) && (
                    <div className="flex justify-between gap-2">
                      <div className="border-brand-color border rounded-full w-20 h-6 my-2">
                        <span className="text-brand-color text-sm font-bold">
                          active
                        </span>
                      </div>
                      <div className="flex gap-1">
                        <div
                          className="flex items-center py-1.5 px-2 shadow-sm border border-slate-100 justify-center hover:border-slate-200 h-10"
                          onClick={() => handleUpdate(plan.id)}
                        >
                          <button title="Edit">
                            <Icons.Edit />
                          </button>
                        </div>
                        <Popconfirm
                          title="Are you sure to delete this Package?"
                          onConfirm={confirm}
                          onCancel={cancel}
                          okText="Yes"
                          cancelText="No"
                        >
                          <div
                            className="flex items-center py-1.5 px-2 shadow-sm border border-slate-100 justify-center hover:border-slate-200 h-10"
                            onClick={() => handleDelete(plan.id)}
                          >
                            <Icons.Bin />
                          </div>
                        </Popconfirm>
                      </div>
                    </div>
                  )}

                  <h3 className="font-bold py-10 text-[20px]">
                    {plan.package_name}
                  </h3>
                  <h1 className="ml-3 text-xl text-brand-color mb-0">
                    ${plan.price}
                    <span className="text-xs text-black">
                      /
                      {
                        packageTypeData[
                          packageType[parseInt(plan?.package_type) - 1]
                        ][getPackageTypeLimit(plan?.package_type_limit)]
                      }
                    </span>
                    <br />
                  </h1>
                  <div className="flex-1 text-slate-500 text-xs py-4">
                    {plan.package_details}
                  </div>
                  <div className="my-4">
                    <div
                      className="w-48 mx-auto bg-slate-50 text-brand-color font-bold hover:bg-brand-color transition-colors hover:delay-50 hover:text-slate-50 hover:shadow-sm hover:transition ease-in-out delay-150 my-3 rounded-full py-3"
                      onClick={() => setShowRequisitionForm(true)}
                    >
                      Get Started
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="font-poppins text-lg text-center">
              No Active Package
            </div>
          )}
        </div>
      </div>

      {/* Inactive packages Section  */}
      {(userDetails?.userInfo?.role_id === 1 ||
        userDetails?.userInfo?.role_id === 2) && (
        <div>
          <div className="flex text-xl py-5 px-20">
            <div className="whitespace-nowrap">Inactive Package</div>
            <div className="flex bg-slate-200 h-1 w-full mx-4 my-4"></div>
          </div>
          <div className="mx-auto grid grid-cols-4 max-w-7xl gap-4 px-20 my-4">
            {inActivePackages?.length ? (
              inActivePackages?.map((plan, i) => (
                <div key={i}>
                  <div
                    className="cursor-pointer flex flex-col border-2 border-slate-200 shadow p-8 bg-white rounded-md text-center hover:transition ease-in-out delay-150"
                    onClick={() => updateSelected1(plan.id)}
                  >
                    <div className="flex justify-between gap-2">
                      <div className="border-red-600 border rounded-full w-20 h-6 my-2">
                        <span className="text-red-600 text-sm font-bold">
                          inactive
                        </span>
                      </div>
                    </div>
                    <h3 className="font-bold pt-10 pb-4 text-[20px]">
                      {plan.package_name}
                    </h3>
                    <h1 className="ml-3 text-xl text-red-500 mb-2">
                      ${plan.price}
                      <span className="text-xs text-black">
                        /
                        {
                          packageTypeData[packageType[plan?.package_type - 1]][
                            getPackageTypeLimit(plan?.package_type_limit)
                          ]
                        }
                      </span>
                      <br />
                    </h1>
                    <div className="flex-1 text-slate-500 text-xs py-4">
                      {plan.package_details}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="font-poppins text-lg text-center">
                No Inactive Package
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Package;

const packageType = ["User Limit", "Monthly", "Storage Limit"];

const packageTypeData = {
  "User Limit": ["10", "20", "50", "100"],
  Monthly: ["Free(1 Month)", "3 Months", "6 Months", "12 Months"],
  "Storage Limit": ["5GB", "10GB", "20GB", "50GB", "1TB"],
};
