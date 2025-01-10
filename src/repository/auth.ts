import { auths } from "../db/schemas";
import { sql } from "drizzle-orm";
import db from "../utils/db";
import type { ICreateAuth } from "../interfaces/auth";

export default class AuthRepo {
    private constructor() { }

    static createAuth(auth: ICreateAuth) {
        console.log("refresh", auth.refreshToken.length, auth.refreshToken);
        return db
            .insert(auths)
            .values({
                id: sql.placeholder("id"),
                userId: sql.placeholder("userId"),
                refreshToken: sql.placeholder("refreshToken"),
                ip: sql.placeholder("ip"),
                createdAt: sql.placeholder("createdAt"),
                updatedAt: sql.placeholder("updatedAt"),
            })
            .returning({
                id: auths.id,
            })
            .prepare("insert_auth")
            .execute({
                id: auth.id,
                userId: auth.userId,
                refreshToken: auth.refreshToken,
                ip: auth.ip,
                createdAt: auth.createdAt,
                updatedAt: auth.updatedAt,
            });
    }
}
