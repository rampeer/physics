System.register(["./world_geom.js", "./vec2.js", "./container.js", "./world_player.js"], function (exports_1, context_1) {
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
    var world_geom_js_1, vec2_js_1, container_js_1, world_player_js_1, Level, Level1;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (world_geom_js_1_1) {
                world_geom_js_1 = world_geom_js_1_1;
            },
            function (vec2_js_1_1) {
                vec2_js_1 = vec2_js_1_1;
            },
            function (container_js_1_1) {
                container_js_1 = container_js_1_1;
            },
            function (world_player_js_1_1) {
                world_player_js_1 = world_player_js_1_1;
            }
        ],
        execute: function () {
            Level = (function (_super) {
                __extends(Level, _super);
                function Level(playerSpawn, arena, paddleArea, gravity) {
                    var _this = _super.call(this) || this;
                    _this.paddleSpawn = playerSpawn;
                    _this.paddleArea = paddleArea;
                    _this.arena = arena;
                    _this.gravity = gravity;
                    _this.add(new world_player_js_1.PlayerPaddle(vec2_js_1.vec2(playerSpawn.x, playerSpawn.y)));
                    return _this;
                }
                return Level;
            }(container_js_1.Composite));
            exports_1("Level", Level);
            ;
            Level1 = (function (_super) {
                __extends(Level1, _super);
                function Level1() {
                    var _this = _super.call(this, vec2_js_1.vec2(0.25, 0.01), new vec2_js_1.Region(0.0, 0.0, 2.0, 2.0), new vec2_js_1.Region(0.1, 1.9, 1.6, 1.9), 0.1) || this;
                    _this.add(new world_geom_js_1.Wall(vec2_js_1.vec2(0.0, 1.0), 0.1, 2.0, 0, "red"), new world_geom_js_1.Wall(vec2_js_1.vec2(2.0, 1.0), 0.1, 2.0, 0, "red"), new world_geom_js_1.Wall(vec2_js_1.vec2(1.5, 0.2), 1.0, 0.05, -0.1, "red"), new world_geom_js_1.Wall(vec2_js_1.vec2(0.5, 0.4), 1.0, 0.05, 0.1, "red"), new world_geom_js_1.Wall(vec2_js_1.vec2(1.5, 0.6), 1.0, 0.05, -0.1, "red"), new world_geom_js_1.Wall(vec2_js_1.vec2(0.5, 0.8), 1.0, 0.05, 0.1, "red"), new world_geom_js_1.Wall(vec2_js_1.vec2(1.0, 1.5), 2.0, 0.2, 0.0, "green"), new world_geom_js_1.TennisBall(vec2_js_1.vec2(1.75, 0.05)));
                    return _this;
                }
                return Level1;
            }(Level));
            exports_1("Level1", Level1);
        }
    };
});
//# sourceMappingURL=level1.js.map