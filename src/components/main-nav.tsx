"use client";

import { VT323 } from "next/font/google";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

const pixel = VT323({
  weight: "400",
  subsets: ["latin"],
});

type NavBarItemProps = {
  target: string;
  label: string;
  active?: boolean;
};

export const NavBarItem: React.FC<NavBarItemProps> = ({
  target,
  label,
  active,
}) => {
  return (
    // TODO: text glow on hover
    <div
      className={cn(
        pixel.className,
        "hover:deren-shadow hidden rounded-2xl px-1 py-1 text-xl text-white transition duration-300 hover:bg-teal-800 hover:text-orange-400 hover:opacity-80 md:block",
        active ? "text-orange-500" : "text-muted-foreground",
      )}
    >
      <Link href={target}>{label}</Link>
    </div>

    // <Link
    //   key={target}
    //   href={target}
    //   className={cn(
    //     pixel.className,
    //     "text-xl font-medium transition-colors hover:text-primary",
    //     active ? "text-black dark:text-white" : "text-muted-foreground",
    //   )}
    // >
    //   {label}
    // </Link>
  );
};

export const MainNav: React.FC<React.HtmlHTMLAttributes<HTMLElement>> = ({
  className,
}) => {
  const pathname = usePathname();
  const params = useParams();
  const slug = params.slug as string;

  if (!slug) {
    return <></>;
  }

  const routes = [
    {
      href: `/${slug}`,
      label: "Overview",
      active: pathname === `/${slug}`,
    },
    {
      href: `/${slug}/billboards`,
      label: "Billboards",
      active: pathname === `/${slug}/billboards`,
    },
    {
      href: `/${slug}/categories`,
      label: "Categories",
      active: pathname === `/${slug}/categories`,
    },
    {
      href: `/${slug}/sizes`,
      label: "Sizes",
      active: pathname === `/${slug}/sizes`,
    },
    {
      href: `/${slug}/colors`,
      label: "Colors",
      active: pathname === `/${slug}/colors`,
    },
    {
      href: `/${slug}/products`,
      label: "Products",
      active: pathname === `/${slug}/products`,
    },
    {
      href: `/${slug}/orders`,
      label: "Orders",
      active: pathname === `/${slug}/orders`,
    },
    {
      href: `/${slug}/settings`,
      label: "Settings",
      active: pathname === `/${slug}/settings`,
    },
  ];

  return (
    <nav className={cn("flex", className)}>
      <div className="flex items-center space-x-2 lg:space-x-4">
        {routes.map((route) => (
          <NavBarItem
            key={route.href}
            label={route.label}
            target={route.href}
            active={route.active}
          />
        ))}
      </div>
    </nav>
  );
};
