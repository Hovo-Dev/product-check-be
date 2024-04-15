import {EUserType, IUser} from "@/model-types/mongoose/user.interface";

class UserResponseDto {
    constructor(user: IUser) {
        this.id = user._id
        this.username = user.username
        this.password = user.password
        this.type = user.type
    }

    id: string;
    username: string
    password: string
    type: EUserType;
}

export default UserResponseDto