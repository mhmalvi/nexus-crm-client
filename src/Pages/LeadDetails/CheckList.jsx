import { message, Upload } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  handleChecklistDocumentUpload,
  handleFetchChecklist,
  handleFetchLeadCheckListDocuments,
} from "../../Components/services/leads";
import { handleUploadFile } from "../../Components/services/utils";
import Icons from "../../Components/Shared/Icons";

const CheckList = ({ toggleChcekList, handleCancel, leadDetails }) => {
  const [fileList, setFileList] = useState([]);
  const [documentList, setDocumentList] = useState([]);
  const [userDocumentList, setUserDocumentList] = useState([]); //for accessstudent's submited document list
  const [syncDocumentList, setSyncDocumentList] = useState(false);

  const userDetails = useSelector((state) => state?.user);

  const handleChange = async (e, checklistId) => {
    console.log(checklistId);
    console.log(e?.file?.originFileObj);

    const fileFormData = new FormData();
    fileFormData.append("user_id", userDetails?.userInfo?.userId);
    fileFormData.append("client_id", leadDetails.client_id);
    fileFormData.append("document_name", e?.file?.originFileObj);
    fileFormData.append("document_details", e?.file?.originFileObj?.name);

    const uploadFile = await handleUploadFile(fileFormData);

    if (uploadFile?.message?.data.length) {
      setSyncDocumentList(!syncDocumentList);
    }

    console.log("uploadFile", uploadFile?.message?.data[0]?.id);

    const saveDocumentDetails = await handleChecklistDocumentUpload({
      checklist_id: checklistId,
      lead_id: leadDetails?.lead_id,
      document_id: uploadFile?.message?.data[0]?.id,
      student_id: userDetails?.userInfo?.userId,
    });

    if (saveDocumentDetails?.status) {
      message.success("Document Updated Successfully");
    }
  };

  useEffect(() => {
    (async () => {
      const response = await handleFetchChecklist(leadDetails?.course_id);

      if (response?.status) {
        setDocumentList(response?.data);
        const checkList = [];
        if (documentList) {
          (response?.data).map((doc) => {
            checkList.push(doc?.id);
          });
        }
        console.log(checkList);

        if (checkList.length) {
          (async () => {
            const studentDocumentsresponse =
              await handleFetchLeadCheckListDocuments(
                leadDetails?.lead_id,
                JSON.stringify(checkList),
                userDetails?.userInfo?.userId
              );
            if (studentDocumentsresponse?.data?.length) {
              setUserDocumentList(studentDocumentsresponse?.data);
            }
          })();
        }
      }
    })();
  }, [leadDetails?.course_id, leadDetails?.lead_id, userDetails?.userInfo?.userId]);

  // useEffect(() => {
  //   const checkList = [];
  //   if (documentList) {
  //     [...documentList].map((doc) => {
  //       checkList.push(doc?.id);
  //     });
  //   }
  //   console.log(checkList);

  //   if (checkList) {
  //     (async () => {
  //       const studentDocumentsresponse =
  //         await handleFetchLeadCheckListDocuments(leadDetails?.lead_id);
  //       if (studentDocumentsresponse) {
  //         setDocumentList(studentDocumentsresponse?.data);
  //       }
  //     })();
  //   }
  // }, [documentList, leadDetails?.lead_id]);

  // console.log(leadDetails);

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
              onChange={(e) => handleChange(e, certificate?.id)}
              id={certificate?.id}
              fileList={fileList}
            >
              <div className="flex items-center">
                <Icons.Clip className="w-3 mr-1.5" />
                <div className="text-sm font-light">File</div>
              </div>
            </Upload>
          </div>
          <div className="font-poppins">
            <h1></h1>
            {/* <a href=""></a> */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CheckList;