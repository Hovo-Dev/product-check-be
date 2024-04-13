import {HttpStatus} from "@/config/consts";
import {HttpException} from "@/common/exception";

class Forbidden403Exception extends HttpException {
    constructor(message: string) {
        super({
            message: message,
            status: HttpStatus.Forbidden,
        })
    }
}

export default  Forbidden403Exception