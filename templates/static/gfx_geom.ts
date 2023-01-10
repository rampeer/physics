import {RedrawFunction} from "./gfx.js";
import {vec2, Vec2} from "./vec2.js";
import {CircleShape, RectShape} from "./shapes";

export function ArrowDrawer(
    pos: Vec2, dir: Vec2 = null, target: Vec2 = null,
    line_width: number = 1,
    color: string = "black",
    order = 0
): RedrawFunction {
    if (dir && target) throw Error();
    return {
        order: order,
        redraw: (world, drawing) => {
            drawing.begin()
                .line(pos, target)
                .stroke(color, line_width)
        }
    }
}

export function TextDrawer(
    pos: Vec2, text: () => string,
    font: string = "bold 18px serif", color: string = "black",
    order = 0
): RedrawFunction {
    return {
        order: order,
        redraw: (world, drawing) => {
            drawing.begin()
                .font(font)
                .text(pos, text())
        }
    }
}

export function CircleDrawer(
    circle: CircleShape,
    fillStyle = "black",
    order = 0
): RedrawFunction {
    return {
        order: order,
        redraw: (world, drawing) => {
            drawing.begin()
                .ellipse(circle.pos, circle.radius)
                .fill(fillStyle)
        }
    }
}

export function RectDrawer(
    rect: RectShape,
    lineColor: string = "black",
    fillColor: string = "red",
    lineWidth: number = 1,
    order = 0
): RedrawFunction {
    return {
        order: order,
        redraw: (world, drawing) => {
            drawing.begin()
                .rect(rect.pos, rect.width, rect.height, rect.angle)
            if (fillColor) drawing.fill(fillColor)
            if (lineColor) drawing.stroke(lineColor, lineWidth)
        }
    }
}
