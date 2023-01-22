import {vec2, Vec2} from "./vec2.js";
import {GameObject, Scene, Time, TOnRedraw, World} from "./world.js";
import {DrawUtils} from "./gfx";
import {SolidBody} from "./phx_geom";


export class TennisBall extends GameObject {
    private body: SolidBody;
    ballRadius = 0.04;
    outlineWidth: number = 1.0;
    outlineColor = "black"
    innerGradientRadius: number = this.ballRadius * 0.2;
    innerGradientColor: string = "#FEE581"
    outerGradientRadius: number = this.ballRadius * 0.8;
    outerGradientColor: string = "#FA9D1B"
    gradientOffset: Vec2 = vec2(this.ballRadius * 0.4, this.ballRadius * -0.4);

    redraw = (world: World, drawing: DrawUtils, time: Time) => {
        let {pos, angle} = this.body.getState()
        let grad = drawing.newRadialGrad(
            pos.plus(this.gradientOffset),
            this.innerGradientRadius,
            pos.plus(this.gradientOffset),
            this.outerGradientRadius
        );
        grad.addColorStop(0.0, this.innerGradientColor)
        grad.addColorStop(1.0, this.outerGradientColor)
        drawing.begin()
            .ellipse(pos, this.ballRadius, this.ballRadius, angle)
            .fill({fillColor: grad})
            .stroke({strokeColor: this.outlineColor, lineWidth: this.outlineWidth})
    }

    constructor(pos: Vec2) {
        super();
        this.body = new SolidBody()
        // solidCircle(pos, this.ballRadius, 0.0, 1.0);
        // this.phys.state.pos = pos.clone()
        // this.phys.state.vel = vec2(0.0, 0.0);
        // this.phys.next_state.pos = pos.clone()
        // this.phys.next_state.vel = vec2(0.0, 0.0);
        // this.phys.material.bounceK = 0.5;
    }
}

export class Wall extends GameObject {
    private body: SolidBody;
    private width: number;
    private height: number;

    constructor(center: Vec2, width: number, height: number, angle: number = 0.0, color: string) {
        super();
        this.body = new SolidBody()
        this.width = width
        this.height = height
    }

    redraw = (world: World, draw: DrawUtils, time: Time) => {
        let {pos, angle} = this.body.getState()
        // draw.rect(pos, this.width, this.height, angle)
    }
}