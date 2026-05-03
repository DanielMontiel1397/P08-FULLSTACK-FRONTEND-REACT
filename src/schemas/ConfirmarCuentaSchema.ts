import z from "zod";

export const tokenUrlSchema = z.string()

export const confirmarEmailAdministradorSchema = z.object({
    msg: z.string()
})