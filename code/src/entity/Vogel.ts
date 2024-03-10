import {Entity, Column, PrimaryColumn, OneToMany, JoinColumn, OneToOne} from "typeorm"
import { Uiterlijk } from "./Uiterlijk"
import {Spotting} from "./Spotting";
import {Afbeelding} from "./Afbeelding";

@Entity()
export class Vogel {

    @PrimaryColumn()
    nederlandse_naam: string

    @Column({ nullable: true })
    geluid: string

    @Column({ nullable: true , type: "decimal"})
    grootte_min: number

    @Column({ nullable: true , type: "decimal"})
    grootte_max: number

    @Column({ nullable: true , type: "decimal"})
    spanwijdte_min: number

    @Column({ nullable: true , type: "decimal"})
    spanwijdte_max: number

    @Column({ nullable: true })
    vlieg_manier: string

    @Column()
    familie: string

    @Column()
    soort: string

    @OneToMany( () => Uiterlijk, (uiterlijk1:Uiterlijk) => uiterlijk1.vogel )
    @JoinColumn({name: 'uiterlijk'})
    uiterlijk: Uiterlijk[]

    @OneToMany( () => Spotting, (spot:Spotting) => spot.vogel )
    @JoinColumn({name: 'spottings'})
    spottings: Spotting[]

    @OneToOne(() => Afbeelding)
    @JoinColumn()
    bron: Afbeelding
}
