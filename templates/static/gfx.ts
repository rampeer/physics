import {GameObject, Time, World} from "./world.js";
import {vec2, Vec2} from "./vec2.js";


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

    constructor(ctx: CanvasRenderingContext2D) {
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


class Transformation extends Drawing {
    scale: number = 1.0;
    offset: Vec2 = vec2(0.0, 0.0);

    ellipse(center: { x: number, y: number }, radius: number) {
        return super.ellipse(center, radius)
    }

    line(to: { x: number, y: number }, from: { x: number, y: number } = null) {
        return super.line(to, from)
    }

    rect(center: { x: number, y: number }, width: number, height: number, angle: number = 0.0) {
        return super.rect(center, width, height, angle)
    }

    newRadialGrad(center0: { x: number, y: number }, radius0: number, center1: { x: number, y: number }, radius1: number) {
        return super.newRadialGrad(center0, radius0, center1, radius1)
    }

    text(pos: { x: number, y: number }, text: string) {
        return super.text(pos, text)
    }
}
