"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FileUpload } from "../fileupload";
import axios from "axios";
import { BASE_URL, URL } from "@/config/network";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  name: z
    .string({
      required_error: "Chat's Name is Required",
    })
    .min(2)
    .max(50),
  imageUrl: z.string({
    required_error: "Chat's Image is Required",
  }),
});

export function ModalInitial() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      imageUrl: "",
    },
  });
  const router = useRouter();

  const isLoading = form.formState.isSubmitting;

  /*
 Replace axios with use swr or react query
  */

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await axios.post(`${BASE_URL}${URL.servers}`, values);
      form.reset();
      router.refresh();
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Create Server</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-center">
            Customize your server
          </DialogTitle>
          <DialogDescription className="text-center">
            Give your server a personality with an a name and a image
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <FileUpload
                      endpoint="serverImage"
                      value={field.value}
                      onchange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Chat Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Github Chats" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is public display name of the Channel .
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button disabled={isLoading} type="submit">
                Create Server
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
