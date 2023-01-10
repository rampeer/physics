System.register(["./world.js", "./vec2"], function (exports_1, context_1) {
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
    var world_js_1, vec2_1, LevelGameplayScene;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (world_js_1_1) {
                world_js_1 = world_js_1_1;
            },
            function (vec2_1_1) {
                vec2_1 = vec2_1_1;
            }
        ],
        execute: function () {
            LevelGameplayScene = (function (_super) {
                __extends(LevelGameplayScene, _super);
                function LevelGameplayScene(level) {
                    var _this = _super.call(this) || this;
                    _this.levelCoordinatesTransform = function (ctx) {
                        ctx.resetTransform();
                        ctx.translate(_this.lvlScreenOffset.x, _this.lvlScreenOffset.y);
                        ctx.scale(_this.lvlScreenScale, _this.lvlScreenScale);
                    };
                    _this.level = level;
                    return _this;
                }
                LevelGameplayScene.prototype.tx = function (x) {
                    return x * drawRoot.levelTransformScale + drawRoot.levelTransformOffset.x;
                };
                LevelGameplayScene.prototype.ty = function (y) {
                    return y * drawRoot.levelTransformScale + drawRoot.levelTransformOffset.y;
                };
                LevelGameplayScene.prototype.ts = function (s) {
                    return s * drawRoot.levelTransformScale;
                };
                LevelGameplayScene.prototype.computeLevelDrawTransform = function (world) {
                    var scale = Math.min(world.screenSize.x / this.level.arena.width(), world.screenSize.y / this.level.arena.height());
                    this.lvlScreenOffset = vec2_1.vec2((world.screenSize.x - scale * this.level.arena.width()) / 2, (world.screenSize.y - scale * this.level.arena.height()) / 2);
                    this.lvlScreenScale = scale;
                };
                return LevelGameplayScene;
            }(world_js_1.Scene));
            exports_1("LevelGameplayScene", LevelGameplayScene);
        }
    };
});
//# sourceMappingURL=world_scene.js.map