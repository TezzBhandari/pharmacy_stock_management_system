import { sql } from "drizzle-orm";
import db from "../utils/db";
import { users } from "../db/schemas";
import type { ICreateUser } from "../interfaces";

export default class UserRepo {
  private constructor() {}

  static async getUserByEmailOrUsername(username: string) {
    return await db.query.users
      .findFirst({
        where: (users, { eq, or }) =>
          or(
            eq(users.username, sql.placeholder("username")),
            eq(users.email, sql.placeholder("username")),
          ),
      })
      .prepare("get_user_by_email_or_username")
      .execute({ username });
  }

  static createUser(user: ICreateUser) {
    return db
      .insert(users)
      .values({
        id: sql.placeholder("id"),
        tenantId: sql.placeholder("tenantId"),
        fullname: sql.placeholder("fullname"),
        username: sql.placeholder("username"),
        email: sql.placeholder("email"),
        password: sql.placeholder("password"),
        createdAt: sql.placeholder("createdAt"),
        updatedAt: sql.placeholder("updatedAt"),
      })
      .returning({
        id: users.id,
      })
      .prepare("insert_user")
      .execute({
        id: user.id,
        tenantId: user.tenantId,
        fullname: user.fullname,
        username: user.username,
        email: user.email,
        password: user.password,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      });
  }
}
