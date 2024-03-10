import {AppDataSource} from "../data-source";
import {Uiterlijk} from "../entity/Uiterlijk";

const uiterlijkRepository = AppDataSource.getRepository(Uiterlijk)

export async function getBuikKleuren() {
    let BK = []
    let buikKleur = await uiterlijkRepository.find({
        select:{
            buik_kleur: true
        }
        ,order:{
            buik_kleur:"ASC"
        }
    })
    BK.push("onbekend")
    buikKleur.forEach( a => (BK.includes(a.buik_kleur)) ? null : BK.push(a.buik_kleur))
    return BK
}

export async function getBorstKleuren() {
    let BK = []
    let borstKleur = await uiterlijkRepository.find({
        select:{
            borst_kleur: true
        }
        ,order:{
            borst_kleur:"ASC"
        }
    })
    BK.push("onbekend")
    borstKleur.forEach( a => (BK.includes(a.borst_kleur)) ? null : BK.push(a.borst_kleur))
    return BK
}

export async function getHoofdKleuren() {
    let BK = []
    let hoofdKleur = await uiterlijkRepository.find({
        select:{
            hoofd_kleur: true
        }
        ,order:{
            hoofd_kleur:"ASC"
        }
    })
    BK.push("onbekend")
    hoofdKleur.forEach( a => (BK.includes(a.hoofd_kleur)) ? null : BK.push(a.hoofd_kleur))
    return BK
}

export async function getSnavelKleuren() {
    let BK = []
    let snavelkleur = await uiterlijkRepository.find({
        select:{
            snavel_kleur: true
        }
        ,order:{
            snavel_kleur:"ASC"
        }
    })
    BK.push("onbekend")
    snavelkleur.forEach( a => (BK.includes(a.snavel_kleur)) ? null : BK.push(a.snavel_kleur))
    return BK
}

export async function getRugKleuren() {
    let BK = []
    let rugKleur = await uiterlijkRepository.find({
        select:{
            rug_kleur: true
        }
        ,order:{
            rug_kleur:"ASC"
        }
    })
    BK.push("onbekend")
    rugKleur.forEach( a => (BK.includes(a.rug_kleur)) ? null : BK.push(a.rug_kleur))
    return BK
}

export async function getVleugelTipKleuren() {
    let BK = []
    let vleugelTipKleur = await uiterlijkRepository.find({
        select:{
            vleugel_kleur_tip: true
        }
        ,order:{
            vleugel_kleur_tip:"ASC"
        }
    })
    BK.push("onbekend")
    vleugelTipKleur.forEach( a => (BK.includes(a.vleugel_kleur_tip)) ? null : BK.push(a.vleugel_kleur_tip))
    return BK
}

export async function getVleugelKleuren() {
    let BK = []
    let vleugelKleur = await uiterlijkRepository.find({
        select:{
            vleugel_kleur: true
        }
        ,order:{
            vleugel_kleur:"ASC"
        }
    })
    BK.push("onbekend")
    vleugelKleur.forEach( a => (BK.includes(a.vleugel_kleur)) ? null : BK.push(a.vleugel_kleur))
    return BK
}

export async function getStaartKleuren() {
    let BK = []
    let staartKleur = await uiterlijkRepository.find({
        select:{
            staart_kleur: true
        }
        ,order:{
            staart_kleur:"ASC"
        }
    })
    BK.push("onbekend")
    staartKleur.forEach( a => (BK.includes(a.staart_kleur)) ? null : BK.push(a.staart_kleur))
    return BK
}

export async function getBuikPatronen() {
    let BK = []
    let buikPatronen = await uiterlijkRepository.find({
        select:{
            buik_patroon: true
        }
        ,order:{
            buik_patroon:"ASC"
        }
    })
    BK.push("onbekend")
    buikPatronen.forEach( a => (BK.includes(a.buik_patroon)) ? null : BK.push(a.buik_patroon))
    return BK
}

export async function getBorstPatronen() {
    let BK = []
    let borstPatronen = await uiterlijkRepository.find({
        select:{
            borst_patroon: true
        }
        ,order:{
            borst_patroon:"ASC"
        }
    })
    BK.push("onbekend")
    borstPatronen.forEach( a => (BK.includes(a.borst_patroon)) ? null : BK.push(a.borst_patroon))
    return BK
}

export async function getHoofdPatronen() {
    let BK = []
    let hoofdPatroon = await uiterlijkRepository.find({
        select:{
            hoofd_patroon: true
        }
        ,order:{
            hoofd_patroon:"ASC"
        }
    })
    BK.push("onbekend")
    hoofdPatroon.forEach( a => (BK.includes(a.hoofd_patroon)) ? null : BK.push(a.hoofd_patroon))
    return BK
}

export async function getSnavelLengte() {
    let BK = []
    let snavelLengte = await uiterlijkRepository.find({
        select:{
            snavel_lengte: true
        }
        ,order:{
            snavel_lengte:"ASC"
        }
    })
    BK.push("onbekend")
    snavelLengte.forEach( a => (BK.includes(a.snavel_lengte)) ? null : BK.push(a.snavel_lengte))
    return BK
}

export async function getRugPatronen() {
    let BK = []
    let rugPatroon = await uiterlijkRepository.find({
        select:{
            rug_patroon: true
        }
        ,order:{
            rug_patroon:"ASC"
        }
    })
    BK.push("onbekend")
    rugPatroon.forEach( a => (BK.includes(a.rug_patroon)) ? null : BK.push(a.rug_patroon))
    return BK
}

export async function getVleugelPatronen() {
    let BK = []
    let veugelPatroon = await uiterlijkRepository.find({
        select:{
            vleugel_patroon: true
        }
        ,order:{
            vleugel_patroon:"ASC"
        }
    })
    BK.push("onbekend")
    veugelPatroon.forEach( a => (BK.includes(a.vleugel_patroon)) ? null : BK.push(a.vleugel_patroon))
    return BK
}

export async function getStaartPatroon() {
    let BK = []
    let staartPatroon = await uiterlijkRepository.find({
        select:{
            staart_patroon: true
        }
        ,order:{
            staart_patroon:"ASC"
        }
    })
    BK.push("onbekend")
    staartPatroon.forEach( a => (BK.includes(a.staart_patroon)) ? null : BK.push(a.staart_patroon))
    return BK
}

export async function getGrootte() {
    let BK = []
    let grootte = await uiterlijkRepository.find({
        select:{
            cat_grootte: true
        }
        ,order:{
            cat_grootte:"ASC"
        }
    })
    BK.push("onbekend")
    grootte.forEach( a => (BK.includes(a.cat_grootte)) ? null : BK.push(a.cat_grootte))
    return BK
}