import { message, Upload } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  handleChecklistDocumentUpload,
  handleDocumentDelete,
  handleFetchChecklist,
  handleFetchLeadCheckListDocuments,
} from "../../Components/services/leads";
import {
  handleFetchFile,
  handleUploadFile,
} from "../../Components/services/utils";
import Icons from "../../Components/Shared/Icons";

const CheckList = ({ toggleChcekList, handleCancel, leadDetails }) => {
  const [fileList, setFileList] = useState([]);
  const [documentList, setDocumentList] = useState([]);
  const [syncDocumentList, setSyncDocumentList] = useState(false);

  const userDetails = useSelector((state) => state?.user);

  const handleChange = async (e, checklistId) => {
    const fileFormData = new FormData();
    fileFormData.append("user_id", userDetails?.userInfo?.user_id);
    fileFormData.append("client_id", leadDetails.client_id);
    fileFormData.append("document_name", e?.file?.originFileObj);
    fileFormData.append("document_details", e?.file?.originFileObj?.name);

    for (const value of fileFormData.values()) {
      console.log(value);
    }

    const uploadFile = await handleUploadFile(fileFormData);

    console.log("uploadFile", uploadFile);

    // if (uploadFile?.message?.data.length) {
    //   setSyncDocumentList(!syncDocumentList);
    // }

    // console.log("uploadFileUpload", uploadFile);
    console.log("DOCCUMENTS>>> ", {
      checklist_id: checklistId,
      lead_id: leadDetails?.lead_id,
      document_id: uploadFile?.message?.data[0]?.id,
      student_id: userDetails?.userInfo?.user_id,
    });

    const saveDocumentDetails = await handleChecklistDocumentUpload({
      checklist_id: checklistId,
      lead_id: leadDetails?.lead_id,
      document_id: uploadFile?.message?.data[0]?.id,
      student_id: userDetails?.userInfo?.user_id,
    });

    console.log("handleChecklistDocumentUpload", handleChecklistDocumentUpload);

    if (saveDocumentDetails?.status) {
      setSyncDocumentList(!syncDocumentList);
      message.success("Document Updated Successfully");
    }
  };

  useEffect(() => {
    (async () => {
      const documentResponse = await handleFetchLeadCheckListDocuments({
        lead_id: leadDetails?.lead_id,
        student_id: userDetails?.userInfo?.user_id,
        course_id: leadDetails?.course_id,
      });

      // const response = await handleFetchChecklist(leadDetails?.course_id);

      // const documentList = [];

      console.log("documentResponse?.data", documentResponse?.data);

      if (documentResponse?.data) {
        documentResponse?.data.map(async (doc) => {
          const fetchFiledetails = await handleFetchFile(doc?.document_id);
          // console.log("fetchFiledetails", fetchFiledetails?.data);

          // console.log(
          //   "fetchFiledetails?.data[0]?.document_name",
          //   fetchFiledetails?.data[0]?.document_name
          // );

          // console.log("doc", doc);

          if (doc?.document_id === "") {
            document.getElementById(doc?.document_id).style.display = "none";
          }

          if ((fetchFiledetails?.data).length) {
            document.getElementById(doc?.document_id).href = fetchFiledetails
              ?.data[0]?.document_name
              ? `http://192.168.0.158:5000/${fetchFiledetails?.data[0]?.document_name}`
              : "";
          }

          //   doc["document_details"] = fetchFiledetails?.data[0]?.document_details
          //     ? fetchFiledetails?.data[0]?.document_details
          //     : "";
          //   doc["document_name"] = fetchFiledetails?.data[0]?.document_name
          //     ? fetchFiledetails?.data[0]?.document_name
          //     : "";
          //   console.log("DOCCCC", doc);
          //   documentList.push(doc);
        });
        // setDocumentFiles(documentList);
      }

      // console.log("documentList", documentList);
      // console.log("setDocumentFiles", documentFiles);

      setDocumentList(documentResponse?.data);
      // setDocumentList(documentResponse?.data);

      // if (response?.status) {
      //   setDocumentList(response?.data);
      //   const checkList = [];
      //   if (documentList) {
      //     (response?.data).map((doc) => {
      //       checkList.push(doc?.id);
      //     });
      //   }
      //   console.log(checkList);

      //   if (checkList.length) {
      //     (async () => {
      //       const studentDocumentsresponse =
      //         await handleFetchLeadCheckListDocuments(
      //           leadDetails?.lead_id,
      //           JSON.stringify(checkList),
      //           userDetails?.userInfo?.userId
      //         );
      //       if (studentDocumentsresponse?.data?.length) {
      //         setUserDocumentList(studentDocumentsresponse?.data);
      //       }
      //     })();
      //   }
      // }
    })();
  }, [leadDetails, userDetails?.userInfo?.user_id, syncDocumentList]);

  const handleDocumentDeleteReq = async (documentId) => {
    const deleteResponse = await handleDocumentDelete(documentId);

    console.log(deleteResponse);
    setSyncDocumentList(!syncDocumentList);
  };

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
      {documentList?.map((document, i) => (
        <div key={i} className="flex text-sm mb-4 ml-6">
          <span>{i + 1}.</span>
          <span className="mx-2">{document?.title} : </span>
          {!document.document_id ? (
            <div className="bg-gray-100 px-2 py-0.5 shadow rounded-lg">
              <Upload
                onChange={(e) => handleChange(e, document?.checklist_id)}
                id={document?.id}
                fileList={fileList}
              >
                <div className="flex items-center">
                  <Icons.Clip className="w-3 mr-1.5" />
                  <div className="text-sm font-light">File</div>
                </div>
              </Upload>
            </div>
          ) : (
            <div className="flex font-poppins mt-0.5">
              {/* <h1>{document.document_id}</h1> */}
              <div>
                <a href="#" target="_blank" id={document.document_id}>
                  <Icons.Eye className="w-4 text-black hover:text-brand-color" />
                </a>
              </div>
              <div>
                <Icons.Cross
                  className="w-2.5 text-red-500 ml-2 cursor-pointer"
                  onClick={() => handleDocumentDeleteReq(document.document_id)}
                />
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CheckList;
