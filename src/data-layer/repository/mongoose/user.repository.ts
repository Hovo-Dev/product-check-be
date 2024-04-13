import {UserModel} from "@/models/mongoose";
import {IUser} from "@/model-types/mongoose/user.interface";

class UserRepository {
    findUser(username: string): Promise<IUser | null> {
        return UserModel.findOne({username})
    }

    findById(id: string): Promise<IUser | null> {
        return UserModel.findOne({_id: id})
    }

    seedUsers(users: Omit<IUser, '_id'>[]) {
        return UserModel.insertMany(users)
    }
}

const userRepository = new UserRepository()
export default userRepository