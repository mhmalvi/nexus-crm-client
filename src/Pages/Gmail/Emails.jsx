import React from "react";
import { useState, useEffect } from "react";
import Email from "./Email";
import { Modal } from "antd";
import EmailDetail from "./EmailDetail";
import { handleFetchEmailDetails, handleFetchEmails } from "../../Components/services/gmail";

const Emails = () => {
  const [emailDetails, setEmailDetails] = useState([]);
  const [selectedEmailId, setSelectedEmailId] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);


    useEffect(() => {
      (async () => {
        const fetchmails = await handleFetchEmails();
        if (fetchmails?.messages) {
          let mails=[]
          for (let i = 0; i < fetchmails?.messages?.length && i<8; i++) {
            const fetchmailDetails = await handleFetchEmailDetails(
              fetchmails?.messages[i].id
            );
            mails.push(fetchmailDetails)
          }
          setEmailDetails(mails)
        }
      })();
    }, []);
    

  const showModal = (id) => {
    setIsModalOpen(true);
    setSelectedEmailId(id);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div>
        {emailDetails?.map((email) => (
          <div key={email?.id} onClick={() => showModal(email?.id)}>
            <Email
              emailId={email?.id}
              expeditor={
                email?.payload?.headers?.find((h) => h.name === "From")?.value
              }
              messageSubject={
                email?.payload?.headers?.find((h) => h.name === "Subject")
                  ?.value
              }
              messageSnippet={email?.snippet}
              timestamp={
                email?.payload?.headers?.find((h) => h.name === "Date")?.value
              }
            />
          </div>
        ))}
      </div>

      <Modal
        className=""
        title={false}
        footer={false}
        visible={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={"70%"}
      >
        <EmailDetail selectedEmailId={selectedEmailId} />
      </Modal>
    </>
  );
};

export default Emails;
