import {Time, World} from "./world.js";
import {initControls} from "./controls.js";
import {MainScene} from "./world_scene.js";
import {Level, Level1} from "./level1.js";
import {Region, vec2} from "./vec2.js";

export let world: World;


export function mainInit(canvas: HTMLCanvasElement) {
    world = new World(canvas.getContext('2d')).setScene(
        new MainScene(
            new Level1()
        )
    );
    let time = Time(null, null);

    initControls(canvas);

    function onAnimationFrame(timestamp: number) {
        if (time.ts === null) time.ts = timestamp / 1000.0;
        time.dt = (timestamp - time.ts) / 1000;
        time.ts = timestamp / 1000;
        world.frame(time)
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
    window["world"] = world;
    window.requestAnimationFrame(onAnimationFrame);
    window.addEventListener('resize', onCanvasResize, false);
    window.addEventListener("orientationchange", onCanvasResize, false);
}
