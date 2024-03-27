import { ArrowRightIcon } from 'lucide-react';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { useStoreModal } from '@/hooks/use-store-modal';

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
    <div className="flex flex-col items-center space-y-4">
      <Image
        src="/storebro-logo.png"
        height="192"
        width="192"
        alt="logo"
        className="mr-2"
      />

      <h2 className="text-3xl font-semibold">
        Welcome to <span className="text-orange-600 underline">StoreBro</span>
      </h2>
      <p>Let's get started by creating your first store.</p>
      <Button className="bg-teal-700" onClick={() => onOpen()}>
        Create Store <ArrowRightIcon className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
};
