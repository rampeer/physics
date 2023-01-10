System.register(["./world.js", "./vec2.js", "./controls.js", "./phx.js", "./gfx_geom.js", "./phx_geom.js", "./world_geom.js"], function (exports_1, context_1) {
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
    var world_js_1, vec2_js_1, controls_js_1, phx_js_1, gfx_geom_js_1, phx_geom_js_1, world_geom_js_1, PlayerControlAdapter, VelocityControls, PlayerPaddle, paddleWidth, paddleHeight, paddle;
    var __moduleName = context_1 && context_1.id;
    function debugRedraw(ctx) {
        ctx.font = "20px Courier New";
        ctx.fillStyle = "black";
        var pos = paddle.adapter.desiredPos;
        ctx.fillText("Goal: " + pos.toString(3), 100, 100);
        ctx.fillText(paddle.adapter.desiredNormal.toString(3), 200, 130);
        ctx.fillText("Control: " + controls_js_1.controlPosition.toString(3), 100, 160);
        ctx.fillText(controls_js_1.controlDirection.toString(3), 200, 190);
        ctx.fillText("Angle:" + paddle.adapter.desiredAngle().toString(), 100, 220);
        ctx.save();
        ctx.beginPath();
        ctx.strokeStyle = "green";
        ctx.lineWidth = 3;
        ctx.moveTo(pos.x, pos.y);
        ctx.lineTo(Math.cos(paddle.adapter.desiredAngle()) * 10 + pos.x, Math.sin(paddle.adapter.desiredAngle()) * 10 + pos.y);
        ctx.stroke();
        ctx.closePath();
        ctx.restore();
        ctx.beginPath();
        ctx.strokeStyle = "red";
        ctx.lineWidth = 1;
        ctx.ellipse(pos.x, pos.y, 5.0, 5.0, 0.0, 0.0, Math.PI * 2);
        ctx.fill();
        ctx.ellipse(pos.x + controls_js_1.controlDirection.x, pos.y + controls_js_1.controlDirection.y, 5.0, 5.0, 0.0, 0.0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
    }
    exports_1("debugRedraw", debugRedraw);
    return {
        setters: [
            function (world_js_1_1) {
                world_js_1 = world_js_1_1;
            },
            function (vec2_js_1_1) {
                vec2_js_1 = vec2_js_1_1;
            },
            function (controls_js_1_1) {
                controls_js_1 = controls_js_1_1;
            },
            function (phx_js_1_1) {
                phx_js_1 = phx_js_1_1;
            },
            function (gfx_geom_js_1_1) {
                gfx_geom_js_1 = gfx_geom_js_1_1;
            },
            function (phx_geom_js_1_1) {
                phx_geom_js_1 = phx_geom_js_1_1;
            },
            function (world_geom_js_1_1) {
                world_geom_js_1 = world_geom_js_1_1;
            }
        ],
        execute: function () {
            PlayerControlAdapter = (function (_super) {
                __extends(PlayerControlAdapter, _super);
                function PlayerControlAdapter() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.desiredPos = vec2_js_1.vec2(0.0, 0.0);
                    _this.desiredNormal = vec2_js_1.vec2(1.0, 0.0);
                    _this.playAreaCenter = vec2_js_1.vec2(500.0, 700.0);
                    _this.playAreaExtents = vec2_js_1.vec2(500.0, 400.0);
                    _this.angle = 0.0;
                    return _this;
                }
                PlayerControlAdapter.prototype.desiredAngle = function () {
                    return this.angle;
                };
                PlayerControlAdapter.prototype.update = function (world, scene, t) {
                    if (world === void 0) { world = null; }
                    if (scene === void 0) { scene = null; }
                    this.desiredPos.x = this.playAreaCenter.x + controls_js_1.controlPosition.x * this.playAreaExtents.x;
                    this.desiredPos.y = this.playAreaCenter.y + controls_js_1.controlPosition.y * this.playAreaExtents.y;
                    var l = controls_js_1.controlDirection.length() + 1e-6;
                    this.desiredNormal.x = controls_js_1.controlDirection.x / l;
                    this.desiredNormal.y = controls_js_1.controlDirection.y / l;
                    if (Math.abs(this.desiredNormal.x) > Math.abs(this.desiredNormal.y)) {
                        var acos = Math.acos(this.desiredNormal.x);
                        this.angle = this.desiredNormal.y > 0 ? acos : -acos;
                    }
                    else {
                        var asin = Math.asin(this.desiredNormal.y);
                        this.angle = this.desiredNormal.x > 0 ? asin : Math.PI - asin;
                    }
                    this.angle += Math.PI / 2;
                };
                return PlayerControlAdapter;
            }(upd_js_1.UpdateFunction));
            VelocityControls = (function (_super) {
                __extends(VelocityControls, _super);
                function VelocityControls(obj, adapter) {
                    var _this = _super.call(this) || this;
                    _this.maxForce = 1000;
                    _this.maxVelocity = 1000;
                    _this.obj = obj;
                    _this.adapter = adapter;
                    return _this;
                }
                VelocityControls.prototype.update = function (world, t) {
                    var state = this.obj.state;
                    var dist = this.adapter.desiredPos.minus(state.pos);
                    var len = dist.length();
                    state.vel = dist.norm().mul(Math.min(this.maxVelocity, len / phx_js_1.PhysicsSettings.maxStepTime));
                    state.ang = this.adapter.desiredAngle();
                };
                return VelocityControls;
            }(upd_js_1.UpdateFunction));
            exports_1("VelocityControls", VelocityControls);
            PlayerPaddle = (function (_super) {
                __extends(PlayerPaddle, _super);
                function PlayerPaddle(pos) {
                    var _this = _super.call(this) || this;
                    paddle = _this;
                    _this.gfx = new gfx_geom_js_1.RectDrawer(pos, paddleWidth, paddleHeight, 0.0, "cyan");
                    _this.pfx = phx_geom_js_1.solidRect(pos, paddleWidth, paddleHeight, 0.0, "fixed");
                    _this.upd = new world_geom_js_1.PositionUpdater(_this.pfx, _this.gfx);
                    return _this;
                }
                return PlayerPaddle;
            }(world_js_1.GameObject));
            exports_1("PlayerPaddle", PlayerPaddle);
            paddleWidth = 0.16;
            paddleHeight = 0.02;
        }
    };
});
//# sourceMappingURL=world_player.js.map