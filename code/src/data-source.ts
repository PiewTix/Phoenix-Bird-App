import "reflect-metadata"
import { DataSource } from "typeorm"
import { Uiterlijk } from "./entity/Uiterlijk"
import { Vogel } from "./entity/Vogel"
import {Spotting} from "./entity/Spotting";
import {Afbeelding} from "./entity/Afbeelding";
import {FunFacts} from "./entity/FunFacts";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "phoenix",
    password: "phoenix",
    database: "phoenix",
    synchronize: true,
    logging: false,
    entities: [Vogel, Uiterlijk, Spotting, Afbeelding,FunFacts],
    migrations: [],
    subscribers: [],
})
