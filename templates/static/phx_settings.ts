import {Vec2, vecFromTo} from "./vec2.js";
import {Segment, BasicTransform} from "./shapes.js";


export class Inertia {
    public value: number;
    public fixed: boolean;

    constructor(value: number, fixed: boolean = false) {
        this.value = value
        this.fixed = fixed
    }

    static ratio(a: Inertia, b: Inertia) {
        if (a.fixed && b.fixed) throw Error()
        if (a.fixed) return {a: 1.0, b: 0.0}
        if (b.fixed) return {a: 0.0, b: 1.0}
        return {a: a.value / (a.value + b.value), b: b.value / (a.value + b.value)}
    }
}

export class SurfaceMaterial {
    restitution: number     // Hit bounce, 0  (inelastic) to 1 (elastic)
    stickiness: number      // Hit friction, 0 (no friction) to 1 (point velocities of contact points are equal)
    constructor(restitution: number, stickiness: number) {
        this.restitution = restitution
        this.stickiness = stickiness
    }
}

export class Collision {
    A: SolidBody;
    B: SolidBody
    mA: SurfaceMaterial;
    mB: SurfaceMaterial
    cPos: Vec2
    cNorm: Vec2;
    cTang: Vec2
    manifold: number
}

class MeshSegment {
    from: Vec2
    to: Vec2
}

class MeshPoly {

}

class MeshPoint {

}

class Mesh {

}

class MeshUnion {

}

type State = {
    pos: Vec2,
    angle: number,
    vel: Vec2,
    velAng: number,
    ts: number,
    next: State,
    impulses: Impulse[],
    collisions: Collision[]
}

export class SolidBody {
    mat: SurfaceMaterial

    shape: BasicTransform

    mass: Inertia
    angInertia: Inertia

    state: State
}


export class Impulse {
    at: Vec2
    value: Vec2

    constructor(at: Vec2, value: Vec2) {
        this.at = at
        this.value = value
    }
}
