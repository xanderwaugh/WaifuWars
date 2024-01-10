"use client";
import { useEffect, useState } from "react";

const ViewPageData: React.FC = () => {
  const [text, setText] = useState<string>("loading...");

  useEffect(() => {
    if (!window || typeof window === "undefined") return;

    const nextData = document.getElementById("__NEXT_DATA__")?.textContent;
    const data: unknown = JSON.parse(!!nextData ? nextData : "{}");
    setText(JSON.stringify(data, null, 2));
  }, []);

  return (
    <div>
      <pre>{text}</pre>
    </div>
  );
};

export default ViewPageData;
