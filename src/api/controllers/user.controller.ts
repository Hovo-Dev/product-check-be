import {Request, Response} from 'express'
import {validationResult} from "express-validator";
import {UserResponseDto} from "@/api/dto";
import {UserService} from "@/api/services";
import {I_Response, ResponseDto} from "@/common-dto/response";
import {ExceptionDto} from "@/common-dto/exception";
import {BadRequest400Exception} from "@/common/exception";
import {IUser} from "@/model-types/mongoose/user.interface.ts";

class UserController {
    async getUser(req: Request, res: Response): Promise<Response<I_Response<UserResponseDto>>> {
        try {
            const user = req.user as IUser
            const response = await UserService.getUser(user)
            return res.status(200).json(response)
        } catch (error: any) {
            console.error(`GetUserController: ${error}`)
            return res.status(error.status).json(new ExceptionDto(error))
        }
    }
}

const userController = new UserController()
export default userController;
