import * as z from "zod";
import { validateAmount } from "../tools";

export const CurrencyConvertFormSchema = z
  .object({
    tokenFrom: z.string(),
    amount: z.string().min(1, "Please enter the amount"),
    tokenTo: z.string(),
  })
  .refine((data) => validateAmount(data.amount), {
    path: ["amount"],
    message: "Invalid value",
  });

export type CurrencyConvertInput = z.infer<typeof CurrencyConvertFormSchema>;
