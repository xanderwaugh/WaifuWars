import Link from "next/link";
import { NAV_ITEMS } from "~/utils";
import { useRouter } from "next/router";

const Header: React.FC = () => {
  const { pathname } = useRouter();

  return (
    <nav>
      <ul className="group flex w-full flex-row items-center justify-center gap-8 py-4 text-xl">
        {NAV_ITEMS.map((item) => (
          <li key={item.label}>
            <Link
              href={item.href}
              style={{
                color:
                  pathname === item.href ? "rgb(100, 116, 139)" : undefined,
                textDecoration: pathname === item.href ? "underline" : "none",
              }}
              className="link"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Header;
