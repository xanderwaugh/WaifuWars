import Link from "next/link";
import { NAV_ITEMS } from "~/utils";
// import { useRouter } from "next/router";

const Header: React.FC = () => {
  // const router = useRouter();
  // const path = router.pathname + "/";

  return (
    <div className="flex w-full flex-row items-center justify-center gap-8 py-4 text-xl">
      {NAV_ITEMS.map((item) => (
        <Link
          href={item.href}
          key={item.label}
          // style={{
          //   textDecoration: path === item.href ? "underline" : "none",
          // }}
          className="link"
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
};

export default Header;
