System.register(["./world.js", "./controls.js", "./world_scene.js", "./level1.js", "./vec2.js"], function (exports_1, context_1) {
    "use strict";
    var __extends = (this && this.__extends) || (function () {
        var extendStatics = function (d, b) {
            extendStatics = Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
                function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
            return extendStatics(d, b);
        };
        return function (d, b) {
            if (typeof b !== "function" && b !== null)
                throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();
    var world_js_1, controls_js_1, world_scene_js_1, level1_js_1, vec2_js_1, world, Level1;
    var __moduleName = context_1 && context_1.id;
    function mainInit(canvas) {
        exports_1("world", world = new world_js_1.World().setScene(new world_scene_js_1.LevelGameplayScene(new Level1())));
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
            },
            function (level1_js_1_1) {
                level1_js_1 = level1_js_1_1;
            },
            function (vec2_js_1_1) {
                vec2_js_1 = vec2_js_1_1;
            }
        ],
        execute: function () {
            Level1 = (function (_super) {
                __extends(Level1, _super);
                function Level1() {
                    return _super.call(this, vec2_js_1.vec2(0.25, 0.01), new vec2_js_1.Region(0.0, 0.0, 2.0, 2.0), new vec2_js_1.Region(0.1, 1.9, 1.6, 1.9), 0.1) || this;
                }
                return Level1;
            }(level1_js_1.Level));
            exports_1("Level1", Level1);
        }
    };
});
//# sourceMappingURL=main.js.map