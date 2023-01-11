import {Vec2} from "./vec2.js";
import {CircleShape, RectShape} from "./shapes.js";
import {GameObject, Time, TOnRedraw} from "./world.js";

export let ArrowDrawer = (
    pos: Vec2, dir: Vec2 = null, target: Vec2 = null,
    line_width: number = 1,
    color: string = "black",
) => new GameObject()
    .onRedraw((world, drawing, time: Time) => {
            drawing.begin()
                .line(pos, target)
                .stroke(color, line_width)
        }
    )

export let TextDrawer = (
    pos: Vec2, text: () => string,
    font: string = "bold 18px serif", color: string = "black",
) => new GameObject()
    .onRedraw((world, drawing) => {
        drawing.begin()
            .font(font)
            .stroke(color)
            .text(pos, text())
    })

export let CircleDrawer = (
    circle: CircleShape,
    fillStyle = "black",
) => new GameObject()
    .onRedraw((world, drawing) => {
        drawing.begin()
            .ellipse(circle.pos, circle.radius)
            .fill(fillStyle)
    })

export let RectDrawer = (
    rect: RectShape,
    lineColor: string = "black",
    fillColor: string = "red",
    lineWidth: number = 1,
    order = 0
) => new GameObject()
    .onRedraw((world, drawing) => {
            drawing.begin()
                .rect(rect.pos, rect.width, rect.height, rect.angle)
            if (fillColor) drawing.fill(fillColor)
            if (lineColor) drawing.stroke(lineColor, lineWidth)
        }
    )
