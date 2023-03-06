import { message } from "antd";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import React, { useState } from "react";
import { GrAttachment } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { closeMessageBox } from "./features/mailSlice";
import { selectMailUser } from "./features/mailUserSlice";
import { db } from "./Firebase/firebase";

const Compose = () => {
  const dispatch = useDispatch();
  const mailUser = useSelector(selectMailUser);
  const userCollectionRef = collection(db, "emails");
  const [btnActive, setBtnActive] = useState(false);

  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");

  const mailSubmit = async(e) => {
    e.preventDefault();
    if(to !== "" && body !== ""){
      await addDoc(userCollectionRef, {
        to: to,
        from: mailUser?.email,
        FromUserName: mailUser?.displayName,
        subject: subject,
        body: body,
        time: new Date().toString(),
      });
      setTo("");
      setSubject("");
      setBody("");
      setBtnActive(false);
      message.success("Email successfully sent.");
      dispatch(closeMessageBox());
    }
  };

  const handleSendBtn = () => {
    setBtnActive(true);
  }

  return (
    <div className="absolute top-[38vh] right-4 w-[600px] shadow-md">
      <div className="w-full flex justify-between h-9 bg-zinc-900 text-white rounded-tr-lg rounded-tl-lg">
        <div className="flex items-center ml-5 pt-1.5">New message</div>
        <div className="flex justify-around gap-2 mr-5">
          <div className="flex items-center pt-1.5 px-1 cursor-pointer hover:text-slate-300">
            _
          </div>
          <div
            onClick={() => {
              dispatch(closeMessageBox());
            }}
            className="flex items-center pt-1.5 px-1 cursor-pointer hover:text-slate-300"
          >
            X
          </div>
        </div>
      </div>
      <form onSubmit={mailSubmit}>
        <div className="min-h-[500px] border-l border-r bg-white p-2">
          <div className="flex h-9">
            <input
              name="receiptient"
              type="email"
              placeholder="Receipients"
              className="w-full outline-none px-2"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              required
            />
          </div>
          <div className="flex h-9 mt-1">
            <input
              name="subject"
              type="text"
              placeholder="Subject"
              className="w-full outline-none px-2"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>
          <textarea
            className="w-full h-[41vh] outline-none mt-1 p-2"
            name="body"
            id=""
            cols="30"
            rows="10"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
          ></textarea>
        </div>

        <div className="flex bg-white border-l border-r border-b h-12 px-2 gap-4">
          <button
            type="submit"
            onClick={handleSendBtn}
            className={`flex items-center text-white ${
              btnActive ? "bg-sky-700" : "bg-sky-600"
            } rounded-md px-3 mb-2 cursor-pointer`}
          >
            Send
          </button>
          <GrAttachment
            title="attachments"
            className="text-xl mt-2 cursor-pointer"
          />
        </div>
      </form>
    </div>
  );
};

export default Compose;
