import {HttpStatus} from "@/config/consts";
import {HttpException} from "@/common/exception";

class BadRequest400Exception extends HttpException {
    constructor(message: string) {
        super({
            message: message,
            status: HttpStatus.BadRequest,
        })
    }
}

export default BadRequest400Exception