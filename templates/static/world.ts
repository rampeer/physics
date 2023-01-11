import {vec2, Vec2} from "./vec2.js";
import {Drawing} from "./gfx.js";

// Hierarchy: World -> Scene [-> GameObject]* ->  Handlers

export function Time(ts: number, dt: number) {
    return {ts: ts, dt: dt}
}

export type Time = { ts: number, dt: number }


export type TOnUpdate = (world: World, t: Time) => void;
export type TOnRedraw = (world: World, drawing: Drawing, time: Time) => void;
export type THitTest = (x: number, y: number) => boolean;
export type TOnClick = () => void;

export class GameObject {
    public update: TOnUpdate = null;
    public redraw: TOnRedraw = null;
    public hitTest: THitTest = null;
    public clicked: TOnClick = null;

    onUpdate(fn: TOnUpdate) {
        this.update = fn;
        return this
    }

    onRedraw(fn: TOnRedraw) {
        this.redraw = fn;
        return this
    }

    onHit(fn: THitTest) {
        this.hitTest = fn;
        return this
    }

    onClick(fn: TOnClick) {
        this.clicked = fn;
        return this
    }
}

export class Scene extends GameObject {
    protected children: GameObject[] = [];

    update = (world: World, t: Time): void => {
        this.children
            .filter(x => x.update !== null)
            .forEach(x => x.update(world, t))
    }

    redraw = (world: World, drawing: Drawing, time: Time): void => {
        this.children
            .filter(x => x.redraw !== null)
            .forEach(x => x.redraw(world, drawing, time))
    }

    add = (...objects: GameObject[]) => this.children.push(...objects);
    remove = (...objects: GameObject[]) => objects.forEach(
        obj => this.children.splice(
            this.children.indexOf(obj), 1
        )
    )

    public screenSize: Vec2 = null;

    screenResize(width: number, height: number) {
        this.screenSize = vec2(width, height)
    }
}

export class World {
    public scene: Scene = null;

    update(time: Time) {
        this.scene.update(this, time)
    }

    render(ctx: CanvasRenderingContext2D, time: Time) {
        let drawing = new Drawing(ctx);
        this.scene.redraw(this, drawing, time);
    }

    setScene(scene: Scene) {
        this.scene = scene
        return this
    }

    advanceTime(time: Time, ctx: CanvasRenderingContext2D) {
        this.update(time)
        this.render(ctx, time)
    }
}