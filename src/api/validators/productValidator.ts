import {body} from "express-validator";

export const addProductValidator = [
    body('name').isString().withMessage("name required"),
    body('price').isNumeric().withMessage("price required"),
]

export const buyProductsValidator = [
    body('productIds.*').isString().withMessage('each element in myArray must be a string')
]