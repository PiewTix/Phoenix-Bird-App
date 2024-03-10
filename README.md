# Projectachtergrond:

Dit project is oorspronkelijk ontwikkeld als een project aan de UGent door een team van 5 leden. Het werd gehost op de GitHub-server van de universiteit.

**Belangrijk**: Om een inzicht te krijgen wat mijn werk precies inhoudde, gelieve te navigeren naar */verslag*.
Dit document omvat mijn gedeelte van het eindverslag van het project, met een gedailleerde uitleg over mijn werk. De rest heb ik weggelaten.
Kort gezegd hield ik mij bezig met de data-analyse van gespotte vogellocaties. 
### Demo website:

Op dit moment draait de webapp niet meer op een publieke server. Er is wel een demo-filmpje: https://www.youtube.com/watch?v=0eB4o7HZVPA


# Structuur:
## extra
Hier staan 2 geogebra-files die gebruikt werden ter ondersteuning bij het testen van het DBSCAN-algoritme
## code/src
Hier vind je de code van het project terug. De structuur van mappen en klassen werd behouden zoals ze terug te vinden staat in de code. 
Om de code beter te begrijpen is gemakkelijker om de eerste vier mappen in een bepaalde volgorde te bekijken: entity, dao, controller, routes.
### Controller
Uit de http berichten worden de nodige gegevens gehaald en deze worden doorgestuurd naar de dao's. 
Hieronder staat een voorbeeld waar het id uit de header wordt gehaald of de volledige body opgehaald wordt:

```typescript
async spottings(request: Request, response: Response, next: NextFunction) {
   return getAllSpottingsforVogel(request.params.id)
}
async postspotting(request: Request, response: Response, next: NextFunction) {
   return postSpotting(request.body)
}
```
Er wordt hiervoor een aparte klasse aangemaakt zodat het ophalen gescheiden is van de databank. Elke Dao heeft dus een overeenkomstige controller.
### dao
De dao's zijn de klassen die connectie maken met de databank. Om het overzichtelijk te houden werden er 6 gemaakt:
* FunFactsDao: hierin werd 1 methode voorzien die een random feitje uit de databank haalt
* SpottingDao: deze klasse bevat 3 methode:
  * getAllSpottingsforVogel: haalt alle spottings op voor de gegeven vogel
  * postSpotting: zal een spotting toevoegen aan de databank
  * getlatestdate: haalt voor de gegeven vogel de datum van de laatste spotting op
* UiterlijkDao: verschillende methodes die alle kleuren/patronen/groottes ophalen, de waarden sorteren en unieke in een array steken samen met "onbekend".
* VindVogelDoorUiterlijkDao: De namen van de vogels die voldoen aan de opgegeven eigenschappen worden terug gegegeven. Er wordt niet gekeken naar eigenschappen indien ze null zijn.
* Vogeldao: deze klasse bevat 2 methode:
  *  getAllNames: geeft alle nederlandse namen van de vogels terug, alfabetisch gesorteerd
  *  getOneByName: geeft voor een specifieke vogel al de gegevens terug, inclusief de afbeelding
### entity
Er zijn 5 entiteiten die gebruikt worden in de databank:
* Afbeelding
* FunFacts 
* Spotting: de eigenschap foto werd toegevoegd voor een eventuele uitbreiding en wordt niet gebruikt, de eigenschap gebruiker kan ingegeven worden, maar wordt voorlopig ook niet gebruikt.
* Uiterlijk
* Vogel

De klassen hebben onderling ook relaties. Afbeelding en Vogel hebben een OneToOne relatie, Uiterlijk en Vogel een ManyToOne en Spotting en Vogel ook een ManyToOne.
### routes
Voor elke dao/controller wordt er ook een route aangemaakt. Hier wordt het soort http bericht bepaald, GET of POST in dit geval. Er wordt ook het pad op de server toegekend aan de methodes van de controllers.
```typescript
export const FunFactRoutes = [{
    method: "get",
    route: "/funfact",
    controller: FunFactsController,
    action: "funfacts"
}]
```
### views
#### Algoritmen


___DBSCAN.js___

DBSCAN is een algoritme dat een verzameling punten opdeelt in verscheidene clusters op basis van hun dichtheid in de ruimte.
Het algoritme maakt onderscheid tussen drie verschillende soorten punten: kernpunten, randpunten en ruispunten.
Op basis van enkele criteria wordt er beslist of er een cluster kan gevormd worden.

De klasse bevat twee observables waarop er wordt gesubscribed in de contextuele klasse (InfoMapbox.js). 
Op de eerste observable wordt er telkens data opgestuurd als er een nieuwe cluster is gevonden. Deze zal door de contextuele klasse worden opgestuurd naar een nieuwe   instantie van de ConvexHull klasse voor verdere verwerking.
De tweede observable dient om de ruispunten op te sturen. Deze worden direct toegevoegd op de map.

___ConvexHull.js___

Het ConvexHull algoritme is verantwoordelijk om van een groep spottingen een "zone" te maken. Deze zone is een convexe veelhoek, wat betekent dat als je een lijn zou trekken tussen alle hoekpunten, dan snijden ze niet met de rand van de figuur.
Meer precies is het het convexe omhullsel, waarbij nog gespecifieerd wordt dat het de grootst mogelijke convexe veelhoek is, of wat meer intuitief: De buitenste punten.

Van een groep punten zoekt dit algoritme het convexe omhulsel (de convexe veelhoek die al de andere punten bevat). Je kan het convex omhulsel je visueel voorstellen door een denkbeeldige rubbere band op te spannen en dan rond de punten los te laten. De bekomen figuur is het omhulsel en de hoekpunten waarrond hij gespannen zit zijn de punten die teruggegeven worden.
Als het algoritme klaar is, worden de hoekpunten opgestuurd naar de observer.



___Point2D.js___

Point2D stelt een tweedimensionaal punt voor. De GetSlope functie geeft de richtingscoëfficiënt van de rechte tussen twee punten.

___Point2DTs.ts___

Point2Dts is identiek aan de klasse hierboven, maar geschreven in typescript omdat hij ook nodig was in de klasse SpottingDao.

___Vector2D.js___

Vector2D is een tweedimensionale vector die gebruikt wordt in het convexhull algoritme. Bij dat algoritme is vooral de richting van groot belang en niet zo zeer de grote van de vector. De functies draaien dan ook allemaal rond de ligging van een vector tegenover een ander: is de vector met de klok mee- of tegen de klok in gedraaid?
#### css
In deze map staan de css bestanden gebruikt voor de website. De layout.css wordt gebruikt voor elementen die om meerdere pagina's voorkomen.
#### images
Alle afbeeldingen gebruikt op de website, met uitzondering die van op de informatiepaginas van de vogels, worden in deze map bijgehouden.
#### js
In deze map staan de javascript files die gebruikt werde voor de website.

___Navbar.js___

Om de navigatibar niet elke keer opnieuw in de html te schrijven is dit script voorzien die de navigatiebalk laat genereren op de div met het id: "nav". 
Achteraf bleek het dat dit ook met een template zou kunnen maar het was te laat om dit nog aan te passen.

___Info.js___

Alle informatie van de vogel wordt via fetch calls van de databank afgehaald en op de bijhorende html pagina getoond.
De kaart wordt volledig getoond door de MapBox API.
#### html-files
Er zijn vier html file:
* addSpotting.html
* herkenVogel.html
* index.html: deze file bevat de html van de startpagina
* info.html: deze file bevat de html voor pagina's met de info over de vogels
### datasource.ts
In deze file worden de juiste configuraties meegegeven om te kunnen koppelen met de databank. 
Er wordt ook meegegeven welke entiteiten er gebruikt zullen worden in de databank .
### index.ts
In de index.ts gebeuren hoofdzakelijk 3 dingen.
1. Het grotendeel van de code is het opvullen van de databank. Er werd voor gekozen om deze hier te zetten zodat deze uit commentaar kon gehaald worden en iedereen steeds lokaal de databank kon testen op zijn pc. 
2. Het project maakt gebruik van express om op de server te kunnen draaien. De juiste configuraties worden hiervoor ingesteld.
3. De routes die gebruikt worden moeten ook ingesteld worden. Er zijn 2 soorten. De eerste zijn de routes die communiceren met de databanken en terug te vinden zijn in routes, een voorbeeld hiervan is 
 ```typescript
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

  ```
  De tweede soort route is dat voor het toevoegen van de routes die gebruikt worden op de site en terug te vinden zijn in de map views, een voorbeeld hiervan is
  ```typescript
    app.get('/herkenVogel',(_,resp)=>{
        resp.sendFile(path.join(__dirname,'/views/herkenVogel.html'))
    })
  ```
