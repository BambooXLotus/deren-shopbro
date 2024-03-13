"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

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
import { Modal } from "@/components/ui/modal";
import { useStoreModal } from "@/hooks/use-store-modal";
import {
  StoreCreateRequest,
  StoreCreateValidator,
} from "@/lib/validators/store-validators";
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";

export const StoreModal: React.FC = () => {
  const storeModal = useStoreModal();
  const router = useRouter();

  const form = useForm<StoreCreateRequest>({
    resolver: zodResolver(StoreCreateValidator),
    defaultValues: {
      name: "",
    },
  });

  // const { mutate, isLoading } = useMutation({
  //   mutationFn: async (values: StoreCreateRequest) => {
  //     const { data } = await axios.post<Store>("/api/stores", values);
  //     return data;
  //   },
  //   onSuccess: (store) => {
  //     // if (form.formState.isSubmitSuccessful) {
  //     //   toast.success("Store Created");
  //     //   form.reset({
  //     //     name: "",
  //     //   });
  //     // }
  //     // window.location.assign(`/${store.id}`);
  //     router.push(`/${store.id}`);
  //   },
  //   onError: (error) => {
  //     console.log("error", error);
  //     toast.error("Something Wong!!!");
  //   },
  // });

  const { mutate, isLoading } = api.store.create.useMutation({
    onSuccess: (store) => {
      // if (form.formState.isSubmitSuccessful) {
      toast.success(`Store Created`);
      //   form.reset({
      //     name: "",
      //   });
      // }
      // window.location.assign(`/${store.id}`);
      // router.push(`/${store.id}`);
    },
    onError: (error) => {
      toast.error(`ERROR: ${error.message}`);
    },
  });

  function onSubmit(values: StoreCreateRequest) {
    // console.log(values);
    mutate(values);
  }

  return (
    <Modal
      title="Create store"
      description="Add a new store to manage products and categories."
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
    >
      <div>
        <div className="space-y-4 py-2 pb-4">
          <Form {...form}>
            <form onSubmit={(event) => void form.handleSubmit(onSubmit)(event)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        placeholder="Clothing Shop"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex w-full items-center justify-end space-x-2 pt-6">
                <Button
                  disabled={isLoading}
                  variant="outline"
                  onClick={storeModal.onClose}
                >
                  Cancel
                </Button>
                <Button type="submit">Continue</Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Modal>
  );
};
