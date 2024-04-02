import { api } from "@/trpc/server";

type DashboardPageProps = {
  params: { slug: string };
};

const DashboardPage: React.FC<DashboardPageProps> = async ({
  params: { slug },
}) => {
  const store = await api.store.getBySlug.query({ slug });

  if (!store) {
    return <div>STORE NOT FOUND</div>;
  }

  return <div>Active Store: {store.name}</div>;
};

export default DashboardPage;
