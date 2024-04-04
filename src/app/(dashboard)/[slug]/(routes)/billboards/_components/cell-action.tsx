"use client";

import { useState } from 'react';

import {
  Copy,
  Edit,
  MoreHorizontal,
  Trash,
} from 'lucide-react';
import {
  useParams,
  useRouter,
} from 'next/navigation';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { type BillboardColumn } from './columns';

type CellActionProps = {
  data: BillboardColumn;
};

type CellActionParams = {
  slug: string;
};

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams<CellActionParams>();

  const [open, setOpen] = useState(false);

  const storeSlug = params.slug;

  // const { mutate: deleteBillboard, isLoading: isDeleteLoading } = useMutation({
  //   mutationFn: async () => {
  //     await axios.delete(`/api/${storeId}/billboards/${data.id}`);
  //   },
  //   onSuccess: () => {
  //     toast.success("Billboard Deleted.");
  //   },
  //   onError: (error) => {
  //     console.log("error", error);
  //     toast.error("Make sure you removed all categories first.");
  //   },
  //   onSettled: () => {
  //     router.refresh();
  //     setOpen(false);
  //   },
  // });

  async function onCopy(id: string) {
    await navigator.clipboard.writeText(id).then(() => {
      toast.success("Billboard Id copied to clipboard.");
    });
  }

  return (
    <>
      {/* <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={deleteBillboard}
        isLoading={isDeleteLoading}
      /> */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => void onCopy(data.id)}>
            <Copy className="mr-2 h-4 w-4" />
            Copy Id
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => router.push(`/${storeSlug}/billboards/${data.id}`)}
          >
            <Edit className="mr-2 h-4 w-4" />
            Update
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
