import { NextFunction, Request, Response } from "express"
import {getAllSpottingsforVogel, getlatestdate, postSpotting} from "../dao/SpottingDao";

export class SpottingController {
    async spottings(request: Request, response: Response, next: NextFunction) {
        return getAllSpottingsforVogel(request.params.id)
    }
    async postspotting(request: Request, response: Response, next: NextFunction) {
        return postSpotting(request.body)
    }
    async getlatestdate(request: Request, response: Response, next: NextFunction) {
        return getlatestdate(request.params.id)
    }
}