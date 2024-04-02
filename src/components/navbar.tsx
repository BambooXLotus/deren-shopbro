import { LoaderIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { SelectStore } from "@/server/db/schema";
import { api } from "@/trpc/server";
import {
  auth,
  ClerkLoaded,
  ClerkLoading,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";

import { MainNav } from "./main-nav";
import { StoreSwitcher } from "./store-switcher";
import { Button } from "./ui/button";

export const Navbar: React.FC = async () => {
  // const { isSignedIn, user } = useUser();
  const { userId } = auth();
  let stores: SelectStore[] = [];
  if (userId) {
    stores = await api.store.getAll.query();
  }

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
    <div className="border-b bg-teal-600 ">
      <div className="flex h-16 items-center px-4">
        <Link href="/" className="hidden md:block">
          <Image
            src="/android-chrome-192x192.png"
            height="64"
            width="64"
            alt="StoreBro Logo"
            className="mr-2"
          />
        </Link>
        <SignedIn>
          <StoreSwitcher items={stores} />
        </SignedIn>
        <MainNav className="mx-3" />
        <div className="ml-auto flex items-center space-x-4">
          <ClerkLoading>
            <LoaderIcon className="h-5 w-5 animate-spin text-white" />
          </ClerkLoading>
          <ClerkLoaded>
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal">
                <Button>Sign In</Button>
              </SignInButton>
            </SignedOut>
          </ClerkLoaded>
        </div>
      </div>
    </div>
  );
};
