import { z } from "zod";
import { ITEM_TYPE_LIST } from "@utils/itemTypes";

export const itemOutputFormSchema = z
  .object({
    item_id: z.string({
      required_error: "Item obrigatório",
    }),
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
    quantity: z
      .number({
        required_error: "Obrigatório",
      })
      .refine((val) => val > 0, {
        message: "Valor inválido",
      }),
    motivation: z.string().optional(),
    self_caution: z.boolean({
      required_error: "Obrigatório",
    }),
    responsible_name: z.string().optional(),
  })
  .refine(
    (data) => {
      if (!data.self_caution && !data.responsible_name) {
        return false;
      }
      return true;
    },
    {
      message: "Obrigatório responsável",
      path: ["responsible_name"],
    }
  );

export type ItemOutputFormType = z.infer<typeof itemOutputFormSchema>;
