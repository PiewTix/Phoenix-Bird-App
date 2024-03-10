import {AppDataSource} from "../data-source";
import {FunFacts} from "../entity/FunFacts";

const FunFactsRepository = AppDataSource.getRepository(FunFacts)

export async function getRandomFunFact() {
    let aantal = await FunFactsRepository.count()
    let index = Math.floor(Math.random() * aantal) + 1
    let fact = await FunFactsRepository.findOne({
        where:{nummer: index},
        select:{fact:true}
    })
    return fact
}


