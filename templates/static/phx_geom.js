System.register(["./vec2"], function (exports_1, context_1) {
    "use strict";
    var vec2_1, PartSegment, PartPoint, Node, Tree, SolidBody;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (vec2_1_1) {
                vec2_1 = vec2_1_1;
            }
        ],
        execute: function () {
            PartSegment = (function () {
                function PartSegment(from, to) {
                    this.from = vec2_1.vec2(0.0, 0.0);
                    this.to = vec2_1.vec2(0.0, 0.0);
                    this.leftNormal = vec2_1.vec2(0.0, 0.0);
                    this.direction = vec2_1.vec2(0.0, 0.0);
                    this.len = 0.0;
                    this.set(from, to);
                }
                PartSegment.prototype.set = function (from, to) {
                    var dx = to.x - from.x, dy = to.y - from.y, len = Math.sqrt(dx * dx + dy * dy);
                    this.from.set(from.x, from.y);
                    this.to.set(to.x, to.y);
                    this.direction.set(dx, dy);
                    this.leftNormal.set(-dy, dx);
                    this.len = len;
                    return this;
                };
                return PartSegment;
            }());
            PartPoint = (function () {
                function PartPoint(center, radius) {
                    this.center = vec2_1.vec2(0.0, 0.0);
                    this.set(center, radius);
                }
                PartPoint.prototype.set = function (center, radius) {
                    this.radius = radius;
                    this.center.set(center.x, center.y);
                    return this;
                };
                return PartPoint;
            }());
            Node = (function () {
                function Node() {
                    this.pos = vec2_1.vec2(0.0, 0.0);
                    this.angle = 0.0;
                    this.angleVel = 0.0;
                    this.mass_center = vec2_1.vec2(0.0, 0.0);
                    this.mass = null;
                    this.inertia = null;
                    this.children = [];
                }
                return Node;
            }());
            Tree = (function () {
                function Tree() {
                    this.parts = [];
                }
                return Tree;
            }());
            SolidBody = (function () {
                function SolidBody() {
                    this.trace = [];
                }
                SolidBody.prototype.setTime = function (t) { return this; };
                SolidBody.prototype.getState = function () { return null; };
                return SolidBody;
            }());
            exports_1("SolidBody", SolidBody);
        }
    };
});
//# sourceMappingURL=phx_geom.js.map