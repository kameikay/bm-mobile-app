import { z } from "zod";

export const itemSubClassificationFormSchema = z.object({
  name: z
    .string()
    .min(3, "Mínimo de 3 caracteres")
    .max(50, "Máximo de 50 caracteres")
    .trim(),
});

export type ItemSubClassificationFormType = z.infer<
  typeof itemSubClassificationFormSchema
>;
