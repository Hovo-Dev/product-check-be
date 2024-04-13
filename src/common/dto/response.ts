export interface I_Response<T> {
    message: string;
    result?: T
}

export class ResponseDto<T> {
    constructor(response: I_Response<T>) {
        this.message = response.message
        if (response.result) {
            this.result = response.result
        }
    }

    message: string;
    result?: T
}