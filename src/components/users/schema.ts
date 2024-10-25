import { z } from "zod";

export const schema = z.object({
  name: z
    .string({ required_error: "Required field" })
    .min(2, "Must have at least 2 characters.")
    .max(50, "Must have at most 50 characters."),
  surname: z.string().optional(),
  email: z
    .string({ required_error: "Required field" })
    .email("Email must be valid."),
  username: z
    .string({ required_error: "Required field" })
    .min(2, "Must have at least 2 characters.")
    .max(50, "Must have at most 50 characters."),
  phone: z.string().optional(),
  role: z.enum(["USER", "ADMIN"]),
  isActivated: z.boolean(),
});
