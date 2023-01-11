import {Time, World} from "./world.js";
import {initControls} from "./controls.js";
import {LevelGameplayScene} from "./world_scene.js";
import {Level} from "./level1.js";
import {Region, vec2} from "./vec2.js";

export let world: World;


export class Level1 extends Level {
    constructor() {
        super(vec2(0.25, 0.01),
            new Region(0.0, 0.0, 2.0, 2.0),
            new Region(0.1, 1.9, 1.6, 1.9),
            0.1);
        // this.add(
        //     new Wall(vec2(0.0, 1.0), 0.1, 2.0, 0, "red"),
        //     new Wall(vec2(2.0, 1.0), 0.1, 2.0, 0, "red"),
        //     new Wall(vec2(1.5, 0.2), 1.0, 0.05, -0.1, "red"),
        //     new Wall(vec2(0.5, 0.4), 1.0, 0.05, 0.1, "red"),
        //     new Wall(vec2(1.5, 0.6), 1.0, 0.05, -0.1, "red"),
        //     new Wall(vec2(0.5, 0.8), 1.0, 0.05, 0.1, "red"),
        //     new Wall(vec2(1.0, 1.5), 2.0, 0.2, 0.0, "green"),
        //     new TennisBall(vec2(1.75, 0.05))
        // );
    }
}

export function mainInit(canvas: HTMLCanvasElement) {
    world = new World().setScene(
        new LevelGameplayScene(
            new Level1()
        )
    );
    let ctx = canvas.getContext('2d')
    let time = Time(null, null);

    initControls(canvas);

    function onAnimationFrame(timestamp: number) {
        if (time.ts == null) time.ts = timestamp / 1000.0;
        time.dt = (timestamp - time.ts) / 1000;
        time.ts = timestamp / 1000;
        world.advanceTime(time, ctx)
        window.requestAnimationFrame(onAnimationFrame);
    }

    let onCanvasResize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        if (world && world.scene) {
            world.scene.screenResize(window.innerWidth, window.innerHeight)
        }
    };
    onCanvasResize();
    window.requestAnimationFrame(onAnimationFrame);
    window.addEventListener('resize', onCanvasResize, false);
    window.addEventListener("orientationchange", onCanvasResize, false);
}
