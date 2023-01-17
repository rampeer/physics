import {vec2, Vec2, vecFromTo} from "./vec2.js";

export class TransformMatrix {
    matrix: number[] = [1.0, 0.0, 0.0, 1.0]
    offset: number[] = [0.0, 0.0]

    apply(v: { x: number, y: number }, out?: { x: number, y: number }): { x: number, y: number } {
        let m = this.matrix
        out = out || vec2(0.0, 0.0)
        out.x = v.x * m[0] + v.y * m[1] + this.offset[0]
        out.y = v.x * m[2] + v.y * m[3] + this.offset[1]
        return out
    }

    applyLinear(v: Vec2, out?: Vec2): Vec2 {
        /* Only scale + rotation */
        let m = this.matrix
        return (out ? out : vec2(0.0, 0.0)).set(
            v.x * m[0] + v.y * m[1],
            v.x * m[2] + v.y * m[3]
        )
    }

    mul(right: TransformMatrix, out?: TransformMatrix): TransformMatrix {
        out = out ? out : new TransformMatrix()

        let {x, y} = this.apply({x: right.offset[0], y: right.offset[1]})
        out.offset[0] = x
        out.offset[1] = y

        let mA = this.matrix,
            mB = right.matrix
        out.matrix[0] = mA[0] * mB[0] + mA[1] * mB[2]
        out.matrix[1] = mA[0] * mB[1] + mA[1] * mB[3]
        out.matrix[2] = mA[2] * mB[0] + mA[3] * mB[2]
        out.matrix[3] = mA[2] * mB[1] + mA[3] * mB[3]

        return out
    }
}

export class BasicTransform extends TransformMatrix {
    protected _pos: Vec2 = vec2(0.0, 0.0)
    protected _angle: number = 0.0
    protected _scale: number = 1.0

    setPos(x: number, y: number): BasicTransform;
    setPos(v: { x: number, y: number }): BasicTransform;

    setPos(x: number | { x: number, y: number }, y?: number): BasicTransform {
        if (typeof x === "number") {
            this.offset[0] = x;
            this.offset[1] = y;
        } else {
            this.offset[0] = x.x;
            this.offset[1] = x.y;
        }
        return this;
    }

    setAngle = (angle: number) => {
        this._angle = angle
        this._update()
        return this
    }

    setScale = (scale: number) => {
        this._scale = scale
        this._update()
        return this
    }

    private _update() {
        this.matrix[0] = Math.cos(this._angle) * this._scale
        this.matrix[1] = -Math.sin(this._angle) * this._scale
        this.matrix[2] = Math.sin(this._angle) * this._scale
        this.matrix[3] = Math.cos(this._angle) * this._scale
    }
};

export let newCircle = (radius: number, radius2?: number): CircleShape => {
    return new CircleShape(radius, radius2 || radius)
}

export let newPoly = (localPoints: Vec2[]): ConvexPolyShape => {
    return new ConvexPolyShape(localPoints)
}

export let newRect = (width: number, height: number): ConvexPolyShape => {
    let w2 = width / 2, h2 = height / 2;
    return newPoly(
        [vec2(+w2, +h2), vec2(+w2, -h2), vec2(-w2, -h2), vec2(-w2, h2)],
    )
}

export class Segment {
    public from: Vec2;
    public to: Vec2;
    public norm: Vec2;
    public dir: Vec2;
    public len: number;

    constructor(from: Vec2, to: Vec2) {
        this.set(from, to)
    }

    set(from: Vec2, to: Vec2) {
        let arrow = vecFromTo(from, to)
        this.from = from;
        this.to = to;
        this.dir = arrow.norm()
        this.norm = this.dir.rot270();
        this.len = arrow.length()
        return this
    }
}

export class CircleShape {
    public center: Vec2 = vec2(0.0, 0.0);
    public readonly radius: number;
    public readonly radius2: number;

    constructor(radius: number, radius2?: number) {
        this.radius = radius;
        this.radius2 = radius2 || radius;
    }

    setCenterOffset(c: { x: number, y: number }) {
        this.center.set(c.x, c.y)
        return this
    }
}

function isReverseOriented(pts: Vec2[]): boolean {
    let posW = 0, negW = 0, len = pts.length

    for (let i = 0; i < len; i += 1) {
        let crossProd = (pts[(i + 1) % len].minus(pts[i]))
            .cross(pts[(i + 2) % len].minus(pts[(i + 1) % len]))

        crossProd > 0 ? posW += 1 : negW += 1
        if (posW && negW) throw Error("Point(0, 0) is not inside the polygon or polygon is not convex")
    }
    return negW > 0
}

export class ConvexPolyShape {
    public edges: Segment[] = [];
    public margin: number = 0.0;

    constructor(pts: Vec2[], margin?: number) {
        this.margin = margin || 0.0
        let ptsClockwise = isReverseOriented(pts) ? pts : pts.reverse(), len = pts.length
        for (let i = 0; i < len; i += 1) {
            this.edges.push(new Segment(
                ptsClockwise[i], ptsClockwise[(i + 1) % len],
            ))
        }
    }
}

