import { Router } from "express";
import { login } from "../controllers";
import { validateReqBody } from "../middleware/validator";
import { loginBodySchema } from "../schema";

const authRouter = Router();

authRouter.post("/login", validateReqBody(loginBodySchema), login);

export default authRouter;
