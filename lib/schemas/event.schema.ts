import { z } from "zod";

export const eventSchema = z.object({
  title: z.string().min(3, "Title must be at least 5 characters").max(100),
 description: z.string().min(10, "Description must be at least 10 characters").max(1000),
 overview: z.string().min(10, "Overview must be at least 10 characters").max(500),
venue: z.string().min(2, "Venue must be at least 2 characters"),
location: z.string().min(2, "Location must be at least 2 characters"),
date: z.string().refine((val) => !isNaN(Date.parse(val)), { message: "Invalid date" }),
 time: z.string().min(1, "Time is required"),
  tags: z.array(z.string().min(1)).min(1, "Please add at least one tag"),
 category: z.string().min(1, "Category is required"),
//   imageUrl: z
//     .string()
//     .url("Image URL must be a valid URL")
//     .optional()
//     .or(z.literal("")),
});

export type EventInput = z.infer<typeof eventSchema>;
