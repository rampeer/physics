System.register(["./vec2.js", "./world.js", "./phx.js", "./gfx_geom.js", "./shapes.js"], function (exports_1, context_1) {
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
    var vec2_js_1, world_js_1, phx_js_1, gfx_geom_js_1, shapes_js_1, Level, Level1;
    var __moduleName = context_1 && context_1.id;
    function SampleObj() {
        var obj = new world_js_1.GameObject();
        var con = new world_js_1.GameObjectContainer();
        var tf = con.localTransform = new shapes_js_1.BasicTransform();
        obj.onRedraw(gfx_geom_js_1.CircleDrawer(function () {
            return { radius: 0.1, x: 0.3, y: 0.3 };
        })).onUpdate(function (world, t) {
            tf.setAngle(t.ts).setPos(0.1, 0.1);
        });
        con.add(obj);
        return con;
    }
    return {
        setters: [
            function (vec2_js_1_1) {
                vec2_js_1 = vec2_js_1_1;
            },
            function (world_js_1_1) {
                world_js_1 = world_js_1_1;
            },
            function (phx_js_1_1) {
                phx_js_1 = phx_js_1_1;
            },
            function (gfx_geom_js_1_1) {
                gfx_geom_js_1 = gfx_geom_js_1_1;
            },
            function (shapes_js_1_1) {
                shapes_js_1 = shapes_js_1_1;
            }
        ],
        execute: function () {
            Level = (function (_super) {
                __extends(Level, _super);
                function Level(bounds, gravity) {
                    if (gravity === void 0) { gravity = phx_js_1.DEFAULT_GRAVITY; }
                    var _this = _super.call(this) || this;
                    _this.localTransform = new shapes_js_1.BasicTransform();
                    var p = new phx_js_1.PhysicsEngine();
                    _this.physics = p;
                    _this.add(new world_js_1.GameObject().onUpdate(function (world, t) {
                    }));
                    _this.bounds = bounds;
                    return _this;
                }
                return Level;
            }(world_js_1.GameObjectContainer));
            exports_1("Level", Level);
            ;
            Level1 = (function (_super) {
                __extends(Level1, _super);
                function Level1() {
                    var _this = _super.call(this, new vec2_js_1.Region(0.0, 0.0, 2.0, 2.0)) || this;
                    _this.add(SampleObj());
                    return _this;
                }
                return Level1;
            }(Level));
            exports_1("Level1", Level1);
        }
    };
});
//# sourceMappingURL=level1.js.map