import {vec2, Vec2} from "./vec2.js";

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

export let newPoly = (localPoints: Vec2[]): ConvexShape => {
    return new ConvexShape(localPoints)
}

export let newRect = (width: number, height: number): ConvexShape => {
    let w2 = width / 2, h2 = height / 2;
    return newPoly(
        [vec2(+w2, +h2), vec2(+w2, -h2), vec2(-w2, -h2), vec2(-w2, h2)],
    )
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

function countWinding(pts: Vec2[]) {
    let len = pts.length,
        area = 0.0,
        angleSign: boolean[] = new Array(len)

    for (let prev = 0; prev < len; prev += 1) {
        let cur = (prev + 1) % len,
            next = (prev + 2) % len,
            crossProd =
                pts[cur].minus(pts[prev]).cross
                (pts[next].minus(pts[cur])) / 2.0

        area += crossProd
        angleSign[cur] = crossProd > 0
    }
    return {
        area: area,
        isRightAngle: angleSign,
        convex: angleSign.every(x => x) || angleSign.every(x => !x)
    }
}

export class ConvexShape {
    public points: Vec2[] = [];

    constructor(pts: Vec2[]) {
        let winding = countWinding(pts),
            reverse = winding.area < 0
        this.points = reverse ? pts : pts.reverse()
        if (!winding.isRightAngle.every(x => x === !reverse))
            throw Error("Poly is not convex!")
    }
}

function roll<T>(arr: Array<T>, shift: number) {
    return [...arr.slice(shift, arr.length), ...arr.slice(0, shift)]
}

function first<T>(arr: Array<T>,
                  pred: (item: T, index: number) => boolean = (x => !!x)) {
    for (let i = 0; i < arr.length; i += 1) {
        if (pred(arr[i], i)) {
            return i
        }
    }
    return null
}

function last<T>(arr: Array<T>,
                  pred: (item: T, index: number) => boolean = (x => !!x)) {
    let idx = null;
    for (let i = 0; i < arr.length; i += 1) {
        if (pred(arr[i], i)) {
            idx = i
        }
    }
    return idx
}

function seqAlong<T, V>(
    arr: Array<T>,
    fn: (index: number) => V
): Array<V> {
    let a = new Array<V>(arr.length)
    for (let i = 0; i < arr.length; i += 1) {
        a[i] = fn(i)
    }
    return a
}

export function triangleArea(a: Vec2, b: Vec2, c: Vec2) {
    let area = b.minus(a).cross(c.minus(b)) / 2.0
    console.log(area)
    return area
}

function toConvex(points: Vec2[]): Vec2[][] {
    let a = countWinding(points)
    if (a.convex)
        return [points]
    let firstPos = first(a.isRightAngle, x => x)
    console.log(a, firstPos)
    if (firstPos === 0) {
        let lastNeg = last(a.isRightAngle, x => !x)
        return toConvex(roll(points, lastNeg))
    } else {
        throw Error()
        return [
            ...toConvex(points.splice(firstPos + 1)),
            ...toConvex(points.splice(firstPos - 1, points.length))
        ]
    }
}

export class PolyShape {
    public polys: ConvexShape[] = [];

    constructor(pts: Vec2[]) {
        this.polys = toConvex(pts).map(x => new ConvexShape(x))
    }
}
//
// window["PolyShape"] = PolyShape
// window["vec2"] = vec2
//
// window["shape"] = [
//     vec2(0.5, 0.0), vec2(1.0, 1.0),
//     vec2(0.0, 0.5), vec2(-1.0, 1.0),
//     vec2(-0.5, 0.0), vec2(-1.0, -1.0),
//     vec2(0.0, -0.5), vec2(1.0, -1.0),
// ]
// // window["shape"] = [
// //     vec2(1.0, 0.0), vec2(1.0, 1.0),
// //     vec2(0.0, 1.0), vec2(-1.0, 1.0),
// //     vec2(-0.5, 0.0), vec2(-1.0, -1.0),
// //     vec2(0.0, -1.0), vec2(1.0, -1.0),
// // ]
//
// console.log(new PolyShape(window["shape"]))