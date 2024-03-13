import { ArrowRightIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useStoreModal } from "@/hooks/use-store-modal";

export const Welcome: React.FC = () => {
  const onOpen = useStoreModal((state) => state.onOpen);
  // const isOpen = useStoreModal((state) => state.isOpen);

  // const hello = api.store.hello.useQuery();

  // useEffect(() => {
  //   if (!isOpen) {
  //     onOpen();
  //   }
  // }, [isOpen, onOpen]);

  //IF no stores show the welcome thingy
  return (
    <div className="space-y-4">
      <h2 className="text-3xl font-semibold">
        Welcome to <span className="text-teal-600 underline">deren-shop</span>{" "}
        Admin
      </h2>
      <p>Let's get started by creating your first store.</p>
      <Button className="bg-teal-700" onClick={() => onOpen()}>
        Create Store <ArrowRightIcon className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
};
