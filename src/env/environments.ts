import dotenv from "dotenv";

dotenv.config();
const pathToEnv = __dirname + "/../.env";

dotenv.config({ path: pathToEnv });

// application configuration
const PORT = String(process.env.PORT);

// database configuration
const DATABASE_URL = String(process.env.DATABASE_URL);

export { PORT, DATABASE_URL };
