import {ProductDto} from "@/api/dto";
import {handleError} from "@/common/helpers";
import {I_Response, ResponseDto} from "@/common-dto/response";
import {IAddProduct} from "@/api/interface/product.interface";
import {IProduct} from "@/model-types/mongoose/product.interface";
import {IUserProductList} from "@/model-types/mongoose/user-product.interface";
import {BadRequest400Exception, Internal500Exception} from "@/common/exception";
import {ProductRepository, ProductUserRepository} from "@/repositories/mongoose";

class ProductAdminService {
    async getUserPurchasedProducts(): Promise<I_Response<IUserProductList[]>> {
        try {
            const allUserProducts = await ProductUserRepository.findUserProducts()

            return new ResponseDto({
                message: 'Get All Employee Items Successfully',
                result: allUserProducts
            })
        } catch (error: any) {
            console.error(`GetAllEmployeeItems: ${error}`)
            handleError(error)
            throw new Internal500Exception("GET_EMPLOYEE_ITEMS_INTERNAL")
        }
    }

    async getAllProducts(): Promise<I_Response<IProduct[]>> {
        try {
            const allProducts = await ProductRepository.findAllProducts()

            return new ResponseDto({
                message: 'Get All Products Successfully',
                result: allProducts
            })
        } catch (error: any) {
            console.error(`GetAllProducts: ${error}`)
            handleError(error)
            throw new Internal500Exception("GET_ALL_PRODUCTS_INTERNAL")
        }
    }

    async addProduct(addProductPayload: IAddProduct): Promise<I_Response<ProductDto>> {
        try {
            const product = await ProductRepository.findProductByName(addProductPayload.name)
            if (product) {
                console.error(`AddProductService: Product ${addProductPayload.name} already exists`)
                throw new BadRequest400Exception('Product Already Exists')
            }

            const newProduct = await ProductRepository.createProduct(addProductPayload.name, addProductPayload.price)

            return new ResponseDto({
                message: 'Added Product Successfully',
                result: new ProductDto(newProduct)
            })
        } catch (error: any) {
            console.error(`AddProductService: ${error}`)
            handleError(error)
            throw new Internal500Exception("ADD_PRODUCT_INTERNAL")
        }
    }
}

const productAdminService = new ProductAdminService()
export default productAdminService