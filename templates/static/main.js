System.register(["./world.js", "./controls.js", "./world_scene.js", "./level1.js"], function (exports_1, context_1) {
    "use strict";
    var world_js_1, controls_js_1, world_scene_js_1, level1_js_1, world;
    var __moduleName = context_1 && context_1.id;
    function mainInit(container, canvas, ctx) {
        exports_1("world", world = new world_js_1.World(container, ctx).setScene(new world_scene_js_1.MainScene(new level1_js_1.Level1())));
        var time = world_js_1.Time(null, null);
        controls_js_1.initControls(canvas);
        function onAnimationFrame(timestamp) {
            if (time.ts === null)
                time.ts = timestamp / 1000.0;
            time.dt = (timestamp - time.ts) / 1000;
            time.ts = timestamp / 1000;
            world.frame(time);
            window.requestAnimationFrame(onAnimationFrame);
        }
        var onCanvasResize = function () {
            var r = world.getSize();
            canvas.width = r.x;
            canvas.height = r.y;
            if (world && world.scene) {
                console.log(r.x, r.y);
                world.scene.screenResize(r.x, r.y);
            }
        };
        onCanvasResize();
        window["world"] = world;
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
            },
            function (level1_js_1_1) {
                level1_js_1 = level1_js_1_1;
            }
        ],
        execute: function () {
        }
    };
});
//# sourceMappingURL=main.js.map