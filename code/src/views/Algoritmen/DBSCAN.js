const {map,filter, pipe} = rxjs.operators;
const {fromEvent, Observable} = rxjs;

class Dbscan{

    clusterId = 0;

    constructor( points , epsilon, minPts, obs, obs2){
        this.subscriber = obs;
        this.subscriber2 = obs2;


        this.points = points;
        this.epsilon = epsilon
        this.minPts = minPts

    }

    dbscan() {
        let points = this.points
        let epsilon =this.epsilon
        let minPts = this.minPts
        //VOORBEREIDING:
        // Voor elk punt voeg ik in de dictiocnary 2 extra waarden toe
        // clusterId is esentieel voor de verwerking later, visited is een hulp key/value set voor tijdens mijn uitwerking
        for (let i = 0; i < points.length; i++) {
            points[i].clusterId = null; // Elk punt zal gelabeled worden aan een clusterId, startende vanaf 1.
            // punten die niet tot een cluster behoren, behouden clusterId=null

            points[i].loop = 0; // loop kan 3 waarden bevatten:
            // 0 als het punt nog nooit bezocht is
            // 1 als het punt bezocht is en met zekerheid werd gelabeled als een core-, border- of noise point
            // 2 als het punt is bezocht en zeker geen core point is, maar nog niet kon besloten worden of het een border- of noise point is
            // 2 kan alleen als het eerste punt dat random wordt gekozen geen core point is.
        }


        // Over elk punt itereren, startende van het begin
        for (let i = 0; i < points.length; i++) {
            let point = points[i];

            // De punten overslaan die al reeds zijn gelabeled
            if (point.loop==1) {
                continue;
            }


            // Alle punten binnen de straal van Epsilon vinden
            let neighbors = this.getNeighbors(points, point, epsilon);

            //het punt heeft geen enkel neighbor point
            if(neighbors.length == 0){
                //clusterId blijft null
                // dit is met zekerheid een noise punt
                point.loop = 1;
            }
            //het punt heeft minder dan Epsilon aantal buren
            else if (neighbors.length < minPts) {
                //dit kan een noise of border point zijn
                point.loop =2;
            }

            else {
                // Core punt gevonden -> het uitbreiden van de cluster kan starten
                this.clusterId++;
                this.groeiCluster(points, point, neighbors, this.clusterId, epsilon, minPts);
                let clus = this.sendCluster();


                this.subscriber.next(clus)
            }
        }

        let noisePoints = this.sendNoise()
        console.log("dit zijn de noisepoints:")
        console.log(noisePoints)
        this.subscriber2.next(noisePoints);

        // resultaat
        return points;
    }

// Deze functie zoekt alle punten binnen de straal van Epsilon van een gegeven punt
    getNeighbors(points, point, epsilon) {
        let neighbors = [];

        // itereren over elk punt
        for (let i = 0; i < points.length; i++) {
            let otherPoint = points[i];

            // zichzelf niet meetellen
            if (otherPoint === point) {
                continue;
            }

            // afstand tussen punt
            let afstandKwadraat = this.getAfstandKwadraat(point, otherPoint);

            // als de afstand kleiner of gelijk is aan epsilon, voeg het punt toe aan de neighbor points van het huideige punt
            if (afstandKwadraat <= epsilon*epsilon) {
                neighbors.push(otherPoint);
            }
        }

        return neighbors;
    }

// van zodra er een cluster punt is gevonden, kan het uitbreiden/ groeien starten
    groeiCluster(points, point, neighbors, clusterId, epsilon, minPts) {
        point.clusterId = clusterId;

        // Itereren over elk neighborPoint
        for (let i = 0; i < neighbors.length; i++) {
            let neighbor = neighbors[i];

            // Als het neighbor punt nog niet werd gelabeled, voeg het toe aan de cluster en vind zijn neighbor points
            if (neighbor.loop==0) {
                neighbor.loop = 1;
                let neighborNeighbors = this.getNeighbors(points, neighbor, epsilon);


                // Als de neighbor punt het minimum aantal neighbor punten heeft, moet die toegevoegd worden aan de neighbors list
                if (neighborNeighbors.length >= minPts) {
                    neighbors.push(...neighborNeighbors); //de neighbor points van het huidige neighbor point toevoegen aan de lijst van neighbors
                }
            }

            // Als de neighbor point nog niet behoort tot een cluster, voeg die dan toe aan de huidige cluster
            if (neighbor.clusterId === null) {
                neighbor.clusterId = clusterId;
            }
        }
    }

    sendCluster(){

        let clusterPoints = [];
        for(let i=0; i<this.points.length;i++){
            if(this.points[i].clusterId == this.clusterId){
                clusterPoints.push(this.points[i]);
            }
        }

        return clusterPoints
    }

    sendNoise(){

        let noisePoints = [];
        for(let i=0; i<this.points.length;i++){
            if(this.points[i].clusterId === null){
                noisePoints.push(this.points[i]);
            }
        }

        return noisePoints
    }


// Berekent de afstand tussen 2 punten in het 2D-vlak
    // niet een zeer nauwkeurige berekening
    getAfstand(point1, point2) {
        let dx = point1.x - point2.x; // verschil tussen x coördinaten
        let dy = point1.y - point2.y; // verschil tussen y coördinaten
        return Math.sqrt(dx*dx + dy*dy); // bereken wiskundig de afstand
    }


    // nauwkeurige afstandsbepaling:

    getAfstandKwadraat(point1, point2) {

        //Equirectangular approximation
        //source = https://www.movable-type.co.uk/scripts/latlong.html

        //x is breedtegraad in degrees = brGr
        //y is lengtegraad in degrees = leGr

        let brGrverschil = point1.x - point2.x;
        let leGrverschil = point1.y - point2.y;
        let gemBrGrRad= degreeToRadians((parseFloat(point1.x) + parseFloat(point2.x))/2);

        leGrverschil *= Math.cos(gemBrGrRad); //verschil tussen lengtegraad gecorrigeerd met een scaling factor gebaseerd op het gemiddelde van de breedtegraden van de punten.


        return (brGrverschil*brGrverschil + leGrverschil*leGrverschil); //Voor de echte afstand moet nog vermenigvuldigd worden met de radiussquared, maar dat gaat onze precisie als we beide onze afstand en epsilon vermenigvuldigen met een groot getal, dus voorlopig zou ik het niet doen
    }
}

function degreeToRadians(deg)
{
    return deg*Math.PI/180;
}


export {Dbscan}





