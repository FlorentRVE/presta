import { z } from "zod"; // Add new import

export const SignupSchema = z.object({
    username: z.string().min(3, { message: "Username is too short" }),
    job: z.string(),
    area: z.string(),
    email: z.string().email(),
    password: z
      .string()
      .min(8, { message: "Password is too short" })
      .max(20, { message: "Password is too long" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // path of error
  });
