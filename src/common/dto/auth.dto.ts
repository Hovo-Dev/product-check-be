import {EUserType, IUser} from "@/model-types/mongoose/user.interface";

export class JwtPayloadDto {
    constructor(user: IUser) {
        this._id = user._id
        this.username = user.username
    }

    _id: string
    username: string
}

export class TokenDto {
    constructor(token: string, refreshToken: string) {
        this.token = token
        this.refreshToken = refreshToken
    }

    token: string
    refreshToken: string
}

export class AuthenticationDto {
    constructor(user: IUser) {
        this._id = user._id
        this.username = user.username
        this.type = user.type
    }

    _id: string
    username: string
    type: EUserType
}