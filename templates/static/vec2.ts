export function vec2(x: number, y: number) {
    return new Vec2(x, y)
}

export class Region {
    private topLeft: Vec2;
    private bottomRight: Vec2;

    constructor(x0: number, y0: number, x1: number, y1: number) {
        this.topLeft = new Vec2(Math.min(x0, x1), Math.min(y0, y1));
        this.bottomRight = new Vec2(Math.max(x0, x1), Math.max(y0, y1));
    }

    static fromBounds(v1: Vec2, v2: Vec2) {
        return new Region(v1.x, v1.y, v2.x, v2.y);
    }

    static fromCenter(center: Vec2, width: number, height: number) {
        return new Region(
            center.x - width / 2, center.y - height / 2,
            center.x + width / 2, center.y + height / 2
        );
    }

    public x0 = () => this.topLeft.x;
    public y0 = () => this.topLeft.y;
    public x1 = () => this.bottomRight.x;
    public y1 = () => this.bottomRight.y;
    public width = () => (this.x1() - this.x0());
    public height = () => (this.y1() - this.y0());
    public centerX = () => (this.x0() + this.x1()) / 2;
    public centerY = () => (this.y0() + this.y1()) / 2;
    public extentX = () => this.width() / 2;
    public extentY = () => this.height() / 2;
}

export class Vec2 {
    x: number;
    y: number;


    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    set(x: number, y: number) {
        this.x = x;
        this.y = y;
        return this;
    }

    toString(decPlaces: number) {
        decPlaces = decPlaces || 3;
        var scalar = Math.pow(10, decPlaces);
        return "[" + Math.round(this.x * scalar) / scalar + ", " + Math.round(this.y * scalar) / scalar + "]";
    }

    clone() {
        return new Vec2(this.x, this.y);
    }

    length() {
        return Math.sqrt((this.x * this.x) + (this.y * this.y));
    }

    lengthSq() {
        return (this.x * this.x) + (this.y * this.y);
    }

    norm() {
        let m = Math.max(this.length(), 1e-6);
        return new Vec2(this.x / m, this.y / m);
    }

    normEq() {
        let m = Math.max(this.length(), 1e-6);
        return this.set(this.x / m, this.y / m);
    }

    flip(dx: number = -1.0, dy: number = -1.0) {
        return this.clone().set(this.x * dx, this.y * dy);
    }

    plus(v: Vec2) {
        return new Vec2(
            this.x + v.x,
            this.y + v.y
        );
    }

    plusEq(v: Vec2) {
        return this.set(
            this.x + v.x,
            this.y + v.y
        );
    }

    minus(v: Vec2) {
        return new Vec2(
            this.x - v.x,
            this.y - v.y
        );
    }

    minusEq(v: Vec2) {
        return this.set(
            this.x - v.x,
            this.y - v.y
        );
    }

    mul(s: number) {
        return new Vec2(this.x * s, this.y * s);
    }

    dot(v: Vec2) {
        return (this.x * v.x) + (this.y * v.y);
    }

    dotNorm(v: Vec2) {
        return ((this.x * v.x) + (this.y * v.y)) / (
            Math.sqrt((this.x * this.x + this.y * this.y) * (v.x * v.x + v.y * v.y) + 1e-6)
        );
    }

    angle() {
        return Math.atan2(this.y, this.x);
    }

    rotate(angle: number) {
        var cosRY = Math.cos(angle);
        var sinRY = Math.sin(angle);

        Vector2Const.temp.set(this.x, this.y);

        return new Vec2(
            (Vector2Const.temp.x * cosRY) - (Vector2Const.temp.y * sinRY),
            (Vector2Const.temp.x * sinRY) + (Vector2Const.temp.y * cosRY)
        )
    }

    dist(to: Vec2) {
        return Vector2Const.temp.set(this.x, this.y).minusEq(to).length();
    }

    rotateAroundPoint(around: Vec2, angle: number) {
        return Vector2Const.temp.set(this.x, this.y).minusEq(around).rotate(angle).plusEq(around).clone()
    }

    mulEq(coef: number) {
        return this.set(this.x * coef, this.y * coef);
    }

    copyTo(v: Vec2) {
        v.x = this.x;
        v.y = this.y;
        return v;
    }
};

let Vector2Const = {
    TO_DEGREES: 180 / Math.PI,
    TO_RADIANS: Math.PI / 180,
    temp: new Vec2(0, 0)
};