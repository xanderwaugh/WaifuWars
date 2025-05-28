"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { NAV_ITEMS } from "~/lib";
import { cn } from "~/lib/tw";

/**
 * Function to return 0 (Home), 1 (Results), 2 (About)
 */
const getActiveIndex = (pathname: string): number => {
  if (pathname === "/") return 0;
  if (pathname.startsWith("/results")) return 1;
  if (pathname.startsWith("/about")) return 2;
  return -1;
};

export const Header: React.FC = () => {
  const pathname = usePathname();
  const activeIdx = getActiveIndex(pathname);

  return (
    <nav>
      <ul className="flex w-full flex-row items-center justify-center gap-8 py-4 text-xl">
        {NAV_ITEMS.map((item, idx) => (
          <li key={item.label}>
            <Link
              href={item.href}
              className={cn(
                "link",
                activeIdx === idx && "text-nav-active underline",
              )}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
