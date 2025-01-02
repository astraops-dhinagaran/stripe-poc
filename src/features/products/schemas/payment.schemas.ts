import { z, ZodType } from "zod";

export const ProductPaymentCheckoutWithStripeSchema: ZodType = z.object({
    customerId: z.string(),
    priceId: z.string(),
    quantity: z.number()
})