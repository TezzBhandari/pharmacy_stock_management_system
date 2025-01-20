import { Router } from "express";
import { validateReqBody } from "../middleware/validator";
import { createUserBodySchema } from "../schema";
import { createUser } from "../controllers";

const usersRouter = Router();

usersRouter.post("/", validateReqBody(createUserBodySchema), createUser);

export default usersRouter;
