import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { GET_ALL_EVENTS, UPDATE_EVENT } from "@/graphql/query";
import { useUpdateModal } from "@/hooks/use-update-modal";
import { useMutation } from "@apollo/client";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Modal } from "../modal";
const formSchema = z.object({
  title: z.string().min(3).max(50),
  description: z.string().min(3).max(50),
});

const UpdateModal = () => {
  const { isOpen, onClose, initialData } = useUpdateModal();
  const [updateEvent, { loading }] = useMutation(UPDATE_EVENT, {
    refetchQueries: [GET_ALL_EVENTS],
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      updateEvent({
        variables: {
          updateEventInput: {
            description: values.description,
            title: values.title,
            id: initialData?.id,
          },
        },
      });
      if (!loading) {
        onClose();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (initialData) {
      form.reset(initialData);
    }
  }, [form, initialData]);

  return (
    <Modal
      title="Update Schedule"
      description="Change something on your schedule"
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="space-y-4 py-2 pb-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="What's on your mind"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Short description..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center justify-end space-x-2">
              <Button disabled={loading} variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button disabled={loading} type="submit">
                Save
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </Modal>
  );
};

export default UpdateModal;
