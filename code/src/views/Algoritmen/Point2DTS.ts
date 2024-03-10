class Point2D
{
    x: number;
    y: number;

    constructor(x: number, y: number)
    {
        this.x = x;
        this.y = y;
    }

    GetSlope(origin: Point2D)
    {
        if (this.Equals(origin))
        {
            return -Number.MAX_VALUE;
        }
        let temp_y = this.y-origin.y;
        let temp_x = this.x-origin.x;
        return temp_y/temp_x;
    }

    Equals(other:Point2D)
    {
        return this.x == other.x && this.y == other.y;
    }
}

export {Point2D};