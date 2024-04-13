import {I_Exception} from "@/common/dto/exception";

class HttpException extends Error {
    constructor({status, message}: I_Exception) {
        super(message);
        this.status = status;
        this.message = message;
    }

    status: number;
    message: string;
}

export default HttpException