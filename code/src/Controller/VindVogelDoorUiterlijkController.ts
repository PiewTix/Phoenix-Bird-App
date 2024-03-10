import { NextFunction, Request, Response } from "express"
import {getVogelsDoorUiterlijk} from "../dao/VindVogelDoorUiterlijkDao";

export class VindVogelDoorUiterlijkController {
    async getVogelsDoorUiterlijk(request: Request, response: Response, next: NextFunction) {
        return getVogelsDoorUiterlijk(request.body)
    }
}