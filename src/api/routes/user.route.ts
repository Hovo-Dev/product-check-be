import * as express from 'express'
import {UserController} from "@/api/controllers";

const router = express.Router()

router.get('/', UserController.getUser)

export default router
