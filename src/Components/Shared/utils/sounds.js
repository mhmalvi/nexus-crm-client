import messageNotification from "../../../assets/Sounds/Message-notification.wav";

const notificationAudio = new Audio(messageNotification);

export const handlesignUpSuccessfullAudio = () => {
  notificationAudio.play();
};
