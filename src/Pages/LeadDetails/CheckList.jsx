import { Modal, Upload } from "antd";
import React from "react";
import { useState } from "react";
import Icons from "../../Components/Shared/Icons";

const CheckList = ({ toggleChcekList, handleCancel }) => {
  const [fileList, setFileList] = useState([]);

  const handleChange = (info) => {
    let newFileList = [...info.fileList];

    newFileList = fileList.slice(-2);

    newFileList = fileList.map((file) => {
      if (file.response) {
        file.url = file.response.url;
      }

      return file;
    });
    setFileList(newFileList);
  };

  const props = {
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    onChange: handleChange,
    multiple: true,
  };

  return (
    <div
      className="font-poppins mx-4 my-6 overflow-y-auto "
      style={{
        maxHeight: "65vh",
      }}
    >
      <div>
        <h1 className="text-xl font-medium mb-6">Certificates :</h1>
      </div>
      {checkLists.map((certificate, i) => (
        <div className="flex items-center text-sm mb-4 ml-6">
          <span>{i + 1}.</span>
          <span className="mx-2">{certificate} : </span>
          <div className="bg-gray-100 px-2 py-0.5 shadow rounded-lg">
            <Upload {...props} fileList={fileList}>
              <div className="flex items-center">
                <Icons.Clip className="w-3 mr-1.5" />
                <div className="text-sm font-light">{certificate}.pdf</div>
              </div>
            </Upload>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CheckList;

const checkLists = [
  "S.S.C Certificate",
  "H.S.C Certificate",
  "P.S.C Certificate",
  "J.S.C Certificate",
  "K.S.C Certificate",
  "S.S.C Certificate",
  "H.S.C Certificate",
  "P.S.C Certificate",
  "J.S.C Certificate",
  "K.S.C Certificate",
  "S.S.C Certificate",
  "H.S.C Certificate",
  "P.S.C Certificate",
  "J.S.C Certificate",
  "K.S.C Certificate",
  "S.S.C Certificate",
  "H.S.C Certificate",
  "P.S.C Certificate",
  "J.S.C Certificate",
  "K.S.C Certificate",
  "S.S.C Certificate",
  "H.S.C Certificate",
  "P.S.C Certificate",
  "J.S.C Certificate",
  "K.S.C Certificate",
  "S.S.C Certificate",
  "H.S.C Certificate",
  "P.S.C Certificate",
  "J.S.C Certificate",
  "K.S.C Certificate",
];
