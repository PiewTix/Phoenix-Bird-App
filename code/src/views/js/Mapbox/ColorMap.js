// een klasse om de kleuren voor de clusters en de noisepunten van de MapBox bij te houden

export class ColorMap{

    constructor(){
        this.clusterColor = "#00FF00"
        this.noiseColor = "#00FFFF"
    }

    get Cluster(){
        return this.clusterColor
    }
    get Noise(){
        return this.noiseColor
    }
}