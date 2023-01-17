import {Vec2} from "./vec2.js";
import {CircleShape, ConvexPolyShape} from "./shapes.js";
import {GameObject, Time, TOnRedraw, World} from "./world.js";
import {DrawUtils} from "./gfx";

export let TextDrawer = (
    pos: () => Vec2,
    text: () => string,
    color: string = "black",
    fontName: string = "serif",
    fontVariation = "bold",
    fontSize: number = 18,
    fontSizeUnit = "px",
) => (world: World, drawing: DrawUtils) => {
    drawing.begin()
        .font(`${fontVariation} ${fontSize}${fontSizeUnit} ${fontName}`)
        .text(pos(), text())
}

export let CircleDrawer = (
    circle: () => { radius: number, radius2?: number, x?: number, y?: number },
    fillStyle = "black",
    lineColor: string = "black",
    lineWidth: number = 1,
) => (world: World, drawing: DrawUtils) => {
    let c = circle();
    drawing.begin()
        .ellipse({x: c.x || 0.0, y: c.y || 0.0}, c.radius)
    if (lineColor)
        drawing.stroke(lineColor, lineWidth)
    if (fillStyle)
        drawing.fill(fillStyle)
}

export let PolyDrawer = (
    points: () => { x: number, y: number }[],
    lineColor: string = "black",
    fillColor: string = "red",
    lineWidth: number = 1,
) => (world: World, drawing: DrawUtils) => {
    drawing.begin()
    let pts = points();
    let lastPt = pts[pts.length - 1];
    for (let e of pts) {
        drawing.line(
            {x: e.x, y: e.y},
            {x: lastPt.x, y: lastPt.y}
        )
        lastPt = e;
    }
    if (lineColor)
        drawing.stroke(lineColor, lineWidth)
    if (fillColor)
        drawing.fill(fillColor)
}
