import {Types} from "mongoose";

const parseObjectId = (data: string) => {
    return new Types.ObjectId(data)
}

export default {
    parseObjectId
}