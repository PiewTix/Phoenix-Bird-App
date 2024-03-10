import {AppDataSource} from "../data-source";
import {Vogel} from "../entity/Vogel";

const vogelRepository = AppDataSource.getRepository(Vogel)

export async function getAllNames() {
    return vogelRepository.find({
        select: {
            nederlandse_naam: true
        },
        order:{
            nederlandse_naam: "ASC"
        }
    })
}

export async function getOneByName(name: string) {
    return vogelRepository.find({
        select: {},
        where: {
            nederlandse_naam: name
        },
        relations: {
            bron: true
        }
    })
}
