import React, { useState } from "react";
import { Button, Modal, Table, message } from "antd";
import {
  DeleteOutlined,
  FilePdfOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";
import {
  handleAddNewAttachment,
  handleDeleteAttachment,
  handleGetAllCheckLists,
  handleGetPDFShow,
} from "../../../Components/services/utils";
import { useEffect } from "react";
const AttachModal = ({
  attachOpen,
  setAttachOpen,
  selectedData,
  setSelectedData,
}) => {
  const userDetail = useSelector((state) => state?.user?.userInfo);
  const [files, setFiles] = useState([]);
  const [fileName, setFileName] = useState([]);
  const [allCheckLists, setAllCheckLists] = useState([]);
  const [uploadLoading, setUploadLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const res = await handleGetAllCheckLists(userDetail?.client_id);
      if (res?.status === 200 || res?.status === 201) {
        setAllCheckLists(res?.data);
      }
    })();
  }, [userDetail?.client_id]);
  const handleAttachOk = () => {
    allCheckLists?.forEach((item) => {
      item.isChecked = false;
    });
    setTimeout(() => {
      setAttachOpen(false);
    }, 500);
  };
  const handleCheckListFile = (e) => {
    console.log("I entered file");

    const files = Object.values(e?.target?.files);
    setFiles(files);
    setFileName(files);
    console.log("fdatas: ", files);
  };
  // console.log("all data: ", allCheckLists);
  const handleNewCheckListUpload = async () => {
    const formData = new FormData();
    files.forEach((file) => formData.append("checklist_file[]", file));
    formData.append("company_id", userDetail?.client_id);
    formData.append("uploaded_by", userDetail?.user_id);
    setUploadLoading(true);
    const res = await handleAddNewAttachment(formData);
    if (res?.status === 201 || res?.status === 200) {
      message.success(res?.message || "Uploaded successfully");
      const resp = await handleGetAllCheckLists(userDetail?.client_id);
      if (resp?.status === 201 || resp?.status === 200) {
        setAllCheckLists(resp?.data);
      }
      setFiles([]);
      setFileName([]);
      setUploadLoading(false);
    } else {
      setUploadLoading(false);
      message.warn(res?.data?.message || "Something went wrong");
    }
  };

  const handleDeleteFiles = async (fid, attach_list) => {
    const res = await handleDeleteAttachment(
      userDetail?.client_id,
      fid,
      attach_list
    );
    if (res?.status === 201 || res?.status === 200) {
      message.success(res?.message || "Delete attachment successfully");
      setSelectedData([]);
      const resp = await handleGetAllCheckLists(userDetail?.client_id);
      if (resp?.status === 200 || resp?.status === 201) {
        setAllCheckLists(resp?.data);
      }
      if (!fid) {
        setAttachOpen(false);
      }
      allCheckLists?.forEach((item) => {
        item.isChecked = false;
      });
    } else {
      message.warning(res?.message || "Something went wrong");
    }
  };

  const handleShowPdf = async (id) => {
    const res = await handleGetPDFShow(id);

    if (res?.status === 200) {
      window.open(res?.data, "_blank");
    }
  };

  const column = [
    {
      title: "Files",
      dataIndex: "file_name",
      key: "file_name",
      icon: <FilePdfOutlined />,
      render: (_, record, idx) => {
        return (
          <div key={idx} className="flex items-center gap-2">
            <FilePdfOutlined className="!text-[red] text-[20px]" />
            <p className="m-0 p-0">{record?.file_name}</p>
          </div>
        );
      },
    },
    {
      title: "Action",
      // All select features are
      // () => {
      // return (
      //   <>
      //     <div className="flex items-center justify-center gap-3">
      //       <input
      //         className=" cursor-pointer"
      //         type="checkbox"
      //         name=""
      //         id=""
      //         onChange={(e) => {
      //           if (e?.target?.checked) {
      //             allCheckLists &&
      //               allCheckLists?.forEach((item) => {
      //                 item.isChecked = true;
      //               });
      //             allCheckLists && setSelectedData(allCheckLists);
      //           } else {
      //             allCheckLists &&
      //               allCheckLists?.forEach((item) => {
      //                 item.isChecked = false;
      //               });
      //             allCheckLists && setSelectedData([]);
      //           }
      //         }}
      //       />
      //       <p className="m-0 p-0">Action</p>
      //     </div>
      //   </>
      // );
      // }
      width: 250,
      align: "center",
      render: (_, record, idx) => {
        return (
          <div key={idx} className="flex gap-6 items-center justify-center">
            <div className="">
              <input
                className="mt-2 w-4 cursor-pointer"
                type="checkbox"
                checked={record?.isChecked}
                onChange={(e) => {
                  if (e?.target?.checked) {
                    record.isChecked = true;
                    if (!selectedData) {
                      setSelectedData([{ ...record }]);
                    } else {
                      setSelectedData([...selectedData, { ...record }]);
                    }
                  } else {
                    record.isChecked = false;
                    if (selectedData) {
                      let data = selectedData;
                      for (let i = 0; i < data?.length; i++) {
                        if (data[i].id === record?.id) {
                          data.splice(i, 1);
                        }
                      }
                      setSelectedData(data);
                    }
                  }
                }}
              />
            </div>
            <div>
              <EyeOutlined
                onClick={() => {
                  handleShowPdf(record?.id);
                }}
              />
            </div>
            <div>
              <DeleteOutlined
                className=" cursor-pointer text-[17px]"
                onClick={() => {
                  handleDeleteFiles(record?.id, []);
                }}
              />
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <div>
        <Modal
          title=""
          open={attachOpen}
          visible={attachOpen}
          onOk={handleAttachOk}
          okText="Close"
          footer={[
            <Button
              type=""
              onClick={() => {
                setAttachOpen(false);
                setSelectedData([]);
              }}
            >
              Cancel
            </Button>,
            <Button
              type="danger"
              onClick={() => {
                handleDeleteFiles(0, selectedData);
              }}
            >
              Remove
            </Button>,
            <Button type="primary" onClick={handleAttachOk}>
              Attach
            </Button>,
          ]}
          width="80%"
          onCancel={() => {
            setAttachOpen(false);
          }}
        >
          {/* {!pdfPage ? ( */}
          <div className="mt-6">
            <div className="flex justify-between items-center flex-wrap">
              <div>
                <h1 className="text-[25px] text-[#696868]">Attach CheckList</h1>
              </div>
              <div className="flex items-center gap-4 flex-wrap">
                <input
                  type="file"
                  name="file"
                  multiple
                  id="checkList-upload"
                  onChange={handleCheckListFile}
                  style={{ display: "none" }}
                />
                <div className="flex gap-3 items-center mt-[5px]">
                  <label
                    htmlFor="checkList-upload"
                    className="py-[5px] px-[15px] cursor-pointer bg-slate-700 text-white border border-slate-700 rounded"
                    style={{ border: "1px solid gray" }}
                  >
                    Add New CheckList
                  </label>
                  {fileName.length > 0 ? (
                    <ul className="w-[200px] h-[70px] overflow-auto">
                      {fileName?.map((item, idx) => {
                        return (
                          <li
                            key={idx}
                            className="text-[green] text-[16px] mt-2"
                          >
                            {item?.name}
                          </li>
                        );
                      })}
                    </ul>
                  ) : (
                    ""
                  )}
                </div>

                <Button
                  type="primary"
                  onClick={handleNewCheckListUpload}
                  loading={uploadLoading}
                >
                  {uploadLoading
                    ? "Uploading New CheckList"
                    : "Upload New CheckList"}
                </Button>
              </div>
            </div>

            <div className="mt-6">
              <Table
                scroll={true}
                columns={column || []}
                dataSource={allCheckLists?.length > 0 ? allCheckLists : []}
              />
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default AttachModal;
