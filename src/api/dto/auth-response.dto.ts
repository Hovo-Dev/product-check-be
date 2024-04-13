import {TokenDto} from "@/common/dto/auth.dto";
import {IUser} from "@/model-types/mongoose/user.interface";

class AuthResponseDto extends TokenDto {
    constructor(user: IUser, token: string, refreshToken: string) {
        super(token, refreshToken)
        this.id = user._id
        this.username = user.username
    }

    id: string;
    username: string
}

export default AuthResponseDto