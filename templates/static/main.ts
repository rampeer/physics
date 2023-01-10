import {DrawEngine} from "./gfx.js";
import {World} from "./world.js";
import {Time, UpdateLogicEngine} from "./upd.js";
import {initControls} from "./controls.js";
import {Level1} from "./level1.js";
import {LevelGameplayScene} from "./world_scene.js";

export let world: World = new World(
    new DrawEngine(),
    new UpdateLogicEngine()
).setScene(
    new LevelGameplayScene(
        new Level1()
    )
);


export function mainInit(canvas: HTMLCanvasElement) {
    let ctx = canvas.getContext('2d')
    let time = new Time(null, null);

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
        if (world) {
            world.screenResize(window.innerWidth, window.innerHeight)
        }
    };
    onCanvasResize();
    window.requestAnimationFrame(onAnimationFrame);
    window.addEventListener('resize', onCanvasResize, false);
    window.addEventListener("orientationchange", onCanvasResize, false);
}
