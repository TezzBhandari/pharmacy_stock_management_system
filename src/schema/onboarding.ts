import { z } from "zod";
import {
    invalidPasswordFormatMsg,
    invalidUsernameFormatMsg,
    maxCharacterMsg,
    minCharacterMsg,
    requiredMsg,
} from "../utils/errorMessage";

const usernameRegex = /^[A-Za-z0-9_]+$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&#]).{8,}$/;

export const createTenantOnboardingSchema = z.object({
    fullname: z
        .string({ message: requiredMsg("fullname") })
        .min(1, { message: requiredMsg("fullname") }),
    username: z
        .string({ message: requiredMsg("username") })
        .min(4, { message: minCharacterMsg("username", 4) })
        .refine((value) => usernameRegex.test(value), {
            message: invalidUsernameFormatMsg(),
        }),
    organizationName: z
        .string({ message: requiredMsg("organization name") })
        .min(1, { message: requiredMsg("organization name") }),
    email: z
        .string({ message: requiredMsg("email") })
        .min(1, { message: requiredMsg("email") })
        .email({ message: "invalid email" }),
    password: z
        .string({
            message: requiredMsg("password"),
        })
        .max(20, maxCharacterMsg("password", 20))
        .refine((value) => passwordRegex.test(value), {
            message: invalidPasswordFormatMsg(),
        }),
});
