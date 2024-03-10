import {Column, Entity, JoinColumn, ManyToOne,  PrimaryGeneratedColumn} from "typeorm";
import {Vogel} from "./Vogel";

@Entity()
export class Spotting {

    @PrimaryGeneratedColumn()
    spot_id: number

    @Column({type: 'decimal'})
    locatie_breedte: number

    @Column({type: 'decimal'})
    locatie_lengte: number

    @Column()
    datum: Date

    @Column({nullable: true})
    foto: string

    @ManyToOne(() => Vogel, (vogel1: Vogel) =>vogel1.spottings)
    @JoinColumn({name: 'vogel'})
    vogel: Vogel

    @Column({nullable: true})
    gebruiker: string
}
