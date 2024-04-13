import {Request, Response} from 'express'
import {validationResult} from "express-validator";
import {UserResponseDto} from "@/api/dto";
import {AuthService} from "@/api/services";
import {ResponseDto} from "@/common-dto/response";
import {ExceptionDto} from "@/common-dto/exception";
import {BadRequest400Exception} from "@/common/exception";

class AuthController {
    async login(req: Request, res: Response): Promise<Response<ResponseDto<UserResponseDto>>> {
        try {
            const valResult = validationResult(req)
            if (!valResult.isEmpty()) {
                console.error("LoginAuthController: Validation")
                throw new BadRequest400Exception(valResult.array({onlyFirstError: true})[0].msg)
            }

            const response = await AuthService.login(req.body)
            return res.status(200).json(response)
        } catch (error: any) {
            console.error(`LoginAuthController: ${error}`)
            return res.status(error.status).json(new ExceptionDto(error))
        }
    }

    async refreshToken(req: Request, res: Response) {
        try {
            const valResult = validationResult(req)
            if (!valResult.isEmpty()) {
                console.error("RefreshTokenAuthController: Validation")
                throw new BadRequest400Exception(valResult.array({onlyFirstError: true})[0].msg)
            }

            const bodyPayload = req.body

            const response = await AuthService.refreshToken(bodyPayload)
            return res.status(200).json(response)
        } catch (error: any) {
            console.error(`LoginAuthCoRefreshTokenAuthControllerntroller: ${error}`)
            return res.status(error.status).json(new ExceptionDto(error))
        }
    }
}

const authController = new AuthController()
export default authController;
