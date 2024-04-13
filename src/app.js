"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initExpress = void 0;
var express_1 = require("express");
var routes_1 = require("@/api/routes");
var app = (0, express_1.default)();
var initExpress = function () {
    app.use(express_1.default.json());
    app.use("/api/users", routes_1.userRouter);
    app.use("/api/auth", routes_1.authRouter);
    app.use("/api/admin/products", routes_1.productAdminRouter);
    app.use("/api/employee/products", routes_1.productEmployeeRouter);
};
exports.initExpress = initExpress;
exports.default = app;
