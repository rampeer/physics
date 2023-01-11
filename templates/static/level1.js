System.register(["./world.js"], function (exports_1, context_1) {
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
    var world_js_1, Level;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (world_js_1_1) {
                world_js_1 = world_js_1_1;
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
                    return _this;
                }
                return Level;
            }(world_js_1.GameObject));
            exports_1("Level", Level);
            ;
        }
    };
});
//# sourceMappingURL=level1.js.map