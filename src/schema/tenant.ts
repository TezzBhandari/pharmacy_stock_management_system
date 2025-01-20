import { z } from "zod";
import { requiredMsg } from "../utils/errorMessage";

export const createTenantBodySchema = z.object({
  name: z.string({ message: requiredMsg("name") }),
  address: z.string({ message: requiredMsg("address") }),
});
