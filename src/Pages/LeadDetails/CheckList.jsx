import { Upload } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  handleFetchChecklist
} from "../../Components/services/leads";
import { handleUploadFile } from "../../Components/services/utils";
import Icons from "../../Components/Shared/Icons";

const CheckList = ({ toggleChcekList, handleCancel, leadDetails }) => {
  const [fileList, setFileList] = useState([]);
  const [documentList, setDocumentList] = useState([]);
  const [syncDocumentList, setSyncDocumentList] = useState(false);

  const userDetails = useSelector((state) => state?.user);

  const handleChange = async (e, info) => {
    console.log(e);
    console.log(info);

    const fileFormData = new FormData();
    fileFormData.append("user_id", userDetails?.userInfo?.userId);
    fileFormData.append("client_id", leadDetails.client_id);
    fileFormData.append("document_name", info?.file?.originFileObj);
    fileFormData.append("document_details", info?.file?.originFileObj?.name);

    const uploadFile = await handleUploadFile(fileFormData);

    if (uploadFile?.message?.data.length) {
      setSyncDocumentList(!syncDocumentList);
    }
    console.log("uploadFile", uploadFile?.message?.data[0]?.id);

    // const saveDocumentDetails = await handleChecklistDocumentUpload({
    //   document_id: uploadFile?.message?.data[0]?.id,
    //   lead_id: leadDetails?.lead_id,
    //   course_id: leadDetails?.course_id,
    // title: courseId,
    // id: courseId,
    // });
  };

  useEffect(() => {
    (async () => {
      const response = await handleFetchChecklist(leadDetails?.course_id);
      if (response) {
        setDocumentList(response?.data);
      }
    })();
  }, [leadDetails?.course_id]);

  // const props = {
  //   action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  //   onChange: handleChange,
  //   multiple: true,
  // };

  console.log(leadDetails);

  return (
    <div
      className="font-poppins mx-4 my-6 overflow-y-auto "
      style={{
        maxHeight: "65vh",
      }}
    >
      <div>
        <h1 className="text-xl font-medium mb-6">Documents :</h1>
      </div>
      {documentList?.map((certificate, i) => (
        <div key={i} className="flex items-center text-sm mb-4 ml-6">
          <span>{i + 1}.</span>
          <span className="mx-2">{certificate?.title} : </span>
          <div className="bg-gray-100 px-2 py-0.5 shadow rounded-lg">
            <Upload
              onChange={(e) => handleChange(e)}
              id={certificate?.title}
              fileList={fileList}
            >
              <div className="flex items-center">
                <Icons.Clip className="w-3 mr-1.5" />
                <div className="text-sm font-light">File</div>
              </div>
            </Upload>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CheckList;

// const checkLists = [
//   "S.S.C Certificate",
//   "H.S.C Certificate",
//   "P.S.C Certificate",
//   "J.S.C Certificate",
//   "K.S.C Certificate",
//   "S.S.C Certificate",
//   "H.S.C Certificate",
//   "P.S.C Certificate",
//   "J.S.C Certificate",
//   "K.S.C Certificate",
//   "S.S.C Certificate",
//   "H.S.C Certificate",
//   "P.S.C Certificate",
//   "J.S.C Certificate",
//   "K.S.C Certificate",
//   "S.S.C Certificate",
//   "H.S.C Certificate",
//   "P.S.C Certificate",
//   "J.S.C Certificate",
//   "K.S.C Certificate",
//   "S.S.C Certificate",
//   "H.S.C Certificate",
//   "P.S.C Certificate",
//   "J.S.C Certificate",
//   "K.S.C Certificate",
//   "S.S.C Certificate",
//   "H.S.C Certificate",
//   "P.S.C Certificate",
//   "J.S.C Certificate",
//   "K.S.C Certificate",
// ];
