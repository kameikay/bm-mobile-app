import { z } from "zod";

export const itemClassificationFormSchema = z.object({
  name: z
    .string()
    .min(3, "Mínimo de 3 caracteres")
    .max(50, "Máximo de 50 caracteres")
    .trim(),
});

export type ItemClassificationFormType = z.infer<
  typeof itemClassificationFormSchema
>;
