import { z } from "zod";
import { requiredMsg } from "../utils/errorMessage";

export const loginBodySchema = z.object({
    username: z.string({ message: requiredMsg("username") }),
    password: z.string({ message: requiredMsg("password") }),
});
