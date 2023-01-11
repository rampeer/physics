System.register(["./world.js"], function (exports_1, context_1) {
    "use strict";
    var world_js_1, ArrowDrawer, TextDrawer, CircleDrawer, RectDrawer;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (world_js_1_1) {
                world_js_1 = world_js_1_1;
            }
        ],
        execute: function () {
            exports_1("ArrowDrawer", ArrowDrawer = function (pos, dir, target, line_width, color) {
                if (dir === void 0) { dir = null; }
                if (target === void 0) { target = null; }
                if (line_width === void 0) { line_width = 1; }
                if (color === void 0) { color = "black"; }
                return new world_js_1.GameObject()
                    .onRedraw(function (world, drawing, time) {
                    drawing.begin()
                        .line(pos, target)
                        .stroke(color, line_width);
                });
            });
            exports_1("TextDrawer", TextDrawer = function (pos, text, font, color) {
                if (font === void 0) { font = "bold 18px serif"; }
                if (color === void 0) { color = "black"; }
                return new world_js_1.GameObject()
                    .onRedraw(function (world, drawing) {
                    drawing.begin()
                        .font(font)
                        .stroke(color)
                        .text(pos, text());
                });
            });
            exports_1("CircleDrawer", CircleDrawer = function (circle, fillStyle) {
                if (fillStyle === void 0) { fillStyle = "black"; }
                return new world_js_1.GameObject()
                    .onRedraw(function (world, drawing) {
                    drawing.begin()
                        .ellipse(circle.pos, circle.radius)
                        .fill(fillStyle);
                });
            });
            exports_1("RectDrawer", RectDrawer = function (rect, lineColor, fillColor, lineWidth, order) {
                if (lineColor === void 0) { lineColor = "black"; }
                if (fillColor === void 0) { fillColor = "red"; }
                if (lineWidth === void 0) { lineWidth = 1; }
                if (order === void 0) { order = 0; }
                return new world_js_1.GameObject()
                    .onRedraw(function (world, drawing) {
                    drawing.begin()
                        .rect(rect.pos, rect.width, rect.height, rect.angle);
                    if (fillColor)
                        drawing.fill(fillColor);
                    if (lineColor)
                        drawing.stroke(lineColor, lineWidth);
                });
            });
        }
    };
});
//# sourceMappingURL=gfx_geom.js.map