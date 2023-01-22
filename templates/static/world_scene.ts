import {Scene, Time, World, TOnUpdate, GameObject} from "./world.js";
import {Level} from "./level1.js";
import {Background, DrawUtils} from "./gfx.js";
import {ConvexShape, TransformMatrix} from "./shapes.js";
import {vec2} from "./vec2.js";
import {FPSCounter, Tree} from "./g_ui.js";

export class MainScene extends Scene {
    name = "Gameplay Scene"
    rescaleLevelTransform: TOnUpdate = (world) => {
        let r = world.getSize(), b = this.level.bounds
        let scale = Math.min(r.x / b.width(), r.y / b.height());
        this.level.localTransform.setPos({
            x: (r.x - scale * b.width()) / 2,
            y: (r.y - scale * b.height()) / 2
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
            new GameObject().onUpdate(this.rescaleLevelTransform).named("Update level transform"),
            level,
            Tree(),
            FPSCounter()
        );
    }
}