import {body} from "express-validator";

export const loginValidator = [
    body('username').isString(),
    body('password').isString()
]

export const refreshTokenValidator = [
    body('refreshToken').isString(),
]