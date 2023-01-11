System.register(["./world.js", "./gfx.js", "./gfx_geom.js", "./shapes.js", "./vec2.js"], function (exports_1, context_1) {
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
    var world_js_1, gfx_js_1, gfx_geom_js_1, shapes_js_1, vec2_js_1, LevelGameplayScene;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (world_js_1_1) {
                world_js_1 = world_js_1_1;
            },
            function (gfx_js_1_1) {
                gfx_js_1 = gfx_js_1_1;
            },
            function (gfx_geom_js_1_1) {
                gfx_geom_js_1 = gfx_geom_js_1_1;
            },
            function (shapes_js_1_1) {
                shapes_js_1 = shapes_js_1_1;
            },
            function (vec2_js_1_1) {
                vec2_js_1 = vec2_js_1_1;
            }
        ],
        execute: function () {
            LevelGameplayScene = (function (_super) {
                __extends(LevelGameplayScene, _super);
                function LevelGameplayScene(level) {
                    var _this = _super.call(this) || this;
                    _this.redraw = function (world, drawing, time) {
                        _this.transform.ctx = drawing.ctx;
                        _this.children
                            .filter(function (x) { return x.redraw !== null; })
                            .forEach(function (x) { return x.redraw(world, _this.transform, time); });
                    };
                    _this.level = level;
                    _this.transform = new gfx_js_1.Transformation();
                    var rect = new shapes_js_1.RectShape(vec2_js_1.vec2(100, 100), 75, 50, 0.0);
                    _this.add(gfx_js_1.Background(), gfx_geom_js_1.RectDrawer(rect, "black", "red", 1), new world_js_1.GameObject().onUpdate((function (world, t) {
                        rect.pos.x = Math.cos(t.ts / 2) * 100 + 200;
                        rect.pos.y = Math.sin(t.ts / 2) * 100 + 200;
                    })));
                    return _this;
                }
                return LevelGameplayScene;
            }(world_js_1.Scene));
            exports_1("LevelGameplayScene", LevelGameplayScene);
        }
    };
});
//# sourceMappingURL=world_scene.js.map