// import {vec2, Vec2} from "./vec2.js";
// import {Mass, PhysicsObject, StaticSettings} from "./phx.js";
// import {CircleShape, RectShape, Segment} from "./shapes.js";
//
// export function solidCircle(
//     center: Vec2, radius: number,
//     angle: number = 0.0,
//     isFixed: boolean = false,
//     gravityCoef: number = 1.0,
// ): PhysicsObject {
//     let mat = new StaticSettings(
//         1.0, 1.0,
//         1.0, 1.0, gravityCoef
//     );
//     let obj = new PhysicsObject(new CircleShape(center, radius, angle), mat);
//     return obj
// }
//
// export function solidRect(
//     center: Vec2,
//     width: number, height: number,
//     angle: number = 0.0,
//     gravity: number = 1.0,
//     mass: Mass
// ): PhysicsObject {
//     let mat = new StaticSettings(mass, mass, 1.0, 1.0, gravity);
//     return new PhysicsObject(new RectShape(center, width, height, angle), mat)
// }
//
// // It's a mess... will fix later.
// class Circle {
//     public O: Vec2;
//     public radius: number;
//
//     constructor(O: Vec2, radius: number) {
//         this.O = O;
//         this.radius = radius;
//     }
// }
//
// class Corner {
//     public P: Vec2;
//     public normal: Vec2; // points outside; bisector of adjacent edges (=outer angle)
//     public angle: number; // between adjacent edges;
//     constructor(P: Vec2, normal: Vec2, angle: number = Math.PI / 4) {
//         this.P = P;
//         this.normal = normal;
//         this.angle = angle;
//     }
// }
//
// let lerp = (from: Vec2, to: Vec2, frac: number) => vec2(
//     to.x * frac + from.x * (1 - frac),
//     to.y * frac + from.y * (1 - frac)
// )
//
// let circleSegmentContact = (c_: Circle, c: Circle, s_: Segment, s: Segment): number => {
//     // Length of height OH (from O to line AB)
//     let hLen_ = s_.normal.dot(c_.O) - s_.normal.dot(s_.A);
//     let hLen = s.normal.dot(c.O) - s.normal.dot(s.A);
//     // The ball is on the 'other side' of the segment; some other segment must handle it
//     if (hLen_ < 0) return null
//     // The ball is too far away from the segment (no collision)
//     if (hLen > c_.radius) return null
//     if (hLen_ < c.radius) throw Error("Last frame was bogus; ball not pushed out")
//
//     // At which tick fraction, O's radius will intersect AB (=height length becomes equal to radius)
//     // (assuming that height changes linearly, which is not the case, really)
//     let contactFraction = (hLen_ - c.radius) / (hLen_ - hLen)
//
//     // Where O, A and B will be at this point?
//     let contactOPos = lerp(c_.O, c.O, contactFraction)
//     let contactAPos = lerp(s_.A, s.A, contactFraction)
//     let contactBPos = lerp(s_.B, s.B, contactFraction)
//     // Let's draw a new height to AB.
//     // Where, between A and B, it will fall?
//     let contactAB = contactBPos.minus(contactAPos);
//     let contactABTang = contactAB.norm();
//     let tangDist = contactABTang.dot(contactOPos.minus(contactAPos))
//     // It falls 'before' A or 'after' B; so no collision
//     if (tangDist < 0 || tangDist > contactAB.length()) return
//     // // Contact point ...
//     // let contactPoint = contactAPos.plus(contactABTang.mul(tangDist))
//     // // Height (H'O)! note the reversion
//     // let contactHeight = contactOPos.minus(contactPoint);
//     // let contactNormal = contactHeight.norm();
//     // // Manifold - for corrections (object will be 'pushed out' later by that distance)
//     // let manifold = contactHeight.length() - c.radius;
//     return contactFraction
// }
//
//
// let circleCornerContact = (c_: Circle, c: Circle, r_: Corner, r: Corner): number => {
//     // There are two cases:
//     // A) O comes in
//     // B) circle barely touches the corner, so O nor O' were withing the radius distance to
//     // the corner, but there was a contact. Fuck this case.
//     // Yeah, let's also assume that r does not move...
//
//     // From which direction O approaches?
//     let approachCos = c_.O.minus(r_.P).dotNorm(r_.normal)
//     // it's approaching from the 'back'; so corners must handle it
//     if (approachCos < Math.cos(r_.angle)) return
//
//     let O_R = r_.P.minus(c_.O);
//     let oDirection = c.O.minus(c_.O);
//
//     // COSINE RULE:
//     // a^2 = b^2 + c^2 - b*c*cos(A)  | A is a's opposite angle
//     // let cos = Math.
//     // let distTo
// }
//
// //
// // let circleCircleContact = (c_: Circle, c: Circle, r_: Corner, r: Corner): number => {
// //
// // }
import {vec2, Vec2} from "./vec2";
import {Time} from "./world";


class PartSegment {
    public from: Vec2 = vec2(0.0, 0.0);
    public to: Vec2 = vec2(0.0, 0.0);
    public leftNormal: Vec2 = vec2(0.0, 0.0);
    public direction: Vec2 = vec2(0.0, 0.0);
    public len: number = 0.0;

    constructor(from: { x: number, y: number }, to: { x: number, y: number }) {
        this.set(from, to)
    }

    set(from: { x: number, y: number }, to: { x: number, y: number }) {
        let dx = to.x - from.x,
            dy = to.y - from.y,
            len = Math.sqrt(dx * dx + dy * dy)
        this.from.set(from.x, from.y)
        this.to.set(to.x, to.y)
        this.direction.set(dx, dy)
        this.leftNormal.set(-dy, dx)
        this.len = len
        return this
    }
}

class PartPoint {
    public center: Vec2 = vec2(0.0, 0.0);
    private radius: number;

    constructor(center: { x: number, y: number }, radius: number) {
        this.set(center, radius)
    }

    set(center: { x: number, y: number }, radius: number) {
        this.radius = radius
        this.center.set(center.x, center.y)
        return this
    }
}

type Part = PartPoint | PartSegment

class Node {
    pos: Vec2 = vec2(0.0, 0.0)
    angle: number = 0.0
    vel: Vec2
    angleVel: number = 0.0

    mass_center: Vec2 = vec2(0.0, 0.0)
    mass: number = null
    inertia: number = null

    children: Node[] = []
}

class Tree {
    root: Node
    parts: Part[] = []
    ts: number
}

export class SolidBody {
    template: Node
    current: Tree
    trace: Tree[] = []
    setTime(t: Time): SolidBody {return this}
    getState(): Node{return null}
}
