import {vec2, Vec2} from "./vec2.js";
import {DrawUtils} from "./gfx.js";
import {Container} from "./utils.js";
import {BasicTransform, TransformMatrix} from "./shapes.js";

// Hierarchy: World -> Scene [-> GameObject]* ->  Handlers

export class World {
    public scene: Scene = null;
    private drawUtils: DrawUtils;

    constructor(ctx: CanvasRenderingContext2D) {
        this.drawUtils = new DrawUtils(ctx);
    }

    setScene(scene: Scene) {
        this.scene = scene
        return this
    }

    frame(time: Time) {
        this.scene.update(this, time)
        this.scene.redraw(this, this.drawUtils, time);
    }
}

export function Time(ts: number, dt: number) {
    return {ts: ts, dt: dt}
}

export type Time = { ts: number, dt: number }
export type TOnUpdate = (world: World, t: Time) => void;
export type TOnRedraw = (world: World, drawing: DrawUtils, time: Time) => void;
export type THitTest = (x: number, y: number) => boolean;

export type TOnClick = () => void;

export class GameObject {
    protected localTransform: TransformMatrix = null;
    protected screenTransform: TransformMatrix = null;
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

export class GameObjectContainer extends GameObject {
    protected children: Container<GameObject> = new Container()
    public add = this.children.add;
    public remove = this.children.remove;

    update = (world: World, t: Time): void => {
        this.children
            .filter(x => x.update !== null)
            .forEach(x => x.update(world, t))
    }

    redraw = (world: World, drawing: DrawUtils, time: Time): void => {
        if (this.localTransform)
            drawing.pushTransform(this.localTransform)
        this.children
            .filter(x => x.redraw !== null)
            .forEach(x => x.redraw(world, drawing, time))
        if (this.localTransform)
            drawing.popTransform()
    }
}

export class Scene extends GameObjectContainer {
    public screenSize: Vec2 = null;

    constructor() {
        super();
        this.localTransform = new BasicTransform()
    }

    screenResize(width: number, height: number) {
        this.screenSize = vec2(width, height)
    }
}
