System.register(["./vec2.js"], function (exports_1, context_1) {
    "use strict";
    var __extends = (this && this.__extends) || (function () {
        var extendStatics = function (d, b) {
            extendStatics = Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
                function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
            return extendStatics(d, b);
        };
        return function (d, b) {
            if (typeof b !== "function" && b !== null)
                throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();
    var vec2_js_1, TransformMatrix, BasicTransform, newCircle, newPoly, newRect, Segment, CircleShape, ConvexPolyShape;
    var __moduleName = context_1 && context_1.id;
    function isReverseOriented(pts) {
        var posW = 0, negW = 0, len = pts.length;
        for (var i = 0; i < len; i += 1) {
            var crossProd = (pts[(i + 1) % len].minus(pts[i]))
                .cross(pts[(i + 2) % len].minus(pts[(i + 1) % len]));
            crossProd > 0 ? posW += 1 : negW += 1;
            if (posW && negW)
                throw Error("Point(0, 0) is not inside the polygon or polygon is not convex");
        }
        return negW > 0;
    }
    return {
        setters: [
            function (vec2_js_1_1) {
                vec2_js_1 = vec2_js_1_1;
            }
        ],
        execute: function () {
            TransformMatrix = (function () {
                function TransformMatrix() {
                    this.matrix = [1.0, 0.0, 0.0, 1.0];
                    this.offset = [0.0, 0.0];
                }
                TransformMatrix.prototype.apply = function (v, out) {
                    var m = this.matrix;
                    out = out || vec2_js_1.vec2(0.0, 0.0);
                    out.x = v.x * m[0] + v.y * m[1] + this.offset[0];
                    out.y = v.x * m[2] + v.y * m[3] + this.offset[1];
                    return out;
                };
                TransformMatrix.prototype.applyLinear = function (v, out) {
                    var m = this.matrix;
                    return (out ? out : vec2_js_1.vec2(0.0, 0.0)).set(v.x * m[0] + v.y * m[1], v.x * m[2] + v.y * m[3]);
                };
                TransformMatrix.prototype.mul = function (right, out) {
                    out = out ? out : new TransformMatrix();
                    var _a = this.apply({ x: right.offset[0], y: right.offset[1] }), x = _a.x, y = _a.y;
                    out.offset[0] = x;
                    out.offset[1] = y;
                    var mA = this.matrix, mB = right.matrix;
                    out.matrix[0] = mA[0] * mB[0] + mA[1] * mB[2];
                    out.matrix[1] = mA[0] * mB[1] + mA[1] * mB[3];
                    out.matrix[2] = mA[2] * mB[0] + mA[3] * mB[2];
                    out.matrix[3] = mA[2] * mB[1] + mA[3] * mB[3];
                    return out;
                };
                return TransformMatrix;
            }());
            exports_1("TransformMatrix", TransformMatrix);
            BasicTransform = (function (_super) {
                __extends(BasicTransform, _super);
                function BasicTransform() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._pos = vec2_js_1.vec2(0.0, 0.0);
                    _this._angle = 0.0;
                    _this._scale = 1.0;
                    _this.setAngle = function (angle) {
                        _this._angle = angle;
                        _this._update();
                        return _this;
                    };
                    _this.setScale = function (scale) {
                        _this._scale = scale;
                        _this._update();
                        return _this;
                    };
                    return _this;
                }
                BasicTransform.prototype.setPos = function (x, y) {
                    if (typeof x === "number") {
                        this.offset[0] = x;
                        this.offset[1] = y;
                    }
                    else {
                        this.offset[0] = x.x;
                        this.offset[1] = x.y;
                    }
                    return this;
                };
                BasicTransform.prototype._update = function () {
                    this.matrix[0] = Math.cos(this._angle) * this._scale;
                    this.matrix[1] = -Math.sin(this._angle) * this._scale;
                    this.matrix[2] = Math.sin(this._angle) * this._scale;
                    this.matrix[3] = Math.cos(this._angle) * this._scale;
                };
                return BasicTransform;
            }(TransformMatrix));
            exports_1("BasicTransform", BasicTransform);
            ;
            exports_1("newCircle", newCircle = function (radius, radius2) {
                return new CircleShape(radius, radius2 || radius);
            });
            exports_1("newPoly", newPoly = function (localPoints) {
                return new ConvexPolyShape(localPoints);
            });
            exports_1("newRect", newRect = function (width, height) {
                var w2 = width / 2, h2 = height / 2;
                return newPoly([vec2_js_1.vec2(+w2, +h2), vec2_js_1.vec2(+w2, -h2), vec2_js_1.vec2(-w2, -h2), vec2_js_1.vec2(-w2, h2)]);
            });
            Segment = (function () {
                function Segment(from, to) {
                    this.set(from, to);
                }
                Segment.prototype.set = function (from, to) {
                    var arrow = vec2_js_1.vecFromTo(from, to);
                    this.from = from;
                    this.to = to;
                    this.dir = arrow.norm();
                    this.norm = this.dir.rot270();
                    this.len = arrow.length();
                    return this;
                };
                return Segment;
            }());
            exports_1("Segment", Segment);
            CircleShape = (function () {
                function CircleShape(radius, radius2) {
                    this.center = vec2_js_1.vec2(0.0, 0.0);
                    this.radius = radius;
                    this.radius2 = radius2 || radius;
                }
                CircleShape.prototype.setCenterOffset = function (c) {
                    this.center.set(c.x, c.y);
                    return this;
                };
                return CircleShape;
            }());
            exports_1("CircleShape", CircleShape);
            ConvexPolyShape = (function () {
                function ConvexPolyShape(pts, margin) {
                    this.edges = [];
                    this.margin = 0.0;
                    this.margin = margin || 0.0;
                    var ptsClockwise = isReverseOriented(pts) ? pts : pts.reverse(), len = pts.length;
                    for (var i = 0; i < len; i += 1) {
                        this.edges.push(new Segment(ptsClockwise[i], ptsClockwise[(i + 1) % len]));
                    }
                }
                return ConvexPolyShape;
            }());
            exports_1("ConvexPolyShape", ConvexPolyShape);
        }
    };
});
//# sourceMappingURL=shapes.js.map