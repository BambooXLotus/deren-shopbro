"use client";

import { useState } from "react";

import { Trash2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

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
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useOrigin } from "@/hooks/use-origin";
import {
  type StoreEditRequest,
  StoreEditValidator,
} from "@/lib/validators/store-validators";
import { SelectStore } from "@/server/db/schema";
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";

type SettingsFormProps = {
  initialData: SelectStore;
};

export const SettingsForm: React.FC<SettingsFormProps> = ({ initialData }) => {
  const router = useRouter();
  const origin = useOrigin();

  const [open, setOpen] = useState(false);

  const storeId = initialData.id;

  const form = useForm<StoreEditRequest>({
    resolver: zodResolver(StoreEditValidator),
    defaultValues: initialData,
  });

  const { mutate: editStore, isLoading: isEditLoading } =
    api.store.edit.useMutation({
      onSuccess: (stores) => {
        const store = stores[0];
        if (store && form.formState.isSubmitSuccessful) {
          toast.success("Store Updated.");
          router.push(`/${store.slug}/settings`);
        }
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });

  const { mutate: deleteStore, isLoading: isDeleteLoading } =
    api.store.delete.useMutation({
      onSuccess: () => {
        toast.success("Store Deleted.");
        router.refresh();
        router.push("/");
      },
      onError: (error) => {
        console.log("error", error);
        toast.error("Make sure you removed all products and categories first.");
      },
    });

  const isLoading = isEditLoading || isDeleteLoading;

  function onFormSubmit(data: StoreEditRequest) {
    editStore({ storeId, name: data.name });
  }

  function onDelete() {
    deleteStore({ storeId });
  }

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={() => onDelete()}
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
          onSubmit={(event) => void form.handleSubmit(onFormSubmit)(event)}
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
          <div className="flex flex-col">
            <Label>Created At - {initialData.createdAt}</Label>
            <Label>Updated At - {initialData.updatedAt}</Label>
          </div>
          <Button type="submit" disabled={isLoading}>
            Save Changes
          </Button>
        </form>
      </Form>
      <Separator />
      <ApiAlert
        title="NEXT_PUBLIC_API_URL"
        description={`${origin}/api/${initialData.slug}`}
        variant="public"
      />
    </>
  );
};
