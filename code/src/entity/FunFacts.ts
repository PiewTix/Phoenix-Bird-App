import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class FunFacts {

    @PrimaryGeneratedColumn()
    nummer: number

    @Column()
    fact: string
}
