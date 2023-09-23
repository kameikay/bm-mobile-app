import { SOURCE_TYPE, SOURCE_TYPE_LIST } from "@utils/sourceType";
import { z } from "zod";

export const itemInputFormSchema = z
  .object({
    item_id: z.string({
      required_error: "Item obrigatório",
    }),
    source: z.enum(SOURCE_TYPE_LIST, {
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
    number_plate: z.string().optional(),
    supplier_id: z.string().nonempty(),
    unit_price: z.number().refine((val) => val > 0, {
      message: "Valor inválido",
    }),
    quantity: z.number().refine((val) => val > 0, {
      message: "Valor inválido",
    }),
  })
  .refine(
    (data) => {
      if (data.source === SOURCE_TYPE.STATE && !data.number_plate) {
        return false;
      }
      return true;
    },
    {
      message: "Obrigatório para fonte Estado",
      path: ["number_plate"],
    }
  );

export type ItemInputFormType = z.infer<typeof itemInputFormSchema>;
