"use client";
import { WaifuProvider } from "~/components/Utils/Context";

import { ToastContainer } from "react-toastify";
import { toastOptions } from "~/utils/toast";
import "react-toastify/dist/ReactToastify.css";

interface ProvidersProps {
  children?: React.ReactNode;
}

const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <>
      <WaifuProvider>
        {/*  */}
        {children}
      </WaifuProvider>

      <ToastContainer
        {...toastOptions}
        toastClassName="font-sans"
        className="font-sans"
      />
    </>
  );
};

export default Providers;
