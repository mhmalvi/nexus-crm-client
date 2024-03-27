import { toast } from "react-toastify";

export const successNotification = (e) => toast.success(e);
export const warningNotification = (e) => toast.warn(e);
export const errorNotification = (e) => toast.error(e);
export const infoNotification = (e) => toast.info(e);
