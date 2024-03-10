class Vector2D {
    constructor(PStart, PStop) {
        this.eps = 0.000001;
        this.x = PStop.x - PStart.x;
        this.y = PStop.y - PStart.y;
    }

    VectorProduct(other) {
        return this.x * other.y - this.y * other.x;
    };

}

///CW = clockwise, CCW = counter clockwise

function IsCCW(v1, v2) {
    let eps= 0.00000001;

    return v1.VectorProduct(v2) > eps;
}
function PointIsCCW(p, origin, vec) {
    return IsCCW(vec, new Vector2D(origin, p));
}

export {Vector2D, IsCCW, PointIsCCW}
