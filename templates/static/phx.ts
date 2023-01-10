// import {vec2, Vec2} from "./vec2.js";
// import {Time} from "./upd.js";
// import {CircleShape, RectShape, Shape} from "./shapes.js";
//
//
// const INFINITY = "INFINITY"
// export type Mass = number | typeof INFINITY;
//
//
// export class StaticSettings {
//     public bounceK: number;
//     public frictionK: number;
//     public gravity: number;
//     public mass: Mass;
//     public angMass: Mass;
//
//     constructor(mass: Mass, angMass: Mass, restitutionK: number, frictionK: number, gravity: number) {
//         this.mass = mass;
//         this.angMass = angMass;
//         this.bounceK = restitutionK;
//         this.frictionK = frictionK;
//         this.gravity = gravity || 0.0;
//     }
// }
//
// class DynamicState {
//     public acc: Vec2;
//     public pos: Vec2;
//     public vel: Vec2;
//     public ang: number = 0.0;
//     public angVel: number = 0.0;
//
//     constructor(pos: Vec2, vel: Vec2, ang: number, angVel: number) {
//         this.pos = pos;
//         this.vel = vel;
//         this.ang = ang;
//         this.angVel = angVel;
//         this.acc = vec2(0.0, 0.0);
//     }
//
//     clone() {
//         return new DynamicState(this.pos.clone(), this.vel.clone(), this.ang, this.angVel)
//     }
//
//     copyFrom(other: DynamicState) {
//         other.pos.copyTo(this.pos);
//         other.vel.copyTo(this.vel);
//         this.ang = other.ang;
//         this.angVel = other.angVel;
//     }
// }
//
// //
// // function debug_object(pos: Vec2, color: COLOR, dir: Vec2 = null, text: string = null, radius: number = null) {
// //     return drawRoot.add(new DebugObject(pos, color.toString(), dir, text, radius));
// // }
//
// export class PhysicsObject {
//     public state: DynamicState;
//     public lastState: DynamicState;
//     public material: StaticSettings;
//     public active: boolean = true;
//     public dbgTracePosition: boolean = false;
//
//     constructor(
//         shape: Shape,
//         material: StaticSettings
//     ) {
//         this.shape = shape;
//         this.material = material;
//         this.state = new DynamicState(
//             shape.pos.clone(),
//             vec2(0, 0),
//             shape.angle,
//             angVel);
//         this.lastState = new DynamicState(
//             shape.pos.clone(),
//             vec2(0, 0),
//             shape.angle,
//             angVel);
//     };
// }
//
// export class PhysicsRect extends PhysicsObject {
//     constructor(shape: Shape,
//                 material: StaticSettings,
//                 vel: Vec2 = new Vec2(0.0, 0.0),
//                 angVel: number = 0.0) {
//         super(, );
//
//     }
// }
//
// export let PhysicsSettings = {
//     maxStepTime: 0.02,
//     skinThickness: 0.001,
//     minSpeed: 0.001,
// }
//
// let sign = (x: number) => x > 0 ? +1.0 : -1.0
// let signz = (x: number, tol: number = 1e-6) => x > tol ? +1.0 : x < -tol ? -1 : 0.0
// let ind = (x: boolean) => x ? 1.0 : 0.0
//
// let rot90 = (v: Vec2) => vec2(-v.y, +v.x)
// let rot270 = (v: Vec2) => vec2(+v.y, -v.x)
//
// let DEFAULT_GRAVITY = 9.8
//
// export class PhysicsEngine extends Composite<PhysicsObject> {
//     public gravity: number;
//     private lastUpdateTs: number = null;
//     private nextUpdateTs: number = null;
//     public active: boolean = true;
//     private hits: number;
//
//     constructor(gravity: number = DEFAULT_GRAVITY) {
//         super();
//         this.gravity = gravity;
//         this.hits = 0;
//     }
//
//     collision(a: PhysicsObject, b: PhysicsObject): void {
//         if (!(a.shape instanceof CircleShape)) throw Error();
//         if (!(b.shape instanceof RectShape)) throw Error();
//         let aShape = a.shape as CircleShape;
//         let bShape = b.shape as RectShape;
//         // translating everything into rect's coord system
//         let stateA = a.state, stateB = b.state;
//
//         let relativeVelocity = stateA.vel.minus(stateB.vel);
//         let relativePosition = stateA.pos.minus(stateB.pos);
//         let relativePrevPosition = a.lastState.pos.minus(b.lastState.pos);
//         let relativeLocalPosition = relativePosition.rotate(-b.state.ang);
//         let relativeLocalPrevPosition = relativePrevPosition.rotate(-b.lastState.ang);
//         let halfW = bShape.width / 2, halfH = bShape.height / 2;
//         // this will get negative only if the ball hits it on a side
//         // negative of X means the ball is approaching along Y, and visa verse
//         // during corner hits, they will be both positive
//
//         let distToEdges = new Vec2(
//             relativeLocalPosition.x - halfW * sign(relativeLocalPosition.x),
//             relativeLocalPosition.y - halfH * sign(relativeLocalPosition.y)
//         );
//         let prevDistToEdges = new Vec2(
//             relativeLocalPrevPosition.x - halfW * sign(relativeLocalPrevPosition.x),
//             relativeLocalPrevPosition.y - halfH * sign(relativeLocalPrevPosition.y)
//         );
//         let passThrough = false;    // ball was moving too fast, and passed through
//         let hitTypeCorner = false;
//         let hitTypeTop = false; // == bottom (but with flipped sign)
//         let hitTypeRight = false; // == left (but with flipped sign)
//
//         if (
//             distToEdges.x - PhysicsSettings.skinThickness > 0 ||
//             distToEdges.y - PhysicsSettings.skinThickness > 0
//         ) {
//             if (sign(prevDistToEdges.y) * sign(distToEdges.y))
//                 if (sign(prevDistToEdges.x) * sign(distToEdges.x))
//                     return null;
//             passThrough = true;
//         }
//
//         let distBBoxToEdges = {
//             x: prevDistToEdges.x - aShape.radius,
//             y: prevDistToEdges.y - aShape.radius
//         };
//
//         let approachSideSign = {
//             x: relativeLocalPosition.x > 0 ? +1 : -1,
//             y: relativeLocalPosition.y > 0 ? +1 : -1,
//         }
//         let contactLocal = vec2(
//             prevDistToEdges.x < 0 ? relativeLocalPosition.x : halfW * approachSideSign.x,
//             prevDistToEdges.y < 0 ? relativeLocalPosition.y : halfH * approachSideSign.y,
//         )
//         let contactRelative = relativeLocalPosition.minus(contactLocal)
//         let manifold = (
//             contactRelative.length()
//             - aShape.radius
//             - PhysicsSettings.skinThickness
//         );
//
//         if (manifold > 0.0) return;
//         let contact = contactLocal.rotate(stateB.ang);
//         let contactNormal = relativePosition.minus(contact).normEq();
//         let hitNormalAngleCos = relativeVelocity.dotNorm(contactNormal);
//
//         let velNormalLength = hitNormalAngleCos * relativeVelocity.length();
//         let velNormal = contactNormal.mul(velNormalLength);
//         let velLateral = relativeVelocity.minus(velNormal);
//
//         let newVelNorm = velNormal.mul(-a.material.bounceK * b.material.bounceK);
//         let newVelLat = velLateral.mul(a.material.frictionK * b.material.frictionK);
//
//         let newVel = newVelLat.plus(newVelNorm);
//         let newPos = stateA.pos.plus(contactNormal.mul(Math.abs(manifold)));
//         console.error(velNormalLength > 0.0 ? "POSITIVE" : "NEGATIVE");
//         console.log("relativeVelocity", relativeVelocity);
//         console.log("velNormal", velNormal);
//         console.log("velLateral", velLateral, "...");
//         console.log("newVel", newVel);
//         console.log("newVelNorm", newVelNorm);
//         console.log("newVelLat", newVelLat, "...");
//         console.log("newPos", newPos);
//         console.log("manifold", manifold);
//         newVel.copyTo(stateA.vel);
//         newPos.copyTo(stateA.pos);
//     }
//
//     public step(timer: Time) {
//         if (this.lastUpdateTs === null || !this.active) {
//             this.lastUpdateTs = timer.ts;
//             this.nextUpdateTs = timer.ts;
//             return;
//         }
//         let nextStep;
//         while ((nextStep = timer.ts - this.nextUpdateTs) > 0) {
//             nextStep = Math.min(nextStep, PhysicsSettings.maxStepTime)
//             this._step(nextStep);
//         }
//     }
//
//     private _step(dt: number) {
//         let movableObj = this.children.filter(o => o.material.mass !== INFINITY && o.active);
//         let fixedObj = this.children.filter(o => o.material.mass === INFINITY && o.active);
//
//         // Update positions 'future' values to 'current' ones
//         // (yes, this introduces .01 second input lag)
//         //this._step_advance_state(dt)
//
//         //ToDo:  Integrate forces
//         // ...
//
//         // Update positions and velocities
//         for (let m of movableObj) {
//             if (m.dbgTracePosition) {
//                 drawRoot.add(new CircleDrawer(m.state.pos.clone(), "purple", 0.01))
//             }
//             let s = m.lastState;
//             s.pos
//                 //.plusEq(this.gravity.mul(m.material.gravity * maxStepSize * maxStepSize / 2))
//                 .plusEq(s.vel.mul(dt));
//             //s.vel.plusEq(this.gravity.mul(m.material.gravity * maxStepSize));
//         }
//
//         // Collisions
//         for (let m of movableObj) {
//             for (let f of fixedObj) {
//                 this.collision(m, f);
//             }
//         }
//
//         // Computing next step time
//         //let nextUpdate = maxStepSize;
//
//     }
//
//     //
//     // _step_advance_state = (dt: number) => {
//     //     this.children.forEach((o, idx) => {
//     //         let s = o.state, sp = s.pos, sv = s.vel;
//     //         sp.set(sp.x + s.vel.x * dt +
//     //             sp.x
//     //         )
//     //     )
//     //     })
//     // }
// }
