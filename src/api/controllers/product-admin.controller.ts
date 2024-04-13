import {Request, Response} from 'express'
import {validationResult} from "express-validator";
import {UserResponseDto} from "@/api/dto";
import {ResponseDto} from "@/common-dto/response";
import {ProductAdminService} from "@/api/services";
import {ExceptionDto} from "@/common-dto/exception";
import {BadRequest400Exception} from "@/common/exception";
import {IProduct} from "@/model-types/mongoose/product.interface";

class ProductAdminController {
    async getUserPurchasedProducts(_req: Request, res: Response): Promise<Response<ResponseDto<UserResponseDto>>> {
        try {
            const response = await ProductAdminService.getUserPurchasedProducts()
            return res.status(200).json(response)
        } catch (error: any) {
            console.error(`GetEmployeeProductsController: ${error}`)
            return res.status(error.status).json(new ExceptionDto(error))
        }
    }

    async getProducts(_req: Request, res: Response): Promise<Response<ResponseDto<IProduct[]>>> {
        try {
            const response = await ProductAdminService.getAllProducts()
            return res.status(200).json(response)
        } catch (error: any) {
            console.error(`GetEmployeeProductsController: ${error}`)
            return res.status(error.status).json(new ExceptionDto(error))
        }
    }

    async addProduct(req: Request, res: Response) {
        try {
            const valResult = validationResult(req)
            if (!valResult.isEmpty()) {
                console.error("AddProductController: Validation")
                throw new BadRequest400Exception(valResult.array({onlyFirstError: true})[0].msg)
            }

            const bodyPayload = req.body

            const response = await ProductAdminService.addProduct(bodyPayload)
            return res.status(200).json(response)
        } catch (error: any) {
            console.error(`AddProductController: ${error}`)
            return res.status(error.status).json(new ExceptionDto(error))
        }
    }
}

const productAdminController = new ProductAdminController()
export default productAdminController;
