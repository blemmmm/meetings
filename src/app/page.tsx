"use client";

import { DyteMeetingData } from "@/_types/DyteTypes";
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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createMeetingFormSchema } from "@/schema/schemas";
import { useDyteStore } from "@/stores/useDyteStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function Home() {
  const { meetingData, setMeetingData } = useDyteStore();

  const [createMeetingOpen, setCreateMeetingOpen] = useState(false);

  const form = useForm<z.infer<typeof createMeetingFormSchema>>({
    resolver: zodResolver(createMeetingFormSchema),
    defaultValues: {
      email: "",
      name: "",
      meeting_title: "",
    },
  });

  // create and join a meeting
  // create a link only

  const handleCreateMeeting = async (
    values: z.infer<typeof createMeetingFormSchema>
  ) => {
    try {
      await fetch("http://localhost:3000/api/create", {
        method: "POST",
        body: JSON.stringify({
          title: values.meeting_title,
          preferred_region: "ap-southeast-1",
          record_on_start: false,
          live_stream_on_start: false,
          recording_config: {
            max_seconds: 60,
            file_name_prefix: "lokal",
            video_config: {
              codec: "H264",
              width: 1280,
              height: 720,
              watermark: {
                url: "http://lokal.com.ph",
                size: {
                  width: 1,
                  height: 1,
                },
                position: "left top",
              },
              export_file: true,
              audio_config: {
                codec: "AAC",
                channel: "stereo",
                export_file: true,
              },
              storage_config: {
                type: "aws",
                access_key: "string",
                secret: "string",
                bucket: "string",
                region: "ap-southeast-1",
                path: "string",
                auth_method: "KEY",
                username: "string",
                password: "string",
                host: "string",
                port: 0,
                private_key: "string",
              },
              dyte_bucket_config: {
                enabled: true,
              },
              live_streaming_config: {
                rtmp_url: "rtmp://a.rtmp.youtube.com/live2",
              },
            },
          },
        }),
      })
        .then((res) => res.json())
        .then((data: DyteMeetingData) => {
          setCreateMeetingOpen(false);
          // handleJoin(data.data.id, name, "group_call_host", email, data);
        });
    } catch {
      console.log("Error");
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
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
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleCreateMeeting)}
              className="space-y-2"
            >
              <FormField
                control={form.control}
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
                control={form.control}
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
                control={form.control}
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
    </main>
  );
}
