import {TokenDto} from "@/common/dto/auth.dto";
import {EUserType, IUser} from "@/model-types/mongoose/user.interface";

class AuthResponseDto extends TokenDto {
    constructor(user: IUser, token: string, refreshToken: string) {
        super(token, refreshToken)
        this._id = user._id
        this.username = user.username
        this.type = user.type
    }

    _id: string;
    username: string
    type: EUserType
}

export default AuthResponseDto