import { drizzle } from "drizzle-orm/neon-serverless";
import { Pool } from "@neondatabase/serverless";

import { DATABASE_URL } from "../env";
import * as schemas from "../db/schemas";
const pool = new Pool({ connectionString: DATABASE_URL });
const db = drizzle({ client: pool, schema: schemas });

export default db;
