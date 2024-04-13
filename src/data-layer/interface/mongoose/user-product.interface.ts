import {Types} from "mongoose";
import {IUser} from "./user.interface";
import {IProduct} from "./product.interface";

export interface IUserProduct {
    _id: string | Types.ObjectId;
    user: IUser | Types.ObjectId;
    product: IUserProduct | Types.ObjectId;
    createdAt: Date;
}

export interface IUserProductList {
    _id: string
    date: Date,
    total: number,
    username: string,
    products: IProduct[],
}

export interface ICreateBulkProductUser {
    user: Types.ObjectId,
    product: Types.ObjectId,
}