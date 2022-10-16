import messageSound from "../../../assets/Sounds/Message-notification.wav";
import remidnerSound from "../../../assets/Sounds/reminder.mp3";

const messageAudio = new Audio(messageSound);
const reminderAudio = new Audio(remidnerSound);

export const handleMessageAudio = () => {
  messageAudio.play();
};

export const handleReminderAudio = () => {
  reminderAudio.play();
};
