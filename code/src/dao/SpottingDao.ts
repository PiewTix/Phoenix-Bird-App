import {AppDataSource} from "../data-source";
import {Vogel} from "../entity/Vogel";
import {Spotting} from "../entity/Spotting";
import {Point2D} from "../views/Algoritmen/Point2DTS";


const vogelRepository = AppDataSource.getRepository(Vogel)
const spottingRepository = AppDataSource.getRepository(Spotting)

export async function getAllSpottingsforVogel(vogel) {
    let spottings =  []
    let sp = await vogelRepository.find({
        relations:{
            spottings: true
        },where:{
            nederlandse_naam: vogel
        },select:{
            spottings: true
        }

    })
    sp.forEach( a => (a.spottings.forEach(b =>spottings.push(new Point2D(b.locatie_breedte,b.locatie_lengte) ))))
    return spottings
}

export async function postSpotting(spot) {
    let spotting = new Spotting()
    spotting.locatie_breedte = spot.locatie_breedte
    spotting.locatie_lengte = spot.locatie_lengte
    spotting.datum = new Date(spot.date_string)
    if(spot.foto){
        spotting.foto = spot.foto
    }
    if(spot.gebruiker){
        spotting.gebruiker = spot.gebruiker
    }
    spotting.vogel = await vogelRepository.findOneBy({nederlandse_naam: spot.nederlandse_naam})
    return await spottingRepository.save(spotting)
}

export async function getlatestdate(vogel){
    return await spottingRepository.createQueryBuilder("spotting")
        .innerJoinAndSelect("spotting.vogel","vogel")
        .where("vogel.nederlandse_naam = :naam" )
        .orderBy("spotting.datum", "DESC")
        .setParameters({naam:vogel})
        .skip(0)
        .take(1)
        .getMany()
}