import { redirect } from "next/navigation";

import { api } from "@/trpc/server";
import { auth } from "@clerk/nextjs";

type RootLayoutProps = {
  children: React.ReactNode;
};

const RootLayout: React.FC<RootLayoutProps> = async ({ children }) => {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  //TODO: Show a welcome screen with a list of stores
  const store = await api.store.getFirstByUserId.query({ userId });

  if (store) {
    redirect(`/${store.id}`);
  }

  return (
    <div className="h-screen">
      <div className="flex h-full items-center justify-center p-6">
        {children}
      </div>
    </div>
  );
};

export default RootLayout;
