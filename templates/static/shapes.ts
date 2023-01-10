import {Vec2} from "./vec2.js";

export class Shape {
    public readonly pos: Vec2;
    public readonly angle: number;

    constructor(position: Vec2, angle: number) {
        this.pos = position;
        this.angle = angle === null ? 0.0 : angle;
    }
};

export class CircleShape extends Shape {
    public readonly radius: number;

    constructor(position: Vec2, radius: number, angle: number) {
        super(position, angle);
        this.radius = radius;
    }
}

export class RectShape extends Shape {
    public readonly width: number;
    public readonly height: number;

    constructor(position: Vec2, width: number, height: number, angle: number) {
        super(position, angle);
        this.width = width;
        this.height = height;
    }
}

export class PolyShape extends Shape {
    public readonly points: Vec2[];
    constructor(center: Vec2, points: Vec2[], angle: number) {
        super(center, angle);
        this.points = points;
    }
}

export class Segment {
    public A: Vec2;
    public B: Vec2;
    public normal: Vec2;    // points directly 'outside'; must be on the 'right' side of vector AB.
    public tang: Vec2;      // points from A to B; normalized vector

    constructor(from: Vec2, to: Vec2) {
        this.A = from;
        this.B = to;
        this.tang = to.minus(from).normEq();
        this.normal = this.tang.rotate(-Math.PI / 2);
    }
}
