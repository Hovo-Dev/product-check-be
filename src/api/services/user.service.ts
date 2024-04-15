import {UserResponseDto} from "@/api/dto";
import {handleError} from "@/common/helpers";
import {I_Response, ResponseDto} from "@/common-dto/response";
import {Internal500Exception} from "@/common/exception";
import {IUser} from "@/model-types/mongoose/user.interface.ts";

class UserService {
    async getUser(user: IUser): Promise<I_Response<UserResponseDto>> {
        try {
            return new ResponseDto({
                message: 'Get Single User Successfully',
                result: new UserResponseDto(user)
            })
        } catch (error: any) {
            console.error(`GetUserService: ${error}`)
            handleError(error)
            throw new Internal500Exception("GET_SINGLE_USER INTERNAL")
        }
    }
}

const userService = new UserService()
export default userService