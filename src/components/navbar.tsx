"use client";

import { VT323 } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";

const pixel = VT323({
  weight: "400",
  subsets: ["latin"],
});

type NavBarItemProps = {
  target: string;
  label: string;
};

export const NavBarItem: React.FC<NavBarItemProps> = ({ target, label }) => {
  return (
    <div
      className={`${pixel.className} hover:deren-shadow hidden rounded-2xl px-2 py-1 text-xl text-white transition duration-300 hover:bg-teal-800 hover:opacity-80 md:block`}
    >
      <Link href={target}>{label}</Link>
    </div>
  );
};

type NavbarProps = {
  id?: string;
};

export const Navbar: React.FC<NavbarProps> = () => {
  const { isSignedIn, user } = useUser();

  // TODO: Gas Price
  // Don't think the gas price is correct
  // const { data: gasPrice } = api.alchemy.getGasPrice.useQuery();

  return (
    <nav className="w-full bg-teal-600 px-3 py-1.5 backdrop-blur-sm md:px-5">
      <div className="mx-auto flex items-center justify-between">
        <div className="flex flex-row items-center">
          <Image src="/favicon-32x32.png" height="32" width="32" alt="logo" />
          <Link href="/" className="hidden md:block">
            <span
              className={cn(
                pixel.className,
                "mr-4 self-center whitespace-nowrap text-2xl font-extrabold text-orange-500",
              )}
            >
              StoreBro
            </span>
          </Link>
          <NavBarItem target="/products/" label="Products" />
          <NavBarItem target="/categories" label="Categories" />
          <NavBarItem target="/orders" label="Orders" />
        </div>
        <div className="flex flex-row items-center gap-3">
          {/* Gas Price */}
          {/* <div>
            <Badge className="h-full">
              {gasPrice} <Diamond className="ml-1" />
            </Badge>
          </div> */}
          {user?.username && (
            <NavBarItem
              target={`/gallery/${user.username}`}
              label="Your Gallery"
            />
          )}
          {isSignedIn && <NavBarItem target={`/profile/`} label="Profile" />}
          <div>
            {!isSignedIn && <SignInButton />}
            <UserButton />
          </div>
        </div>
      </div>
    </nav>
  );
};
