import { z } from "zod";

export const createMeetingFormSchema = z.object({
  email: z.string().email(),
  name: z.string(),
  meeting_title: z.string(),
});
