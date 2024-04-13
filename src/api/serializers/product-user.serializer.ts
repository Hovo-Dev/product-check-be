import {databaseHelper} from "@/common/helpers";
import {ICreateBulkProductUser} from "@/model-types/mongoose/user-product.interface";

class ProductUserSerializer {
    mapToProductUserBulkCreate(productIds: string[], userId: string): ICreateBulkProductUser[] {
        return productIds.map(productId => ({
            user: databaseHelper.parseObjectId(userId),
            product: databaseHelper.parseObjectId(productId)
        }))
    }
}

const productUserSerializer = new ProductUserSerializer()
export default productUserSerializer