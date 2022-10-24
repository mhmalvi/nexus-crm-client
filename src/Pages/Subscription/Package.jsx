import React, { useState, useEffect, useRef } from "react";
import Axios from "axios";
import Dialog from "./Dialog";
import UpdateDialog from "./UpdateDialog";
import Icons from "../../Components/Shared/Icons";
import { handleFetchPackages } from "../../Components/services/company";

const Package = () => {
  const [Plan1, setPlan1] = useState([]);
  //const [Plan2, setPlan2] = useState([]);
  const [selected1, setSelected1] = useState([]);
  //const [selected2, setSelected2] = useState([]);
  const [Customs, setCustoms] = useState([]);
  const [Show, setShow] = useState(false);
  const [dialog, setdialog] = useState({
    message: "",
    isLoading: false,
    user: "",
  });
  const [Updatedialog, setUpdateDialog] = useState({
    id: "",
    isLoading: false,
  });

  const updateSelected1 = (plan) => {
    if (!selected1.includes(plan) && selected1.length < 2) {
      setSelected1([plan]);
      console.log(selected1);
    } else {
      let newSelected1 = selected1.filter((t) => t !== plan);
      setSelected1(newSelected1);
    }
  };

  const onSubmit = () => {
    if (selected1 !== "") {
      setShow(!Show);
    } else {
      alert("Please select packages first.");
    }
  };

  useEffect(() => {
    (async () => {
      const fetchPackages = await handleFetchPackages();
      setPlan1(fetchPackages.packages);
      console.log(fetchPackages);
    })();
    setCustoms([...selected1]);
  }, [selected1]);

  const idRef = useRef();
  const HandleDelete = (id) => {
    idRef.current = id;
    const index = Plan1.findIndex((p) => p.id === idRef.current);
    console.log(index);
    handleDialog(
      "Are you sure you want to delete",
      true,
      Plan1[index].package_name
    );
  };

  const DoubleConfirmDelete = (choice) => {
    if (choice) {
      Axios.get(`http://192.168.0.126/api/delete/package/${idRef.current}/5`)
        .then((res) => console.log("Deleted", res))
        .catch((err) => console.log(err.response.data.message));
      handleDialog("", false);
    } else {
      handleDialog("", false);
    }
  };

  const handleDialog = (message, isLoading, user) => {
    setdialog({
      message,
      isLoading,
      user,
    });
  };

  const handleUpdate = (id) => {
    idRef.current = id;
    const index = Plan1.findIndex((p) => p.id === idRef.current);
    console.log(index);
    handleUpdateDialog(idRef.current, true);
  };

  const handleUpdateDialog = (id, isLoading) => {
    setUpdateDialog({
      id,
      isLoading,
    });
    console.log(id);
  };

  const CancelUpdate = (choice) => {
    if (choice === false) {
      handleUpdateDialog(false);
      window.location.reload();
    }
  };

  return (
    <div>
      <div className="text-2xl pt-24 pb-5 px-20">
        Subscription
        <br />
        <span className="text-slate-500 text-sm">
          Choose your desired plan to get access to our content easily. We like
          to offer special offers to our valuable users.{" "}
        </span>
      </div>

      {/* Active packages div */}
      <div className="flex text-xl py-5 px-20">
        Active Packages
        <div className="flex bg-slate-200 h-1 w-[80%] mx-4 my-4"></div>
      </div>
      <div className="mx-auto grid grid-cols-4 max-w-7xl gap-4 px-20 my-4">
        {Plan1 &&
          Plan1?.map((plan1) => (
            <>
              {plan1.active === 1 && (
                <div
                  className={`cursor-pointer ${
                    selected1.includes(plan1.id)
                      ? "flex flex-col border-4 border-[#966dff] shadow-lg bg-[#f3efff] text-white p-8 rounded-xl text-center"
                      : "flex flex-col border-2 border-slate-200 shadow-lg p-8 bg-white rounded-xl text-center hover:border-[#5625dc] hover:shadow-xl hover:transition ease-in-out delay-160"
                  }`}
                  onClick={() => updateSelected1(plan1.id)}
                >
                  <div className="flex justify-between gap-2">
                    {plan1.active == 1 ? (
                      <div className="border-[#733CFF] border rounded-full w-20 h-6 my-2">
                        <span className="text-[#733CFF] text-sm font-bold">
                          active
                        </span>
                      </div>
                    ) : (
                      <div className="border-[#733CFF] border rounded-full w-20 h-6 my-2">
                        <span className="text-[#733CFF] text-sm font-bold">
                          inactive
                        </span>
                      </div>
                    )}
                    <div className="flex gap-1">
                      <div
                        className="flex items-center py-1.5 px-2 shadow-md border border-slate-100 justify-center hover:border-slate-200 h-10"
                        onClick={() => handleUpdate(plan1.id)}
                      >
                        <button title="Edit">
                          {" "}
                          <Icons.Edit />{" "}
                        </button>
                      </div>
                      <div
                        className="flex items-center py-1.5 px-2 shadow-md border border-slate-100 justify-center hover:border-slate-200 h-10"
                        onClick={() => HandleDelete(plan1.id)}
                      >
                        <button title="Delete">
                          {" "}
                          <Icons.Bin />{" "}
                        </button>
                      </div>
                    </div>
                  </div>
                  <h3 className="font-bold py-10 text-[20px]">
                    {plan1.package_name}{" "}
                  </h3>
                  <h1 className="ml-3 text-4xl text-[#733CFF] mb-0">
                    {plan1.price} $100
                    <br />
                  </h1>
                  <span className="text-[#733CFF] text-sm ml-5">/Monthly</span>
                  <div className="flex-1 text-slate-500 text-xs py-4">
                    {plan1.package_details}
                  </div>
                  <div className="my-4">
                    <a
                      href="#"
                      className="bg-slate-50 text-[#733CFF] font-bold hover:bg-[#733CFF] hover:text-slate-50 hover:shadow-xl hover:transition ease-in-out delay-160 my-3 rounded-full py-3 px-3"
                    >
                      Get Started
                    </a>
                  </div>
                </div>
              )}
            </>
          ))}
        {dialog.isLoading && (
          <Dialog
            user={dialog.user}
            onDialog={DoubleConfirmDelete}
            message={dialog.message}
          />
        )}
        {Updatedialog.isLoading && (
          <UpdateDialog user_id={Updatedialog.id} onDialog={CancelUpdate} />
        )}
      </div>

      {/* Inactive packages div */}
      <div className="flex text-xl py-5 px-20">
        Inactive Package
        <div className="flex bg-slate-200 h-1 w-[80%] mx-4 my-4"></div>
      </div>
      <div className="mx-auto grid grid-cols-4 max-w-7xl gap-4 px-20 my-4">
        {Plan1 &&
          Plan1?.map((plan1) => (
            <>
              {plan1.active == 0 && (
                <div
                  className="cursor-pointer flex flex-col border-2 border-slate-200 shadow-inner p-8 bg-white rounded-xl text-center hover:transition ease-in-out delay-160"
                  onClick={() => updateSelected1(plan1.id)}
                >
                  <div className="flex justify-between gap-2">
                    {plan1.active === 1 ? (
                      <div className="border-[#733CFF] border rounded-full w-20 h-6 my-2">
                        <span className="text-[#733CFF] text-sm font-bold">
                          active
                        </span>
                      </div>
                    ) : (
                      <div className="border-red-600 border rounded-full w-20 h-6 my-2">
                        <span className="text-red-600 text-sm font-bold">
                          inactive
                        </span>
                      </div>
                    )}
                    <div className="flex gap-1">
                      <div
                        className="flex items-center py-1.5 px-2 shadow-md border border-slate-100 justify-center hover:border-slate-200 h-10"
                        onClick={() => handleUpdate(plan1.id)}
                      >
                        <button title="Edit">
                          <Icons.Edit />
                        </button>
                      </div>
                      <div
                        className="flex items-center py-1.5 px-2 shadow-md border border-slate-100 justify-center hover:border-slate-200 h-10"
                        onClick={() => HandleDelete(plan1.id)}
                      >
                        <button title="Delete">
                          <Icons.Bin />
                        </button>
                      </div>
                    </div>
                  </div>
                  <h3 className="font-bold py-10 text-[20px]">
                    {plan1.package_name}{" "}
                  </h3>
                  <div className="flex-1 text-slate-500 text-xs py-4">
                    {plan1.package_details}
                  </div>
                </div>
              )}
            </>
          ))}
        {dialog.isLoading && (
          <Dialog
            user={dialog.user}
            onDialog={DoubleConfirmDelete}
            message={dialog.message}
          />
        )}
      </div>

      <div className="w-full flex justify-center items-center">
        <button
          className="w-28 py-2 bg-brand-color text-white text-center rounded-md"
          onClick={onSubmit}
        >
          {Show ? "CANCEL" : "CREATE"}
        </button>
      </div>

      {/* Custom package div */}
      {Show && (
        <>
          <div className="flex flex-row text-2xl py-5 px-20">
            Your Custom Package
            <div className="flex bg-slate-200 h-1 w-[70%] mx-4 my-4"></div>
          </div>
          <div className="max-w-7xl gap-4 px-20 my-4 mx-auto">
            <div className="flex gap-2">
              {Customs.map((custom) => (
                <div className="cursor-pointer flex flex-col border-2 border-[#733CFF] shadow-lg bg-white text-white p-8 rounded-xl text-center hover:border-[#5625dc] hover:shadow-xl hover:transition ease-in-out delay-160 mx-auto ">
                  <h3 className="font-bold text-lg py-4 delay-700">{custom}</h3>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Package;
