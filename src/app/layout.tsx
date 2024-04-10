import "@/styles/globals.css";

import { Metadata } from "next";
import { DM_Sans } from "next/font/google";

import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { siteConfig } from "@/config/site";
import { ModalProvider } from "@/providers/modal-provider";
import { TRPCReactProvider } from "@/trpc/react";
import { ClerkProvider } from "@clerk/nextjs";

const font = DM_Sans({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`, // My-Store | StoreBro
  },
  description: "Multi store admin",
  icons: [{ rel: "icon", url: "/favicon.ico", href: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`font-sans ${font.className}`}>
          <TRPCReactProvider>
            <TooltipProvider>
              {children}
              <Toaster />
              <ModalProvider />
            </TooltipProvider>
          </TRPCReactProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
