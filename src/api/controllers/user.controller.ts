import {Request, Response} from 'express'
import {validationResult} from "express-validator";
import {UserResponseDto} from "@/api/dto";
import {UserService} from "@/api/services";
import {ResponseDto} from "@/common-dto/response";
import {ExceptionDto} from "@/common-dto/exception";
import {BadRequest400Exception} from "@/common/exception";

class UserController {
    async getUser(req: Request, res: Response): Promise<Response<ResponseDto<UserResponseDto>>> {
        try {
            const valResult = validationResult(req)
            if (!valResult.isEmpty()) {
                console.error("GetUserController: Validation")
                throw new BadRequest400Exception(valResult.array({onlyFirstError: true})[0].msg)
            }

            const response = await UserService.getUser('hovo', 'hovo')
            return res.status(200).json(response)
        } catch (error: any) {
            console.error(`GetUserController: ${error}`)
            return res.status(error.status).json(new ExceptionDto(error))
        }
    }
}

const userController = new UserController()
export default userController;
