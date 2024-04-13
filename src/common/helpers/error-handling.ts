import {
    BadRequest400Exception,
    Forbidden403Exception,
    Internal500Exception,
    NotFound404Exception,
} from "@/common/exception";

const handleError = (error: Error): void => {
    const exceptions = [
        NotFound404Exception,
        BadRequest400Exception,
        Forbidden403Exception,
        Internal500Exception
    ]

    // handle instantiated errors for throwing the exceptions of the same type as the input error
    for (const exceptionType of exceptions) {
        if (error instanceof exceptionType) {
            throw error
        }
    }
}

export default handleError
