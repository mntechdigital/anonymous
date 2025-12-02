import z from "zod";

export const userSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email"),
    password: z.string().optional(),
    confirmPassword: z.string().optional(),
    roleName: z.string().min(1, "Role name required"),
    features: z.array(z.number()),
  })
  .superRefine((data, ctx) => {
    if (data.password || data.confirmPassword) {
      if (!data.password || data.password.length < 6) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Password must be at least 6 characters",
          path: ["password"],
        });
      }
      if (!data.confirmPassword || data.confirmPassword.length < 6) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Please confirm your password",
          path: ["confirmPassword"],
        });
      }
      if (data.password !== data.confirmPassword) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Passwords do not match",
          path: ["confirmPassword"],
        });
      }
    }
  });

export type CreateUserValues = z.infer<typeof userSchema>;
