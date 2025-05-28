"use client";

import { domAnimation, LazyMotion } from "motion/react";
import { Toaster } from "sonner";

import { WaifuProvider } from "~/components/lib/context";
import { toastOptions } from "~/lib/toast";
import { ThemeProvider } from "../ui/theme-provider";
import { Analytics } from "./analytics";

// import "react-toastify/dist/ReactToastify.css";

interface ProvidersProps {
  children?: React.ReactNode;
}

const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <Analytics>
      <LazyMotion features={domAnimation}>
        <ThemeProvider
          attribute="class"
          forcedTheme="light"
          defaultTheme="light"
          // enableSystem={true}
          // disableTransitionOnChange={true}
        >
          <WaifuProvider>{children}</WaifuProvider>
          <Toaster {...toastOptions} />
        </ThemeProvider>
      </LazyMotion>
    </Analytics>
  );
};

export { Providers };
