import { z } from "zod";

export const resetPasswordFormSchema = z
  .object({
    password: z.string().min(8, "Senha deve ter no mínimo 8 caracteres"),
    confirm_password: z
      .string()
      .min(8, "Senha deve ter no mínimo 8 caracteres"),
  })
  .refine((schema) => schema.password === schema.confirm_password, {
    message: "As senhas não coincidem",
    path: ["confirm_password"],
  });

export type ResetPasswordFormType = z.infer<typeof resetPasswordFormSchema>;

export interface ResetPassword {
  password: string;
  confirm_password: string;
  user_id: string;
}
