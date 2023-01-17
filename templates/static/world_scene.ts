import {Scene, Time, World, TOnUpdate, GameObject} from "./world.js";
import {Level} from "./level1.js";
import {Background, DrawUtils} from "./gfx.js";
import {PolyDrawer} from "./gfx_geom.js";
import {ConvexPolyShape, TransformMatrix} from "./shapes.js";
import {vec2} from "./vec2.js";
import {FPSCounter, Tree} from "./g_ui.js";

export class MainScene extends Scene {
    rescaleLevelTransform = () => {
        let scale = Math.min(
            this.screenSize.x / this.level.bounds.width(),
            this.screenSize.y / this.level.bounds.height()
        );
        this.level.localTransform.setPos({
            x: (this.screenSize.x - scale * this.level.bounds.width()) / 2,
            y: (this.screenSize.y - scale * this.level.bounds.height()) / 2
        }).setScale(scale)
    }

    private level: Level;

    constructor(level: Level) {
        super();
        this.level = level;
        // let r = rect(75, 50, vec2(100, 100), 0.0);
        // new GameObject()
        //     .onUpdate((world, t) => {
        //         r.pos.x = Math.cos(t.ts / 2) * 100 + 200;
        //         r.pos.y = Math.sin(t.ts / 2) * 100 + 200;
        //     })
        //     .onRedraw(
        //         PolyDrawer(r, "black", "red", 1)
        //     )
        this.add(
            Background(),
            new GameObject().onUpdate(this.rescaleLevelTransform),
            level,
            Tree(),
            FPSCounter()
        );
    }
}