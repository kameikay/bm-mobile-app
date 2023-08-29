import { z } from "zod";

export const loginFormSchema = z
  .object({
    cpf: z
      .string()
      .nonempty("CPF é obrigatório")
      .transform((value) => value.replace(/\D/g, "")),
    password: z.string().min(8, "Mínimo de 8 caracteres"),
  })
  .required();

export type LoginFormType = z.infer<typeof loginFormSchema>;
