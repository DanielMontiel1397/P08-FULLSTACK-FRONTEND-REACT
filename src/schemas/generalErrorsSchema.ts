import z from "zod";

export const schemaErrorResponse = z.object({
    msg: z.string()
})