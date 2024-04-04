import { format } from 'date-fns';

import { api } from '@/trpc/server';

import { BillboardClient } from './_components/client';

type BillboardsPageProps = {
  params: { slug: string };
};

const BillboardsPage: React.FC<BillboardsPageProps> = async ({ params }) => {
  const { slug } = params;

  const billboards = await api.billboard.getAllByStoreSlug.query({
    storeSlug: slug,
  });

  const formattedBillboards = billboards.map((item) => ({
    id: item.billboard.id,
    label: item.billboard.label,
    createdAt: format(item.billboard.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardClient data={formattedBillboards} />
      </div>
    </div>
  );
};

export default BillboardsPage;
