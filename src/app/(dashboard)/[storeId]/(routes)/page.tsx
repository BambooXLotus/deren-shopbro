import { api } from "@/trpc/server";

type DashboardPageProps = {
  params: { storeId: string };
};

const DashboardPage: React.FC<DashboardPageProps> = async ({ params }) => {
  const storeNumber = parseInt(params.storeId);
  const store = await api.store.getById.query({ storeId: storeNumber });

  return <div>Active Store: {store?.name}</div>;
};

export default DashboardPage;
