System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function ArrowDrawer(pos, dir, min_length, line_width, color, order) {
        if (min_length === void 0) { min_length = null; }
        if (line_width === void 0) { line_width = 1; }
        if (color === void 0) { color = "black"; }
        if (order === void 0) { order = 0; }
        return {
            order: order,
            redraw: function (world, ctx) {
                ctx.strokeStyle = color;
                ctx.beginPath();
                var dirScaled = (min_length === null ? dir : dir.norm().mul(min_length));
                ctx.moveTo(pos.x + dirScaled.x, pos.y + dirScaled.y);
                ctx.lineTo(pos.x, pos.y);
                ctx.stroke();
            }
        };
    }
    exports_1("ArrowDrawer", ArrowDrawer);
    function TextDrawer(pos, text, font, color, order) {
        if (font === void 0) { font = "bold 18px serif"; }
        if (color === void 0) { color = "black"; }
        if (order === void 0) { order = 0; }
        return {
            order: order,
            redraw: function (world, ctx) {
                ctx.fillStyle = color;
                ctx.font = "bold 18px serif";
                ctx.fillText(text(), pos.x, pos.y);
            }
        };
    }
    exports_1("TextDrawer", TextDrawer);
    function CircleDrawer(circle, fillColor, order) {
        if (fillColor === void 0) { fillColor = "black"; }
        if (order === void 0) { order = 0; }
        return {
            order: order,
            redraw: function (world, ctx) {
                ctx.beginPath();
                ctx.fillStyle = fillColor;
                ctx.ellipse(circle.pos.x, circle.pos.y, circle.radius, circle.radius, circle.angle, 0.0, Math.PI * 2);
                ctx.fill();
            }
        };
    }
    exports_1("CircleDrawer", CircleDrawer);
    function RectDrawer(rect, lineColor, fillColor, lineWidth, order) {
        if (lineColor === void 0) { lineColor = "black"; }
        if (fillColor === void 0) { fillColor = "red"; }
        if (lineWidth === void 0) { lineWidth = 1; }
        if (order === void 0) { order = 0; }
        return {
            order: order,
            redraw: function (world, ctx) {
                ctx.beginPath();
                ctx.translate(rect.pos.x, rect.pos.y);
                ctx.rotate(rect.angle);
                ctx.rect(-rect.width / 2, -rect.height / 2, rect.width, rect.height);
                world.gfx.setStroke(ctx, lineWidth);
                if (lineColor) {
                    ctx.strokeStyle = lineColor;
                    ctx.stroke();
                }
                if (fillColor) {
                    ctx.fillStyle = fillColor;
                    ctx.fill();
                }
            }
        };
    }
    exports_1("RectDrawer", RectDrawer);
    return {
        setters: [],
        execute: function () {
        }
    };
});
//# sourceMappingURL=gfx_geom.js.map