import {DrawEngine, RedrawFunction} from "./gfx.js";
import {Time, UpdateLogicEngine, UpdateFunction} from "./upd.js";
import {Vec2} from "./vec2.js";
import {sign} from "./utils";

type TGameObject = {
    update: UpdateFunction | null,
    draw: RedrawFunction | null,
    _children: Array<GameObject>
};

export class GameObject implements TGameObject {
    _children: Array<GameObject>;
    draw: RedrawFunction = null;
    update: UpdateFunction = null;

    constructor(draw: RedrawFunction = null, update: UpdateFunction = null) {
        this._children = [];
        this.draw = draw;
        this.update = update;
    }

    getChildren() {
        return this._children
    }

    add(...objects: GameObject[]) {
        this._children.push(...objects)
    }

    remove(...objects: GameObject[]) {
        for (const obj of objects) {
            this._children.splice(this._children.indexOf(obj), 1);
        }
    }
}

export class Scene extends GameObject {
    drawFunctions(sort: boolean = true): Array<RedrawFunction> {
        let recurse: (o: GameObject) => RedrawFunction[] = (o: GameObject) => {
            return [o.draw].concat(
                o.getChildren()
                    .map(c => recurse(c))
                    .reduce((a, v) => a.concat(v))
            );
        }
        return sort ? recurse(this) : recurse(this)
            .sort((a, b) => sign(a.order - b.order))
    }

    updateFunctions(sort: boolean = true): Array<UpdateFunction> {
        let recurse: (o: GameObject) => UpdateFunction[] = (o: GameObject) => {
            return [o.update].concat(
                o.getChildren()
                    .map(c => recurse(c))
                    .reduce((a, v) => a.concat(v))
            );
        }
        return sort ? recurse(this) : recurse(this)
            .sort((a, b) => sign(a.order - b.order))
    }
}

export class World {
    public readonly gfx: DrawEngine;
    public readonly upd: UpdateLogicEngine;
    public scene: Scene = null;
    public screenSize: Vec2;

    constructor(gfx: DrawEngine, upd: UpdateLogicEngine) {
        this.gfx = gfx;
        this.upd = upd;
    }

    screenResize(width: number, height: number) {
        this.screenSize.set(width, height)
    }

    setScene(scene: Scene) {
        this.scene = scene
        return this
    }

    advanceTime(time: Time, ctx: CanvasRenderingContext2D) {
        this.upd.advanceTime(this, time)
        this.gfx.render(this, ctx)
    }
}