import Router from "express";
import { validateReqBody } from "../middleware/validator";
import { createUserBodySchema } from "../schema/users";
import { createUser } from "../controller/users";

const usersRouter = Router();

usersRouter.post("/", validateReqBody(createUserBodySchema), createUser);

export default usersRouter;
