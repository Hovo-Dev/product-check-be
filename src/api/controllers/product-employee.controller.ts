import {Request, Response} from 'express'
import {validationResult} from "express-validator";
import {UserResponseDto} from "@/api/dto";
import {ResponseDto} from "@/common-dto/response";
import {ExceptionDto} from "@/common-dto/exception";
import {ProductEmployeeService} from "@/api/services";
import {BadRequest400Exception} from "@/common/exception";

class ProductEmployeeController {
    async buyProducts(req: Request, res: Response): Promise<Response<ResponseDto<UserResponseDto>>> {
        try {
            const valResult = validationResult(req)
            if (!valResult.isEmpty()) {
                console.error("BuyEmployeeProductsController: Validation")
                throw new BadRequest400Exception(valResult.array({onlyFirstError: true})[0].msg)
            }

            const user = req.user
            const bodyPayload = req.body

            const response = await ProductEmployeeService.buyProducts(bodyPayload, user)
            return res.status(200).json(response)
        } catch (error: any) {
            console.error(`BuyEmployeeProductsController: ${error}`)
            return res.status(error.status).json(new ExceptionDto(error))
        }
    }
}

const productEmployeeController = new ProductEmployeeController()
export default productEmployeeController;
