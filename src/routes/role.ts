import { Router } from "express";
import { validateReqBody, validateReqParams } from "../middleware/validator";
import {
  roleIdQuerySchema,
  updateRoleBodySchema,
  createRoleBodySchema,
} from "../schema";
import {
  createRole,
  deleteRole,
  getRoleById,
  getRoles,
  updateRole,
} from "../controllers";

const roleRouter = Router();

roleRouter.post("/", validateReqBody(createRoleBodySchema), createRole);
roleRouter.get("/:roleId", validateReqParams(roleIdQuerySchema), getRoleById);
roleRouter.get("/", getRoles);
roleRouter.patch(
  "/:roleId",
  validateReqParams(roleIdQuerySchema),
  validateReqBody(updateRoleBodySchema),
  updateRole,
);
roleRouter.delete("/:roleId", validateReqParams(roleIdQuerySchema), deleteRole);

export default roleRouter;
