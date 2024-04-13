import {UserProductModel} from "@/models/mongoose";
import {EUserType} from "@/model-types/mongoose/user.interface";
import {ICreateBulkProductUser, IUserProduct, IUserProductList} from "@/model-types/mongoose/user-product.interface";

class ProductUserRepository {
    // group by user._id to get the products belong to the same user
    findUserProducts(): Promise<IUserProductList[]> {
        return UserProductModel.aggregate([
            {
                $lookup: {
                    from: "users",
                    localField: "user",
                    foreignField: "_id",
                    as: "user"
                }
            },
            {
                $unwind: "$user"
            },
            {
                $lookup: {
                    from: "products",
                    localField: "product",
                    foreignField: "_id",
                    as: "product"
                }
            },
            {
                $unwind: "$product"
            },
            {
                $match: {
                    "user.type": {$eq: EUserType.Employee}
                }
            },
            {
                $group: {
                    _id: "$user._id",
                    username: {
                        $first: "$user.username"
                    },
                    products: {
                        $push: {
                            id: "$product._id",
                            name: "$product.name"
                        }
                    },
                    total: {
                        $sum: "$product.price"
                    },
                    date: {
                        $first: "$createdAt"
                    },
                }
            },
        ])
    }

    createBulkProducts(productsList: ICreateBulkProductUser[]): Promise<IUserProduct[]> {
        return UserProductModel.insertMany(productsList)
    }
}

const productUserRepository = new ProductUserRepository()
export default productUserRepository