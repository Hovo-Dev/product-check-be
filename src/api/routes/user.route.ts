import * as express from 'express'
import {UserController} from "@/api/controllers";
import {authenticateMiddleware} from "@/api/middleware";

const router = express.Router()

router.get('/', authenticateMiddleware.authenticateUser, UserController.getUser)

export default router
