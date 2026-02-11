import { Router } from "express"
import * as UserController from "../controllers/user.controller.ts"

const router = Router()

router.post('/create', UserController.createUser);
router.get("/get-users",UserController.getUsers)

export default router