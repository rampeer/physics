import {vec2, Vec2} from "./vec2.js";
import {Background, DrawUtils} from "./gfx.js";
import {Container} from "./utils.js";
import {BasicTransform, TransformMatrix} from "./shapes.js";

// Hierarchy: World -> Scene [-> GameObject]* ->  Handlers

export class World {
    public scene: Scene = null;
    public container: HTMLElement = null;
    private drawUtils: DrawUtils;

    constructor(container: HTMLElement, ctx: CanvasRenderingContext2D) {
        this.container = container;
        this.drawUtils = new DrawUtils(ctx);
    }

    getSize() {
        let r = this.container.getBoundingClientRect();
        return vec2(r.width, r.height)
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
    localTransform: TransformMatrix = null;
    protected screenTransform: TransformMatrix = null;
    public update: TOnUpdate = null;
    public name: string = "Unknown";
    public typename: string = "Game object";
    public redraw: TOnRedraw = null;
    public hitTest: THitTest = null;
    public clicked: TOnClick = null;

    named(typename: string, name?: string) {
        this.name = name || typename
        this.typename = typename
        return this
    }

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
    typename = "Container"

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
    typename = "Scene"

    constructor() {
        super();
        this.add(Background())
        this.localTransform = new BasicTransform()
    }
}
