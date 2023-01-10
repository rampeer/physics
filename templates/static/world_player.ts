// import {GameObject, Scene, World} from "./world.js";
// import {Vec2, vec2} from "./vec2.js";
// import {Time, UpdateFunction} from "./upd.js";
// import {controlDirection, controlPosition} from "./controls.js";
// import {PhysicsObject, PhysicsSettings} from "./phx.js";
// import {RectDrawer} from "./gfx_geom.js";
// import {solidRect} from "./phx_geom.js";
// import {PositionUpdater} from "./world_geom.js";
//
// class PlayerControlAdapter extends UpdateFunction {
//     public desiredPos = vec2(0.0, 0.0);
//     public desiredNormal = vec2(1.0, 0.0);
//     public playAreaCenter = vec2(500.0, 700.0);
//     public playAreaExtents = vec2(500.0, 400.0);
//     private angle: number = 0.0;
//
//     desiredAngle() {
//         return this.angle;
//     }
//
//     update(world: World = null, scene: Scene = null, t: Time): void {
//         this.desiredPos.x = this.playAreaCenter.x + controlPosition.x * this.playAreaExtents.x;
//         this.desiredPos.y = this.playAreaCenter.y + controlPosition.y * this.playAreaExtents.y;
//         let l = controlDirection.length() + 1e-6;
//         this.desiredNormal.x = controlDirection.x / l;
//         this.desiredNormal.y = controlDirection.y / l;
//
//         if (Math.abs(this.desiredNormal.x) > Math.abs(this.desiredNormal.y)) {
//             let acos = Math.acos(this.desiredNormal.x);
//             this.angle = this.desiredNormal.y > 0 ? acos : -acos;
//         } else {
//             let asin = Math.asin(this.desiredNormal.y);
//             this.angle = this.desiredNormal.x > 0 ? asin : Math.PI - asin;
//         }
//         this.angle += Math.PI / 2;
//     }
// }
//
//
// export class VelocityControls extends UpdateFunction {
//     private obj: PhysicsObject;
//     private adapter: PlayerControlAdapter;
//     public maxForce: number = 1000;
//     public maxVelocity: number = 1000;
//
//     constructor(obj: PhysicsObject, adapter: PlayerControlAdapter) {
//         super();
//         this.obj = obj;
//         this.adapter = adapter;
//     }
//
//     update(world: World, t: Time): void {
//         let state = this.obj.state;
//         let dist = this.adapter.desiredPos.minus(state.pos);
//         let len = dist.length();
//         state.vel = dist.norm().mul(Math.min(this.maxVelocity, len / PhysicsSettings.maxStepTime));
//         state.ang = this.adapter.desiredAngle();
//     }
// }
//
// export class PlayerPaddle extends GameObject {
//     private gfx: RectDrawer;
//     private pfx: PhysicsObject;
//     private ctrl: VelocityControls;
//     public upd: PositionUpdater;
//     public adapter: PlayerControlAdapter;
//
//     //private debug: Drawer;
//
//     constructor(pos: Vec2) {
//         super();
//         paddle = this;
//         this.gfx = RectDrawer(pos, paddleWidth, paddleHeight, 0.0, "cyan");
//         this.pfx = solidRect(pos, paddleWidth, paddleHeight, 0.0, "fixed");
//         this.upd = new PositionUpdater(this.pfx, this.gfx);
//     }
// }
//
// let paddleWidth: number = 0.16;
// let paddleHeight: number = 0.02;
// let paddle: PlayerPaddle;
//
// export function debugRedraw(ctx: CanvasRenderingContext2D) {
//     ctx.font = "20px Courier New"
//     ctx.fillStyle = "black";
//     let pos = paddle.adapter.desiredPos;
//     ctx.fillText("Goal: " + pos.toString(3), 100, 100);
//     ctx.fillText(paddle.adapter.desiredNormal.toString(3), 200, 130);
//     ctx.fillText("Control: " + controlPosition.toString(3), 100, 160);
//     ctx.fillText(controlDirection.toString(3), 200, 190);
//     ctx.fillText("Angle:" + paddle.adapter.desiredAngle().toString(), 100, 220);
//     ctx.save();
//     ctx.beginPath();
//     ctx.strokeStyle = "green";
//     ctx.lineWidth = 3;
//     ctx.moveTo(pos.x, pos.y);
//     ctx.lineTo(
//         Math.cos(paddle.adapter.desiredAngle()) * 10 + pos.x,
//         Math.sin(paddle.adapter.desiredAngle()) * 10 + pos.y);
//     ctx.stroke();
//     ctx.closePath();
//     ctx.restore();
//
//     ctx.beginPath()
//     ctx.strokeStyle = "red";
//     ctx.lineWidth = 1;
//     ctx.ellipse(pos.x, pos.y, 5.0,
//         5.0, 0.0, 0.0, Math.PI * 2);
//     ctx.fill();
//     ctx.ellipse(pos.x + controlDirection.x, pos.y + controlDirection.y,
//         5.0, 5.0, 0.0, 0.0, Math.PI * 2);
//     ctx.fill();
//     ctx.closePath();
// }