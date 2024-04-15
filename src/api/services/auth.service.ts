import {AuthResponseDto} from "@/api/dto";
import {handleError} from "@/common/helpers";
import {I_Response, ResponseDto} from "@/common-dto/response";
import {IJwtPayload} from "@/common/interface/jwt";
import {UserRepository} from "@/repositories/mongoose";
import {hashService, jwtService} from "@/common/services";
import {JwtPayloadDto, TokenDto} from "@/common-dto/auth.dto";
import {IAuthLoginPayload, IAuthRefreshTokenPayload} from "@/api/interface/auth-request.interface";
import {BadRequest400Exception, Internal500Exception, NotFound404Exception} from "@/common/exception";

class AuthService {
    async login(loginPayload: IAuthLoginPayload): Promise<I_Response<AuthResponseDto>> {
        try {
            const user = await UserRepository.findUser(loginPayload.username)
            if (!user) {
                console.error(`LoginAuthService: User not found ${loginPayload.username}`)
                throw new NotFound404Exception("User Not Found")
            }

            const isValid = await hashService.compareWithEncrypted(loginPayload.password, user.password)
            if (!isValid) {
                console.error(`LoginAuthService: User not found ${loginPayload.username}`)
                throw new NotFound404Exception("User Not Found")
            }

            const jwtPayload = new JwtPayloadDto(user)
            const token = jwtService.generateAccessToken(jwtPayload)
            const refreshToken = jwtService.generateRefreshToken(jwtPayload)

            return new ResponseDto({
                message: 'User Logged In Successfully',
                result: new AuthResponseDto(user, token, refreshToken)
            })
        } catch (error: any) {
            console.error(`LoginAuthService: ${error}`)
            handleError(error)
            throw new Internal500Exception("GET_SINGLE_USER_INTERNAL")
        }
    }

    async refreshToken(refreshTokenPayload: IAuthRefreshTokenPayload): Promise<I_Response<TokenDto>> {
        try {
            const verifiedToken = jwtService.verifyRefreshToken(refreshTokenPayload.refreshToken) as IJwtPayload
            if (!verifiedToken) {
                console.error(`AuthRefreshService: Refresh Token Expired`)
                throw new BadRequest400Exception("Token Expired")
            }

            const user = await UserRepository.findById(verifiedToken._id)
            if (!user) {
                console.error(`AuthRefreshService: User not found`)
                throw new NotFound404Exception("User Not Found")
            }

            const jwtPayload = new JwtPayloadDto(user)
            const newAccessToken = jwtService.generateAccessToken(jwtPayload)
            const newRefreshToken = jwtService.generateRefreshToken(jwtPayload)

            return new ResponseDto({
                message: 'Refresh Token Generated Successfully',
                result: new TokenDto(newAccessToken, newRefreshToken)
            })
        } catch (error: any) {
            console.error(`AuthRefreshService: ${error}`)
            handleError(error)
            throw new Internal500Exception("GET_SINGLE_USER INTERNAL")
        }
    }
}

const authService = new AuthService()
export default authService