import mongoose, {Schema} from "mongoose";

const schema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'users'
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'products'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const UserProductModel = mongoose.model("users_product", schema)
export default UserProductModel
