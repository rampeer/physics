System.register(["./world.js", "./gfx_geom.js", "./vec2.js"], function (exports_1, context_1) {
    "use strict";
    var world_js_1, gfx_geom_js_1, vec2_js_1, Node;
    var __moduleName = context_1 && context_1.id;
    function FPSCounter() {
        var counter = 0, nextReset = 0, fps = 0;
        return new world_js_1.GameObject().onUpdate(function (world, t) {
            counter += 1;
            if (t.ts > nextReset) {
                fps = counter;
                counter = 0;
                nextReset = t.ts + 1.0;
            }
        }).onRedraw(gfx_geom_js_1.TextDrawer(function () { return vec2_js_1.vec2(10.0, 10.0); }, function () { return "FPS: ".concat(fps); }));
    }
    exports_1("FPSCounter", FPSCounter);
    function Tree() {
        var root = new Node();
        var updateThunk = function (level, index, n, o) {
            n.level = level;
            n.index = n.lastIndex = index;
            n.children = [];
            var oProto = Object.getPrototypeOf(o);
            var text = oProto.constructor["name"] || "???";
            n.text = "".concat(n.index, ": ").concat(text);
            if (o instanceof world_js_1.GameObjectContainer) {
                for (var _i = 0, _a = o["children"]; _i < _a.length; _i++) {
                    var c = _a[_i];
                    var nc = updateThunk(level + 1, n.lastIndex + 1, new Node(), c);
                    n.children.push(nc);
                    n.lastIndex = nc.lastIndex;
                }
            }
            return n;
        };
        var drawNode = function (drawing, n) {
            drawing.text({
                x: n.level * 70,
                y: n.index * 50
            }, "".concat(n.level, " ").concat(n.index, " : ").concat(n.text));
            n.children.forEach(function (x) { return drawNode(drawing, x); });
        };
        return new world_js_1.GameObject().onUpdate(function (world) {
            root = updateThunk(0, 0, new Node(), world.scene);
        }).onRedraw((function (world, drawing, time) {
            drawNode(drawing, root);
            throw Error();
        }));
    }
    exports_1("Tree", Tree);
    return {
        setters: [
            function (world_js_1_1) {
                world_js_1 = world_js_1_1;
            },
            function (gfx_geom_js_1_1) {
                gfx_geom_js_1 = gfx_geom_js_1_1;
            },
            function (vec2_js_1_1) {
                vec2_js_1 = vec2_js_1_1;
            }
        ],
        execute: function () {
            Node = (function () {
                function Node() {
                    this.children = [];
                }
                return Node;
            }());
        }
    };
});
//# sourceMappingURL=g_ui.js.map