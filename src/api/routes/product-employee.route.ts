import * as express from 'express'
import {authenticateMiddleware} from "@/api/middleware";
import {ProductEmployeeController} from "@/api/controllers";
import {buyProductsValidator} from "@/api/validators/productValidator";

const router = express.Router()

router.post('/buy', authenticateMiddleware.authenticateUser, buyProductsValidator, ProductEmployeeController.buyProducts)

export default router
