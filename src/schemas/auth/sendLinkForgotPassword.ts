import { z } from "zod";

export const sendLinkForgotPasswordFormSchema = z.object({
  email: z.string().email("Email inválido"),
});

export type SendLinkForgotPasswordFormType = z.infer<
  typeof sendLinkForgotPasswordFormSchema
>;
