"use client";

import { VT323 } from "next/font/google";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { UserButton, useUser } from "@clerk/nextjs";

import { MainNav } from "./main-nav";

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

type NavbarProps = {
  id?: string;
};

export const Navbar: React.FC<NavbarProps> = () => {
  const { isSignedIn, user } = useUser();

  return (
    // <nav className="bg-teal-600 px-4 py-1.5 backdrop-blur-sm md:px-5">
    //   <div className="mx-auto flex items-center justify-between">
    //     <div className="flex flex-row items-center">
    //       <Image src="/favicon-32x32.png" height="32" width="32" alt="logo" />
    //       <Link href="/" className="hidden md:block">
    //         <span
    //           className={cn(
    //             pixel.className,
    //             "mr-4 self-center whitespace-nowrap text-2xl font-extrabold text-orange-500",
    //           )}
    //         >
    //           StoreBro
    //         </span>
    //       </Link>
    //       {/* <NavBarItem target="/products/" label="Products" />
    //       <NavBarItem target="/categories" label="Categories" />
    //       <NavBarItem target="/orders" label="Orders" /> */}
    //       <MainNav />
    //     </div>
    //     <div className="flex flex-row items-center gap-3">
    //       {user?.username && (
    //         <NavBarItem
    //           target={`/gallery/${user.username}`}
    //           label="Your Gallery"
    //         />
    //       )}
    //       {isSignedIn && <NavBarItem target={`/profile/`} label="Profile" />}
    //       <div>
    //         {!isSignedIn && <SignInButton />}
    //         <UserButton />
    //       </div>
    //     </div>
    //   </div>
    // </nav>
    <div className="border-b bg-teal-600">
      <div className="flex h-16 items-center px-4">
        {/* <StoreSwitcher items={stores} /> */}
        <MainNav className="mx-3" />
        <div className="ml-auto flex items-center space-x-4">
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </div>
  );
};
