import { Base64 } from "js-base64";
import React, { useEffect, useState } from "react";
import guy from "../../assets/Images/guy.jpg";
import { handleFetchEmailDetails } from "../../Components/services/gmail";

const EmailDetail = ({ selectedEmailId }) => {
  const [details, setDetails] = useState([]);
  const [messagePart, setMessagePart] = useState();
  const [weekdayNum, setWeekweekdayNum] = useState();
  console.log("in details", selectedEmailId);

  useEffect(() => {
    (async () => {
      const fetchmailDetails = await handleFetchEmailDetails(selectedEmailId);
      setDetails(fetchmailDetails);
      console.log("single", details);
    })();

  }, [details, selectedEmailId]);
  
  useEffect(() => {
    const date = details?.payload?.headers?.find(
      (h) => h.name === "Date"
    )?.value;
    const convertableDate = new Date(date);
    const weekday = convertableDate.getDay();
    setWeekweekdayNum(weekday);
    console.log("weekday", weekdayNum);
  }, [details, weekdayNum]);
  

  useEffect(() => {
    if (details?.payload?.parts.find((s) => s.mimeType === "text/html")) {
      const base64EncodedString = details?.payload?.parts[1]?.body?.data;
      const decodedString = Base64.decode(base64EncodedString);
      console.log("covertedBody", decodedString);
      setMessagePart(decodedString);
    }else{
    setMessagePart();
    }
  }, [details]);

  return (
    <div>
      <div className="text-2xl font-semibold mt-10">
        {details?.payload?.headers?.find((h) => h.name === "Subject")?.value}
      </div>
      <div className="flex justify-between py-5">
        <div className="flex items-center p-[2px] rounded-full">
          <img
            src={guy}
            alt=""
            className="object-cover rounded-full w-[40px] h-[40px] "
          />
          <div className="flex-col pl-2">
            <div className="font-semibold">
              {details?.payload?.headers?.find((h) => h.name === "From")?.value}
            </div>
          </div>
        </div>
        <div>
          {weekdayNum === 0 && "Sunday, "}
          {weekdayNum === 1 && "Monday, "}
          {weekdayNum === 2 && "Tuesday, "}
          {weekdayNum === 3 && "Wednesday, "}
          {weekdayNum === 4 && "Thursday, "}
          {weekdayNum === 5 && "Friday, "}
          {weekdayNum === 6 && "Saturday, "}
          {new Date(
            details?.payload?.headers?.find((h) => h.name === "Date")?.value
          ).toLocaleString()}
        </div>
      </div>

      <div dangerouslySetInnerHTML={{ __html: messagePart }}></div>
    </div>
  );
};

export default EmailDetail;
