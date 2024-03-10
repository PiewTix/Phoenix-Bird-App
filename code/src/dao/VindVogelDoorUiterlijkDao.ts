import {AppDataSource} from "../data-source";
import {Uiterlijk} from "../entity/Uiterlijk";

const uiterlijkRepository = AppDataSource.getRepository(Uiterlijk)

export async function getVogelsDoorUiterlijk(uit) {
    let matching_vogels = []
    let matching = await uiterlijkRepository.find({
        relations:{
            vogel: true
        },where:{
            ...(uit.buik_patroon && { buik_patroon: uit.buik_patroon }),
            ...(uit.buik_kleur && { buik_kleur: uit.buik_kleur }),
            ...(uit.borst_patroon && { borst_patroon: uit.borst_patroon }),
            ...(uit.borst_kleur && { borst_kleur: uit.borst_kleur }),
            ...(uit.hoofd_patroon && { hoofd_patroon: uit.hoofd_patroon }),
            ...(uit.hoofd_kleur && { hoofd_kleur: uit.hoofd_kleur }),
            ...(uit.snavel_lengte && { snavel_lengte: uit.snavel_lengte }),
            ...(uit.snavel_kleur && { snavel_kleur: uit.snavel_kleur }),
            ...(uit.rug_patroon && { rug_patroon: uit.rug_patroon }),
            ...(uit.rug_kleur && { rug_kleur: uit.rug_kleur }),
            ...(uit.vleugel_patroon && { vleugel_patroon: uit.vleugel_patroon }),
            ...(uit.vleugel_kleur && { vleugel_kleur: uit.vleugel_kleur }),
            ...(uit.vleugeltip_kleur && { vleugel_kleur_tip: uit.vleugeltip_kleur }),
            ...(uit.staart_patroon && { staart_patroon: uit.staart_patroon }),
            ...(uit.staart_kleur && { staart_kleur: uit.staart_kleur }),
            ...(uit.vogel_grootte && { cat_grootte: uit.vogel_grootte }),
        },order:{
            vogel:{
                nederlandse_naam: "ASC"
            }
        }
    })
    matching.forEach(a =>(matching_vogels.includes(a.vogel.nederlandse_naam)) ? null : matching_vogels.push(a.vogel.nederlandse_naam))
    return matching_vogels
}