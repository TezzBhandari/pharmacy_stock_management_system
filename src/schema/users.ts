import { z } from "zod";
import {
    invalidPasswordFormatMsg,
    invalidUsernameFormatMsg,
    maxCharacterMsg,
    minCharacterMsg,
    requiredMsg,
} from "../utils/errorMessage";

const usernameRegex = /^[A-Za-z0-9_]+$/;
const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;

export const createUserBodySchema = z.object({
    fullname: z.string({ message: requiredMsg("fullname") }),
    username: z
        .string({ message: requiredMsg("username") })
        .min(4, { message: minCharacterMsg("username", 4) })
        .refine((value) => usernameRegex.test(value), {
            message: invalidUsernameFormatMsg(),
        }),
    email: z
        .string({ message: requiredMsg("email") })
        .email({ message: "invalid email" }),
    password: z
        .string({
            message: requiredMsg("password"),
        })
        .min(8, { message: minCharacterMsg("password", 8) })
        .max(20, maxCharacterMsg("password", 20))
        .refine((value) => passwordRegex.test(value), {
            message: invalidPasswordFormatMsg(),
        }),
});
