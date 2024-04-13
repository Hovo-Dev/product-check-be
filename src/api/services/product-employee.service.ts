import {handleError} from "@/common/helpers";
import {I_Response, ResponseDto} from "@/common-dto/response";
import {Internal500Exception} from "@/common/exception";
import {ProductUserSerializer} from "@/api/serializers";
import {AuthenticationDto} from "@/common-dto/auth.dto";
import {ProductUserRepository} from "@/repositories/mongoose";
import {IUserProduct} from "@/model-types/mongoose/user-product.interface";
import {IPurchaseBulkProductsPayload} from "@/api/interface/product.interface";

class ProductEmployeeService {
    async buyProducts(purchaseBulkProductsPayload: IPurchaseBulkProductsPayload, user: AuthenticationDto): Promise<I_Response<IUserProduct[]>> {
        try {
            const productUserSerialized = ProductUserSerializer.mapToProductUserBulkCreate(purchaseBulkProductsPayload.productIds, user._id)
            const allUserProducts = await ProductUserRepository.createBulkProducts(productUserSerialized)

            return new ResponseDto({
                message: 'Items Purchased Successfully',
                result: allUserProducts
            })
        } catch (error: any) {
            console.error(`PurchaseBulkProducts: ${error}`)
            handleError(error)
            throw new Internal500Exception("PURCHASE_BULK_PRODUCTS_INTERNAL")
        }
    }
}

const productEmployeeService = new ProductEmployeeService()
export default productEmployeeService