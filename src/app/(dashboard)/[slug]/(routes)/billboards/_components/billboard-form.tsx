"use client";

import { useState } from 'react';

import { Trash } from 'lucide-react';
import {
  useParams,
  useRouter,
} from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { Heading } from '@/components/heading';
import { AlertModal } from '@/components/modals/alert-modal';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import {
  BillboardFormValidator,
  BillboardRequest,
} from '@/lib/validators/billboard-validators';
import { SelectBillboard } from '@/server/db/schema';
import { api } from '@/trpc/react';
import { zodResolver } from '@hookform/resolvers/zod';

type BillboardFormProps = {
  initialData?: SelectBillboard;
};

type BillboardParams = {
  slug: string;
  billboardId: string;
};

export const BillboardForm: React.FC<BillboardFormProps> = ({
  initialData,
}) => {
  const params = useParams<BillboardParams>();
  const router = useRouter();

  const [open, setOpen] = useState(false);

  const title = initialData ? "Edit billboard" : "Create billboard";
  const description = initialData ? "Edit a billboard" : "Add a new billboard";
  const action = initialData ? "Save Changes" : "Create";

  const form = useForm<BillboardRequest>({
    resolver: zodResolver(BillboardFormValidator),
    defaultValues: initialData ?? {
      label: "",
      imageUrl: null,
    },
  });

  const storeSlug = params.slug;
  const billboardId = params.billboardId;

  const { mutate: addBillboard, isLoading: isAddLoading } =
    api.billboard.create.useMutation({
      onSuccess: (billboards) => {
        const billboard = billboards[0];

        if (billboard && form.formState.isSubmitSuccessful) {
          toast.success("Billboard created.");
          router.push(`/${storeSlug}/billboards/${billboard.id}`);
        }
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });

  const { mutate: editBillboard, isLoading: isEditLoading } =
    api.billboard.edit.useMutation({
      onSuccess: (billboards) => {
        const billboard = billboards[0];

        if (billboard && form.formState.isSubmitSuccessful) {
          toast.success("Billboard updated.");
          // router.refresh();
          router.push(`/${storeSlug}/billboards/${billboard.id}`);
        }
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });

  const { mutate: deleteBillboard, isLoading: isDeleteLoading } =
    api.billboard.delete.useMutation({
      onSuccess: () => {
        toast.success("Billboard Deleted.");
      },
      onError: (error) => {
        // toast.error("Make sure you removed all categories first.");
        toast.error(error.message);
      },
      onSettled: () => {
        router.push(`/${storeSlug}/billboards`);
      },
    });

  function onSubmit(data: BillboardRequest) {
    if (initialData) {
      editBillboard({
        billboardId,
        ...data,
      });
    } else {
      addBillboard({
        storeSlug,
        ...data,
      });
    }
  }

  const isLoading = isAddLoading || isEditLoading || isDeleteLoading;

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={() =>
          deleteBillboard({
            billboardId,
          })
        }
        isLoading={isLoading}
      />
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            variant="destructive"
            size="icon"
            disabled={isLoading}
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          className="w-full space-y-8"
          onSubmit={(event) => void form.handleSubmit(onSubmit)(event)}
        >
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Background image</FormLabel>
                <FormControl>
                  {/* <ImageUpload
                    value={field.value ? [field.value] : []}
                    disabled={isLoading}
                    onChange={(url) => field.onChange(url)}
                    onRemove={() => field.onChange("")}
                  /> */}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="label"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Label</FormLabel>
                  <FormControl>
                    <Input placeholder="Billboard label" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit">{action}</Button>
        </form>
      </Form>
      <Separator />
    </>
  );
};
