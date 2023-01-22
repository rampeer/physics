System.register(["./world.js", "./gfx.js", "./g_ui.js"], function (exports_1, context_1) {
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
    var world_js_1, gfx_js_1, g_ui_js_1, MainScene;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (world_js_1_1) {
                world_js_1 = world_js_1_1;
            },
            function (gfx_js_1_1) {
                gfx_js_1 = gfx_js_1_1;
            },
            function (g_ui_js_1_1) {
                g_ui_js_1 = g_ui_js_1_1;
            }
        ],
        execute: function () {
            MainScene = (function (_super) {
                __extends(MainScene, _super);
                function MainScene(level) {
                    var _this = _super.call(this) || this;
                    _this.name = "Gameplay Scene";
                    _this.rescaleLevelTransform = function (world) {
                        var r = world.getSize(), b = _this.level.bounds;
                        var scale = Math.min(r.x / b.width(), r.y / b.height());
                        _this.level.localTransform.setPos({
                            x: (r.x - scale * b.width()) / 2,
                            y: (r.y - scale * b.height()) / 2
                        }).setScale(scale);
                    };
                    _this.level = level;
                    _this.add(gfx_js_1.Background(), new world_js_1.GameObject().onUpdate(_this.rescaleLevelTransform).named("Update level transform"), level, g_ui_js_1.Tree(), g_ui_js_1.FPSCounter());
                    return _this;
                }
                return MainScene;
            }(world_js_1.Scene));
            exports_1("MainScene", MainScene);
        }
    };
});
//# sourceMappingURL=world_scene.js.map