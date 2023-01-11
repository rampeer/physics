import {Scene, Time, World, TOnUpdate, GameObject} from "./world.js";
import {Level} from "./level1.js";
import {Background, Drawing, Transformation} from "./gfx.js";
import {RectDrawer} from "./gfx_geom.js";
import {RectShape} from "./shapes.js";
import {vec2} from "./vec2.js";

export class LevelGameplayScene extends Scene {
    public level: Level;
    private transform: Transformation;

    constructor(level: Level) {
        super();
        this.level = level;
        this.transform = new Transformation();
        let rect = new RectShape(vec2(100, 100), 75, 50, 0.0);
        this.add(
            Background(),
            RectDrawer(rect, "black", "red", 1),
            new GameObject().onUpdate(((world, t) => {
                rect.pos.x = Math.cos(t.ts / 2) * 100 + 200;
                rect.pos.y = Math.sin(t.ts / 2) * 100 + 200;
            }))
        );
    }

    redraw = (world: World, drawing: Drawing, time: Time): void => {
        this.transform.ctx = drawing.ctx;
        this.children
            .filter(x => x.redraw !== null)
            .forEach(x => x.redraw(world, this.transform, time))
    }
}