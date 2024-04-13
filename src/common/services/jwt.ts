import jwt from 'jsonwebtoken'
import {JwtPayloadDto} from "@/common-dto/auth.dto";
import {REFRESH_TOKEN_EXPIRES_IN, REFRESH_TOKEN_SECRET, TOKEN_EXPIRES_IN, TOKEN_SECRET} from "@/config/env";

const generateAccessToken = (payload: JwtPayloadDto) => {
    return jwt.sign({...payload}, TOKEN_SECRET, {
        expiresIn: TOKEN_EXPIRES_IN,
    })
}

const generateRefreshToken = (payload: JwtPayloadDto) => {
    return jwt.sign({...payload}, REFRESH_TOKEN_SECRET, {
        expiresIn: REFRESH_TOKEN_EXPIRES_IN,
    })
}

const verifyToken = (token: string, callback: (error: jwt.VerifyErrors | null, verifiedData?: string | jwt.JwtPayload) => void) => {
    try {
        return jwt.verify(token, TOKEN_SECRET, callback)
    } catch (error: any) {
        console.error('Access token validation failed:', error)
        return error
    }
}

const verifyRefreshToken = (token: string) => {
    try {
        return jwt.verify(token, REFRESH_TOKEN_SECRET)
    } catch (error: any) {
        console.error('Refresh token validation failed:', error)
    }
}

export default {
    generateAccessToken,
    generateRefreshToken,
    verifyToken,
    verifyRefreshToken,
}