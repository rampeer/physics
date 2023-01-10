import {vec2, Vec2} from "./vec2.js";
import {PhysicsObject} from "./phx.js";
import {Time, UpdateFunction} from "./upd.js";
import {solidCircle, solidRect} from "./phx_geom.js";
import {CircleDrawer, RectDrawer, TennisBallDrawer} from "./gfx_geom.js";
import {GameObject, Scene, World} from "./world.js";
import {Drawing, RedrawFunction} from "./gfx.js";

export class PositionUpdater extends UpdateFunction {
    private ph: PhysicsObject;
    private gfx: any;

    constructor(ph: PhysicsObject, gfx: any) {
        super();
        this.ph = ph;
        this.gfx = gfx
    }

    update(world: World = null, scene: Scene = null, time: Time): void {
        if (this.gfx instanceof CircleDrawer) {
            this.ph.state.pos.copyTo(this.gfx.pos)
        } else if (this.gfx instanceof RectDrawer) {
            this.ph.state.pos.copyTo(this.gfx.pos);
            this.gfx.angle = this.ph.state.ang;
        } else {
            throw Error()
        }
    }
}

export class TennisBall extends GameObject {
    private phys: PhysicsObject;
    private gfx: RedrawFunction;
    ballRadius = 0.04;
    outlineWidth: number = 1.0;
    outlineColor = "black"
    innerGradientRadius: number = this.ballRadius * 0.2;
    innerGradientColor: string = "#FEE581"
    outerGradientRadius: number = this.ballRadius * 0.8;
    outerGradientColor: string = "#FA9D1B"
    gradientOffset: Vec2 = vec2(this.ballRadius * 0.4, this.ballRadius * -0.4);

    constructor(pos: Vec2) {
        super();
        //
        // function TennisBallDrawer(
        //     pos: Vec2, radius: number,
        //     gradientOffset: Vec2, innerRad: number, innerColor: string, outerRad: number, outerColor: string,
        //     outlineColor: string = "black", lineWidth: number = 1.0
        // ): RedrawFunction {
        //     return
        this.gfx = {
            order: 0,
            redraw: (world: World, drawing: Drawing) => {
                let grad = drawing.newRadialGrad(
                    pos.plus(this.gradientOffset),
                    this.innerGradientRadius,
                    pos.plus(this.gradientOffset),
                    this.outerGradientRadius
                );
                grad.addColorStop(0.0, this.innerGradientColor)
                grad.addColorStop(1.0, this.outerGradientColor)
                drawing.begin()
                    .ellipse(pos, this.ballRadius)
                    .fill(grad)
                    .stroke(this.outlineColor, this.outlineWidth)
            }
        };
        this.phys = solidCircle(pos, this.ballRadius, 0.0, 1.0);
        this.phys.state.pos = pos.clone()
        this.phys.state.vel = vec2(0.0, 0.0);
        this.phys.next_state.pos = pos.clone()
        this.phys.next_state.vel = vec2(0.0, 0.0);
        this.phys.material.bounceK = 0.5;
    }
}

export class Wall extends GameObject {
    private phys: PhysicsObject;
    private gfx: RedrawFunction;
    private upd: PositionUpdater;

    constructor(center: Vec2, width: number, height: number, angle: number = 0.0, color: string) {
        super();
        this.phys = solidRect(center, width, height, angle);
        this.gfx = RectDrawer(center, width, height, angle, color)
        this.upd = new PositionUpdater(this.phys, this.gfx);
    }
}