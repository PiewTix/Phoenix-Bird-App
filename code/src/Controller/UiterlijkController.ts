import { NextFunction, Request, Response } from "express"
import {
    getBorstKleuren, getBorstPatronen,
    getBuikKleuren, getBuikPatronen, getGrootte,
    getHoofdKleuren, getHoofdPatronen,
    getRugKleuren, getRugPatronen,
    getSnavelKleuren, getSnavelLengte, getStaartKleuren, getStaartPatroon, getVleugelKleuren, getVleugelPatronen,
    getVleugelTipKleuren
} from "../dao/UiterlijkDao";

export class UiterlijkController {
    async buikKleur(request: Request, response: Response, next: NextFunction) {
        return getBuikKleuren()
    }

    async borstKleur(request: Request, response: Response, next: NextFunction) {
        return getBorstKleuren()
    }

    async hoofdKleur(request: Request, response: Response, next: NextFunction) {
        return getHoofdKleuren()
    }

    async snavelKleur(request: Request, response: Response, next: NextFunction) {
        return getSnavelKleuren()
    }

    async rugKleur(request: Request, response: Response, next: NextFunction) {
        return getRugKleuren()
    }

    async vleugeltipKleur(request: Request, response: Response, next: NextFunction) {
        return getVleugelTipKleuren()
    }

    async vleugelKleur(request: Request, response: Response, next: NextFunction) {
        return getVleugelKleuren()
    }

    async staartKleur(request: Request, response: Response, next: NextFunction) {
        return getStaartKleuren()
    }

    async buikPatroon(request: Request, response: Response, next: NextFunction) {
        return getBuikPatronen()
    }

    async borstPatroon(request: Request, response: Response, next: NextFunction) {
        return getBorstPatronen()
    }

    async hoofdPatroon(request: Request, response: Response, next: NextFunction) {
        return getHoofdPatronen()
    }

    async snavelLengte(request: Request, response: Response, next: NextFunction) {
        return getSnavelLengte()
    }

    async rugPatroon(request: Request, response: Response, next: NextFunction) {
        return getRugPatronen()
    }

    async vleugelPatroon(request: Request, response: Response, next: NextFunction) {
        return getVleugelPatronen()
    }

    async staartPatroon(request: Request, response: Response, next: NextFunction) {
        return getStaartPatroon()
    }

    async grootte(request: Request, response: Response, next: NextFunction) {
        return getGrootte()
    }
}