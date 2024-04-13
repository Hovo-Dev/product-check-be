import {Types} from "mongoose";
import {IProduct} from "@/model-types/mongoose/product.interface";

class ProductDto {
    constructor(product: IProduct) {
        this._id = product._id
        this.name = product.name
        this.price = product.price
    }

    _id: Types.ObjectId;
    name: string;
    price: number
}

export default ProductDto