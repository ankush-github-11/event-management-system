import { z } from "zod";

export const eventSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Title is required")
    .max(100, "Title cannot exceed 100 characters"),

  description: z
    .string()
    .trim()
    .min(1, "Description is required")
    .max(1000, "Description cannot exceed 1000 characters"),

  overview: z
    .string()
    .trim()
    .min(1, "Overview is required")
    .max(500, "Overview cannot exceed 500 characters"),

  image: z.any().refine((file) => file?.length === 1, "Image is required"),

  venue: z.string().trim().min(1, "Venue is required"),

  location: z.string().trim().min(1, "Location is required"),

  date: z.string(),

  mode: z.enum(["online", "offline", "hybrid"]),

  audience: z.string().trim().min(1, "Audience is required"),

  agenda: z
    .array(z.string().trim().min(1, "Agenda item cannot be empty"))
    .min(1, "At least one agenda item is required"),

  organizer: z.string().trim().min(1, "Organizer is required"),

  tags: z
    .array(z.string().trim().min(1, "Tag cannot be empty"))
    .min(1, "At least one tag is required"),
});

export type EventInput = z.infer<typeof eventSchema>;
