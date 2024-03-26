import { notFound, redirect } from "next/navigation";

import { Navbar } from "@/components/navbar";
import { api } from "@/trpc/server";
import { auth } from "@clerk/nextjs";

type DashboardLayoutProps = {
  children: React.ReactNode;
  params: { storeId: string };
};

const DashboardLayout: React.FC<DashboardLayoutProps> = async ({
  children,
  params,
}) => {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const storeNumber = parseInt(params.storeId);
  const store = await api.store.getById.query({ storeId: storeNumber });

  if (!store) {
    return notFound();
  }

  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default DashboardLayout;
