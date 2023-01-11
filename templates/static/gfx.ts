import {GameObject, Scene, Time, TOnRedraw, World} from "./world.js";
import {vec2, Vec2} from "./vec2.js";
import {Level} from "./level1";


export let Background = (fillStyle = 'white') => new GameObject()
    .onRedraw((world: World, drawing: Drawing, time: Time) => {
        drawing
            .begin()
            .rect(
                {
                    x: world.scene.screenSize.x / 2,
                    y: world.scene.screenSize.y / 2
                },
                world.scene.screenSize.x,
                world.scene.screenSize.y,
            )
            .fill(fillStyle)
    })


export class Drawing {
    ctx: CanvasRenderingContext2D;

    constructor(ctx: CanvasRenderingContext2D = null) {
        this.ctx = ctx
    }

    begin() {
        this.ctx.beginPath()
        return this
    }

    stroke(strokeStyle: string | CanvasGradient | CanvasPattern = "black",
           lineWidth: number = 1,
           alpha: number = 1.0) {
        this.ctx.resetTransform()
        this.ctx.strokeStyle = strokeStyle
        this.ctx.lineWidth = lineWidth;
        this.ctx.globalAlpha = alpha;
        this.ctx.stroke()
        return this
    }

    fill(fillStyle: string | CanvasGradient | CanvasPattern, alpha: number = 1.0) {
        this.ctx.resetTransform()
        this.ctx.fillStyle = fillStyle
        this.ctx.globalAlpha = alpha;
        this.ctx.fill()
        return this
    }

    ellipse(center: { x: number, y: number }, radius: number) {
        this.ctx.ellipse(center.x, center.y, radius, radius, 0.0, 0.0, Math.PI * 2)
        return this
    }

    line(to: { x: number, y: number }, from: { x: number, y: number } = null) {
        if (from) {
            this.ctx.moveTo(from.x, from.y)
        }
        this.ctx.lineTo(to.x, to.y)
        return this
    }

    rect(center: { x: number, y: number }, width: number, height: number, angle: number = 0.0) {
        this.ctx.save()
        this.ctx.rotate(angle)
        this.ctx.rect(center.x - width / 2, center.y - height / 2, width, height)
        this.ctx.restore()
        return this
    }

    newRadialGrad(center0: { x: number, y: number }, radius0: number, center1: { x: number, y: number }, radius1: number) {
        return this.ctx.createRadialGradient(
            center0.x, center0.y, radius0,
            center1.x, center1.y, radius1
        )
    }

    text(pos: { x: number, y: number }, text: string) {
        this.ctx.strokeText(text, pos.x, pos.y)
    }

    font(font: string) {
        this.ctx.font = font;
        return this
    }
}


export class Transformation extends Drawing {
    scale: number = 1.0;
    offset: Vec2 = vec2(0.0, 0.0);

    fit(scene: Scene, level: Level) {
        this.scale = Math.min(
            scene.screenSize.x / level.arena.width(),
            scene.screenSize.y / level.arena.height()
        );
        this.offset = vec2(
            (scene.screenSize.x - this.scale * level.arena.width()) / 2,
            (scene.screenSize.y - this.scale * level.arena.height()) / 2
        )
    }

    wrap(redraw: TOnRedraw): TOnRedraw {
        return (world: World, drawing: Drawing, time: Time) => {
            this.ctx = drawing.ctx;
            return redraw(world, this, time)
        }
    }

    tf(v: { x: number, y: number }) {
        return {
            x: v.x * this.scale + this.offset.x,
            y: v.y * this.scale + this.offset.y,
        }
    }

    s(s: number) {
        return this.scale * s
    }

    ellipse(center: { x: number, y: number }, radius: number) {
        return super.ellipse(this.tf(center), this.s(radius))
    }

    line(to: { x: number, y: number }, from: { x: number, y: number } = null) {
        return super.line(this.tf(to), this.tf(from))
    }

    rect(center: { x: number, y: number }, width: number, height: number, angle: number = 0.0) {
        return super.rect(this.tf(center), this.s(width), this.s(height), angle)
    }

    newRadialGrad(center0: { x: number, y: number }, radius0: number, center1: { x: number, y: number }, radius1: number) {
        return super.newRadialGrad(
            this.tf(center0), this.s(radius0), this.tf(center1), this.s(radius1)
        )
    }

    text(pos: { x: number, y: number }, text: string) {
        return super.text(this.tf(pos), text)
    }
}
