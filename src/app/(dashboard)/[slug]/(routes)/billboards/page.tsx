import { BillboardClient } from "./_components/client";

type BillboardsPageProps = {
  params: { slug: string };
};

const BillboardsPage: React.FC<BillboardsPageProps> = async ({ params }) => {
  const { slug } = params;

  // const formattedBillboards = billboards.map((item) => ({
  //   id: item.id,
  //   label: item.label,
  //   createdAt: format(item.createdAt, "MMMM do, yyyy"),
  // }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardClient data={[]} />
      </div>
    </div>
  );
};

export default BillboardsPage;
