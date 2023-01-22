System.register(["./vec2.js", "./world.js", "./phx_geom"], function (exports_1, context_1) {
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
    var vec2_js_1, world_js_1, phx_geom_1, TennisBall, Wall;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (vec2_js_1_1) {
                vec2_js_1 = vec2_js_1_1;
            },
            function (world_js_1_1) {
                world_js_1 = world_js_1_1;
            },
            function (phx_geom_1_1) {
                phx_geom_1 = phx_geom_1_1;
            }
        ],
        execute: function () {
            TennisBall = (function (_super) {
                __extends(TennisBall, _super);
                function TennisBall(pos) {
                    var _this = _super.call(this) || this;
                    _this.ballRadius = 0.04;
                    _this.outlineWidth = 1.0;
                    _this.outlineColor = "black";
                    _this.innerGradientRadius = _this.ballRadius * 0.2;
                    _this.innerGradientColor = "#FEE581";
                    _this.outerGradientRadius = _this.ballRadius * 0.8;
                    _this.outerGradientColor = "#FA9D1B";
                    _this.gradientOffset = vec2_js_1.vec2(_this.ballRadius * 0.4, _this.ballRadius * -0.4);
                    _this.redraw = function (world, drawing, time) {
                        var _a = _this.body.getState(), pos = _a.pos, angle = _a.angle;
                        var grad = drawing.newRadialGrad(pos.plus(_this.gradientOffset), _this.innerGradientRadius, pos.plus(_this.gradientOffset), _this.outerGradientRadius);
                        grad.addColorStop(0.0, _this.innerGradientColor);
                        grad.addColorStop(1.0, _this.outerGradientColor);
                        drawing.begin()
                            .ellipse(pos, _this.ballRadius, _this.ballRadius, angle)
                            .fill({ fillColor: grad })
                            .stroke({ strokeColor: _this.outlineColor, lineWidth: _this.outlineWidth });
                    };
                    _this.body = new phx_geom_1.SolidBody();
                    return _this;
                }
                return TennisBall;
            }(world_js_1.GameObject));
            exports_1("TennisBall", TennisBall);
            Wall = (function (_super) {
                __extends(Wall, _super);
                function Wall(center, width, height, angle, color) {
                    if (angle === void 0) { angle = 0.0; }
                    var _this = _super.call(this) || this;
                    _this.redraw = function (world, draw, time) {
                        var _a = _this.body.getState(), pos = _a.pos, angle = _a.angle;
                    };
                    _this.body = new phx_geom_1.SolidBody();
                    _this.width = width;
                    _this.height = height;
                    return _this;
                }
                return Wall;
            }(world_js_1.GameObject));
            exports_1("Wall", Wall);
        }
    };
});
//# sourceMappingURL=world_geom.js.map