import { SIZE_TYPE_LIST } from "@/utils/sizeTypes";
import { z } from "zod";

const errorMessages: z.RawCreateParams = {
  errorMap: (issue, _ctx) => {
    switch (issue.code) {
      case "invalid_type":
        return { message: "Medida inválida" };
      case "invalid_enum_value":
        return { message: "Medida inválida" };
      default:
        return { message: "Medida inválida" };
    }
  },
};

export const romaneioSchema = z.object({
  shorts: z.enum(SIZE_TYPE_LIST, errorMessages),
  tshirt: z.enum(SIZE_TYPE_LIST, errorMessages),
  shirt: z.enum(SIZE_TYPE_LIST, errorMessages),
  slippers: z.number().int().min(34).max(45),
  trunks: z.enum(SIZE_TYPE_LIST, errorMessages),
  raincoat: z.enum(SIZE_TYPE_LIST, errorMessages),
});

export type RomaneioFormType = z.infer<typeof romaneioSchema>;
