System.register([], function (exports_1, context_1) {
    "use strict";
    var TextDrawer, CircleDrawer, PolyDrawer;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            exports_1("TextDrawer", TextDrawer = function (pos, text, color, fontName, fontVariation, fontSize, fontSizeUnit) {
                if (color === void 0) { color = "black"; }
                if (fontName === void 0) { fontName = "serif"; }
                if (fontVariation === void 0) { fontVariation = "bold"; }
                if (fontSize === void 0) { fontSize = 18; }
                if (fontSizeUnit === void 0) { fontSizeUnit = "px"; }
                return function (world, drawing) {
                    drawing.begin()
                        .font("".concat(fontVariation, " ").concat(fontSize).concat(fontSizeUnit, " ").concat(fontName))
                        .text(pos(), text());
                };
            });
            exports_1("CircleDrawer", CircleDrawer = function (circle, fillStyle, lineColor, lineWidth) {
                if (fillStyle === void 0) { fillStyle = "black"; }
                if (lineColor === void 0) { lineColor = "black"; }
                if (lineWidth === void 0) { lineWidth = 1; }
                return function (world, drawing) {
                    var c = circle();
                    drawing.begin()
                        .ellipse({ x: c.x || 0.0, y: c.y || 0.0 }, c.radius);
                    if (lineColor)
                        drawing.stroke(lineColor, lineWidth);
                    if (fillStyle)
                        drawing.fill(fillStyle);
                };
            });
            exports_1("PolyDrawer", PolyDrawer = function (points, lineColor, fillColor, lineWidth) {
                if (lineColor === void 0) { lineColor = "black"; }
                if (fillColor === void 0) { fillColor = "red"; }
                if (lineWidth === void 0) { lineWidth = 1; }
                return function (world, drawing) {
                    drawing.begin();
                    var pts = points();
                    var lastPt = pts[pts.length - 1];
                    for (var _i = 0, pts_1 = pts; _i < pts_1.length; _i++) {
                        var e = pts_1[_i];
                        drawing.line({ x: e.x, y: e.y }, { x: lastPt.x, y: lastPt.y });
                        lastPt = e;
                    }
                    if (lineColor)
                        drawing.stroke(lineColor, lineWidth);
                    if (fillColor)
                        drawing.fill(fillColor);
                };
            });
        }
    };
});
//# sourceMappingURL=gfx_geom.js.map