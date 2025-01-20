import { z } from "zod";
import { requiredMsg } from "../utils/errorMessage";

export const createRoleBodySchema = z.object({
  name: z
    .string({
      message: requiredMsg("name"),
      invalid_type_error: "name must be string",
    })
    .min(1, { message: requiredMsg("name") }),
});

export const roleIdQuerySchema = z.object({
  roleId: z.string({ message: requiredMsg("role id") }),
});

export const updateRoleBodySchema = z.object({
  name: z.string({ invalid_type_error: "name must be string" }).optional(),
});
