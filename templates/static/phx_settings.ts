// import {vec2, Vec2} from "./vec2.js";
// import {Time} from "./world";
// import {Segment} from "./phx_geom";
//
//
// function ratio(a: Inertia, b: Inertia) {
//     if (a.fixed && b.fixed) throw Error()
//     if (a.fixed) return {a: 1.0, b: 0.0}
//     if (b.fixed) return {a: 0.0, b: 1.0}
//     return {a: a.value / (a.value + b.value), b: b.value / (a.value + b.value)}
// }
//
// export class SurfaceMaterial {
//     restitution: number     // Hit bounce, 0  (inelastic) to 1 (elastic)
//     stickiness: number      // Hit friction, 0 (no friction) to 1 (point velocities of contact points are equal)
//     constructor(restitution: number, stickiness: number) {
//         this.restitution = restitution
//         this.stickiness = stickiness
//     }
// }
//
// export class Collision {
//     A: SolidBody;
//     B: SolidBody
//     mA: SurfaceMaterial;
//     mB: SurfaceMaterial
//     cPos: Vec2
//     cNorm: Vec2;
//     cTang: Vec2
//     manifold: number
// }
//
//
// type State = {
//     pos: Vec2,
//     angle: number,
//     vel: Vec2,
//     velAng: number,
//     ts: number,
//     next: State,
//     impulses: Impulse[],
//     collisions: Collision[]
// }
//
//
// namespace Solid {
//     class Common {
//         center: Vec2 = vec2(0.0, 0.0)
//         mass: number = null
//         inertia: number = null
//         fixed: boolean = false
//     }
//
//     public class Poly extends Common {
//         vertex: Segment[] = []
//         vertex_mat: SurfaceMaterial[] = []
//     }
//
//     class Point extends Common {
//         angle: number = 0.0
//         offset: Vec2 = vec2(0.0, 0.0)
//         size: number = 0.0
//         parts: (Poly | Point)[] = []
//     }
// }
//
//
// export class Impulse {
//     at: Vec2
//     vector: Vec2
//
//     constructor(at: Vec2, vector: Vec2) {
//         this.at = at
//         this.vector = vector
//     }
// }
