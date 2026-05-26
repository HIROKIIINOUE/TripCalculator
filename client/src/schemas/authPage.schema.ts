import z from "zod";

export const SignupSchema = z.object({
  displayName: z
    .string()
    .min(1, "名前は必須です")
    .max(16, "表示名は16文字以内で決めてください"),
  email: z.email("正しいメールアドレスを入力してください"),
  password: z.string().min(6, "パスワードは6文字以上で入力してください"),
});

export type SignupForm = z.infer<typeof SignupSchema>;
