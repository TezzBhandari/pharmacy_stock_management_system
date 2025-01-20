import { Router } from "express";
import authRouter from "./auth";
import usersRouter from "./users";
import tenantRouter from "./tenant";
import roleRouter from "./role";

const router = Router();

router.use("/auth", authRouter);
router.use("/users", usersRouter);
router.use("/tenants", tenantRouter);
router.use("/roles", roleRouter);

export default router;
