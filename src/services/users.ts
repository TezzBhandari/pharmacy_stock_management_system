import bcrypt from "bcrypt";
import HttpStatusCodes from "../constants/HttpStatusCodes";
import { ApiHttpError, ErrorType } from "../error/ApiHttpError";
import { ICreateUser } from "../interfaces/user";
import UserRepo from "../repository/users";
import { snowflake } from "../utils/snowflake";
import { loggerWithNameSpace } from "../utils/logger";
import { createUser } from "../controller/users";

const logger = loggerWithNameSpace("User Service");
const salt = 10;

export default class UserService {
    private constructor() { }

    static async getUserByEmailOrUsername(username: string) {
        return await UserRepo.getUserByEmailOrUsername(username);
    }

    static async createUser(
        user: Pick<ICreateUser, "username" | "fullname" | "email" | "password">,
    ) {
        let existingUser = await this.getUserByEmailOrUsername(user.username);
        if (existingUser) {
            throw new ApiHttpError({
                type: ErrorType.CONFLICT,
                statusCode: HttpStatusCodes.CONFLICT,
                message: "username already exists",
            });
        }

        existingUser = await this.getUserByEmailOrUsername(user.email);
        if (existingUser) {
            throw new ApiHttpError({
                type: ErrorType.CONFLICT,
                statusCode: HttpStatusCodes.CONFLICT,
                message: "email already registered",
            });
        }

        const hashedPassword = await bcrypt.hash(user.password, salt);
        const currentTimestamp = new Date().toUTCString();

        const newUser: ICreateUser = {
            ...user,
            password: hashedPassword,
            id: snowflake.nextId(),
            createdAt: currentTimestamp,
            updatedAt: currentTimestamp,
        };

        const createdUser = await UserRepo.createUser(newUser);
        if (createdUser.length === 0) {
            logger.error("session creation failure");
            throw new ApiHttpError({
                statusCode: HttpStatusCodes.INTERNAL_SERVER_ERROR,
                type: ErrorType.INTERNAL_SERVER_ERROR,
                message: "something went wrong. try again",
            });
        }
        return createdUser[0].id;
    }
}
