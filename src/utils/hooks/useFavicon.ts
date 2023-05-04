import { useEffect } from "react";

interface useFaviconProps {
  href: string;
}

export const useFavicon = ({ href }: useFaviconProps) => {
  useEffect(() => {
    const link: HTMLLinkElement =
      document.querySelector("link[rel*='icon']") ||
      document.createElement("link");
    link.type = "image/x-icon";
    link.rel = "shortcut icon";
    link.href = href;
    document.getElementsByTagName("head")[0]?.appendChild(link);
  }, [href]);
};
