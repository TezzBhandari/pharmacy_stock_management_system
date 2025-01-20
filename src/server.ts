import express from "express";
import http from "http";
import routes from "./routes";
import { requestLogger } from "./middleware/requestLogger";
import { genericErrorHandler, notFoundError } from "./middleware/errorHandler";
import { PORT } from "./env";
import { loggerWithNameSpace } from "./utils/logger";

// JSON SERIALIZABLE DOESN'T SUPPORT BIG INT. SO WE NEED PROVIDE OUR OWN SERIALIZE METHOD FOR BIG INT
// @ts-expect-error
BigInt.prototype.toJSON = function () {
  return this.toString();
};

const logger = loggerWithNameSpace("server file");

const app = express();

app.use(express.json());
app.use(requestLogger);
app.use("/api/v1/", routes);
app.use(notFoundError);
app.use(genericErrorHandler);

const server = http.createServer(app);
server.on("listening", onListening);

function onListening() {
  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + addr?.port;
  logger.info("Listening on " + bind);
}

async function runServer() {
  server.listen(PORT);
}

runServer();
