import notification from "../../../assets/Sounds/notification.wav";

const notificationAudio = new Audio(notification);

export const handlesignUpSuccessfullAudio = () => {
  notificationAudio.play();
};
