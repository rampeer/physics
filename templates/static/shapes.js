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
    var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
        if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
            if (ar || !(i in from)) {
                if (!ar) ar = Array.prototype.slice.call(from, 0, i);
                ar[i] = from[i];
            }
        }
        return to.concat(ar || Array.prototype.slice.call(from));
    };
    var vec2_js_1, TransformMatrix, BasicTransform, newCircle, newPoly, newRect, CircleShape, ConvexShape, PolyShape;
    var __moduleName = context_1 && context_1.id;
    function countWinding(pts) {
        var len = pts.length, area = 0.0, angleSign = new Array(len);
        for (var prev = 0; prev < len; prev += 1) {
            var cur = (prev + 1) % len, next = (prev + 2) % len, crossProd = pts[cur].minus(pts[prev]).cross(pts[next].minus(pts[cur])) / 2.0;
            area += crossProd;
            angleSign[cur] = crossProd > 0;
        }
        return {
            area: area,
            isRightAngle: angleSign,
            convex: angleSign.every(function (x) { return x; }) || angleSign.every(function (x) { return !x; })
        };
    }
    function roll(arr, shift) {
        return __spreadArray(__spreadArray([], arr.slice(shift, arr.length), true), arr.slice(0, shift), true);
    }
    function first(arr, pred) {
        if (pred === void 0) { pred = (function (x) { return !!x; }); }
        for (var i = 0; i < arr.length; i += 1) {
            if (pred(arr[i], i)) {
                return i;
            }
        }
        return null;
    }
    function last(arr, pred) {
        if (pred === void 0) { pred = (function (x) { return !!x; }); }
        var idx = null;
        for (var i = 0; i < arr.length; i += 1) {
            if (pred(arr[i], i)) {
                idx = i;
            }
        }
        return idx;
    }
    function seqAlong(arr, fn) {
        var a = new Array(arr.length);
        for (var i = 0; i < arr.length; i += 1) {
            a[i] = fn(i);
        }
        return a;
    }
    function triangleArea(a, b, c) {
        var area = b.minus(a).cross(c.minus(b)) / 2.0;
        console.log(area);
        return area;
    }
    exports_1("triangleArea", triangleArea);
    function toConvex(points) {
        var a = countWinding(points);
        if (a.convex)
            return [points];
        var firstPos = first(a.isRightAngle, function (x) { return x; });
        console.log(a, firstPos);
        if (firstPos === 0) {
            var lastNeg = last(a.isRightAngle, function (x) { return !x; });
            return toConvex(roll(points, lastNeg));
        }
        else {
            throw Error();
            return __spreadArray(__spreadArray([], toConvex(points.splice(firstPos + 1)), true), toConvex(points.splice(firstPos - 1, points.length)), true);
        }
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
                return new ConvexShape(localPoints);
            });
            exports_1("newRect", newRect = function (width, height) {
                var w2 = width / 2, h2 = height / 2;
                return newPoly([vec2_js_1.vec2(+w2, +h2), vec2_js_1.vec2(+w2, -h2), vec2_js_1.vec2(-w2, -h2), vec2_js_1.vec2(-w2, h2)]);
            });
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
            ConvexShape = (function () {
                function ConvexShape(pts) {
                    this.points = [];
                    var winding = countWinding(pts), reverse = winding.area < 0;
                    this.points = reverse ? pts : pts.reverse();
                    if (!winding.isRightAngle.every(function (x) { return x === !reverse; }))
                        throw Error("Poly is not convex!");
                }
                return ConvexShape;
            }());
            exports_1("ConvexShape", ConvexShape);
            PolyShape = (function () {
                function PolyShape(pts) {
                    this.polys = [];
                    this.polys = toConvex(pts).map(function (x) { return new ConvexShape(x); });
                }
                return PolyShape;
            }());
            exports_1("PolyShape", PolyShape);
        }
    };
});
//# sourceMappingURL=shapes.js.map