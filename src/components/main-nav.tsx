"use client";

import { useParams, usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

import { NavBarItem } from "./navbar";

export const MainNav: React.FC<React.HtmlHTMLAttributes<HTMLElement>> = ({
  className,
}) => {
  const pathname = usePathname();
  const params = useParams();
  const storeId = params.storeId as string;

  if (!storeId) {
    return <></>;
  }

  const routes = [
    {
      href: `/${storeId}`,
      label: "Overview",
      active: pathname === `/${storeId}`,
    },
    {
      href: `/${storeId}/billboards`,
      label: "Billboards",
      active: pathname === `/${storeId}/billboards`,
    },
    {
      href: `/${storeId}/categories`,
      label: "Categories",
      active: pathname === `/${storeId}/categories`,
    },
    {
      href: `/${storeId}/sizes`,
      label: "Sizes",
      active: pathname === `/${storeId}/sizes`,
    },
    {
      href: `/${storeId}/colors`,
      label: "Colors",
      active: pathname === `/${storeId}/colors`,
    },
    {
      href: `/${storeId}/products`,
      label: "Products",
      active: pathname === `/${storeId}/products`,
    },
    {
      href: `/${storeId}/orders`,
      label: "Orders",
      active: pathname === `/${storeId}/orders`,
    },
    {
      href: `/${storeId}/settings`,
      label: "Settings",
      active: pathname === `/${storeId}/settings`,
    },
  ];

  return (
    <nav className={cn("flex items-center space-x-2 lg:space-x-4", className)}>
      {routes.map((route) => (
        <NavBarItem
          key={route.href}
          label={route.label}
          target={route.href}
          active={route.active}
        />
      ))}
    </nav>
  );
};
