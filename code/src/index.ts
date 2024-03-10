import * as express from "express"
import * as bodyParser from "body-parser"
import { Request, Response } from "express"
import { AppDataSource } from "./data-source"
import { Vogel } from "./entity/Vogel"
import { Uiterlijk } from "./entity/Uiterlijk"
import {Afbeelding} from "./entity/Afbeelding";
import {Spotting} from "./entity/Spotting";
import { VogelRoutes } from "./routes/VogelRoutes"
import { UiterlijkRoutes } from "./routes/UiterlijkRoutes"
import * as path from 'path';
import {SpottingRoutes} from "./routes/SpottingRoutes";
import {VindVogelDoorUiterlijkRoutes} from "./routes/VindVogelDoorUiterlijkRoutes";
import {FunFacts} from "./entity/FunFacts";
import {FunFactRoutes} from "./routes/FunFactRoutes";


AppDataSource.initialize().then(async () => {

/*
 let facts :string[] = ["Er bestaan meer dan 10.000 vogel soorten.",

        "Het meeste dooiers in een vogelei is 9.",

        "Om een struisvogelei hard te koken, moet het 1,5 tot 2 uur gekookt worden.",

        "De kiwi is enige vogel zonder vleugels.",

        "De lichaamstemperatuur van een vogel is gemiddeld 41 graden celsius, dit is 4 graden hoger dan die van de mens.",

        "Ooievaars die aan het vliegen zijn, kunnen slapen tijdens hun vlucht.",

        "Vogels kunnen niet zweten.",

        "Het kolibrie-ei is het kleinste ter wereld.",

        "De veren van een vogel wegen meer dan zijn botten.",

        "Papegaaien geven hun kuikens een naam.",

        "De Koekoek laat zijn eieren uitbroeden door andere vogels.",

        "De grootste vogeleieren waren afkomstig van de nu uitgestorven olifantsvogel.",

        "De grootste vogel is de struisvogel, deze kan wel tot 2 meter groot worden.",

        "Struisvogels, kiwi’s, casuarissen, dodo’s en pinguïns zijn vogels die niet kunnen vliegen.",

        "Er zijn 6 soorten giftige vogels in de wereld.",

        "De Kraai en raaf zijn twee verschillende soorten vogels.",

        "De meest voorkomende vogelsoort op aarde is de kip.",

        "Vogels zijn geëvolueerd uit dinosaurussen.",

        "De zwervende albatros heeft de grootste vleugels met een spanwijdte van 3 meter",

        "De vorm van een snavel is afhankelijk van het voedsel dat de vogel in het wild eet",

        "De keizerspinguïn kan 9 weken zonder eten.",

        "Meeuwen kunnen zonder problemen zout water drinken, omdat hun amandelen zout filteren.",

        "Spechten kunnen uren in een boom pikken, dit komt door hun aangepaste schedelstructuur.",

        "De kolibrie kan op één dag wel 2 keer zijn eigen massa eten.",

        "Uilen kunnen hun ogen niet bewegen. Ze draaien hun hele hoofd.",

        "De gierzwaluw kan tot 10 maanden aan een stuk vliegen.",

        "In het wild kunnen vogels wel 45 jaar oud worden.",

        "De snelste vogel is de slechtvalk.",

        "Struisvogeleieren worden langer door het mannetje uitgebroed dan door het vrouwtje.",

        "De roze lichaamskleur van flamingo’s verschijnt niet vanaf de geboorte, maar onstaat door het eten van schaaldieren.",

        "De Kolibrie is de enige vogel die achteruit kan vliegen.",

        "De ezelspinguïn is de snelste zwemmer onder de vogels.",

        "Kippen kunnen dood spelen.",

        "Pinguïns kunnen niet vliegen, maar ze springen wel 2 meter hoog.",

        "Het roodborstje heeft ongeveer 3000 veren.",

        "Het gewicht van een struisvogel kan oplopen tot 130 kilogram.",

        "Als vogels de ruimte in moesten, zouden ze het niet overleven, hun lichaamstructuur heeft zwaartekracht nodig.",

        "Er zijn maar liefst 14 wervels in de nek van een uil.",

        "Struisvogels kunnen wel 50 jaar oud worden.",

        "Flamingo’s slapen staand op één been.",
    ]


    // vanaf hier commenten
    //---------------------------------------------------

    //UNCOMMENT DE FOR LOOP HIERONDER OM DE FACTS IN DE DATABASE TE STEKEN


     for(let fact of facts)
     {
         const funfact = new FunFacts();
         funfact.fact = fact;
         await AppDataSource.manager.save(funfact);
     }

     console.log("funfact toegevoegd");



    console.log("Nieuwe vogel in database steken")
    //afbeelding toevoegen moet als eerste gebeuren als je het iets makelijker wilt maken. Zorg dat de link degene is voor de afbeelding en de bron de site waarop je deze gevonden hebt
    const bron_flam =new Afbeelding()
    bron_flam.link = "https://static01.nyt.com/images/2022/04/12/multimedia/30xp-flamingo/30xp-flamingo-jumbo-v2.jpg?quality=75&auto=webp"
    bron_flam.naam = "John Humbert"
    bron_flam.datum_raadpleging = new Date("2023-04-05")
    bron_flam.bron = "https://www.nytimes.com/2022/03/30/us/flamingo-escape-kansas-texas.html"
    await AppDataSource.manager.save(bron_flam)
    //Een vogel toevoegen kan op deze manier
    const flamingo = new Vogel()
    flamingo.nederlandse_naam = "Flamingo"
    flamingo.grootte_min = 125
    flamingo.grootte_max = 145
    flamingo.spanwijdte_min = 140
    flamingo.spanwijdte_max = 165
    flamingo.geluid = "gagg-agg"
    flamingo.familie = "Phoenicopterus"
    flamingo.soort = "ruber"
    flamingo.bron= bron_flam
    await AppDataSource.manager.save(flamingo)
    //uiterlijk van een vogel toevoegen
    const uiterlijk_flam = new Uiterlijk()
    uiterlijk_flam.vogel = flamingo
    uiterlijk_flam.buik_kleur= "roos"
    uiterlijk_flam.hoofd_kleur="roos"
    uiterlijk_flam.rug_kleur="roos"
    uiterlijk_flam.snavel_kleur="roos"
    uiterlijk_flam.snavel_lengte ="L"
    uiterlijk_flam.staart_kleur ="roos"
    uiterlijk_flam.vleugel_kleur= "roos"
    uiterlijk_flam.vleugel_kleur_tip = "zwart"
    uiterlijk_flam.borst_kleur = "roos"
    uiterlijk_flam.geslacht= "B"
    uiterlijk_flam.cat_grootte= "L"
    uiterlijk_flam.buik_patroon = "effen"
    uiterlijk_flam.borst_patroon = "effen"
    uiterlijk_flam.hoofd_patroon = "effen"
    uiterlijk_flam.rug_patroon = "effen"
    uiterlijk_flam.vleugel_patroon = "effen"
    uiterlijk_flam.staart_patroon = "effen"
    await AppDataSource.manager.save(uiterlijk_flam)
    //spotting toevoegen
    const zoo_antwerpen = new Spotting()
    zoo_antwerpen.locatie_breedte = 51.21638850678478
    zoo_antwerpen.locatie_lengte = 4.423322469163411
    zoo_antwerpen.vogel = flamingo
    zoo_antwerpen.datum = new Date("2023-02-07")
    await AppDataSource.manager.save(zoo_antwerpen)

    console.log("Een nieuwe vogel werd toegevoegd: de " + flamingo.nederlandse_naam)

    //jan van gent in databank steken
    console.log("Nieuwe vogel in database steken")
    const bron_JvG =new Afbeelding()
    bron_JvG.link = "https://www.natuurpunt.be/sites/default/files/images/inline/img_4186.jpg"
    bron_JvG.naam = "Diederik D’Hert"
    bron_JvG.datum_raadpleging = new Date("2023-04-05")
    bron_JvG.bron = "https://www.natuurpunt.be/nieuws/wat-heeft-jan-met-gent-te-maken-20131113"
    await AppDataSource.manager.save(bron_JvG)


    const Jan_van_Gent = new Vogel()
    Jan_van_Gent.nederlandse_naam = "Jan-van-Gent"
    Jan_van_Gent.grootte_min = 87
    Jan_van_Gent.grootte_max = 100
    Jan_van_Gent.spanwijdte_min = 165
    Jan_van_Gent.spanwijdte_max = 180
    Jan_van_Gent.familie = "Morus"
    Jan_van_Gent.soort = "bassanus"
    Jan_van_Gent.bron = bron_JvG
    await AppDataSource.manager.save(Jan_van_Gent)


    const uit_jvg = new Uiterlijk()
    uit_jvg.vogel = Jan_van_Gent
    uit_jvg.vleugel_kleur_tip = "zwart"
    uit_jvg.vleugel_kleur = "wit"
    uit_jvg.staart_kleur = "wit"
    uit_jvg.snavel_kleur = "wit"
    uit_jvg.snavel_lengte ="L"
    uit_jvg.rug_kleur ="wit"
    uit_jvg.buik_kleur = "wit"
    uit_jvg.hoofd_kleur = "geel"
    uit_jvg.borst_kleur = "wit"
    uit_jvg.cat_grootte = "M"
    uit_jvg.geslacht = "B"
    uit_jvg.buik_patroon = "effen"
    uit_jvg.borst_patroon = "effen"
    uit_jvg.hoofd_patroon = "effen"
    uit_jvg.rug_patroon = "effen"
    uit_jvg.vleugel_patroon = "effen"
    uit_jvg.staart_patroon = "effen"
    await AppDataSource.manager.save(uit_jvg)

    await AppDataSource.manager.save(Jan_van_Gent)
    console.log("Een nieuwe vogel werd toegevoegd: de " + Jan_van_Gent.nederlandse_naam)


    //roodboorstje in databank steken
    console.log("Nieuwe vogel in database steken")
    const bron_rb =new Afbeelding()
    bron_rb.link = "https://www.natuurpunt.be/sites/default/files/styles/content-wide/public/roodborst_groot_luc_meert_0.jpg?itok=Vy_-R2sE"
    bron_rb.naam = "Luc Meert"
    bron_rb.datum_raadpleging = new Date("2023-04-05")
    bron_rb.bron = "https://www.natuurpunt.be/pagina/roodborst"
    await AppDataSource.manager.save(bron_rb)


    const roodborstje = new Vogel()
    roodborstje.nederlandse_naam = "Roodborstje"
    roodborstje.grootte_min = 14
    roodborstje.grootte_max = 14
    roodborstje.geluid = "tik-ik-ik-ik..."
    roodborstje.familie = "Erithacus"
    roodborstje.soort = "rubecula"
    roodborstje.bron = bron_rb
    await AppDataSource.manager.save(roodborstje)

    const rb_1_alex_mama = new Spotting()
    rb_1_alex_mama.locatie_breedte = 51.125421135398945
    rb_1_alex_mama.locatie_lengte = 4.225111901415315
    rb_1_alex_mama.vogel = roodborstje
    rb_1_alex_mama.datum = new Date("2023-04-25")
    rb_1_alex_mama.gebruiker = "Carine C"
    await AppDataSource.manager.save(rb_1_alex_mama)

    const rb_2_alex_mama = new Spotting()
    rb_2_alex_mama.locatie_breedte = 51.12536303438805
    rb_2_alex_mama.locatie_lengte = 4.2252214772515195
    rb_2_alex_mama.vogel = roodborstje
    rb_2_alex_mama.datum = new Date("2023-04-29")
    rb_2_alex_mama.gebruiker = "Carine C"
    await AppDataSource.manager.save(rb_2_alex_mama)

    const uit_rb = new Uiterlijk()
    uit_rb.vogel = roodborstje
    uit_rb.vleugel_kleur_tip = "bruin"
    uit_rb.vleugel_kleur = "bruin"
    uit_rb.staart_kleur = "bruin"
    uit_rb.snavel_kleur = "bruin"
    uit_rb.snavel_lengte ="S"
    uit_rb.rug_kleur ="bruin"
    uit_rb.buik_kleur = "wit"
    uit_rb.hoofd_kleur = "bruin"
    uit_rb.borst_kleur = "rood"
    uit_rb.cat_grootte = "S"
    uit_rb.geslacht = "B"
    uit_rb.buik_patroon = "effen"
    uit_rb.borst_patroon = "effen"
    uit_rb.hoofd_patroon = "effen"
    uit_rb.rug_patroon = "effen"
    uit_rb.vleugel_patroon = "effen"
    uit_rb.staart_patroon = "effen"
    await AppDataSource.manager.save(uit_rb)

    console.log("Een nieuwe vogel werd toegevoegd: de " + roodborstje.nederlandse_naam)

    //ekster toevoegen aan databank
    console.log("Nieuwe vogel in database steken")
    const bron_ekster =new Afbeelding()
    bron_ekster.link = "https://veluwezoominbeeld.nl/wp-content/uploads/2019/02/ekster-Pica-pica.jpg"
    bron_ekster.naam = "jaapvette"
    bron_ekster.datum_raadpleging = new Date("2023-04-05")
    bron_ekster.bron = "https://veluwezoominbeeld.nl/natuurinfo/vogels/ekster/"
    bron_ekster.publicatie_date = new Date("2021-08-03")
    await AppDataSource.manager.save(bron_ekster)

    const ekster = new Vogel()
    ekster.nederlandse_naam = "Ekster"
    ekster.grootte_min = 44
    ekster.grootte_max = 48
    ekster.geluid = "tsaka-tsaka-tsjaka"
    ekster.familie = "Pica"
    ekster.soort = "pica"
    ekster.bron = bron_ekster
    await AppDataSource.manager.save(ekster)

    const uit_ekster = new Uiterlijk()
    uit_ekster.vogel = ekster
    uit_ekster.vleugel_kleur_tip = "wit"
    uit_ekster.vleugel_kleur = "blauw"
    uit_ekster.staart_kleur = "blauw"
    uit_ekster.snavel_kleur = "zwart"
    uit_ekster.snavel_lengte ="M"
    uit_ekster.rug_kleur ="zwart"
    uit_ekster.buik_kleur = "wit"
    uit_ekster.hoofd_kleur = "zwart"
    uit_ekster.borst_kleur = "zwart"
    uit_ekster.cat_grootte = "M"
    uit_ekster.geslacht = "B"
    uit_ekster.buik_patroon = "effen"
    uit_ekster.borst_patroon = "effen"
    uit_ekster.hoofd_patroon = "effen"
    uit_ekster.rug_patroon = "effen"
    uit_ekster.vleugel_patroon = "effen"
    uit_ekster.staart_patroon = "zwart"
    await AppDataSource.manager.save(uit_ekster)

    const ek_Pj = new Spotting()
    ek_Pj.locatie_breedte = 50.9103645
    ek_Pj.locatie_lengte = 3.6466849
    ek_Pj.vogel = ekster
    ek_Pj.datum = new Date("2023-04-25")
    ek_Pj.gebruiker = "PJ B"
    await AppDataSource.manager.save(ek_Pj)

    const ek_1_alex = new Spotting()
    ek_1_alex.locatie_breedte = 51.1983987
    ek_1_alex.locatie_lengte = 4.2320618
    ek_1_alex.vogel = ekster
    ek_1_alex.datum = new Date("2023-04-16")
    ek_1_alex.gebruiker = "Alexandra G"
    await AppDataSource.manager.save(ek_1_alex)

    const ek_1_alex_opa = new Spotting()
    ek_1_alex_opa.locatie_breedte = 51.1983987
    ek_1_alex_opa.locatie_lengte = 4.2320618
    ek_1_alex_opa.vogel = ekster
    ek_1_alex_opa.datum = new Date("2023-04-24")
    ek_1_alex_opa.gebruiker = "François C"
    await AppDataSource.manager.save(ek_1_alex_opa)

    const ek_1_alex_papa = new Spotting()
    ek_1_alex_papa.locatie_breedte = 51.1983987
    ek_1_alex_papa.locatie_lengte = 4.2320618
    ek_1_alex_papa.vogel = ekster
    ek_1_alex_papa.datum = new Date("2023-04-25")
    ek_1_alex_papa.gebruiker = "Bart G"
    await AppDataSource.manager.save(ek_1_alex_papa)

    const ek_2_alex = new Spotting()
    ek_2_alex.locatie_breedte = 51.031982066857694
    ek_2_alex.locatie_lengte = 3.7052876132539048
    ek_2_alex.vogel = ekster
    ek_2_alex.datum = new Date("2023-04-24")
    ek_2_alex.gebruiker = "Alexandra G"
    await AppDataSource.manager.save(ek_2_alex)

    const ek_1_alex_zus = new Spotting()
    ek_1_alex_zus.locatie_breedte = 51.04729242200274
    ek_1_alex_zus.locatie_lengte = 3.7159099935927165
    ek_1_alex_zus.vogel = ekster
    ek_1_alex_zus.datum = new Date("2023-04-25")
    ek_1_alex_zus.gebruiker = "Renée G"
    await AppDataSource.manager.save(ek_1_alex_zus)

    const ek_2_alex_zus = new Spotting()
    ek_2_alex_zus.locatie_breedte = 51.13233598168592
    ek_2_alex_zus.locatie_lengte = 4.213360936641517
    ek_2_alex_zus.vogel = ekster
    ek_2_alex_zus.datum = new Date("2023-04-28")
    ek_2_alex_zus.gebruiker = "Renée G"
    await AppDataSource.manager.save(ek_2_alex_zus)

    const ek_1_alex_mama = new Spotting()
    ek_1_alex_mama.locatie_breedte = 51.17314529418945
    ek_1_alex_mama.locatie_lengte = 4.140960216522217
    ek_1_alex_mama.vogel = ekster
    ek_1_alex_mama.datum = new Date("2023-04-25")
    ek_1_alex_mama.gebruiker = "Carine C"
    await AppDataSource.manager.save(ek_1_alex_mama)

    const ek_2_alex_mama = new Spotting()
    ek_2_alex_mama.locatie_breedte = 51.13289358831205
    ek_2_alex_mama.locatie_lengte = 4.1912340430960615
    ek_2_alex_mama.vogel = ekster
    ek_2_alex_mama.datum = new Date("2023-04-25")
    ek_2_alex_mama.gebruiker = "Carine C"
    await AppDataSource.manager.save(ek_2_alex_mama)

    const ek_3_alex_mama = new Spotting()
    ek_3_alex_mama.locatie_breedte = 51.135118743415376
    ek_3_alex_mama.locatie_lengte = 4.189019272330876
    ek_3_alex_mama.vogel = ekster
    ek_3_alex_mama.datum = new Date("2023-04-25")
    ek_3_alex_mama.gebruiker = "Carine C"
    await AppDataSource.manager.save(ek_3_alex_mama)

    const ek_4_alex_mama = new Spotting()
    ek_4_alex_mama.locatie_breedte = 51.1529834
    ek_4_alex_mama.locatie_lengte = 4.1687456
    ek_4_alex_mama.vogel = ekster
    ek_4_alex_mama.datum = new Date("2023-04-25")
    ek_4_alex_mama.gebruiker = "Carine C"
    await AppDataSource.manager.save(ek_4_alex_mama)

    const ek_5_alex_mama = new Spotting()
    ek_5_alex_mama.locatie_breedte = 51.12794
    ek_5_alex_mama.locatie_lengte = 4.21372
    ek_5_alex_mama.vogel = ekster
    ek_5_alex_mama.datum = new Date("2023-04-25")
    ek_5_alex_mama.gebruiker = "Carine C"
    await AppDataSource.manager.save(ek_5_alex_mama)

    const ek_6_alex_mama = new Spotting()
    ek_6_alex_mama.locatie_breedte = 51.13801638141502
    ek_6_alex_mama.locatie_lengte = 4.185465184002757
    ek_6_alex_mama.vogel = ekster
    ek_6_alex_mama.datum = new Date("2023-04-26")
    ek_6_alex_mama.gebruiker = "Carine C"
    await AppDataSource.manager.save(ek_6_alex_mama)

    const ek_7_alex_mama = new Spotting()
    ek_7_alex_mama.locatie_breedte = 51.14347530583174
    ek_7_alex_mama.locatie_lengte = 4.180972466152211
    ek_7_alex_mama.vogel = ekster
    ek_7_alex_mama.datum = new Date("2023-04-26")
    ek_7_alex_mama.gebruiker = "Carine C"
    await AppDataSource.manager.save(ek_7_alex_mama)

    const ek_8_alex_mama = new Spotting()
    ek_8_alex_mama.locatie_breedte = 51.14231418521078
    ek_8_alex_mama.locatie_lengte = 4.181573218057832
    ek_8_alex_mama.vogel = ekster
    ek_8_alex_mama.datum = new Date("2023-04-26")
    ek_8_alex_mama.gebruiker = "Carine C"
    await AppDataSource.manager.save(ek_8_alex_mama)

    const ek_9_alex_mama = new Spotting()
    ek_9_alex_mama.locatie_breedte = 51.14514983544628
    ek_9_alex_mama.locatie_lengte = 4.180028010010677
    ek_9_alex_mama.vogel = ekster
    ek_9_alex_mama.datum = new Date("2023-04-26")
    ek_9_alex_mama.gebruiker = "Carine C"
    await AppDataSource.manager.save(ek_9_alex_mama)

    const ek_1_alex_hanne = new Spotting()
    ek_1_alex_hanne.locatie_breedte = 51.034765302707775
    ek_1_alex_hanne.locatie_lengte = 3.7034608570635896
    ek_1_alex_hanne.vogel = ekster
    ek_1_alex_hanne.datum = new Date("2023-04-27")
    ek_1_alex_hanne.gebruiker = "Alexandra&Hanne"
    await AppDataSource.manager.save(ek_1_alex_hanne)

    const ek_2_alex_hanne = new Spotting()
    ek_2_alex_hanne.locatie_breedte = 51.03112328797895
    ek_2_alex_hanne.locatie_lengte = 3.7026305276476457
    ek_2_alex_hanne.vogel = ekster
    ek_2_alex_hanne.datum = new Date("2023-04-27")
    ek_2_alex_hanne.gebruiker = "Alexandra&Hanne"
    await AppDataSource.manager.save(ek_2_alex_hanne)

    const ek_10_alex_mama = new Spotting()
    ek_10_alex_mama.locatie_breedte = 51.14206486306289
    ek_10_alex_mama.locatie_lengte = 4.181096343252189
    ek_10_alex_mama.vogel = ekster
    ek_10_alex_mama.datum = new Date("2023-04-27")
    ek_10_alex_mama.gebruiker = "Carine C"
    await AppDataSource.manager.save(ek_10_alex_mama)

    const ek_11_alex_mama = new Spotting()
    ek_11_alex_mama.locatie_breedte = 51.15793217372091
    ek_11_alex_mama.locatie_lengte = 4.160701571030825
    ek_11_alex_mama.vogel = ekster
    ek_11_alex_mama.datum = new Date("2023-04-27")
    ek_11_alex_mama.gebruiker = "Carine C"
    await AppDataSource.manager.save(ek_11_alex_mama)

    const ek_12_alex_mama = new Spotting()
    ek_12_alex_mama.locatie_breedte = 51.15793217372091
    ek_12_alex_mama.locatie_lengte = 4.160701571030825
    ek_12_alex_mama.vogel = ekster
    ek_12_alex_mama.datum = new Date("2023-04-27")
    ek_12_alex_mama.gebruiker = "Carine C"
    await AppDataSource.manager.save(ek_12_alex_mama)

    const ek_13_alex_mama = new Spotting()
    ek_13_alex_mama.locatie_breedte = 51.145668393963746
    ek_13_alex_mama.locatie_lengte = 4.179696631145888
    ek_13_alex_mama.vogel = ekster
    ek_13_alex_mama.datum = new Date("2023-04-27")
    ek_13_alex_mama.gebruiker = "Carine C"
    await AppDataSource.manager.save(ek_13_alex_mama)

    const ek_14_alex_mama = new Spotting()
    ek_14_alex_mama.locatie_breedte = 51.14162918095001
    ek_14_alex_mama.locatie_lengte = 4.181966939157675
    ek_14_alex_mama.vogel = ekster
    ek_14_alex_mama.datum = new Date("2023-04-27")
    ek_14_alex_mama.gebruiker = "Carine C"
    await AppDataSource.manager.save(ek_14_alex_mama)

    const ek_15_alex_mama = new Spotting()
    ek_15_alex_mama.locatie_breedte = 51.1305849930299
    ek_15_alex_mama.locatie_lengte = 4.1941581378713755
    ek_15_alex_mama.vogel = ekster
    ek_15_alex_mama.datum = new Date("2023-04-27")
    ek_15_alex_mama.gebruiker = "Carine C"
    await AppDataSource.manager.save(ek_15_alex_mama)

    const ek_16_alex_mama = new Spotting()
    ek_16_alex_mama.locatie_breedte = 51.19803971766323
    ek_16_alex_mama.locatie_lengte = 4.2329371622344825
    ek_16_alex_mama.vogel = ekster
    ek_16_alex_mama.datum = new Date("2023-04-28")
    ek_16_alex_mama.gebruiker = "Carine C"
    await AppDataSource.manager.save(ek_16_alex_mama)

    const ek_2_alex_papa = new Spotting()
    ek_2_alex_papa.locatie_breedte = 51.198082019128904
    ek_2_alex_papa.locatie_lengte = 4.2326733963750485
    ek_2_alex_papa.vogel = ekster
    ek_2_alex_papa.datum = new Date("2023-04-27")
    ek_2_alex_papa.gebruiker = "Bart G"
    await AppDataSource.manager.save(ek_2_alex_papa)

    const ek_3_alex_papa = new Spotting()
    ek_3_alex_papa.locatie_breedte = 51.125403969309104
    ek_3_alex_papa.locatie_lengte = 4.225155609989475
    ek_3_alex_papa.vogel = ekster
    ek_3_alex_papa.datum = new Date("2023-04-26")
    ek_3_alex_papa.gebruiker = "Bart G"
    await AppDataSource.manager.save(ek_3_alex_papa)

    const ek_4_alex_papa = new Spotting()
    ek_4_alex_papa.locatie_breedte = 51.10668792309328
    ek_4_alex_papa.locatie_lengte = 4.194722433532374
    ek_4_alex_papa.vogel = ekster
    ek_4_alex_papa.datum = new Date("2023-04-26")
    ek_4_alex_papa.gebruiker = "Bart G"
    await AppDataSource.manager.save(ek_4_alex_papa)

    const ek_5_alex_papa = new Spotting()
    ek_5_alex_papa.locatie_breedte = 51.104118833616354
    ek_5_alex_papa.locatie_lengte = 4.191465761251285
    ek_5_alex_papa.vogel = ekster
    ek_5_alex_papa.datum = new Date("2023-04-26")
    ek_5_alex_papa.gebruiker = "Bart G"
    await AppDataSource.manager.save(ek_5_alex_papa)

    const ek_6_alex_papa = new Spotting()
    ek_6_alex_papa.locatie_breedte = 51.10556654687586
    ek_6_alex_papa.locatie_lengte = 4.193426691590831
    ek_6_alex_papa.vogel = ekster
    ek_6_alex_papa.datum = new Date("2023-04-26")
    ek_6_alex_papa.gebruiker = "Bart G"
    await AppDataSource.manager.save(ek_6_alex_papa)

    const ek_7_alex_papa = new Spotting()
    ek_7_alex_papa.locatie_breedte = 51.06970952383748
    ek_7_alex_papa.locatie_lengte = 4.189830496659588
    ek_7_alex_papa.vogel = ekster
    ek_7_alex_papa.datum = new Date("2023-04-26")
    ek_7_alex_papa.gebruiker = "Bart G"
    await AppDataSource.manager.save(ek_7_alex_papa)

    const ek_8_alex_papa = new Spotting()
    ek_8_alex_papa.locatie_breedte = 51.1036206616105
    ek_8_alex_papa.locatie_lengte = 4.18790420963278
    ek_8_alex_papa.vogel = ekster
    ek_8_alex_papa.datum = new Date("2023-04-26")
    ek_8_alex_papa.gebruiker = "Bart G"
    await AppDataSource.manager.save(ek_8_alex_papa)

    const ek_9_alex_papa = new Spotting()
    ek_9_alex_papa.locatie_breedte = 51.06356880324926
    ek_9_alex_papa.locatie_lengte = 4.188701054460582
    ek_9_alex_papa.vogel = ekster
    ek_9_alex_papa.datum = new Date("2023-04-26")
    ek_9_alex_papa.gebruiker = "Bart G"
    await AppDataSource.manager.save(ek_9_alex_papa)

    const ek_10_alex_papa = new Spotting()
    ek_10_alex_papa.locatie_breedte = 51.06356880324926
    ek_10_alex_papa.locatie_lengte = 4.188701054460582
    ek_10_alex_papa.vogel = ekster
    ek_10_alex_papa.datum = new Date("2023-04-26")
    ek_10_alex_papa.gebruiker = "Bart G"
    await AppDataSource.manager.save(ek_10_alex_papa)

    const ek_11_alex_papa = new Spotting()
    ek_11_alex_papa.locatie_breedte = 51.04523977220968
    ek_11_alex_papa.locatie_lengte = 4.134086002013215
    ek_11_alex_papa.vogel = ekster
    ek_11_alex_papa.datum = new Date("2023-04-26")
    ek_11_alex_papa.gebruiker = "Bart G"
    await AppDataSource.manager.save(ek_11_alex_papa)

    const ek_12_alex_papa = new Spotting()
    ek_12_alex_papa.locatie_breedte = 51.047104256909414
    ek_12_alex_papa.locatie_lengte = 4.138340457948564
    ek_12_alex_papa.vogel = ekster
    ek_12_alex_papa.datum = new Date("2023-04-26")
    ek_12_alex_papa.gebruiker = "Bart G"
    await AppDataSource.manager.save(ek_12_alex_papa)

    const ek_13_alex_papa = new Spotting()
    ek_13_alex_papa.locatie_breedte = 51.04022859579162
    ek_13_alex_papa.locatie_lengte = 4.1248079527750425
    ek_13_alex_papa.vogel = ekster
    ek_13_alex_papa.datum = new Date("2023-04-26")
    ek_13_alex_papa.gebruiker = "Bart G"
    await AppDataSource.manager.save(ek_13_alex_papa)

    const ek_14_alex_papa = new Spotting()
    ek_14_alex_papa.locatie_breedte = 51.10986678622446
    ek_14_alex_papa.locatie_lengte = 4.174981750161613
    ek_14_alex_papa.vogel = ekster
    ek_14_alex_papa.datum = new Date("2023-04-26")
    ek_14_alex_papa.gebruiker = "Bart G"
    await AppDataSource.manager.save(ek_14_alex_papa)

    const ek_15_alex_papa = new Spotting()
    ek_15_alex_papa.locatie_breedte = 51.09650732929161
    ek_15_alex_papa.locatie_lengte = 4.245782103114943
    ek_15_alex_papa.vogel = ekster
    ek_15_alex_papa.datum = new Date("2023-04-29")
    ek_15_alex_papa.gebruiker = "Bart G"
    await AppDataSource.manager.save(ek_15_alex_papa)

    const ek_16_alex_papa = new Spotting()
    ek_16_alex_papa.locatie_breedte = 51.09650732929161
    ek_16_alex_papa.locatie_lengte = 4.245782103114943
    ek_16_alex_papa.vogel = ekster
    ek_16_alex_papa.datum = new Date("2023-04-29")
    ek_16_alex_papa.gebruiker = "Bart G"
    await AppDataSource.manager.save(ek_16_alex_papa)

    const ek_1_jens = new Spotting()
    ek_1_jens.locatie_breedte = 50.924371443204336
    ek_1_jens.locatie_lengte = 3.353372448382258
    ek_1_jens.vogel = ekster
    ek_1_jens.datum = new Date("2023-04-27")
    ek_1_jens.gebruiker = "Jens V"
    await AppDataSource.manager.save(ek_1_jens)

    const ek_2_jens = new Spotting()
    ek_2_jens.locatie_breedte = 50.9248070607623
    ek_2_jens.locatie_lengte = 3.3539535081019576
    ek_2_jens.vogel = ekster
    ek_2_jens.datum = new Date("2023-04-27")
    ek_2_jens.gebruiker = "Jens V"
    await AppDataSource.manager.save(ek_2_jens)

    const ek_3_jens = new Spotting()
    ek_3_jens.locatie_breedte = 50.92480410203209
    ek_3_jens.locatie_lengte = 3.353929368219571
    ek_3_jens.vogel = ekster
    ek_3_jens.datum = new Date("2023-04-27")
    ek_3_jens.gebruiker = "Jens V"
    await AppDataSource.manager.save(ek_3_jens)

    const ek_4_jens = new Spotting()
    ek_4_jens.locatie_breedte = 50.92301099611841
    ek_4_jens.locatie_lengte = 3.3517944205035635
    ek_4_jens.vogel = ekster
    ek_4_jens.datum = new Date("2023-04-27")
    ek_4_jens.gebruiker = "Jens V"
    await AppDataSource.manager.save(ek_4_jens)

    const ek_5_jens = new Spotting()
    ek_5_jens.locatie_breedte = 50.92301099611841
    ek_5_jens.locatie_lengte = 3.3517944205035635
    ek_5_jens.vogel = ekster
    ek_5_jens.datum = new Date("2023-04-27")
    ek_5_jens.gebruiker = "Jens V"
    await AppDataSource.manager.save(ek_5_jens)

    const ek_6_jens = new Spotting()
    ek_6_jens.locatie_breedte = 50.92301099611841
    ek_6_jens.locatie_lengte = 3.3517944205035635
    ek_6_jens.vogel = ekster
    ek_6_jens.datum = new Date("2023-04-27")
    ek_6_jens.gebruiker = "Jens V"
    await AppDataSource.manager.save(ek_6_jens)

    const ek_7_jens = new Spotting()
    ek_7_jens.locatie_breedte = 50.92301099611841
    ek_7_jens.locatie_lengte = 3.3517944205035635
    ek_7_jens.vogel = ekster
    ek_7_jens.datum = new Date("2023-04-27")
    ek_7_jens.gebruiker = "Jens V"
    await AppDataSource.manager.save(ek_7_jens)

    const ek_8_jens = new Spotting()
    ek_8_jens.locatie_breedte = 50.92301099611841
    ek_8_jens.locatie_lengte = 3.3517944205035635
    ek_8_jens.vogel = ekster
    ek_8_jens.datum = new Date("2023-04-27")
    ek_8_jens.gebruiker = "Jens V"
    await AppDataSource.manager.save(ek_8_jens)

    const ek_2_Pj = new Spotting()
    ek_2_Pj.locatie_breedte = 50.906281
    ek_2_Pj.locatie_lengte = 3.626152
    ek_2_Pj.vogel = ekster
    ek_2_Pj.datum = new Date("2023-04-26")
    ek_2_Pj.gebruiker = "PJ B"
    await AppDataSource.manager.save(ek_2_Pj)

    const ek_Hanne_D = new Spotting()
    ek_Hanne_D.locatie_breedte = 51.041265345622335
    ek_Hanne_D.locatie_lengte = 3.725060511390881
    ek_Hanne_D.vogel = ekster
    ek_Hanne_D.datum = new Date("2023-04-26")
    ek_Hanne_D.gebruiker = "Hanne D"
    await AppDataSource.manager.save(ek_Hanne_D)

    const ek_1_Hanne_A = new Spotting()
    ek_1_Hanne_A.locatie_breedte = 51.012655147829676
    ek_1_Hanne_A.locatie_lengte = 3.708144203699333
    ek_1_Hanne_A.vogel = ekster
    ek_1_Hanne_A.datum = new Date("2023-04-28")
    ek_1_Hanne_A.gebruiker = "Hanne A"
    await AppDataSource.manager.save(ek_1_Hanne_A)

    const ek_2_Hanne_A = new Spotting()
    ek_2_Hanne_A.locatie_breedte = 51.008823
    ek_2_Hanne_A.locatie_lengte = 3.750414
    ek_2_Hanne_A.vogel = ekster
    ek_2_Hanne_A.datum = new Date("2023-04-28")
    ek_2_Hanne_A.gebruiker = "Hanne A"
    await AppDataSource.manager.save(ek_2_Hanne_A)

    const ek_3_Hanne_A = new Spotting()
    ek_3_Hanne_A.locatie_breedte = 51.013559
    ek_3_Hanne_A.locatie_lengte = 3.732956
    ek_3_Hanne_A.vogel = ekster
    ek_3_Hanne_A.datum = new Date("2023-04-28")
    ek_3_Hanne_A.gebruiker = "Hanne A"
    await AppDataSource.manager.save(ek_3_Hanne_A)

    const ek_4_Hanne_A = new Spotting()
    ek_4_Hanne_A.locatie_breedte = 51.014622
    ek_4_Hanne_A.locatie_lengte =  3.743350
    ek_4_Hanne_A.vogel = ekster
    ek_4_Hanne_A.datum = new Date("2023-04-28")
    ek_4_Hanne_A.gebruiker = "Hanne A"
    await AppDataSource.manager.save(ek_4_Hanne_A)

    const ek_9_jens = new Spotting()
    ek_9_jens.locatie_breedte = 50.91850762123061
    ek_9_jens.locatie_lengte = 3.3545364460846865
    ek_9_jens.vogel = ekster
    ek_9_jens.datum = new Date("2023-04-28")
    ek_9_jens.gebruiker = "Jens V"
    await AppDataSource.manager.save(ek_9_jens)

    const ek_10_jens = new Spotting()
    ek_10_jens.locatie_breedte = 50.90120033837721
    ek_10_jens.locatie_lengte = 3.4385915381034877
    ek_10_jens.vogel = ekster
    ek_10_jens.datum = new Date("2023-04-28")
    ek_10_jens.gebruiker = "Jens V"
    await AppDataSource.manager.save(ek_10_jens)

    const ek_11_jens = new Spotting()
    ek_11_jens.locatie_breedte = 50.942066281007136
    ek_11_jens.locatie_lengte = 3.1383473762737055
    ek_11_jens.vogel = ekster
    ek_11_jens.datum = new Date("2023-04-29")
    ek_11_jens.gebruiker = "Jens V"
    await AppDataSource.manager.save(ek_11_jens)

    const ek_12_jens = new Spotting()
    ek_12_jens.locatie_breedte = 50.94218075391085
    ek_12_jens.locatie_lengte = 3.137262949512164
    ek_12_jens.vogel = ekster
    ek_12_jens.datum = new Date("2023-04-29")
    ek_12_jens.gebruiker = "Jens V"
    await AppDataSource.manager.save(ek_12_jens)

    const ek_13_jens = new Spotting()
    ek_13_jens.locatie_breedte = 50.92483282371039
    ek_13_jens.locatie_lengte =3.353415704658605
    ek_13_jens.vogel = ekster
    ek_13_jens.datum = new Date("2023-04-29")
    ek_13_jens.gebruiker = "Jens V"
    await AppDataSource.manager.save(ek_13_jens)

    const ek_1_alex_zus_mama = new Spotting()
    ek_1_alex_zus_mama.locatie_breedte = 51.13665207631298
    ek_1_alex_zus_mama.locatie_lengte =4.19601552195751
    ek_1_alex_zus_mama.vogel = ekster
    ek_1_alex_zus_mama.datum = new Date("2023-04-29")
    ek_1_alex_zus_mama.gebruiker = "Alexandra&Renée&Carine"
    await AppDataSource.manager.save(ek_1_alex_zus_mama)

    const ek_2_alex_zus_mama = new Spotting()
    ek_2_alex_zus_mama.locatie_breedte = 51.138667788982296
    ek_2_alex_zus_mama.locatie_lengte =4.214221118565606
    ek_2_alex_zus_mama.vogel = ekster
    ek_2_alex_zus_mama.datum = new Date("2023-04-29")
    ek_2_alex_zus_mama.gebruiker = "Alexandra&Renée&Carine"
    await AppDataSource.manager.save(ek_2_alex_zus_mama)

    const ek_3_alex_zus_mama = new Spotting()
    ek_3_alex_zus_mama.locatie_breedte = 51.138667788982296
    ek_3_alex_zus_mama.locatie_lengte =4.214221118565606
    ek_3_alex_zus_mama.vogel = ekster
    ek_3_alex_zus_mama.datum = new Date("2023-04-29")
    ek_3_alex_zus_mama.gebruiker = "Alexandra&Renée&Carine"
    await AppDataSource.manager.save(ek_3_alex_zus_mama)

    const ek_sanjog = new Spotting()
    ek_sanjog.locatie_breedte = 51.112398
    ek_sanjog.locatie_lengte =3.723070
    ek_sanjog.vogel = ekster
    ek_sanjog.datum = new Date("2023-05-02")
    ek_sanjog.gebruiker = "Sanjog S"
    await AppDataSource.manager.save(ek_sanjog)

    const ek_AHA = new Spotting()
    ek_AHA.locatie_breedte = 51.04099917895783
    ek_AHA.locatie_lengte = 3.7247032780435374
    ek_AHA.vogel = ekster
    ek_AHA.datum = new Date("2023-05-01")
    ek_AHA.gebruiker = "Arthur&Hanne&Alexandra"
    await AppDataSource.manager.save(ek_AHA)

    const ek_lena = new Spotting()
    ek_lena.locatie_breedte = 51.2682882
    ek_lena.locatie_lengte = 3.6193099
    ek_lena.vogel = ekster
    ek_lena.datum = new Date("2023-04-29")
    ek_lena.gebruiker = "Lena V"
    await AppDataSource.manager.save(ek_lena)

    console.log("Een nieuwe vogel werd toegevoegd: de " + ekster.nederlandse_naam)

    //havik in de database steken
    console.log("Nieuwe vogel in database steken")

    const bron_hav =new Afbeelding()
    bron_hav.link = "https://www.landidee.nl/wp-content/uploads/sites/7/2016/08/havik-2.png"
    bron_hav.datum_raadpleging = new Date("2023-04-05")
    bron_hav.bron = "https://www.landidee.nl/dieren-in-de-natuur/de-havik-krachtige-acrobaat/"
    await AppDataSource.manager.save(bron_hav)


    const havik = new Vogel()
    havik.nederlandse_naam = "Havik"
    havik.grootte_min = 48
    havik.grootte_max = 61
    havik.spanwijdte_min = 98
    havik.spanwijdte_max = 117
    havik.vlieg_manier = "cirkelt horizontaal, langzame en krachtige vleugelslag"
    havik.geluid = "kjee kjee kjee"
    havik.familie = "Accipitet"
    havik.soort = "gentilis"
    havik.bron = bron_hav
    await AppDataSource.manager.save(havik)

    const uit_hv = new Uiterlijk()
    uit_hv.vogel = havik
    uit_hv.vleugel_kleur_tip = "bruin"
    uit_hv.vleugel_kleur = "bruin"
    uit_hv.staart_kleur = "bruin"
    uit_hv.snavel_kleur = "grijs"
    uit_hv.snavel_lengte ="S"
    uit_hv.rug_kleur ="bruin"
    uit_hv.buik_kleur = "wit"
    uit_hv.hoofd_kleur = "bruin"
    uit_hv.borst_kleur = "wit"
    uit_hv.cat_grootte = "L"
    uit_hv.geslacht = "V"
    uit_hv.buik_patroon = "spikkeld"
    uit_hv.borst_patroon = "spikkeld"
    uit_hv.hoofd_patroon = "effen"
    uit_hv.rug_patroon = "effen"
    uit_hv.vleugel_patroon = "effen"
    uit_hv.staart_patroon = "effen"
    await AppDataSource.manager.save(uit_hv)

    const uit_hvM = new Uiterlijk()
    uit_hvM.vogel = havik
    uit_hvM.vleugel_kleur_tip = "grijs"
    uit_hvM.vleugel_kleur = "grijs"
    uit_hvM.staart_kleur = "grijs"
    uit_hvM.snavel_kleur = "grijs"
    uit_hvM.snavel_lengte ="S"
    uit_hvM.rug_kleur ="grijs"
    uit_hvM.buik_kleur = "wit"
    uit_hvM.hoofd_kleur = "grijs"
    uit_hvM.borst_kleur = "wit"
    uit_hvM.cat_grootte = "L"
    uit_hvM.geslacht = "M"
    uit_hvM.buik_patroon = "spikkeld"
    uit_hvM.borst_patroon = "spikkeld"
    uit_hvM.hoofd_patroon = "effen"
    uit_hvM.rug_patroon = "effen"
    uit_hvM.vleugel_patroon = "effen"
    uit_hvM.staart_patroon = "effen"
    await AppDataSource.manager.save(uit_hvM)

    await AppDataSource.manager.save(havik)
    console.log("Een nieuwe vogel werd toegevoegd: de " + havik.nederlandse_naam)

    console.log("Nieuwe vogel in database steken")

    const bron_pors =new Afbeelding()
    bron_pors.link = "https://ecopedia.s3.eu-central-1.amazonaws.com/styles/fiche-beelden/sa/media/3/3641-master.jpg?itok=f5qVH_yq"
    bron_pors.datum_raadpleging = new Date("2023-04-30")
    bron_pors.bron = "https://www.ecopedia.be/dieren/porseleinhoen"
    await AppDataSource.manager.save(bron_pors)

    const porseleinhoen = new Vogel()
    porseleinhoen.nederlandse_naam = "Porseleinhoen"
    porseleinhoen.grootte_min = 22
    porseleinhoen.grootte_max = 24
    porseleinhoen.spanwijdte_min = 37
    porseleinhoen.spanwijdte_max = 42
    porseleinhoen.geluid = "huuiett"
    porseleinhoen.familie = "Porzona"
    porseleinhoen.soort = "porzona"
    porseleinhoen.bron = bron_pors
    await AppDataSource.manager.save(porseleinhoen)

    const uit_pors = new Uiterlijk()
    uit_pors.vogel = porseleinhoen
    uit_pors.vleugel_kleur_tip = "bruin"
    uit_pors.vleugel_kleur = "bruin"
    uit_pors.staart_kleur = "bruin"
    uit_pors.snavel_kleur = "geel"
    uit_pors.snavel_lengte ="S"
    uit_pors.rug_kleur ="bruin"
    uit_pors.buik_kleur = "grijs"
    uit_pors.hoofd_kleur = "bruin"
    uit_pors.borst_kleur = "grijs"
    uit_pors.cat_grootte = "S"
    uit_pors.geslacht = "B"
    uit_pors.buik_patroon = "spikkeld"
    uit_pors.borst_patroon = "spikkeld"
    uit_pors.hoofd_patroon = "effen"
    uit_pors.rug_patroon = "spikkeld"
    uit_pors.vleugel_patroon = "spikkeld"
    uit_pors.staart_patroon = "spikkeld"
    await AppDataSource.manager.save(uit_pors)

    console.log("Een nieuwe vogel werd toegevoegd: de " + porseleinhoen.nederlandse_naam)

    console.log("Nieuwe vogel in database steken")

    const bron_KW =new Afbeelding()
    bron_KW.link = "https://upload.wikimedia.org/wikipedia/commons/d/d3/Baillon%27s_crake.jpg"
    bron_KW.naam = "Jason Girvan "
    bron_KW.datum_raadpleging = new Date("2023-04-30")
    bron_KW.bron = "https://nl.wikipedia.org/wiki/Kleinst_waterhoen"
    bron_KW.publicatie_date = new Date("2006-09-30")
    bron_KW.titel_afbeelding = "Baillon's Crake taken in Northern Victoria, Australia"
    await AppDataSource.manager.save(bron_KW)

    const kleinst_waterhoen = new Vogel()
    kleinst_waterhoen.nederlandse_naam = "Kleinst Waterhoen"
    kleinst_waterhoen.grootte_min = 17
    kleinst_waterhoen.grootte_max = 19
    kleinst_waterhoen.spanwijdte_min = 33
    kleinst_waterhoen.spanwijdte_max = 37
    kleinst_waterhoen.geluid = "errrrr errrrr"
    kleinst_waterhoen.familie = "Porzona"
    kleinst_waterhoen.soort = "pusilla"
    kleinst_waterhoen.bron = bron_KW
    await AppDataSource.manager.save(kleinst_waterhoen)

    const uit_KW = new Uiterlijk()
    uit_KW.vogel = kleinst_waterhoen
    uit_KW.vleugel_kleur_tip = "bruin"
    uit_KW.vleugel_kleur = "bruin"
    uit_KW.staart_kleur = "bruin"
    uit_KW.snavel_kleur = "geel"
    uit_KW.snavel_lengte ="M"
    uit_KW.rug_kleur ="bruin"
    uit_KW.buik_kleur = "grijs"
    uit_KW.hoofd_kleur = "grijs"
    uit_KW.borst_kleur = "grijs"
    uit_KW.cat_grootte = "S"
    uit_KW.geslacht = "B"
    uit_KW.buik_patroon = "effen"
    uit_KW.borst_patroon = "effen"
    uit_KW.hoofd_patroon = "effen"
    uit_KW.rug_patroon = "spikkeld"
    uit_KW.vleugel_patroon = "spikkeld"
    uit_KW.staart_patroon = "spikkeld"
    await AppDataSource.manager.save(uit_KW)


    console.log("Een nieuwe vogel werd toegevoegd: de " + kleinst_waterhoen.nederlandse_naam)

    console.log("Nieuwe vogel in database steken")

    const bron_ijs =new Afbeelding()
    bron_ijs.link = "https://4.bp.blogspot.com/-u_xRM_q-hwU/UZumba_Q9lI/AAAAAAAAAoc/89__jlanc7s/s1600/Ijsvogel.jpg"
    bron_ijs.naam = " Kurt Peys"
    bron_ijs.datum_raadpleging = new Date("2023-04-30")
    bron_ijs.bron = "http://kurtpeys.blogspot.com/2013/05/wat-de-ijsvogel-mij-leert-over-innovatie.html"
    bron_ijs.publicatie_date = new Date("2013-05-22")
    await AppDataSource.manager.save(bron_ijs)

    const ijsvogel = new Vogel()
    ijsvogel.nederlandse_naam = "Ijsvogel"
    ijsvogel.grootte_min = 16
    ijsvogel.grootte_max = 17
    ijsvogel.spanwijdte_min = 24
    ijsvogel.spanwijdte_max = 26
    ijsvogel.vlieg_manier = "snel met snorrende vleugelslag, onderbroken door korte glijperioden"
    ijsvogel.geluid = "tsieie"
    ijsvogel.familie = "Alcedo"
    ijsvogel.soort = "atthis"
    ijsvogel.bron = bron_ijs
    await AppDataSource.manager.save(ijsvogel)

    const uit_ijs = new Uiterlijk()
    uit_ijs.vogel = ijsvogel
    uit_ijs.vleugel_kleur_tip = "blauw"
    uit_ijs.vleugel_kleur = "blauw"
    uit_ijs.staart_kleur = "blauw"
    uit_ijs.snavel_kleur = "zwart"
    uit_ijs.snavel_lengte ="L"
    uit_ijs.rug_kleur ="blauw"
    uit_ijs.buik_kleur = "orange"
    uit_ijs.hoofd_kleur = "blauw"
    uit_ijs.borst_kleur = "orange"
    uit_ijs.cat_grootte = "S"
    uit_ijs.geslacht = "B"
    uit_ijs.buik_patroon = "effen"
    uit_ijs.borst_patroon = "effen"
    uit_ijs.hoofd_patroon = "effen"
    uit_ijs.rug_patroon = "effen"
    uit_ijs.vleugel_patroon = "effen"
    uit_ijs.staart_patroon = "effen"
    await AppDataSource.manager.save(uit_ijs)


    console.log("Een nieuwe vogel werd toegevoegd: de " + ijsvogel.nederlandse_naam)

    console.log("Nieuwe vogel in database steken")

    const bron_KV =new Afbeelding()
    bron_KV.link = "https://ecopedia.s3.eu-central-1.amazonaws.com/styles/fiche-beelden/sa/media/9/946-master.jpg?itok=KobvzAKK"
    bron_KV.datum_raadpleging = new Date("2023-04-30")
    bron_KV.bron = "https://www.ecopedia.be/dieren/kleine-vliegenvanger"
    await AppDataSource.manager.save(bron_KV)

    const kleine_vliegenvanger = new Vogel()
    kleine_vliegenvanger.nederlandse_naam = "Kleine Vliegenvanger"
    kleine_vliegenvanger.grootte_min = 11.5
    kleine_vliegenvanger.grootte_max = 11.5
    kleine_vliegenvanger.geluid = "tzrrr tzk"
    kleine_vliegenvanger.familie = "Fidecula"
    kleine_vliegenvanger.soort = "parva"
    kleine_vliegenvanger.bron = bron_KV
    await AppDataSource.manager.save(kleine_vliegenvanger)

    const uit_KV= new Uiterlijk()
    uit_KV.vogel = kleine_vliegenvanger
    uit_KV.vleugel_kleur_tip = "bruin"
    uit_KV.vleugel_kleur = "bruin"
    uit_KV.staart_kleur = "zwart"
    uit_KV.snavel_kleur = "grijs"
    uit_KV.snavel_lengte ="S"
    uit_KV.rug_kleur ="bruin"
    uit_KV.buik_kleur = "wit"
    uit_KV.hoofd_kleur = "bruin"
    uit_KV.borst_kleur = "wit"
    uit_KV.cat_grootte = "S"
    uit_KV.geslacht = "V"
    uit_KV.buik_patroon = "effen"
    uit_KV.borst_patroon = "effen"
    uit_KV.hoofd_patroon = "effen"
    uit_KV.rug_patroon = "effen"
    uit_KV.vleugel_patroon = "effen"
    uit_KV.staart_patroon = "effen"
    await AppDataSource.manager.save(uit_KV)

    const uit_KVM= new Uiterlijk()
    uit_KVM.vogel = kleine_vliegenvanger
    uit_KVM.vleugel_kleur_tip = "bruin"
    uit_KVM.vleugel_kleur = "bruin"
    uit_KVM.staart_kleur = "zwart"
    uit_KVM.snavel_kleur = "grijs"
    uit_KVM.snavel_lengte ="S"
    uit_KVM.rug_kleur ="bruin"
    uit_KVM.buik_kleur = "wit"
    uit_KVM.hoofd_kleur = "grijs"
    uit_KVM.borst_kleur = "rood"
    uit_KVM.cat_grootte = "S"
    uit_KVM.geslacht = "M"
    uit_KVM.buik_patroon = "effen"
    uit_KVM.borst_patroon = "effen"
    uit_KVM.hoofd_patroon = "effen"
    uit_KVM.rug_patroon = "effen"
    uit_KVM.vleugel_patroon = "effen"
    uit_KVM.staart_patroon = "effen"
    await AppDataSource.manager.save(uit_KVM)


    console.log("Een nieuwe vogel werd toegevoegd: de " + kleine_vliegenvanger.nederlandse_naam)


    console.log("Nieuwe vogel in database steken")

    const bron_BR =new Afbeelding()
    bron_BR.link = "https://www.onzenatuur.be/media/cache/strip/uploads/media/609963004c957/vilda-141327-blauwe-reiger-yves-adams-800-px-50891.jpeg"
    bron_BR.datum_raadpleging = new Date("2023-05-03")
    bron_BR.bron = "https://www.onzenatuur.be/soortenbank/blauwe-reiger"
    bron_BR.naam = "Yves Adams"
    await AppDataSource.manager.save(bron_BR)

    const blauwe_reiger = new Vogel()
    blauwe_reiger.nederlandse_naam = "Blauwe Reiger"
    blauwe_reiger.grootte_min = 90
    blauwe_reiger.grootte_max = 98
    blauwe_reiger.spanwijdte_min = 175
    blauwe_reiger.spanwijdte_max = 195
    blauwe_reiger.geluid = "kraaoerk"
    blauwe_reiger.familie = "Ardea"
    blauwe_reiger.soort = "cinerea"
    blauwe_reiger.bron = bron_BR
    blauwe_reiger.vlieg_manier = "machtig postuur,zware vleugelslag, sterk naar beneden gebogen vleugels en ingetrokken hals"
    await AppDataSource.manager.save(blauwe_reiger)

    const uit_BR= new Uiterlijk()
    uit_BR.vogel = blauwe_reiger
    uit_BR.vleugel_kleur_tip = "zwart"
    uit_BR.vleugel_kleur = "grijs"
    uit_BR.staart_kleur = "grijs"
    uit_BR.snavel_kleur = "geel"
    uit_BR.snavel_lengte ="L"
    uit_BR.rug_kleur ="grijs"
    uit_BR.buik_kleur = "wit"
    uit_BR.hoofd_kleur = "zwart"
    uit_BR.borst_kleur = "grijs"
    uit_BR.cat_grootte = "L"
    uit_BR.geslacht = "B"
    uit_BR.buik_patroon = "effen"
    uit_BR.borst_patroon = "spikkeld"
    uit_BR.hoofd_patroon = "effen"
    uit_BR.rug_patroon = "effen"
    uit_BR.vleugel_patroon = "effen"
    uit_BR.staart_patroon = "effen"
    await AppDataSource.manager.save(uit_BR)

    const br_alex_ysa = new Spotting()
    br_alex_ysa.locatie_breedte = 51.05052158096968
    br_alex_ysa.locatie_lengte = 3.6882449901642556
    br_alex_ysa.vogel = blauwe_reiger
    br_alex_ysa.datum = new Date("2023-04-19")
    br_alex_ysa.gebruiker = "Alexandra&Ysabeau"
    await AppDataSource.manager.save(br_alex_ysa)

    const br_alex_papa = new Spotting()
    br_alex_papa.locatie_breedte = 51.04600975276913
    br_alex_papa.locatie_lengte = 4.13615779814307
    br_alex_papa.vogel = blauwe_reiger
    br_alex_papa.datum = new Date("2023-04-26")
    br_alex_papa.gebruiker = "Bart G"
    await AppDataSource.manager.save(br_alex_papa)

    const br_alex_papa_2 = new Spotting()
    br_alex_papa_2.locatie_breedte = 51.04795479427933
    br_alex_papa_2.locatie_lengte = 4.137876210491447
    br_alex_papa_2.vogel = blauwe_reiger
    br_alex_papa_2.datum = new Date("2023-04-26")
    br_alex_papa_2.gebruiker = "Bart G"
    await AppDataSource.manager.save(br_alex_papa_2)


    console.log("Een nieuwe vogel werd toegevoegd: de " + blauwe_reiger.nederlandse_naam)



    console.log("Loading birds from the database...")
    const vogels = await AppDataSource.manager.find(Vogel)
    console.log("Opgeslagen vogels: ", vogels)

    console.log("Loading bronnen from the database...")
    const bronnen = await AppDataSource.manager.find(Afbeelding)

    console.log("Opgeslagen bronnen: ", bronnen)
   */
//tot hier------------------------------------------------------
   /* */
    console.log("Here you can setup and run express / fastify / any other framework.")

    //opzetten express
    var path = require('path');
    const app = express()

    //zorgen dat we de bestanden uit de map views kunnen gebruiken
    app.set('views', path.join(__dirname, 'views'));


    app.use(express.json())
    app.use(express.static(path.join(__dirname,'/views')))
    app.use(bodyParser.json())

    VogelRoutes.forEach(route => {
        (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
            const result = (new (route.controller as any))[route.action](req, res, next)
            if (result instanceof Promise) {
                result.then(result => result !== null && result !== undefined ? res.send(result) : undefined)

            } else if (result !== null && result !== undefined) {
                res.json(result)
            }
        })
    })

    UiterlijkRoutes.forEach(route => {
        (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
            const result = (new (route.controller as any))[route.action](req, res, next)
            if (result instanceof Promise) {
                result.then(result => result !== null && result !== undefined ? res.send(result) : undefined)

            } else if (result !== null && result !== undefined) {
                res.json(result)
            }
        })
    })

    SpottingRoutes.forEach(route => {
        (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
            const result = (new (route.controller as any))[route.action](req, res, next)
            if (result instanceof Promise) {
                result.then(result => result !== null && result !== undefined ? res.send(result) : undefined)

            } else if (result !== null && result !== undefined) {
                res.json(result)
            }
        })
    })

    VindVogelDoorUiterlijkRoutes.forEach(route => {
        (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
            const result = (new (route.controller as any))[route.action](req, res, next)
            if (result instanceof Promise) {
                result.then(result => result !== null && result !== undefined ? res.send(result) : undefined)

            } else if (result !== null && result !== undefined) {
                res.json(result)
            }
        })
    })

    FunFactRoutes.forEach(route => {
        (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
            const result = (new (route.controller as any))[route.action](req, res, next)
            if (result instanceof Promise) {
                result.then(result => result !== null && result !== undefined ? res.send(result) : undefined)

            } else if (result !== null && result !== undefined) {
                res.json(result)
            }
        })
    })

    app.get('/herkenVogel',(_,resp)=>{
        resp.sendFile(path.join(__dirname,'/views/herkenVogel.html'))
    })
    app.get('/',(_,resp)=>{
        resp.sendFile(path.join(__dirname,'/views/index.html'))
    })
    app.get('/info',(_,resp)=>{
        resp.sendFile(path.join(__dirname,'/views/info.html'))
    })
    app.get('/voegSpotting',(_,resp)=>{
        resp.sendFile(path.join(__dirname,'/views/addSpotting.html'))
    })

    app.get('/map',(_,resp)=>{
        resp.sendFile(path.join(__dirname,'/views/mapConvex.html'))
    })
    
    // start express server
    app.listen(3000)
    console.log("Express server has started on port 3000. Open http://localhost:3000 to see results")

}).catch(error => console.log(error))
