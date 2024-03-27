import { Upload } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  handleChecklistDocumentDelete,
  handleChecklistDocumentUpload,
  handleDocumentDelete,
  handleFetchLeadCheckListDocuments,
} from "../../../Components/services/leads";
import {
  handleFetchFile,
  handleUploadFile,
} from "../../../Components/services/utils";
import Icons from "../../../Components/Shared/Icons";
import { successNotification } from "../../../Components/Shared/Toast";

const CheckList = ({ leadDetails }) => {
  const [fileList, setFileList] = useState([]);
  const [documentList, setDocumentList] = useState([]);
  const [syncDocumentList, setSyncDocumentList] = useState(false);

  const userDetails = useSelector((state) => state?.user);

  useEffect(() => {
    (async () => {
      const documentResponse = await handleFetchLeadCheckListDocuments({
        lead_id: leadDetails?.lead_id,
        student_id: userDetails?.userInfo?.user_id,
        course_id: leadDetails?.course_id,
      });
      console.log("documentResponse?.data", documentResponse?.data);

      if (documentResponse?.data) {
        documentResponse?.data.map(async (doc) => {
          const fetchFiledetails = await handleFetchFile(doc?.document_id);

          if (!doc?.document_id) {
            document.getElementById(doc?.document_id).style.display = "none";
          }

          if (fetchFiledetails?.data) {
            document.getElementById(doc?.document_id).href = fetchFiledetails
              ?.data?.document_name
              ? `${process.env.REACT_APP_FILE_SERVER_URL}/public/${fetchFiledetails?.data?.document_name}`
              : "";
          }
        });
      }
      setDocumentList(documentResponse?.data);
    })();
  }, [leadDetails, userDetails?.userInfo?.user_id, syncDocumentList]);

  const handleChange = async (e, checklistId) => {
    const fileFormData = new FormData();
    fileFormData.append("user_id", userDetails?.userInfo?.user_id);
    fileFormData.append("client_id", leadDetails.client_id);
    fileFormData.append("document_name", e?.file?.originFileObj);
    fileFormData.append("document_details", e?.file?.originFileObj?.name);

    const uploadFile = await handleUploadFile(fileFormData);

    const saveDocumentDetails = await handleChecklistDocumentUpload({
      checklist_id: checklistId,
      lead_id: leadDetails?.lead_id,
      document_id: uploadFile?.data?.id,
      student_id: userDetails?.userInfo?.user_id,
    });

    if (saveDocumentDetails?.status) {
      successNotification("Document added successfully.");
      setSyncDocumentList(!syncDocumentList);
    }
  };

  const handleDocumentDeleteReq = async (documentId, checklist_id) => {
    const deleteCheckListDocument = await handleChecklistDocumentDelete(
      checklist_id,
      userDetails?.userInfo?.user_id
    );

    if (deleteCheckListDocument?.status) {
      const deleteResponse = await handleDocumentDelete(documentId);

      if (deleteResponse?.status === 200) {
        successNotification("Document removed successfully.");
      }
      setSyncDocumentList(!syncDocumentList);
    }
  };

  return (
    <div
      className="font-poppins mx-4 my-6 overflow-y-auto "
      style={{
        maxHeight: "65vh",
      }}
    >
    

      {documentList?.length ? (
        <div>
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
                  <div>
                    <a
                      href="null"
                      target="_blank"
                      id={document.document_id}
                      rel="noreferrer"
                    >
                      <Icons.Download className="w-4 text-black hover:text-brand-color" />
                    </a>
                  </div>
                  <div>
                    <Icons.Cross
                      className="w-2.5 text-red-500 ml-2 cursor-pointer"
                      onClick={() =>
                        handleDocumentDeleteReq(
                          document.document_id,
                          document?.id
                        )
                      }
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-slate-300">No Document List Added Yet</div>
      )}
    </div>
  );
};

export default CheckList;
