import Router from "express";
import { login } from "../controller/auth";
import { validateReqBody } from "../middleware/validator";
import { loginBodySchema } from "../schema/authenticate";

const authRouter = Router();

authRouter.post("/login", validateReqBody(loginBodySchema), login);

export default authRouter;
