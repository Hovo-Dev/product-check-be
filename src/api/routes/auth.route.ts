import * as express from 'express'
import {AuthController} from "@/api/controllers";
import {loginValidator, refreshTokenValidator} from "@/api/validators/authValidator";

const router = express.Router()

router.post('/login', loginValidator, AuthController.login)
router.post('/refresh-token',refreshTokenValidator, AuthController.refreshToken)

export default router
