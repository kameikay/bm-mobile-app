import { ITEM_TYPE_LIST, UNIT_TYPE_LIST } from "@utils/itemTypes";
import { z } from "zod";

export const itemFormSchema = z.object({
  warehouse_id: z.string().uuid("Obrigatório"),
  shelf_id: z.string().uuid("Obrigatório"),
  shelf_row_id: z.string().uuid("Obrigatório"),
  shelf_column_id: z.string().uuid("Obrigatório"),
  name: z
    .string()
    .min(3, "Mínimo de 3 caracteres")
    .max(50, "Máximo de 50 caracteres")
    .trim(),
  item_type: z.enum(ITEM_TYPE_LIST, {
    errorMap: (issue) => {
      switch (issue.code) {
      case "invalid_type":
        return { message: "Valor inválido" };
      case "invalid_enum_value":
        return { message: "Valor inválido" };
      default:
        return { message: "Valor inválido" };
      }
    },
  }),
  unit: z.enum(UNIT_TYPE_LIST, {
    errorMap: (issue) => {
      switch (issue.code) {
      case "invalid_type":
        return { message: "Valor inválido" };
      case "invalid_enum_value":
        return { message: "Valor inválido" };
      default:
        return { message: "Valor inválido" };
      }
    },
  }),
  item_classification_id: z.string().uuid("Selecione uma classificação"),
  item_subclassification_id: z.string().uuid("Selecione uma sub-classificação"),
  description: z.string().max(255, "Descrição muito longa"),
});

export type ItemFormType = z.infer<typeof itemFormSchema>;
