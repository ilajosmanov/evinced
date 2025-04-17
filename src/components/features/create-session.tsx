import {
  Dialog,
  DialogTrigger,
  DialogDescription,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { sessionMutation } from "@/api/mutations/session";
import { queryClient } from "@/api/client";
import { sessionQuery } from "@/api/queries/session";
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";

const sessionSchema = z.object({
  name: z.string().min(1),
});

type SessionSchema = z.infer<typeof sessionSchema>;

export function CreateSession() {
  const [isOpened, setIsOpened] = useState(false);
  const form = useForm<SessionSchema>({
    resolver: zodResolver(sessionSchema),
  });

  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: sessionMutation.createSession,
    async onSuccess(response) {
      form.reset();

      await queryClient.invalidateQueries({
        queryKey: sessionQuery.keys.sessions(),
      });

      setIsOpened(false);

      return navigate({
        to: "/session/$sessionId",
        params: {
          sessionId: response.id,
        },
      });
    },
  });

  function onSubmit(formData: SessionSchema) {
    mutate(formData.name);
  }

  function handleOpenChange(is: boolean) {
    if (is) {
      form.reset();
    }

    setIsOpened(is);
  }

  return (
    <Dialog open={isOpened} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button className="bg-sidebar-primary text-sidebar-primary-foreground shadow-none">
          Create Session
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create new session</DialogTitle>
          <DialogDescription>
            You should specify a name for your new session
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="gap-y-2 grid">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Session Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Session XYZ" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
