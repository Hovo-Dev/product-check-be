import mongoose from "mongoose";
import {
    DB_HOST,
    DB_NAME,
    DB_PASSWORD,
    DB_PREFIX,
    DB_URI_QUERY,
    DB_USERNAME,
    NODE_ENV,
    Environment,
} from "@/config/env";

const mongooseConnect = async () => {
    try {
        const url = NODE_ENV === Environment.Development ? `mongodb://127.0.0.1/${DB_NAME}` : DB_PREFIX + '://' + DB_USERNAME + ':' + DB_PASSWORD + '@' + DB_HOST + '/' + DB_NAME + '?' + DB_URI_QUERY;

        await mongoose.connect(url);

        const dbConnection = mongoose.connection;
        dbConnection.once("open", (_) => {
            console.log(`Database connected: ${url}`);
        });

        dbConnection.on("error", (error) => {
            console.error(`connection error: ${error}`);
        });
    } catch (err: any) {
        console.error(err.message);
    }
}

export default mongooseConnect