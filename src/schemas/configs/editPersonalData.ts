import parseStringToDate from "@utils/parseStringToDate";
import { removePhoneMask } from "@utils/phoneMask";
import { UF_LIST } from "@utils/ufList";
import { USER_RANK_LIST } from "@utils/userRanks";
import validateDate from "@utils/validateDate";
import { z } from "zod";

export const editPersonalDataFormSchema = z.object({
  user: z.object({
    name: z
      .string()
      .trim()
      .min(3, "Mínimo 3 caracteres")
      .max(255, "Máxima 255 caracteres")
      .nonempty("Campo obrigatório"),
    gender: z.enum(["m", "f"]),
    rg: z
      .string()
      .nonempty("Campo obrigatório")
      .transform((rg: string) => rg.replace(/\D/g, "")),
    user_rank: z.enum(USER_RANK_LIST, {
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
    birthdate: z
      .string()
      .transform((date: string) => parseStringToDate(date))
      .refine(validateDate, {
        message: "Data inválida",
      }),
  }),
  address: z.object({
    cep: z.string().transform((cep: string) => cep.replace(/\D/g, "")),
    city: z.string(),
    uf: z.enum(UF_LIST, {
      errorMap: (issue) => {
        switch (issue.code) {
        case "invalid_type":
          return { message: "UF inválida" };
        case "invalid_enum_value":
          return { message: "UF inválida" };
        default:
          return { message: "UF inválida" };
        }
      },
    }),
    street: z.string(),
    number: z.string(),
    district: z.string(),
    complement: z.string(),
  }),
  contact: z.object({
    email: z
      .string()
      .trim()
      .email("E-mail inválido")
      .nonempty("Campo obrigatório"),
    phone: z
      .string()
      .nonempty("Campo obrigatório")
      .transform((phone) => {
        return removePhoneMask(phone);
      }),
  }),
});

export type EditPersonalDataFormType = z.infer<
  typeof editPersonalDataFormSchema
>;
