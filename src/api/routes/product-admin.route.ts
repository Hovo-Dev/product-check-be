import * as express from 'express'
import {authenticateMiddleware} from "@/api/middleware";
import {ProductAdminController} from "@/api/controllers";
import {addProductValidator} from "@/api/validators/productValidator";

const router = express.Router()

router.post('/add', authenticateMiddleware.validateAdmin, addProductValidator, ProductAdminController.addProduct)
router.get('/history', authenticateMiddleware.validateAdmin, ProductAdminController.getUserPurchasedProducts)
router.get('/', authenticateMiddleware.validateAdmin, ProductAdminController.getProducts)

export default router
