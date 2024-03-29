import { DyteMeetingData, DyteParticipantData } from "@/_types/DyteTypes";
import { useDyteStore } from "../stores/useDyteStore";
import { z } from "zod";
import {
  createMeetingFormSchema,
  joinMeetingFormSchema,
} from "@/schema/schemas";
import { useDialogStore } from "@/stores/useDialogStore";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

export const useMeeting = () => {
  const { replace } = useRouter();
  const { toast } = useToast();

  const { setParticipantData, setMeetingData } = useDyteStore();
  const {
    setCreateMeetingOpen,
    setJoinMeetingOpen,
    setIsLoading,
    setIsMeetingLinkOpen,
  } = useDialogStore();

  const createForm = useForm<z.infer<typeof createMeetingFormSchema>>({
    resolver: zodResolver(createMeetingFormSchema),
    defaultValues: {
      email: "",
      name: "",
      meeting_title: "",
    },
  });

  const joinForm = useForm<z.infer<typeof joinMeetingFormSchema>>({
    resolver: zodResolver(joinMeetingFormSchema),
    defaultValues: {
      email: "",
      name: "",
    },
  });

  const handleJoin = async (
    id: string,
    name: string,
    preset_name:
      | "webinar_viewer"
      | "webinar_presenter"
      | "group_call_host"
      | "group_call_participant",
    custom_participant_id: string,
    createdMeetingdata?: DyteMeetingData
  ) => {
    await fetch(`/api/participants`, {
      method: "POST",
      body: JSON.stringify({
        name: name,
        preset_name: preset_name,
        custom_participant_id: custom_participant_id,
        id: id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data: DyteParticipantData) => {
        setParticipantData(data);
        setJoinMeetingOpen(false);

        if (createdMeetingdata) {
          replace(`/room/${createdMeetingdata.data.id}`);
        }
      });
  };

  const handleCreateMeeting = async (
    values: z.infer<typeof createMeetingFormSchema>,
    isForLater?: boolean
  ) => {
    setIsLoading(true);
    try {
      await fetch("/api/create", {
        method: "POST",
        body: JSON.stringify({
          title: values.meeting_title,
          preferred_region: "ap-southeast-1",
          record_on_start: false,
          live_stream_on_start: false,
          recording_config: {
            max_seconds: 60,
            file_name_prefix: "meetings",
            video_config: {
              codec: "H264",
              width: 1280,
              height: 720,
              watermark: {
                url: "http://meetings.blem.dev",
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
          createForm.reset();
          setIsLoading(false);

          if (!isForLater) {
            handleJoin(
              data.data.id,
              values.name,
              "group_call_host",
              values.email,
              data
            );
          } else {
            setMeetingData(data);
            setIsMeetingLinkOpen(true);
          }
        });
    } catch {
      toast({
        variant: "destructive",
        title: "Something went wrong",
        description: "Cannot create a meeting",
      });
      setIsLoading(false);
    }
  };

  // const handleCreateMeetingLink = async (
  //   values: z.infer<typeof createMeetingFormSchema>
  // ) => {
  //   try {
  //     await fetch("/api/create", {
  //       method: "POST",
  //       body: JSON.stringify({
  //         title: values.meeting_title,
  //         preferred_region: "ap-southeast-1",
  //         record_on_start: false,
  //         live_stream_on_start: false,
  //         recording_config: {
  //           max_seconds: 60,
  //           file_name_prefix: "meetings",
  //           video_config: {
  //             codec: "H264",
  //             width: 1280,
  //             height: 720,
  //             watermark: {
  //               url: "http://meetings.blem.dev",
  //               size: {
  //                 width: 1,
  //                 height: 1,
  //               },
  //               position: "left top",
  //             },
  //             export_file: true,
  //             audio_config: {
  //               codec: "AAC",
  //               channel: "stereo",
  //               export_file: true,
  //             },
  //             storage_config: {
  //               type: "aws",
  //               access_key: "string",
  //               secret: "string",
  //               bucket: "string",
  //               region: "ap-southeast-1",
  //               path: "string",
  //               auth_method: "KEY",
  //               username: "string",
  //               password: "string",
  //               host: "string",
  //               port: 0,
  //               private_key: "string",
  //             },
  //             dyte_bucket_config: {
  //               enabled: true,
  //             },
  //             live_streaming_config: {
  //               rtmp_url: "rtmp://a.rtmp.youtube.com/live2",
  //             },
  //           },
  //         },
  //       }),
  //     })
  //       .then((res) => res.json())
  //       .then((data: DyteMeetingData) => {
  //         createForm.reset();
  //       });
  //   } catch {
  //     console.log("Error");
  //   }
  // };

  return {
    handleJoin,
    handleCreateMeeting,
    createForm,
    joinForm,
  };
};
