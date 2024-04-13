import {IUser} from "@/model-types/mongoose/user.interface";

class UserResponseDto {
    constructor(user: IUser) {
        this.id = user._id
        this.username = user.username
        this.password = user.password
    }

    id: string;
    username: string
    password: string
}

export default UserResponseDto