import messageSound from "../../../assets/Sounds/Message-notification.wav";
import remidnerSound from "../../../assets/Sounds/reminder.mp3";

const notificationAudio = new Audio(messageSound);
const reminderAudio = new Audio(remidnerSound);

export const handlesignUpSuccessfullAudio = () => {
  notificationAudio.play();
};

export const handleReminderAudio = () => {
  reminderAudio.play();
};
