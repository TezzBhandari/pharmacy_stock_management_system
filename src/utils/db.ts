import { drizzle } from "drizzle-orm/neon-http";
import { DATABASE_URL } from "../env";
import * as schemas from "../db/schemas";

const db = drizzle(DATABASE_URL, {
  schema: schemas,
});

export default db;
