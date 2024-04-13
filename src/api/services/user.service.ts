import {UserResponseDto} from "@/api/dto";
import {handleError} from "@/common/helpers";
import {hashService} from "@/common/services";
import {I_Response, ResponseDto} from "@/common-dto/response";
import {UserRepository} from "@/repositories/mongoose";
import {Internal500Exception, NotFound404Exception} from "@/common/exception";

class UserService {
    async getUser(username: string, password: string): Promise<I_Response<UserResponseDto>> {
        try {
            const user = await UserRepository.findUser(username)
            if (!user) {
                console.error(`GetUserService: User not found ${username}`)
                throw new NotFound404Exception("GetUserService: User not found")
            }

            const isValid = hashService.compareWithEncrypted(password, user.password)
            if (!isValid) {
                console.error(`GetUserService: User not found ${username}`)
                throw new NotFound404Exception("GetUserService: User not found")
            }

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