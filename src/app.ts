import express from "express";
import cors from "cors";
import {authRouter, productAdminRouter, productEmployeeRouter, userRouter} from "@/api/routes";

const app = express();

export const initExpress = () => {
    app.use(express.json());
    app.use(cors())
    app.use("/api/users", userRouter);
    app.use("/api/auth", authRouter);
    app.use("/api/admin/products", productAdminRouter);
    app.use("/api/employee/products", productEmployeeRouter);
}

export default app
