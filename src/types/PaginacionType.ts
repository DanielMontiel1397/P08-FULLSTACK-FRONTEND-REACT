import type z from "zod";
import type { paginacionClientesSchema, paginacionSucursalesSchema } from "../schemas/paginacionSchema";

export type PaginacionClientesType = z.infer<typeof paginacionClientesSchema>
export type PaginacionSucursalType = z.infer<typeof paginacionSucursalesSchema>