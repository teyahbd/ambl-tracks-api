import { z } from "zod";

const titlesSchema = z.object({
  primary: z.string(),
  secondary: z.string(),
  tertiary: z.string().nullable(),
});

const availabilitySchema = z.object({
  from: z.string(),
  to: z.string(),
  label: z.string(),
});

export const trackSchema = z.object({
  type: z.literal("track"),
  id: z.string(),
  urn: z.string(),
  titles: titlesSchema,
  availability: availabilitySchema,
});

export type Track = z.infer<typeof trackSchema>;
