import { PORT } from "@/config/env.ts";
import app, { initExpress } from "./app.ts";
import mongooseConnect from "@/config/mongoose.ts";

(async () => {
    try {
        initExpress()
        await mongooseConnect()
        app.listen(PORT, () => console.info(`Server running on port ${PORT}`))
    } catch (error) {
        console.error(error)
    }
})()
