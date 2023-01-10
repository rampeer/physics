System.register(["./gfx.js", "./world.js", "./upd.js", "./controls.js", "./level1.js", "./world_scene"], function (exports_1, context_1) {
    "use strict";
    var gfx_js_1, world_js_1, upd_js_1, controls_js_1, level1_js_1, world_scene_1, world, time, canvas, ctx, INIT_SCENE;
    var __moduleName = context_1 && context_1.id;
    function mainInit(screen) {
        exports_1("world", world = new world_js_1.World(new gfx_js_1.DrawEngine(), new upd_js_1.UpdateLogicEngine()).setScene(INIT_SCENE));
        canvas = screen;
        ctx = screen.getContext('2d');
        controls_js_1.initControls(screen);
        function onAnimationFrame(timestamp) {
            if (time.ts == null)
                time.ts = timestamp / 1000.0;
            time.dt = (timestamp - time.ts) / 1000;
            time.ts = timestamp / 1000;
            world.advance(time, ctx);
            window.requestAnimationFrame(onAnimationFrame);
        }
        var onCanvasResize = function () {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            if (world) {
                world.screenResize(window.innerWidth, window.innerHeight);
            }
        };
        onCanvasResize();
        window.requestAnimationFrame(onAnimationFrame);
        window.addEventListener('resize', onCanvasResize, false);
        window.addEventListener("orientationchange", onCanvasResize, false);
    }
    exports_1("mainInit", mainInit);
    return {
        setters: [
            function (gfx_js_1_1) {
                gfx_js_1 = gfx_js_1_1;
            },
            function (world_js_1_1) {
                world_js_1 = world_js_1_1;
            },
            function (upd_js_1_1) {
                upd_js_1 = upd_js_1_1;
            },
            function (controls_js_1_1) {
                controls_js_1 = controls_js_1_1;
            },
            function (level1_js_1_1) {
                level1_js_1 = level1_js_1_1;
            },
            function (world_scene_1_1) {
                world_scene_1 = world_scene_1_1;
            }
        ],
        execute: function () {
            time = new upd_js_1.Time(null, null);
            INIT_SCENE = new world_scene_1.LevelGameplayScene(new level1_js_1.Level1());
        }
    };
});
//# sourceMappingURL=main.js.map