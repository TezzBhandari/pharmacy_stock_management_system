import { Router } from "express";
import { login } from "../controllers/auth";
import { validateReqBody } from "../middleware/validator";
import { createTenantBodySchema } from "../schema";

const tenantRouter = Router();

tenantRouter.post("/", validateReqBody(createTenantBodySchema), login);

export default tenantRouter;
