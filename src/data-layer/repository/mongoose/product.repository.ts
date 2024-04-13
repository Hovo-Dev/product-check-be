import {ProductModel} from "@/models/mongoose";
import {IProduct} from "@/model-types/mongoose/product.interface";

class ProductRepository {
    findAllProducts(): Promise<IProduct[]> {
        return ProductModel.find().select({_id: 1, price: 1, name: 1})
    }

    createProduct(name: string, price: number): Promise<IProduct> {
        return ProductModel.create({name, price})
    }

    findProductByName(name: string): Promise<IProduct | null> {
        // find product case-insensitive
        const regex = new RegExp("^" + name + "$", "i");
        return ProductModel.findOne({name: {$regex: regex}})
    }
}

const productRepository = new ProductRepository()
export default productRepository