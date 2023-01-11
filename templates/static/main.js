System.register(["./world.js", "./controls.js", "./world_scene.js"], function (exports_1, context_1) {
    "use strict";
    var world_js_1, controls_js_1, world_scene_js_1, world;
    var __moduleName = context_1 && context_1.id;
    function mainInit(canvas) {
        exports_1("world", world = new world_js_1.World().setScene(new world_scene_js_1.LevelGameplayScene(null)));
        var ctx = canvas.getContext('2d');
        var time = world_js_1.Time(null, null);
        controls_js_1.initControls(canvas);
        function onAnimationFrame(timestamp) {
            if (time.ts == null)
                time.ts = timestamp / 1000.0;
            time.dt = (timestamp - time.ts) / 1000;
            time.ts = timestamp / 1000;
            world.advanceTime(time, ctx);
            window.requestAnimationFrame(onAnimationFrame);
        }
        var onCanvasResize = function () {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            if (world && world.scene) {
                world.scene.screenResize(window.innerWidth, window.innerHeight);
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
            function (world_js_1_1) {
                world_js_1 = world_js_1_1;
            },
            function (controls_js_1_1) {
                controls_js_1 = controls_js_1_1;
            },
            function (world_scene_js_1_1) {
                world_scene_js_1 = world_scene_js_1_1;
            }
        ],
        execute: function () {
        }
    };
});
//# sourceMappingURL=main.js.map