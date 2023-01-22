import {Time, TOnRedraw, World} from "./world.js";
import {DrawUtils, FillStyle, FontStyle, StrokeStyle} from "./gfx";


export function DrawText(
    pos: { x: number, y: number },
    text: string,
    font?: FontStyle,
    fill?: FillStyle,
) {
    return function DrawText(world: World, drawing: DrawUtils) {
        drawing.begin()
        drawing.text(pos, text, fill, font)
    }
}

export function DrawCircle(
    pos: { x: number, y: number },
    radius: number, radius2?: number,
    fill?: FillStyle, stroke?: StrokeStyle,
): TOnRedraw {
    return function DrawCircle(world?: World, drawing?: DrawUtils, time?: Time) {
        drawing.begin()
            .ellipse(
                {x: pos.x || 0.0, y: pos.y || 0.0},
                radius, radius2 || radius
            )
        drawing.stroke(stroke)
        if (fill)
            drawing.fill(fill)
    }
}

export function DrawPoly(
    points: { x: number, y: number }[],
    fill: FillStyle,
    stroke: StrokeStyle) {
    return function (world: World, drawing: DrawUtils, time: Time) {
        drawing.begin()
        let lastPt = points[points.length - 1];
        for (let e of points) {
            drawing.line(
                {x: e.x, y: e.y},
                {x: lastPt.x, y: lastPt.y}
            )
            lastPt = e;
        }
        drawing.stroke(stroke)
        if (fill)
            drawing.fill(fill)
    }
}