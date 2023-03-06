import React from "react";
import { useState, useEffect } from "react";
import Email from "./Email";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./Firebase/firebase";
import { Modal } from "antd";
import EmailDetail from "./EmailDetail";

const Emails = () => {
  const [emails, setEmails] = useState([]);
  const [selectedEmailId, setSelectedEmailId] = useState();
  const [selectedEmail, setSelectedEmail] = useState([]);
  const userCollectionRef = collection(db, "emails");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    (async () => {
      const mails = [];
      const querySnapshot = await getDocs(userCollectionRef, "time", "asc");
      querySnapshot.forEach((doc) => mails.push({ id: doc.id, ...doc.data() }));
      setEmails(mails);
    })();
  }, []);

  useEffect(() => {
    const selected = emails.find(
      (doc) => doc.id.toString() === selectedEmailId.toString()
    );
    setSelectedEmail(selected);
    console.log("selected email", selectedEmail);
  }, [selectedEmailId]);

  console.log("result", emails);

  const showModal = (id) => {
    setIsModalOpen(true);
    setSelectedEmailId(id);
    console.log("selected email id", selectedEmailId);
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
        {emails?.map((email) => (
          <div onClick={() => showModal(email?.id)}>
            <Email
              emailId={email?.id}
              expeditor={email?.FromUserName}
              messageTitle={email?.subject}
              message={email?.body}
              timestamp={email?.time}
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
        height={"80%"}
      >
        <EmailDetail selectedEmail={selectedEmail} />
      </Modal>
    </>
  );
};

export default Emails;
