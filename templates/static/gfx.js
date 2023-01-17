System.register(["./world.js", "./shapes.js"], function (exports_1, context_1) {
    "use strict";
    var world_js_1, shapes_js_1, Background, DrawUtils;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (world_js_1_1) {
                world_js_1 = world_js_1_1;
            },
            function (shapes_js_1_1) {
                shapes_js_1 = shapes_js_1_1;
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
            DrawUtils = (function () {
                function DrawUtils(ctx) {
                    if (ctx === void 0) { ctx = null; }
                    this.tfStackProd = [];
                    this.tfCurrent = new shapes_js_1.TransformMatrix();
                    this.ctx = ctx;
                }
                DrawUtils.prototype.pushTransform = function (tf) {
                    this.tfStackProd.push(this.tfCurrent);
                    this.tfCurrent = this.tfCurrent.mul(tf, new shapes_js_1.TransformMatrix());
                    this.tfUpdate();
                    return this;
                };
                DrawUtils.prototype.popTransform = function () {
                    this.tfCurrent = this.tfStackProd.pop();
                    this.tfUpdate();
                    return this;
                };
                DrawUtils.prototype.tfUpdate = function () {
                    this.ctx.setTransform(this.tfCurrent.matrix[0], this.tfCurrent.matrix[1], this.tfCurrent.matrix[2], this.tfCurrent.matrix[3], this.tfCurrent.offset[0], this.tfCurrent.offset[1]);
                };
                DrawUtils.prototype.begin = function () {
                    this.ctx.beginPath();
                    return this;
                };
                DrawUtils.prototype.stroke = function (strokeStyle, lineWidth, alpha) {
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
                DrawUtils.prototype.fill = function (fillStyle, alpha) {
                    if (alpha === void 0) { alpha = 1.0; }
                    this.ctx.resetTransform();
                    this.ctx.fillStyle = fillStyle;
                    this.ctx.globalAlpha = alpha;
                    this.ctx.fill();
                    return this;
                };
                DrawUtils.prototype.ellipse = function (center, radius, radius2) {
                    this.ctx.ellipse(center.x, center.y, radius, radius2 || radius, 0.0, 0.0, Math.PI * 2);
                    return this;
                };
                DrawUtils.prototype.line = function (to, from) {
                    if (from === void 0) { from = null; }
                    if (from) {
                        this.ctx.moveTo(from.x, from.y);
                    }
                    this.ctx.lineTo(to.x, to.y);
                    return this;
                };
                DrawUtils.prototype.rect = function (center, width, height, angle) {
                    if (angle === void 0) { angle = 0.0; }
                    this.ctx.save();
                    this.ctx.rotate(angle);
                    this.ctx.rect(center.x - width / 2, center.y - height / 2, width, height);
                    this.ctx.restore();
                    return this;
                };
                DrawUtils.prototype.newRadialGrad = function (center0, radius0, center1, radius1) {
                    return this.ctx.createRadialGradient(center0.x, center0.y, radius0, center1.x, center1.y, radius1);
                };
                DrawUtils.prototype.text = function (pos, text, baseline) {
                    if (baseline === void 0) { baseline = "top"; }
                    this.ctx.fillText(text, pos.x, pos.y);
                    if (baseline)
                        this.ctx.textBaseline = baseline;
                    return this;
                };
                DrawUtils.prototype.font = function (font) {
                    this.ctx.font = font;
                    return this;
                };
                return DrawUtils;
            }());
            exports_1("DrawUtils", DrawUtils);
        }
    };
});
//# sourceMappingURL=gfx.js.map