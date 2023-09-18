import { z } from "zod";

export const warehousesFormSchema = z.object({
  name: z
    .string({
      required_error: "Obrigatório",
    })
    .min(3, "Mínimo de 3 caracteres")
    .max(50, "Máximo de 50 caracteres")
    .trim(),
  local: z
    .string({
      required_error: "Obrigatório",
    })
    .min(3, "Mínimo de 3 caracteres")
    .max(50, "Máximo de 50 caracteres")
    .trim(),
  description: z.string().max(255, "Descrição muito longa").optional(),
});

export type WarehouseFormType = z.infer<typeof warehousesFormSchema>;
