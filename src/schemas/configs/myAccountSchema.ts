import parseStringToDate from "@/utils/parseStringToDate";
import { removePhoneMask } from "@/utils/phoneMask";
import { UF_LIST } from "@/utils/ufList";
import { USER_RANK_LIST } from "@/utils/userRanks";
import { validateCPF } from "@/utils/validateCpf";
import validateDate from "@/utils/validateDate";
import { z } from "zod";

export const myAccountFormSchema = z.object({
  user: z.object({
    name: z
      .string()
      .trim()
      .min(3, "Mínimo 3 caracteres")
      .max(255, "Máxima 255 caracteres")
      .nonempty("Campo obrigatório"),
    gender: z.enum(["m", "f"]),
    cpf: z
      .string()
      .nonempty("Campo obrigatório")
      .refine(validateCPF, {
        message: "CPF inválido",
      })
      .transform((cpf: string) => cpf.replace(/\D/g, "")),
    rg: z
      .string()
      .nonempty("Campo obrigatório")
      .transform((rg: string) => rg.replace(/\D/g, "")),
    user_rank: z.enum(USER_RANK_LIST, {
      errorMap: (issue, _ctx) => {
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
      errorMap: (issue, _ctx) => {
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
    email: z.string().trim().email("E-mail inválido").nonempty("Campo obrigatório"),
    phone: z.string().nonempty("Campo obrigatório").transform((phone: string) => removePhoneMask(phone))
  }),
});

export type MyAccountFormType = z.infer<typeof myAccountFormSchema>;
