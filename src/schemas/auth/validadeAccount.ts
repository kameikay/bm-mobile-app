import { z } from "zod";

export const validadeAccountFormSchema = z.object({
  code_confirmation: z
    .string()
    .nonempty("Código de confirmação é obrigatório")
    .transform((value) => Number(value)),
});

export type ValidadeAccountType = z.infer<typeof validadeAccountFormSchema>;
