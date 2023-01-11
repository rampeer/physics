System.register(["./world.js", "./vec2.js"], function (exports_1, context_1) {
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
    var world_js_1, vec2_js_1, Background, Drawing, Transformation;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (world_js_1_1) {
                world_js_1 = world_js_1_1;
            },
            function (vec2_js_1_1) {
                vec2_js_1 = vec2_js_1_1;
            }
        ],
        execute: function () {
            exports_1("Background", Background = function (fillStyle) {
                if (fillStyle === void 0) { fillStyle = 'white'; }
                return new world_js_1.GameObject()
                    .onRedraw(function (world, drawing, time) {
                    drawing
                        .begin()
                        .rect({
                        x: world.scene.screenSize.x / 2,
                        y: world.scene.screenSize.y / 2
                    }, world.scene.screenSize.x, world.scene.screenSize.y)
                        .fill(fillStyle);
                });
            });
            Drawing = (function () {
                function Drawing(ctx) {
                    if (ctx === void 0) { ctx = null; }
                    this.ctx = ctx;
                }
                Drawing.prototype.begin = function () {
                    this.ctx.beginPath();
                    return this;
                };
                Drawing.prototype.stroke = function (strokeStyle, lineWidth, alpha) {
                    if (strokeStyle === void 0) { strokeStyle = "black"; }
                    if (lineWidth === void 0) { lineWidth = 1; }
                    if (alpha === void 0) { alpha = 1.0; }
                    this.ctx.resetTransform();
                    this.ctx.strokeStyle = strokeStyle;
                    this.ctx.lineWidth = lineWidth;
                    this.ctx.globalAlpha = alpha;
                    this.ctx.stroke();
                    return this;
                };
                Drawing.prototype.fill = function (fillStyle, alpha) {
                    if (alpha === void 0) { alpha = 1.0; }
                    this.ctx.resetTransform();
                    this.ctx.fillStyle = fillStyle;
                    this.ctx.globalAlpha = alpha;
                    this.ctx.fill();
                    return this;
                };
                Drawing.prototype.ellipse = function (center, radius) {
                    this.ctx.ellipse(center.x, center.y, radius, radius, 0.0, 0.0, Math.PI * 2);
                    return this;
                };
                Drawing.prototype.line = function (to, from) {
                    if (from === void 0) { from = null; }
                    if (from) {
                        this.ctx.moveTo(from.x, from.y);
                    }
                    this.ctx.lineTo(to.x, to.y);
                    return this;
                };
                Drawing.prototype.rect = function (center, width, height, angle) {
                    if (angle === void 0) { angle = 0.0; }
                    this.ctx.save();
                    this.ctx.rotate(angle);
                    this.ctx.rect(center.x - width / 2, center.y - height / 2, width, height);
                    this.ctx.restore();
                    return this;
                };
                Drawing.prototype.newRadialGrad = function (center0, radius0, center1, radius1) {
                    return this.ctx.createRadialGradient(center0.x, center0.y, radius0, center1.x, center1.y, radius1);
                };
                Drawing.prototype.text = function (pos, text) {
                    this.ctx.strokeText(text, pos.x, pos.y);
                };
                Drawing.prototype.font = function (font) {
                    this.ctx.font = font;
                    return this;
                };
                return Drawing;
            }());
            exports_1("Drawing", Drawing);
            Transformation = (function (_super) {
                __extends(Transformation, _super);
                function Transformation() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.scale = 1.0;
                    _this.offset = vec2_js_1.vec2(0.0, 0.0);
                    return _this;
                }
                Transformation.prototype.fit = function (scene, level) {
                    this.scale = Math.min(scene.screenSize.x / level.arena.width(), scene.screenSize.y / level.arena.height());
                    this.offset = vec2_js_1.vec2((scene.screenSize.x - this.scale * level.arena.width()) / 2, (scene.screenSize.y - this.scale * level.arena.height()) / 2);
                };
                Transformation.prototype.wrap = function (redraw) {
                    var _this = this;
                    return function (world, drawing, time) {
                        _this.ctx = drawing.ctx;
                        return redraw(world, _this, time);
                    };
                };
                Transformation.prototype.tf = function (v) {
                    return {
                        x: v.x * this.scale + this.offset.x,
                        y: v.y * this.scale + this.offset.y
                    };
                };
                Transformation.prototype.s = function (s) {
                    return this.scale * s;
                };
                Transformation.prototype.ellipse = function (center, radius) {
                    return _super.prototype.ellipse.call(this, this.tf(center), this.s(radius));
                };
                Transformation.prototype.line = function (to, from) {
                    if (from === void 0) { from = null; }
                    return _super.prototype.line.call(this, this.tf(to), this.tf(from));
                };
                Transformation.prototype.rect = function (center, width, height, angle) {
                    if (angle === void 0) { angle = 0.0; }
                    return _super.prototype.rect.call(this, this.tf(center), this.s(width), this.s(height), angle);
                };
                Transformation.prototype.newRadialGrad = function (center0, radius0, center1, radius1) {
                    return _super.prototype.newRadialGrad.call(this, this.tf(center0), this.s(radius0), this.tf(center1), this.s(radius1));
                };
                Transformation.prototype.text = function (pos, text) {
                    return _super.prototype.text.call(this, this.tf(pos), text);
                };
                return Transformation;
            }(Drawing));
            exports_1("Transformation", Transformation);
        }
    };
});
//# sourceMappingURL=gfx.js.map