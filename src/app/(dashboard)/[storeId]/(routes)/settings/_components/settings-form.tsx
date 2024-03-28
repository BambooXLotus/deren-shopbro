"use client";

import { useState } from "react";

import { Trash2Icon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { ApiAlert } from "@/components/api-alert";
import { Heading } from "@/components/heading";
import { AlertModal } from "@/components/modals/alert-modal";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useOrigin } from "@/hooks/use-origin";
import {
  type StoreEditRequest,
  StoreEditValidator,
} from "@/lib/validators/store-validators";
import { Store } from "@/server/db/schema";
import { zodResolver } from "@hookform/resolvers/zod";

type SettingsFormProps = {
  initialData: Store;
};

export const SettingsForm: React.FC<SettingsFormProps> = ({ initialData }) => {
  const params = useParams();
  const router = useRouter();
  const origin = useOrigin();

  const [open, setOpen] = useState(false);

  const form = useForm<StoreEditRequest>({
    resolver: zodResolver(StoreEditValidator),
    defaultValues: initialData,
  });

  const storeId = params.storeId as string;

  // const { mutate: editStore, isLoading: isEditLoading } = useMutation({
  //   mutationFn: async (values: StoreEditRequest) => {
  //     const { data } = await axios.patch<Store>(
  //       `/api/stores/${storeId}`,
  //       values,
  //     );
  //     return data;
  //   },
  //   onSuccess: () => {
  //     if (form.formState.isSubmitSuccessful) {
  //       toast.success("Store Updated.");
  //       router.refresh();
  //     }
  //   },
  //   onError: (error) => {
  //     console.log("error", error);
  //     toast.error("Something Wong!!!");
  //   },
  // });

  // const { mutate: deleteStore, isLoading: isDeleteLoading } = useMutation({
  //   mutationFn: async () => {
  //     await axios.delete(`/api/stores/${storeId}`);
  //   },
  //   onSuccess: () => {
  //     toast.success("Store Deleted.");
  //     router.refresh();
  //     router.push("/");
  //   },
  //   onError: (error) => {
  //     console.log("error", error);
  //     toast.error("Make sure you removed all products and categories first.");
  //   },
  // });

  const isLoading = false;

  function onSubmit(data: StoreEditRequest) {
    // editStore(data);
  }

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={() => console.log()}
        isLoading={isLoading}
      />
      <div className="flex items-center justify-between">
        <Heading title="Settings" description="Manage store preferences" />
        <Button
          variant="destructive"
          size="icon"
          disabled={isLoading}
          onClick={() => setOpen(true)}
        >
          <Trash2Icon className="h-4 w-4" />
        </Button>
      </div>
      <Separator />
      <Form {...form}>
        <form
          className="w-full space-y-8"
          onSubmit={(event) => void form.handleSubmit(onSubmit)(event)}
        >
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="Store name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" disabled={isLoading}>
            Save Changes
          </Button>
        </form>
      </Form>
      <Separator />
      <ApiAlert
        title="NEXT_PUBLIC_API_URL"
        description={`${origin}/api/${storeId}`}
        variant="public"
      />
    </>
  );
};
