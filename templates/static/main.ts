import {Time, World} from "./world.js";
import {initControls} from "./controls.js";
import {LevelGameplayScene} from "./world_scene.js";

export let world: World;

export function mainInit(canvas: HTMLCanvasElement) {
    world = new World().setScene(
        new LevelGameplayScene(
            null
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
