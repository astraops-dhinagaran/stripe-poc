import { z, ZodType } from "zod";

export const LoginFormSchema: ZodType = z.object({
    email: z.string().email(),
    password: z.string()
})