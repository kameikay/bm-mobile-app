import { z } from "zod";

export const changePasswordFormSchema = z.object({
  old_password: z.string(),
  new_password: z.string().min(8, "Senha deve ter no mínimo 8 caracteres"),
  confirm_new_password: z.string().min(8, "Senha deve ter no mínimo 8 caracteres"),
});

export type ChangePasswordFormType = z.infer<typeof changePasswordFormSchema>;
