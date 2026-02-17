import { Router } from "express"
import * as ProjectController from "../controllers/project.controller.ts"
import { authenticate } from "../middlewares/auth.middleware.ts";

const router = Router()

router.post('/create', ProjectController.createProject);
router.get("/get-projects",ProjectController.getAllProjects)
router.get("/my-projects",authenticate,ProjectController.getMyProjects)
router.get("/:projectId",authenticate,ProjectController.getProjectById)

export default router