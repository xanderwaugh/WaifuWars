import { toast, type ToastOptions } from "react-toastify";

export const toastOptions: ToastOptions = {
  position: "bottom-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  draggable: true,
  progress: undefined,
  theme: "colored",
};

export const successToast = (msg: string) => {
  toast.success(msg, toastOptions);
};

export const infoToast = (msg: string) => {
  toast.info(msg, toastOptions);
};

export const errorToast = (msg?: string) => {
  toast.error(msg ? msg : "Error...", toastOptions);
};
