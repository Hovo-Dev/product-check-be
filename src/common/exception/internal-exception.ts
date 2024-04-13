import {HttpStatus} from "@/config/consts";
import {HttpException} from "@/common/exception";

class Internal500Exception extends HttpException {
    constructor(message: string) {
        super({
            message: message,
            status: HttpStatus.Internal,
        })
    }
}

export default  Internal500Exception