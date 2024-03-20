"use client";

import Facetime from "@/components/custom/Facetime";
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
import { DyteProvider, useDyteClient } from "@dytesdk/react-web-core";
import { DialogDescription } from "@radix-ui/react-dialog";
import { useEffect, useState } from "react";

const Room = ({ params }: { params: { id: string } }) => {
  const { participantData } = useDyteStore();
  const { handleJoin, joinForm } = useMeeting();
  const { joinMeetingOpen, setJoinMeetingOpen } = useDialogStore();

  const [meeting, initMeeting] = useDyteClient();

  const meetingId = params.id;

  // const form = useForm({
  //   initialValues: {
  //     email: "",
  //     name: "",
  //   },

  //   validate: {
  //     email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
  //   },
  // });
  console.log(participantData);
  useEffect(() => {
    const authToken = participantData?.data?.token;

    if (!authToken && !meetingId) {
      return;
    } else if (meetingId && !authToken) {
      setJoinMeetingOpen(true);
    } else if (authToken) {
      initMeeting({
        authToken,
        defaults: {
          video: false,
          audio: false,
        },
      }).then((m) => m?.joinRoom());
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [meetingId, participantData]);

  return (
    <div>
      <DyteProvider
        value={meeting}
        fallback={
          <div className="h-screen w-full p-4 flex flex-col items-center justify-center bg-black text-white overflow-hidden text-2xl">
            Joining
          </div>
        }
      >
        <Facetime />
      </DyteProvider>
      {/* Join Meeting Modal */}
      <Dialog
        open={joinMeetingOpen}
        onOpenChange={(open) => setJoinMeetingOpen(open)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Join a Meeting</DialogTitle>
            <DialogDescription>
              You are joining a meeting room. Enter your details
            </DialogDescription>
          </DialogHeader>
          <Form {...joinForm}>
            <form
              onSubmit={(e) => {
                e.preventDefault();

                handleJoin(
                  meetingId as string,
                  joinForm.getValues("name"),
                  "group_call_participant",
                  joinForm.getValues("email"),
                  undefined
                );
              }}
              className="space-y-2"
            >
              <FormField
                control={joinForm.control}
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
                control={joinForm.control}
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
              <Button type="submit" className="w-full">
                Join Meeting
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Room;
