import { z, ZodType } from "zod";

export const ProductFormSchema: ZodType = z.object({
    name: z.string().min(1, { message: 'Name is required' }),
    price: z.string().min(1, { message: 'Price is required' }),
    description: z.string().min(1, { message: 'Description is required' }),
})