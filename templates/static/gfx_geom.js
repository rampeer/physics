System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function DrawText(pos, text, font, fill) {
        return function DrawText(world, drawing) {
            drawing.begin();
            drawing.text(pos, text, fill, font);
        };
    }
    exports_1("DrawText", DrawText);
    function DrawCircle(pos, radius, radius2, fill, stroke) {
        return function DrawCircle(world, drawing, time) {
            drawing.begin()
                .ellipse({ x: pos.x || 0.0, y: pos.y || 0.0 }, radius, radius2 || radius);
            drawing.stroke(stroke);
            if (fill)
                drawing.fill(fill);
        };
    }
    exports_1("DrawCircle", DrawCircle);
    function DrawPoly(points, fill, stroke) {
        return function (world, drawing, time) {
            drawing.begin();
            var lastPt = points[points.length - 1];
            for (var _i = 0, points_1 = points; _i < points_1.length; _i++) {
                var e = points_1[_i];
                drawing.line({ x: e.x, y: e.y }, { x: lastPt.x, y: lastPt.y });
                lastPt = e;
            }
            drawing.stroke(stroke);
            if (fill)
                drawing.fill(fill);
        };
    }
    exports_1("DrawPoly", DrawPoly);
    return {
        setters: [],
        execute: function () {
        }
    };
});
//# sourceMappingURL=gfx_geom.js.map