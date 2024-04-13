import mongoose, {Schema} from "mongoose";

const schema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
        enum: ['admin', 'employee']
    }
})

const UserModel = mongoose.model("users", schema)
export default UserModel