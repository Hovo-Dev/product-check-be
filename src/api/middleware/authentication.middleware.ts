import {NextFunction, Response, Request} from "express";
import {jwtService} from "@/common/services";
import {HttpStatus} from "@/config/consts";
import {IJwtPayload} from "@/common/interface/jwt";
import {ExceptionDto} from "@/common-dto/exception";
import {UserRepository} from "@/repositories/mongoose";
import {AuthenticationDto} from "@/common-dto/auth.dto";
import {EUserType} from "@/model-types/mongoose/user.interface";

class AuthMiddleware {
    validateAdmin(req: Request, res: Response, next: NextFunction) {
        try {
            const authHeader = req.headers['authorization']
            const token = authHeader && authHeader.split(' ')[1]

            if (!token) {
                console.error(`Authenticate Middleware: Token not provided`)
                return res.status(401).json(new ExceptionDto({
                    message: 'TOKEN_REQUIRED',
                    status: HttpStatus.UnAuthorized
                }))
            }

            jwtService.verifyToken(token, async (error, verifiedData) => {
                if (error) {
                    console.error(`Authenticate Middleware: ${error}`)
                    return res.status(401).json(new ExceptionDto({
                        message: 'TOKEN_INVALID',
                        status: HttpStatus.UnAuthorized
                    }))
                }

                const userData = await UserRepository.findById((verifiedData as IJwtPayload)._id)
                if (!userData) {
                    console.error("Authenticate Middleware: User not found")
                    return res.status(403).json(new ExceptionDto({
                        message: 'USER_NOT_FOUND',
                        status: HttpStatus.NotFound
                    }))
                }

                if (userData?.type !== EUserType.Admin) {
                    console.error("Authenticate Middleware: User Permission Denied")
                    return res.status(403).json(new ExceptionDto({
                        message: 'USER_PERMISSION_DENIED',
                        status: HttpStatus.Forbidden
                    }))
                }

                next()
            })
        } catch (error: any) {
            console.error(`Authenticate Middleware: ${error}`)
            return res.status(500).json(new ExceptionDto({
                message: 'ADMIN_VALIDATE_MIDDLEWARE_INTERNAL',
                status: HttpStatus.Internal
            }))
        }
    }

    authenticateEmployeeUser(req: Request, res: Response, next: NextFunction) {
        try {
            const authHeader = req.headers['authorization']
            const token = authHeader && authHeader.split(' ')[1]

            if (!token) {
                console.error(`Authenticate Middleware: Token not provided`)
                return res.status(401).json(new ExceptionDto({
                    message: 'TOKEN_REQUIRED',
                    status: HttpStatus.UnAuthorized
                }))
            }

            jwtService.verifyToken(token, async (error, verifiedData) => {
                if (error) {
                    console.error(`Authenticate Middleware: ${error}`)
                    return res.status(401).json(new ExceptionDto({
                        message: 'TOKEN_INVALID',
                        status: HttpStatus.UnAuthorized
                    }))
                }

                const userData = await UserRepository.findById((verifiedData as IJwtPayload)._id)
                if (!userData) {
                    console.error("Authenticate Middleware: User not found")
                    return res.status(403).json(new ExceptionDto({
                        message: 'USER_NOT_FOUND',
                        status: HttpStatus.NotFound
                    }))
                }

                if (userData?.type !== EUserType.Employee) {
                    console.error("Authenticate Middleware: User Permission Denied")
                    return res.status(403).json(new ExceptionDto({
                        message: 'USER_PERMISSION_DENIED',
                        status: HttpStatus.Forbidden
                    }))
                }

                req.user = new AuthenticationDto(userData)

                next()
            })
        } catch (error: any) {
            console.error(`Authenticate Middleware: ${error}`)
            return res.status(500).json(new ExceptionDto({
                message: 'ADMIN_VALIDATE_MIDDLEWARE_INTERNAL',
                status: HttpStatus.Internal
            }))
        }
    }

    authenticateUser(req: Request, res: Response, next: NextFunction) {
        try {
            const authHeader = req.headers['authorization']
            const token = authHeader && authHeader.split(' ')[1]

            if (!token) {
                console.error(`Authenticate Middleware: Token not provided`)
                return res.status(401).json(new ExceptionDto({
                    message: 'TOKEN_REQUIRED',
                    status: HttpStatus.UnAuthorized
                }))
            }

            jwtService.verifyToken(token, async (error, verifiedData) => {
                if (error) {
                    console.error(`Authenticate Middleware: ${error}`)
                    return res.status(401).json(new ExceptionDto({
                        message: 'TOKEN_INVALID',
                        status: HttpStatus.UnAuthorized
                    }))
                }

                const userData = await UserRepository.findById((verifiedData as IJwtPayload)._id)
                if (!userData) {
                    console.error("Authenticate Middleware: User not found")
                    return res.status(403).json(new ExceptionDto({
                        message: 'USER_NOT_FOUND',
                        status: HttpStatus.NotFound
                    }))
                }

                req.user = new AuthenticationDto(userData)

                next()
            })
        } catch (error: any) {
            console.error(`Authenticate Middleware: ${error}`)
            return res.status(500).json(new ExceptionDto({
                message: 'ADMIN_VALIDATE_MIDDLEWARE_INTERNAL',
                status: HttpStatus.Internal
            }))
        }
    }
}

const authMiddleware = new AuthMiddleware()
export default authMiddleware