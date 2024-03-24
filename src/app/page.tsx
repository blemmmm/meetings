"use client";

import Navbar from "@/components/custom/Navbar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useMeeting } from "@/hooks/useMeeting";
import { useDialogStore } from "@/stores/useDialogStore";
import { useDyteStore } from "@/stores/useDyteStore";
import { Icon } from "@iconify/react";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { CopyIcon } from "@radix-ui/react-icons";
import { Analytics } from "@vercel/analytics/next";
import { headers } from "next/headers";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { Check, Link, Video } from "react-feather";

export default function Home() {
  const { meetingData } = useDyteStore();
  const {
    createMeetingOpen,
    setCreateMeetingOpen,
    isLoading,
    meetingLinkOpen,
    setIsMeetingLinkOpen,
  } = useDialogStore();
  const { createForm, handleCreateMeeting } = useMeeting();
  const [isForLater, setIsForlater] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [url, setUrl] = useState("");

  useEffect(() => {
    if (isCopied) {
      const timeout = setTimeout(() => {
        setIsCopied(false);
      }, 1000);

      return () => clearTimeout(timeout);
    }
  }, [isCopied]);

  useEffect(() => {
    if (window) {
      setUrl(window.location.origin);
    }
  }, []);

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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button type="button">Create New Meeting</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem
                className="gap-3 cursor-pointer"
                onClick={() => {
                  setCreateMeetingOpen(true);
                  setIsForlater(false);
                }}
              >
                <Video height={17} /> Start a Meeting
              </DropdownMenuItem>
              <DropdownMenuItem
                className="gap-3 cursor-pointer"
                onClick={() => {
                  setCreateMeetingOpen(true);
                  setIsForlater(true);
                }}
              >
                <Link height={17} />
                Create Meeting Link
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Create Meeting Modal */}
          <Dialog
            open={createMeetingOpen}
            onOpenChange={(open) => setCreateMeetingOpen(open)}
          >
            <DialogContent className="w-96">
              <DialogHeader>
                <DialogTitle>Create a Meeting</DialogTitle>
              </DialogHeader>
              <Form {...createForm}>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleCreateMeeting(createForm.getValues(), isForLater);
                  }}
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
                  <Button
                    type="submit"
                    className="w-full gap-3"
                    disabled={isLoading}
                  >
                    {isLoading && <Icon icon="svg-spinners:270-ring" />} Create
                  </Button>
                </form>
              </Form>
            </DialogContent>
          </Dialog>

          {/* Meeting Link Modal */}
          <Dialog
            open={meetingLinkOpen}
            onOpenChange={(open) => setIsMeetingLinkOpen(open)}
          >
            <DialogContent className="w-fiit">
              <DialogHeader>
                <DialogTitle>Here&apos;s your Meeting Link</DialogTitle>
              </DialogHeader>
              <p className="text-xs">
                Save this link for later and share this to people you want to
                join.
              </p>
              <div className="flex items-center justify-between gap-1 w-full">
                <Input readOnly value={`${url}/room/${meetingData?.data.id}`} />
                <CopyToClipboard
                  text={`${url}/room/${meetingData?.data.id}`}
                  onCopy={(_, copied) => {
                    setIsCopied(copied);
                  }}
                >
                  <Button variant="ghost" title="Copy Link">
                    {isCopied ? (
                      <Check color="green" height={16} />
                    ) : (
                      <CopyIcon />
                    )}
                  </Button>
                </CopyToClipboard>
              </div>
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
      <Analytics />
    </>
  );
}
