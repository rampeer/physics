System.register(["./vec2.js", "./phx_geom.js", "./gfx_geom.js", "./world.js", "./main.js"], function (exports_1, context_1) {
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
    var vec2_js_1, phx_geom_js_1, gfx_geom_js_1, world_js_1, main_js_1, PositionUpdater, LambdaUpdater, GameBall, TennisBall, Wall;
    var __moduleName = context_1 && context_1.id;
    function updater(f) {
        return new LambdaUpdater(f);
    }
    exports_1("updater", updater);
    return {
        setters: [
            function (vec2_js_1_1) {
                vec2_js_1 = vec2_js_1_1;
            },
            function (phx_geom_js_1_1) {
                phx_geom_js_1 = phx_geom_js_1_1;
            },
            function (gfx_geom_js_1_1) {
                gfx_geom_js_1 = gfx_geom_js_1_1;
            },
            function (world_js_1_1) {
                world_js_1 = world_js_1_1;
            },
            function (main_js_1_1) {
                main_js_1 = main_js_1_1;
            }
        ],
        execute: function () {
            PositionUpdater = (function (_super) {
                __extends(PositionUpdater, _super);
                function PositionUpdater(ph, gfx) {
                    var _this = _super.call(this) || this;
                    _this.ph = ph;
                    _this.gfx = gfx;
                    return _this;
                }
                PositionUpdater.prototype.update = function (world, scene, t) {
                    if (world === void 0) { world = null; }
                    if (scene === void 0) { scene = null; }
                    if (this.gfx instanceof gfx_geom_js_1.CircleDrawer) {
                        this.ph.state.pos.copyTo(this.gfx.pos);
                    }
                    else if (this.gfx instanceof gfx_geom_js_1.RectDrawer) {
                        this.ph.state.pos.copyTo(this.gfx.pos);
                        this.gfx.angle = this.ph.state.ang;
                    }
                    else {
                        throw Error();
                    }
                };
                return PositionUpdater;
            }(upd_js_1.UpdateFunction));
            exports_1("PositionUpdater", PositionUpdater);
            LambdaUpdater = (function (_super) {
                __extends(LambdaUpdater, _super);
                function LambdaUpdater(fn) {
                    var _this = _super.call(this) || this;
                    _this.fn = fn;
                    return _this;
                }
                LambdaUpdater.prototype.update = function (world, scene, t) {
                    if (world === void 0) { world = null; }
                    if (scene === void 0) { scene = null; }
                    this.fn(t);
                };
                return LambdaUpdater;
            }(upd_js_1.UpdateFunction));
            GameBall = (function (_super) {
                __extends(GameBall, _super);
                function GameBall(center, radius, angle, color) {
                    var _this = _super.call(this) || this;
                    _this.phys = phx_geom_js_1.solidCircle(center, radius, angle, 1.0);
                    _this.gfx = new gfx_geom_js_1.CircleDrawer(center, color, radius);
                    _this.upd = new PositionUpdater(_this.phys, _this.gfx);
                    return _this;
                }
                return GameBall;
            }(world_js_1.GameObject));
            exports_1("GameBall", GameBall);
            TennisBall = (function (_super) {
                __extends(TennisBall, _super);
                function TennisBall(pos) {
                    var _this = _super.call(this) || this;
                    _this.ballRadius = 0.04;
                    _this.outlineThickness = 1.0;
                    _this.outlineColor = "black";
                    _this.innerGradientRadius = _this.ballRadius * 0.2;
                    _this.innerGradientColor = "#FEE581";
                    _this.outerGradientRadius = _this.ballRadius * 0.8;
                    _this.outerGradientColor = "#FA9D1B";
                    _this.gradientOffsetX = _this.ballRadius * 0.4;
                    _this.gradientOffsetY = _this.ballRadius * -0.4;
                    _this.gfx = {
                        order: 0,
                        redraw: function (engine, ctx) {
                            engine.levelCoordinatesTransform();
                            var obj = self.phys.state;
                            var gradient = ctx.createRadialGradient(main_js_1.tx(obj.pos.x + self.gradientOffsetX), main_js_1.ty(obj.pos.y + self.gradientOffsetY), main_js_1.ts(self.innerGradientRadius), main_js_1.tx(obj.pos.x + self.gradientOffsetX), main_js_1.ty(obj.pos.y + self.gradientOffsetY), main_js_1.ts(self.outerGradientRadius));
                            gradient.addColorStop(0.0, self.innerGradientColor);
                            gradient.addColorStop(1.0, self.outerGradientColor);
                            ctx.fillStyle = gradient;
                            ctx.beginPath();
                            ctx.ellipse(obj.pos.x, obj.pos.y, self.ballRadius, self.ballRadius, 0.0, 0.0, Math.PI * 2);
                            engine.screenCoordinatesTransform();
                            ctx.strokeStyle = self.outlineColor;
                            ctx.lineWidth = self.outlineThickness;
                            ctx.fill();
                            ctx.stroke();
                        }
                    };
                    _this.phys = phx_geom_js_1.solidCircle(pos, _this.ballRadius, 0.0, 1.0);
                    _this.phys.state.pos = pos.clone();
                    _this.phys.state.vel = vec2_js_1.vec2(0.0, 0.0);
                    _this.phys.next_state.pos = pos.clone();
                    _this.phys.next_state.vel = vec2_js_1.vec2(0.0, 0.0);
                    _this.phys.material.bounceK = 0.5;
                    return _this;
                }
                TennisBall.prototype.setActive = function (active) {
                    this.phys.active = active;
                };
                return TennisBall;
            }(world_js_1.GameObject));
            exports_1("TennisBall", TennisBall);
            Wall = (function (_super) {
                __extends(Wall, _super);
                function Wall(center, width, height, angle, color) {
                    if (angle === void 0) { angle = 0.0; }
                    var _this = _super.call(this) || this;
                    _this.phys = phx_geom_js_1.solidRect(center, width, height, angle);
                    _this.gfx = gfx_geom_js_1.RectDrawer(center, width, height, angle, color, color);
                    _this.upd = new PositionUpdater(_this.phys, _this.gfx);
                    return _this;
                }
                return Wall;
            }(world_js_1.GameObject));
            exports_1("Wall", Wall);
        }
    };
});
//# sourceMappingURL=world_geom.js.map