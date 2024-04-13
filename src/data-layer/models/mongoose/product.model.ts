import mongoose, {Schema} from "mongoose";

const schema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
})

const ProductModel = mongoose.model("products", schema)
export default ProductModel