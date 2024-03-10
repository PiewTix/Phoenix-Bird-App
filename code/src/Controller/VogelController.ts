import { NextFunction, Request, Response } from "express"
import {getAllNames, getOneByName} from "../dao/VogelDao";

export class VogelController {
    async vogels(request: Request, response: Response, next: NextFunction) {
        return getAllNames()
    }
    async one(request: Request, response: Response, next: NextFunction) {
        return getOneByName(request.params.id)
    }
}
