import { Navbar } from "@/components/navbar";

type DashboardLayoutProps = {
  children: React.ReactNode;
  params: { storeId: string };
};

const DashboardLayout: React.FC<DashboardLayoutProps> = async ({
  children,
  params,
}) => {
  // const { userId } = auth();

  // if (!userId) {
  //   redirect("/sign-in");
  // }

  // NOTE: enable this if you want everything to 404 if its not found
  // const storeNumber = parseInt(params.storeId);
  // const store = await api.store.getById.query({ storeId: storeNumber });

  // if (!store) {
  //   return notFound();
  // }

  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default DashboardLayout;
