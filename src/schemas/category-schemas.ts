import z from "zod";

export const categorySchema = z.object({
  name: z
    .string()
    .nonempty({ message: "Category name is required" })
    .min(2, { message: "Category name must be at least 2 characters long" })
    .max(50, { message: "Category name must be maximum 50 characters long" })
    .regex(/^[a-zA-Z0-9\s]+$/, {
      message: "Category name can only contain letters, numbers, and spaces",
    }),
  image: z
    .object({ url: z.string() })
    .array()
    .length(1, { message: "Choose a category image to upload" }),
  url: z
    .url({ message: "Invalid URL format" })
    .nonempty({ message: "URL is required" }),
  featured: z.boolean(),
});

export type CategorySchemaType = z.infer<typeof categorySchema>;
