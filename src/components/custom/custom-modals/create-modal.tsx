import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useCreateModal } from "@/hooks/use-create-modal";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { CREATE_EVENT, GET_ALL_EVENTS } from "@/graphql/query";
import { useDate } from "@/hooks/use-date";
import { useMutation } from "@apollo/client";
import { useAuth0 } from "@auth0/auth0-react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Modal } from "../modal";
const formSchema = z.object({
  title: z.string().min(3).max(50),
  description: z.string().min(3).max(50),
});

const CreateModal = () => {
  const { user } = useAuth0();
  const { isOpen, onClose } = useCreateModal();
  const { date } = useDate();
  const [createEvent, { loading }] = useMutation(CREATE_EVENT, {
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
      createEvent({
        variables: {
          createEventInput: {
            date: date,
            description: values.description,
            title: values.title,
            userId: `${user?.name}|${user?.email}`,
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

  return (
    <Modal
      title="Add Schedule"
      description="Add a new schedule for today"
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
                Add
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </Modal>
  );
};

export default CreateModal;
