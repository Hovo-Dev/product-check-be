export interface IAuthLoginPayload {
    username: string;
    password: string;
}

export interface IAuthRefreshTokenPayload {
    refreshToken: string
}
