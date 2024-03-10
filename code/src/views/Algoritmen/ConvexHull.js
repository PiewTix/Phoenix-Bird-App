import {Point2D} from "./Point2D.js"
import { IsCCW, PointIsCCW, Vector2D} from "./Vector2D.js";

function ClusterPointToPoint2D(clp)
{
    return new Point2D(clp.x, clp.y);
}

class ConvexHull {

    constructor(obs) {
        this.subscriber = obs;


        this.points = null;
        this.hull = [];
        this.extrema = [];
    }

    CreateConvexHull(Cluster) {
        this.clusterCount = Cluster.length //spottings punten in de regio
        if (this.clusterCount <= 3) //triviale gevallen
        {
            return Cluster.map(clp => ClusterPointToPoint2D(clp));
        }
        this.points = Cluster.map(clp => ClusterPointToPoint2D(clp)) //verander cluster point naar point 2d


        this.extrema = this.FindExtremes();
        this.PreElimination(); //Akl–Toussaint heuristic


        this.PreSort(this.extrema[0]); //sorteer punten gebaseerd op de hoek dat ze maken met het meest linkse punt.
        this.MakeHull(); //algoritme main loop

        this.hull.push(this.clusterCount) //meegeven hoeveel spottingen er in totaal waren in de regio


        this.subscriber.next(this.hull);

    }

    FindExtremes()
    {
        //----------------------------
        //Find points with extrema x/y
        //----------------------------
        //assign default values
        let left = this.points[0];
        let top = this.points[0];
        let right = this.points[0];
        let bottom = this.points[0];

        for (let p of this.points) {
            if (left.x > p.x) {
                left = p;
            }
            else if (right.x < p.x) {
                right = p;
            }
            if (bottom.y > p.y) {
                bottom = p;
            }
            else if (top.y < p.y) {
                top = p;
            }
        }
        let extrema = [left, top, right, bottom];
        return extrema
    }


    PreElimination() {

        //-------------------------------------------
        //construct convex quadrilateral with extrema
        //-------------------------------------------

        let left = this.extrema[0];
        let top = this.extrema[1];
        let right = this.extrema[2];
        let bottom = this.extrema[3];

        let vec1 = new Vector2D(left, top);
        let vec2 = new Vector2D(top, right);
        let vec3 = new Vector2D(right, bottom);
        let vec4 = new Vector2D(bottom, left);
        let quad = [vec1, vec2, vec3, vec4];

        //              CW

        //            ----->

        //            > Top
        //           /       \
        //          /         \
        //         /           \
        //        /             \
        //  left ^               v right
        //        \             /
        //         \           /
        //          \         /
        //           \       /
        //              bot <

        //             <-----

        //------------------------------------------------------------------------------
        //Make a new list without the points that are definitely not on the hull.
        //if the points are inside the quadrilateral they can never be part of the hull
        //------------------------------------------------------------------------------

        let OuterPoints = [];
        for( let ex of this.extrema)//de extrema's zelf zijn altijd deel van de hull
        {
            if(!OuterPoints.includes(ex))
                OuterPoints.push(ex);
        }


        //add if point is outside
        for(let p of this.points) {
            for(var i = 0; i < quad.length; i++) {
                if (PointIsCCW(p, this.extrema[i], quad[i])) {
                    OuterPoints.push(p);
                    break;
                }
            }
        }
        this.points = OuterPoints;

    };

    PreSort(leftMostPoint) {
        //sort polar
        this.points = this.points.sort(function (p1, p2) {
            return p1.GetSlope(leftMostPoint) - p2.GetSlope(leftMostPoint);
        });
    };
    MakeHull() {
        for (let p of this.points) {
            let l = this.hull.length;
            while (l >= 2 && !IsCCW(new Vector2D(this.hull[l - 2], this.hull[l - 1]), new Vector2D(this.hull[l - 1], p))) {
                this.hull.pop();
                l = this.hull.length;
            }
            this.hull.push(p);
        }
    };
};

export {ConvexHull};