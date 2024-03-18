"use client";

import Navbar from "@/components/custom/Navbar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useMeeting } from "@/hooks/useMeeting";
import { useDialogStore } from "@/stores/useDialogStore";
import { useDyteStore } from "@/stores/useDyteStore";
import Image from "next/image";

export default function Home() {
  const { createMeetingOpen, setCreateMeetingOpen } = useDialogStore();
  const { createForm, handleCreateMeeting } = useMeeting();

  // create and join a meeting
  // create a link only

  return (
    <>
      <Navbar />
      <main className="h-[calc(100vh-56px)] grid grid-cols-2 p-24 w-screen">
        <div className="w-full flex flex-col items-start justify-center gap-5 h-full">
          <h2 className="text-3xl font-semibold text-zinc-800">
            Empower your collaborations with Meetings
          </h2>
          <p className="text-zinc-500">
            Host meetings anytime, anywhere, and connect with colleagues,
            friends, or clients effortlessly. You can initiate or join meetings
            with just a few clicks, making collaboration easy and accessible.
            Best of all, it&apos;s completely free, so you can focus on what
            matters most –productive discussions and meaningful connections.
          </p>
          <Dialog
            open={createMeetingOpen}
            onOpenChange={(open) => setCreateMeetingOpen(open)}
          >
            <DialogTrigger asChild>
              <Button type="button">Create New Meeting</Button>
            </DialogTrigger>
            <DialogContent className="w-96">
              <DialogHeader>
                <DialogTitle>Create a Meeting</DialogTitle>
              </DialogHeader>
              <Form {...createForm}>
                <form
                  onSubmit={createForm.handleSubmit(handleCreateMeeting)}
                  className="space-y-2"
                >
                  <FormField
                    control={createForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="Your name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={createForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="Your email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={createForm.control}
                    name="meeting_title"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="Meeting title" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full">
                    Create
                  </Button>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
        <div className="w-full flex flex-col items-center justify-center gap-5 h-full">
          <Image
            src="remote.svg"
            alt="remote"
            height={400}
            width={400}
            className="pointer-events-none"
          />
        </div>
      </main>
    </>
  );
}
