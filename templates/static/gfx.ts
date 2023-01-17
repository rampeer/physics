import {GameObject, Scene, Time, TOnRedraw, World} from "./world.js";
import {vec2, Vec2} from "./vec2.js";
import {Level} from "./level1.js";
import {TransformMatrix} from "./shapes.js";


export let Background = (fillStyle = 'white') => new GameObject()
    .onRedraw((world: World, drawing: DrawUtils, time: Time) => {
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


export class DrawUtils {
    ctx: CanvasRenderingContext2D;
    private tfStackProd: TransformMatrix[] = [];
    private tfCurrent: TransformMatrix = new TransformMatrix()

    pushTransform(tf: TransformMatrix) {
        this.tfStackProd.push(this.tfCurrent)
        this.tfCurrent = this.tfCurrent.mul(tf, new TransformMatrix())
        this.tfUpdate()
        return this
    }

    popTransform() {
        this.tfCurrent = this.tfStackProd.pop()
        this.tfUpdate()
        return this
    }

    private tfUpdate() {
        this.ctx.setTransform(
            this.tfCurrent.matrix[0], this.tfCurrent.matrix[1],
            this.tfCurrent.matrix[2], this.tfCurrent.matrix[3],
            this.tfCurrent.offset[0], this.tfCurrent.offset[1]
        )
    }

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

    ellipse(center: { x: number, y: number }, radius: number, radius2?: number) {
        this.ctx.ellipse(center.x, center.y, radius, radius2 || radius, 0.0, 0.0, Math.PI * 2)
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

    text(pos: { x: number, y: number }, text: string, baseline: CanvasTextBaseline = "top") {
        this.ctx.fillText(text, pos.x, pos.y)
        if (baseline)
            this.ctx.textBaseline = baseline
        return this
    }

    font(font: string) {
        this.ctx.font = font;
        return this
    }
}
