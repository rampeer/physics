System.register(["./world.js", "./shapes.js"], function (exports_1, context_1) {
    "use strict";
    var world_js_1, shapes_js_1, DEFAULT_FONT_NAME, DEFAULT_FONT_SIZE, Background, DrawUtils;
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
            DEFAULT_FONT_NAME = "'Operator Mono', 'Source Code Pro', Menlo, Monaco, Consolas, Courier New, monospace";
            DEFAULT_FONT_SIZE = 18;
            exports_1("Background", Background = function (fillColor) {
                if (fillColor === void 0) { fillColor = 'white'; }
                return new world_js_1.GameObject()
                    .onRedraw(function (world, drawing, time) {
                    var r = world.getSize();
                    drawing
                        .begin()
                        .rect({
                        x: r.x / 2,
                        y: r.y / 2
                    }, r.x, r.y)
                        .fill({ fillColor: fillColor });
                }).named("Background");
            });
            DrawUtils = (function () {
                function DrawUtils(ctx) {
                    if (ctx === void 0) { ctx = null; }
                    this.tfStack = [];
                    this.tfCurrent = new shapes_js_1.TransformMatrix();
                    this.ctx = ctx;
                }
                DrawUtils.prototype.getTransform = function () {
                    return this.tfCurrent;
                };
                DrawUtils.prototype.pushTransform = function (tf, reset) {
                    if (reset === void 0) { reset = false; }
                    this.tfStack.push(this.tfCurrent);
                    this.tfCurrent = reset ? tf :
                        this.tfCurrent.mul(tf, new shapes_js_1.TransformMatrix());
                    this.applyTransform();
                    return this;
                };
                DrawUtils.prototype.popTransform = function () {
                    this.tfCurrent = this.tfStack.pop();
                    this.applyTransform();
                    return this;
                };
                DrawUtils.prototype.applyTransform = function () {
                    this.ctx.setTransform(this.tfCurrent.matrix[0], this.tfCurrent.matrix[1], this.tfCurrent.matrix[2], this.tfCurrent.matrix[3], this.tfCurrent.offset[0], this.tfCurrent.offset[1]);
                };
                DrawUtils.prototype.begin = function () {
                    this.ctx.beginPath();
                    return this;
                };
                DrawUtils.prototype.stroke = function (s) {
                    this.ctx.save();
                    this.ctx.resetTransform();
                    this.ctx.strokeStyle = (s === null || s === void 0 ? void 0 : s.strokeColor) || "black";
                    this.ctx.lineWidth = (s === null || s === void 0 ? void 0 : s.lineWidth) || 1.0;
                    this.ctx.globalAlpha = (s === null || s === void 0 ? void 0 : s.alpha) || 1.0;
                    this.ctx.stroke();
                    this.ctx.restore();
                    return this;
                };
                DrawUtils.prototype.fill = function (s) {
                    this.ctx.save();
                    this.ctx.resetTransform();
                    this.ctx.fillStyle = (s === null || s === void 0 ? void 0 : s.fillColor) || "white";
                    this.ctx.globalAlpha = (s === null || s === void 0 ? void 0 : s.alpha) || 1.0;
                    this.ctx.fill();
                    this.ctx.restore();
                    return this;
                };
                DrawUtils.prototype.ellipse = function (center, radius, radius2, angle) {
                    this.ctx.ellipse(center.x, center.y, radius, radius2 || radius, angle || 0.0, 0.0, Math.PI * 2);
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
                DrawUtils.prototype.text = function (pos, text, fill, font, baseline) {
                    if (baseline === void 0) { baseline = "top"; }
                    this.ctx.resetTransform();
                    this.ctx.fillStyle = (fill === null || fill === void 0 ? void 0 : fill.fillColor) || "black";
                    this.ctx.globalAlpha = (fill === null || fill === void 0 ? void 0 : fill.alpha) || 1.0;
                    this.ctx.font = ("".concat((font === null || font === void 0 ? void 0 : font.fontVariation) || "normal", " ") +
                        "".concat((font === null || font === void 0 ? void 0 : font.fontSize) || DEFAULT_FONT_SIZE) +
                        "".concat((font === null || font === void 0 ? void 0 : font.fontSizeUnit) || "px", " ") +
                        "".concat((font === null || font === void 0 ? void 0 : font.fontName) || DEFAULT_FONT_NAME));
                    if (baseline)
                        this.ctx.textBaseline = baseline;
                    this.ctx.fillText(text, pos.x, pos.y);
                    return this;
                };
                return DrawUtils;
            }());
            exports_1("DrawUtils", DrawUtils);
        }
    };
});
//# sourceMappingURL=gfx.js.map