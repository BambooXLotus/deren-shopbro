import { redirect } from "next/navigation";

import { AlertBox } from "@/components/alert-box";
import { api } from "@/trpc/server";
import { auth } from "@clerk/nextjs";

import { SettingsForm } from "./_components/settings-form";

type SettingsPageProps = {
  params: {
    slug: string;
  };
};

const SettingsPage: React.FC<SettingsPageProps> = async ({
  params: { slug },
}) => {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const store = await api.store.getBySlug.query({ slug });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        {!store ? (
          <AlertBox title="Store Not FOUND" description="NOT FOUND" />
        ) : (
          <SettingsForm initialData={store} />
        )}
      </div>
    </div>
  );
};

export default SettingsPage;
