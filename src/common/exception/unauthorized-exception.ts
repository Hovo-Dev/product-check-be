import {HttpStatus} from "@/config/consts";
import {HttpException} from "@/common/exception";

class UnAuthorized401Exception extends HttpException {
    constructor(message: string) {
        super({
            message: message,
            status: HttpStatus.UnAuthorized,
        })
    }
}

export default  UnAuthorized401Exception