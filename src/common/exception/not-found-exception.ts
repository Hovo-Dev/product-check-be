import {HttpStatus} from "@/config/consts";
import {HttpException} from "@/common/exception";

class NotFound404Exception extends HttpException {
    constructor(message: string) {
        super({
            message: message,
            status: HttpStatus.NotFound,
        })
    }
}

export default  NotFound404Exception