class Point2D  {

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    GetSlope(origin) {
        if (this.Equals(origin)) {
            return -Number.MAX_VALUE;
        }
        let temp_y = this.y - origin.y;
        let temp_x = this.x - origin.x;
        return temp_y / temp_x;
    };
    Equals(other) {
        return this.x == other.x && this.y == other.y;
    };

}

export {Point2D};