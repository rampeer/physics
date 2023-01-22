import {vec2, Vec2} from "./vec2.js";
import {CircleShape, BasicTransform} from "./shapes.js";
import {GameObject, Time} from "./world.js";
import {Container} from "./utils.js";
import {SolidBody} from "./phx_geom.js";

type Constructor = new (...args: any[]) => {};

export let PhysicsSettings = {
    maxStepTime: 0.02,
    skinThickness: 0.001,
}

let sign = (x: number) => x > 0 ? +1.0 : -1.0
let signz = (x: number, tol: number = 1e-6) => x > tol ? +1.0 : x < -tol ? -1 : 0.0
let ind = (x: boolean) => x ? 1.0 : 0.0

export const DEFAULT_GRAVITY = 9.8

export class PhysicsEngine {
    public gravity: number;
    public active: boolean = true;
    private lastTs: number = null;
    private nextFrameTime: number = null;
    private time: number = null;
    protected objects = new Container<SolidBody>();

    constructor(gravity: number = DEFAULT_GRAVITY) {
        this.gravity = gravity;
    }

    step(timer: Time) {
        if (this.lastTs === null || !this.active) {
            this.lastTs = timer.ts;
            this.nextFrameTime = 0.0
            this.time = 0.0;
        }
        let dt = timer.ts - this.lastTs
        this.time += dt;
        this.lastTs = timer.ts;
        let maxStep = null;
        while (this.nextFrameTime < this.time) {
            this.nextFrameTime = this._step(this.time, this.nextFrameTime);
        }
    }

    private _step(ts: number, maxTs: number): number {
        return maxTs
    }
        // /*
        // (A) Integrate positions
        // 1. Compute expected new positions and angles using current velocities (up to time MAX_DELTA_TIME)
        //  */
        // console.log(ts, dt);
        // let toUpdate: SolidBody[] = []
        // for (const b of this.objects) {
        //     if (b.state.ts < ts) {
        //         toUpdate.push(b);
        //     }
        // }
        // if (!toUpdate) return
        // // 2. Run contact detection, and if there are new contacts detected:
        // //      2a? Pick contact where distance travelled of both object is the least
        // //      2b? Push objects away by <normManifold + SMALLEST_GAP_WIDTH> proportional to their mass
        // //             ? stickiness scales with collision velocity?..
        // //
        // //
        // // while (contacts = this.detectContacts()) {
        // //     // 2b. Push less massive object away by <normManifold + SMALLEST_GAP_WIDTH> distance along the normal
        // //     let c: Collision;
        // //     pushAway(c.A, c.B, c.manifold + SKIN_DEPTH)
        // //
        // //     // 2c. Compute normal and tangential contact point velocities of both objects
        // //     //      contactDist{X} = contactPos - pos{x}
        // //     //      relVel{X} = linVel{X} + contactDist{X}.rotate(angVel{X})
        // //     //      relVelNorm{X} = norm(relVel{X}) * (relVel{X} dot contactNorm)
        // //     //      relVelTang{X} = relVel{X} - relVelNorm{X}
        // //     let radiusA = c.cPos.minus(c.A.pos), radiusB = c.cPos.minus(c.B.pos)
        // //
        // //     let contactRotVelA = radiusA.rot90().mul(c.A.angVel), // = R * omega
        // //         contactRotVelB = radiusB.rot90().mul(c.B.angVel),  // = R * omega
        // //         contactLinVelA = c.objA.vel,
        // //         contactLinVelB = c.objA.vel
        // //     let contactVelA = contactLinVelA.plus(contactRotVelA).project(c.norm),
        // //         contactVelB = contactLinVelB.plus(contactRotVelB).project(c.norm);
        //
        //     // 2d. Compute impulses
        //     //      tangImpulse{X} = (
        //     //          inelastic(relVelTang{X}, moment{X}, relVelTang{Y}, moment{Y})
        //     //          -relVelTang{X}
        //     //      ) * stickiness * moment{X}
        //     //      normImpulse{X} = (
        //     //          inelastic(relVelNorm{X}, mass{X}, relVelNorm{Y}, mass{Y})
        //     //          -normVel{X}
        //     //      ) * restitution * mass{X}
        //
        //
        //     //             2f. Apply both impulses (they are applied to the contact point)
        //     //             impulseAng{X} = norm(contactDist{X}) dot impulse
        //     //             impulseLin{X} = impulse - impulseAng{X}
        // }
        // // 3. Update positions and angles of all objects using remaining travel time (they travel freely)
        // // (B) Integrate forces
        // // 1. For each object, compute velocity change (both ang and linear)
        // //      Combine velocity changes into pseudoforce:
        // //          CollisionReaction{X} (ang) = sum(impulseAng{X}) / moment{X}
        // //          CollisionReaction{X} (lin) = sum(impulseLin{X}) / mass{X}
        // //      PostCollision = CollisionReaction + Gravity, where
        // //          Gravity = G * dt
        // //      PostFriction = PostCollision + Friction, where
        // //          Friction = -Velocity * dt * K1 - Velocity^2 * dt * K2
        // //      ControlForces = f(Velocity, PostFriction)

}
