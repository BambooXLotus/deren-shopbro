import { api } from "@/trpc/server";

import { BillboardForm } from "../_components/billboard-form";

type BillboardPageProps = {
  params: { billboardId: string };
};

const BillBoardPage: React.FC<BillboardPageProps> = async ({ params }) => {
  const { billboardId } = params;

  const billboard = await api.billboard.getById.query({
    billboardId: billboardId,
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8">
        <BillboardForm initialData={billboard} />
      </div>
    </div>
  );
};

export default BillBoardPage;
