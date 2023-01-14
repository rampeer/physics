import {vec2, Vec2} from "./vec2.js";

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

class RectShape extends Shape {
    public readonly width: number;
    public readonly height: number;

    constructor(position: Vec2, width: number, height: number, angle: number) {
        super(position, angle);
        this.width = width;
        this.height = height;
    }

    toPoly() {
        let w2 = this.width / 2, h2 = this.height / 2;
        return poly(
            this.pos,
            [vec2(+w2, +h2), vec2(+w2, -h2), vec2(-w2, -h2), vec2(-w2, h2)],
            this.angle
        )
    }
}

let seqDiff = (pts: Vec2[]) => {
    let ptsDiff = Array(pts.length)
    for (let i = 0; i < pts.length; i += 1)
        ptsDiff[i] = pts[(i + 1) % pts.length].minus(pts[i])
    return ptsDiff
}

export class PolyShape extends Shape {
    public vertex: Vec2[];      // in local coordinates, non-rotated
    public edge: Vec2[];        // vertex[i + 1] - vertex[i]
    public edgeNorm: Vec2[];    // points outside

    constructor(center: Vec2, pts: Vec2[], angle: number) {
        super(center, angle);
        let diff = seqDiff(pts), posW = 0, negW = 0
        for (let i = 0; i < diff.length; i += 1) {
            if (diff[i].cross(pts[i]) > 0) {
                posW += 1
            } else {
                negW += 1
            }
            if (posW > 0 && negW)
                throw Error("Point(0, 0) is not inside the polygon or polygon is not convex!\n" +
                    pts.toString())
        }
        this.vertex = posW ? pts : pts.reverse()
        this.edge = seqDiff(pts);
        this.edgeNorm = this.edge.map(x => x.rot270().normEq())
    }
}


export let circle = (pos: Vec2, radius: number, angle?: number): CircleShape => {
    return new CircleShape(pos, radius, angle || 0.0)
}

export let rect = (pos: Vec2, width: number, height: number, angle?: number): RectShape => {
    return new RectShape(pos, width, height, angle || 0.0)
}

export let poly = (pos: Vec2, relativePoints: Vec2[], angle?: number): PolyShape => {
    return new PolyShape(pos, relativePoints, angle || 0.0)
}
