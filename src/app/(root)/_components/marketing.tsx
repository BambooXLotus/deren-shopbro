import { LoaderIcon } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
  ClerkLoaded,
  ClerkLoading,
  SignedOut,
  SignInButton,
  SignUpButton,
} from "@clerk/nextjs";

type MarketingProps = {
  id?: string;
};

export const Marketing: React.FC<MarketingProps> = () => {
  return (
    <div className="mx-auto flex w-full max-w-[988px] flex-1 flex-col items-center justify-center gap-2 p-4 lg:flex-row">
      <div className=" relative mb-8 h-[240px] w-[240px] lg:mb-0 lg:h-[424px] lg:w-[424px]">
        <Image src="/hero.png" fill alt="Hero" />
      </div>
      <div className="flex flex-col items-center gap-y-8">
        <h1 className="max-w-[480px] text-center text-xl font-bold text-teal-700 lg:text-3xl">
          Empower Your E-Commerce Journey with StoreBro: Simplify, Manage, and
          Grow Your Online Store Effortlessly
        </h1>
        <div className="flex w-full max-w-[330px] flex-col items-center gap-y-3">
          <ClerkLoading>
            <LoaderIcon className="h-5 w-5 animate-spin text-muted-foreground" />
          </ClerkLoading>
          <ClerkLoaded>
            <SignedOut>
              <SignUpButton mode="modal" afterSignInUrl="/" afterSignUpUrl="/">
                <Button size="lg" variant="default" className="w-full">
                  Get Started
                </Button>
              </SignUpButton>
              <SignInButton mode="modal" afterSignInUrl="/" afterSignUpUrl="/">
                <Button size="lg" variant="outline" className="w-full">
                  I already have an account
                </Button>
              </SignInButton>
            </SignedOut>
          </ClerkLoaded>
        </div>
      </div>
    </div>
  );
};
