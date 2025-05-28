import type { ToasterProps } from "sonner";
import { toast } from "sonner";

export const toastOptions: ToasterProps = {
  position: "bottom-right",
  richColors: true,
  duration: 5000,
  // autoClose: 5000,
  // hideProgressBar: false,
  // closeOnClick: true,
  // draggable: true,
  // progress: undefined,
  // theme: "colored",
};

export const successToast = (msg: string) => {
  toast.success(msg, toastOptions);
};

export const infoToast = (msg: string) => {
  toast.info(msg, toastOptions);
};

export const errorToast = (msg?: string) => {
  toast.error(msg ?? "Error...", toastOptions);
};
