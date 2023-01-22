import {GameObject, Scene, Time, TOnRedraw, World} from "./world.js";
import {vec2, Vec2} from "./vec2.js";
import {Level} from "./level1.js";
import {TransformMatrix} from "./shapes.js";
let DEFAULT_FONT_NAME = "'Operator Mono', 'Source Code Pro', Menlo, Monaco, Consolas, Courier New, monospace"
let DEFAULT_FONT_SIZE = 18

export let Background = (fillColor = 'white') => new GameObject()
    .onRedraw((world: World, drawing: DrawUtils, time: Time) => {
        let r = world.getSize()
        drawing
            .begin()
            .rect(
                {
                    x: r.x / 2,
                    y: r.y / 2
                },
                r.x,
                r.y,
            )
            .fill({fillColor: fillColor})
    }).named("Background")

export type FontStyle = {
    fontVariation?: "normal" | "bold" | "italic",
    fontSize?: number,
    fontSizeUnit?: "px" | "em",
    fontName?: string
}

export type StrokeStyle = {
    strokeColor?: string | CanvasGradient | CanvasPattern,
    lineWidth?: number,
    alpha?: number
};

export type FillStyle = {
    fillColor?: string | CanvasGradient | CanvasPattern,
    lineWidth?: number,
    alpha?: number
};

export class DrawUtils {
    ctx: CanvasRenderingContext2D;
    private tfStack: TransformMatrix[] = [];
    private tfCurrent: TransformMatrix = new TransformMatrix()

    public getTransform(): TransformMatrix {
        return this.tfCurrent
    }

    pushTransform(tf: TransformMatrix, reset: boolean = false) {
        this.tfStack.push(this.tfCurrent)
        this.tfCurrent = reset ? tf :
            this.tfCurrent.mul(tf, new TransformMatrix())
        this.applyTransform()
        return this
    }

    popTransform() {
        this.tfCurrent = this.tfStack.pop()
        this.applyTransform()
        return this
    }

    private applyTransform() {
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

    stroke(s: StrokeStyle) {
        this.ctx.save()
        this.ctx.resetTransform()
        this.ctx.strokeStyle = s?.strokeColor || "black"
        this.ctx.lineWidth = s?.lineWidth || 1.0;
        this.ctx.globalAlpha = s?.alpha || 1.0;
        this.ctx.stroke()
        this.ctx.restore()
        return this
    }

    fill(s: FillStyle) {
        this.ctx.save()
        this.ctx.resetTransform()
        this.ctx.fillStyle = s?.fillColor || "white"
        this.ctx.globalAlpha = s?.alpha || 1.0;
        this.ctx.fill()
        this.ctx.restore()
        return this
    }

    ellipse(center: { x: number, y: number }, radius: number, radius2?: number, angle?: number) {
        this.ctx.ellipse(center.x, center.y, radius, radius2 || radius, angle || 0.0, 0.0, Math.PI * 2)
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

    text(pos: { x: number, y: number },
         text: string,
         fill?: FillStyle,
         font?: FontStyle,
         baseline: CanvasTextBaseline = "top") {
        this.ctx.resetTransform()
        this.ctx.fillStyle = fill?.fillColor || "black"
        this.ctx.globalAlpha = fill?.alpha || 1.0;
        this.ctx.font = (
            `${font?.fontVariation || "normal"} ` +
            `${font?.fontSize || DEFAULT_FONT_SIZE}` +
            `${font?.fontSizeUnit || "px"} ` +
            `${font?.fontName || DEFAULT_FONT_NAME}`
        )
        if (baseline)
            this.ctx.textBaseline = baseline
        this.ctx.fillText(text, pos.x, pos.y)
        return this
    }
}
