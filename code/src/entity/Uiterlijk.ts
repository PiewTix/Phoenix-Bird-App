import {Entity, PrimaryGeneratedColumn, Column,  ManyToOne, JoinColumn} from "typeorm"
import { Vogel } from "./Vogel"

@Entity()
export class Uiterlijk {

    @PrimaryGeneratedColumn()
    id: number

    @Column({type:"varchar",length:1})
    geslacht: string

    @Column({ nullable: true })
    buik_patroon: string

    @Column({ nullable: true })
    buik_kleur: string

    @Column({ nullable: true })
    borst_patroon: string

    @Column({ nullable: true })
    borst_kleur: string

    @Column({ nullable: true })
    hoofd_patroon: string

    @Column({ nullable: true })
    hoofd_kleur: string

    @Column({ nullable: true })
    snavel_kleur: string

    @Column({ nullable: true })
    snavel_lengte: string

    @Column({ nullable: true })
    rug_patroon: string

    @Column({ nullable: true })
    rug_kleur: string

    @Column({ nullable: true })
    vleugel_patroon: string

    @Column({ nullable: true })
    vleugel_kleur_tip: string

    @Column({ nullable: true })
    vleugel_kleur: string

    @Column({ nullable: true })
    staart_patroon: string

    @Column({ nullable: true })
    staart_kleur: string

    @Column({type:"varchar",length:1})
    cat_grootte: string

    @ManyToOne(() => Vogel, (vogel1: Vogel) =>vogel1.uiterlijk)
    @JoinColumn({name: 'vogel'})
    vogel: Vogel

}
