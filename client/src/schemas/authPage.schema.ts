import z from "zod";

export const SignupSchema = z.object({
  displayName: z
    .string()
    .min(1, "auth.signup.errors.displayName.required")
    .max(16, "auth.signup.errors.displayName.max"),
  email: z.email("auth.signup.errors.email.invalid"),
  password: z.string().min(6, "auth.signup.errors.password.min"),
});

export type SignupForm = z.infer<typeof SignupSchema>;

export const LoginSchema = z.object({
  email: z.email("auth.login.errors.email.invalid"),
  password: z.string().min(6, "auth.login.errors.password.min"),
});

export type LoginForm = z.infer<typeof LoginSchema>;
