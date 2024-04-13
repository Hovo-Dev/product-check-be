import {AuthenticationDto} from "../../src/common/dto/auth.dto.ts";

export {}

declare global {
    namespace Express {
        interface Request {
            user: AuthenticationDto
        }
    }
}