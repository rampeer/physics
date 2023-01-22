System.register(["./world.js", "./gfx_geom.js", "./vec2.js"], function (exports_1, context_1) {
    "use strict";
    var world_js_1, gfx_geom_js_1, vec2_js_1;
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
        }).onRedraw(function (w, d) {
            var r = w.getSize();
            gfx_geom_js_1.DrawText(vec2_js_1.vec2(50, r.y - 50), "FPS: ".concat(fps), { fontSize: 30 }, { fillColor: "red" })(w, d);
        }).named("FPS Counter");
    }
    exports_1("FPSCounter", FPSCounter);
    function Tree() {
        var Node = (function () {
            function Node() {
                this.children = [];
            }
            return Node;
        }());
        var root;
        var rebuildTree = function (level, index, n, obj) {
            n.lastIndex = n.index = index;
            n.level = level;
            var name = obj.name || Object.getPrototypeOf(obj).constructor["name"];
            var typename = obj.typename;
            n.text = "".concat(n.index, ": '").concat(name, "' (").concat(typename, ")");
            if (obj instanceof world_js_1.GameObjectContainer) {
                for (var _i = 0, _a = obj["children"]; _i < _a.length; _i++) {
                    var child = _a[_i];
                    var childNode = rebuildTree(level + 1, index += 1, new Node(), child);
                    n.children.push(childNode);
                    n.lastIndex = index = childNode.lastIndex;
                }
            }
            return n;
        };
        var drawNode = function (world, drawing, time, n) {
            gfx_geom_js_1.DrawText({ x: n.level * 40, y: n.index * 40 }, n.text)(world, drawing);
            n.children.forEach(function (x) { return drawNode(world, drawing, time, x); });
        };
        return new world_js_1.GameObject().onUpdate(function (world) {
            root = rebuildTree(0, 0, new Node(), world.scene);
        }).onRedraw(function (world, drawing, time) {
            return drawNode(world, drawing, time, root);
        }).named("Object tree debug");
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
        }
    };
});
//# sourceMappingURL=g_ui.js.map