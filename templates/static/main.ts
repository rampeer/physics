import {Time, World} from "./world.js";
import {initControls} from "./controls.js";
import {MainScene} from "./world_scene.js";
import {Level1} from "./level1.js";

export let world: World;


export function mainInit(
    container: HTMLElement,
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D
) {
    // World init
    // @ts-ignore
    window["world"] = world = (
        new World(container, ctx).setScene(
            new MainScene(new Level1())
        )
    );
    initControls(canvas);

    // Resize

    let onCanvasResize = () => {
        let r = world.getSize()
        canvas.width = r.x;
        canvas.height = r.y;
    };
    onCanvasResize();
    window.addEventListener('resize', onCanvasResize, false);
    window.addEventListener("orientationchange", onCanvasResize, false);

    // Update-Redraw
    let time = Time(null, null);

    function onAnimationFrame(timestamp: number) {
        if (time.ts === null) time.ts = timestamp / 1000.0;
        time.dt = (timestamp - time.ts) / 1000;
        time.ts = timestamp / 1000;
        world.frame(time)
        window.requestAnimationFrame(onAnimationFrame);
    }

    window.requestAnimationFrame(onAnimationFrame);
}
