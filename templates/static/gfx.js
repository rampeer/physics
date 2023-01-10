System.register(["./utils.js"], function (exports_1, context_1) {
    "use strict";
    var utils_js_1, DrawEngine;
    var __moduleName = context_1 && context_1.id;
    function Background() {
        return {
            order: 0,
            redraw: function (world, ctx) {
                ctx.fillStyle = 'white';
                ctx.fillRect(0, 0, world.screenSize.x, world.screenSize.y);
            }
        };
    }
    return {
        setters: [
            function (utils_js_1_1) {
                utils_js_1 = utils_js_1_1;
            }
        ],
        execute: function () {
            DrawEngine = (function () {
                function DrawEngine() {
                }
                DrawEngine.prototype.render = function (world, ctx) {
                    var children = world.scene
                        .drawFunctions()
                        .sort(function (a, b) { return utils_js_1.sign(a.order - b.order); });
                    for (var _i = 0, children_1 = children; _i < children_1.length; _i++) {
                        var child = children_1[_i];
                        ctx.resetTransform();
                        ctx.save();
                        child.redraw(world, ctx);
                        ctx.restore();
                    }
                };
                DrawEngine.prototype.setStroke = function (ctx, strokeStyle, lineWidth, alpha) {
                    if (strokeStyle === void 0) { strokeStyle = "black"; }
                    if (lineWidth === void 0) { lineWidth = 1; }
                    if (alpha === void 0) { alpha = 1.0; }
                    ctx.resetTransform();
                    ctx.strokeStyle = strokeStyle;
                    ctx.lineWidth = lineWidth;
                    ctx.globalAlpha = alpha;
                };
                DrawEngine.prototype.setFill = function (ctx, fillStyle, alpha) {
                    if (alpha === void 0) { alpha = 1.0; }
                    ctx.resetTransform();
                    ctx.fillStyle = fillStyle;
                    ctx.globalAlpha = alpha;
                };
                return DrawEngine;
            }());
            exports_1("DrawEngine", DrawEngine);
        }
    };
});
//# sourceMappingURL=gfx.js.map