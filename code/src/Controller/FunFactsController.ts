import { NextFunction, Request, Response } from "express"
import {getRandomFunFact} from "../dao/FunFactsDao";

export class FunFactsController {
    async funfacts(request: Request, response: Response, next: NextFunction) {
        return getRandomFunFact()
    }}
