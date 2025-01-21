import { Router } from "express";
import { validateReqBody } from "../middleware/validator";
import { createTenantOnboardingSchema } from "../schema/onboarding";
import { onboarding } from "../controllers";

const tenantRouter = Router();

tenantRouter.post(
    "/onboarding",
    validateReqBody(createTenantOnboardingSchema),
    onboarding,
);

export default tenantRouter;
