import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Afbeelding{

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    link: string

    @Column({ nullable: true })
    titel_afbeelding: string

    @Column({ nullable: true })
    publicatie_date: Date

    @Column({ nullable: true })
    naam: string

    @Column()
    datum_raadpleging: Date

    @Column()
    bron: string

}
