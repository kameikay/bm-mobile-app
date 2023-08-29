import parseStringToDate from "@utils/parseStringToDate";
import { removePhoneMask } from "@utils/phoneMask";
import { UF_LIST } from "@utils/ufList";
import { USER_RANK_LIST } from "@utils/userRanks";
import { validateCPF } from "@utils/validateCpf";
import validateDate from "@utils/validateDate";
import { z } from "zod";

export const signupFormSchema = z
  .object({
    user: z.object({
      name: z
        .string({
          required_error: "Obrigatório",
        })
        .min(3, "Mínimo 3 caracteres")
        .max(255, "Máxima 255 caracteres")
        .trim()
        .nonempty("Campo obrigatório"),
      gender: z.enum(["m", "f"], {
        required_error: "Obrigatório",
      }),
      cpf: z
        .string({
          required_error: "Obrigatório",
        })
        .nonempty("Campo obrigatório")
        .refine(validateCPF, {
          message: "CPF inválido",
        })
        .transform((cpf: string) => cpf.replace(/\D/g, "")),
      rg: z
        .string({
          required_error: "Obrigatório",
        })
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
        .string({
          required_error: "Obrigatório",
        })
        .transform((date: string) => parseStringToDate(date))
        .refine(validateDate, {
          message: "Data inválida",
        }),
      password: z
        .string({
          required_error: "Obrigatório",
        })
        .min(8, "Mínimo 8 caracteres")
        .max(255)
        .nonempty("Campo obrigatório"),
      confirm_password: z
        .string({
          required_error: "Obrigatório",
        })
        .nonempty("Campo obrigatório"),
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
        .string({
          required_error: "Obrigatório",
        })
        .email("E-mail inválido")
        .nonempty("Campo obrigatório"),
      phone: z
        .string({
          required_error: "Obrigatório",
        })
        .nonempty("Campo obrigatório")
        .transform((phone: string) => removePhoneMask(phone)),
    }),
  })
  .refine((schema) => schema.user.password === schema.user.confirm_password, {
    message: "As senhas não coincidem",
    path: ["user", "confirm_password"],
  });

export type SignUpFormType = z.infer<typeof signupFormSchema>;
