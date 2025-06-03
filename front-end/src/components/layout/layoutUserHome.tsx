"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ExternalLink } from "@/assets/externalLink";

export const LayOutUser = () => {
  const pathname = usePathname();

  const links = [
    { href: "/home", label: "Home" },
    { href: "/explore", label: "Explore" },
    { href: "/me", label: "View page", icon: <ExternalLink /> },
    { href: "/account-settings", label: "Account settings" },
  ];

  return (
    <div className="w-[256px] h-[156px] grid grid-rows-4 gap-2">
      {links.map((link) => {
        const isActive = pathname === link.href;
        return (
          <Link key={link.href} href={link.href}>
            <div
              className={`flex items-center h-9 pl-4 rounded-md gap-2 ${
                isActive
                  ? "bg-black text-white"
                  : "hover:bg-black hover:text-white"
              }`}
            >
              {link.label}
              {link.icon}
            </div>
          </Link>
        );
      })}
    </div>
  );
};
