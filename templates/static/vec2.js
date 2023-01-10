System.register([], function (exports_1, context_1) {
    "use strict";
    var Region, Vec2, Vector2Const;
    var __moduleName = context_1 && context_1.id;
    function vec2(x, y) {
        return new Vec2(x, y);
    }
    exports_1("vec2", vec2);
    return {
        setters: [],
        execute: function () {
            Region = (function () {
                function Region(x0, y0, x1, y1) {
                    var _this = this;
                    this.x0 = function () { return _this.topLeft.x; };
                    this.y0 = function () { return _this.topLeft.y; };
                    this.x1 = function () { return _this.bottomRight.x; };
                    this.y1 = function () { return _this.bottomRight.y; };
                    this.width = function () { return (_this.x1() - _this.x0()); };
                    this.height = function () { return (_this.y1() - _this.y0()); };
                    this.centerX = function () { return (_this.x0() + _this.x1()) / 2; };
                    this.centerY = function () { return (_this.y0() + _this.y1()) / 2; };
                    this.extentX = function () { return _this.width() / 2; };
                    this.extentY = function () { return _this.height() / 2; };
                    this.topLeft = new Vec2(Math.min(x0, x1), Math.min(y0, y1));
                    this.bottomRight = new Vec2(Math.max(x0, x1), Math.max(y0, y1));
                }
                Region.fromBounds = function (v1, v2) {
                    return new Region(v1.x, v1.y, v2.x, v2.y);
                };
                Region.fromCenter = function (center, width, height) {
                    return new Region(center.x - width / 2, center.y - height / 2, center.x + width / 2, center.y + height / 2);
                };
                return Region;
            }());
            exports_1("Region", Region);
            Vec2 = (function () {
                function Vec2(x, y) {
                    this.x = x;
                    this.y = y;
                }
                Vec2.prototype.set = function (x, y) {
                    this.x = x;
                    this.y = y;
                    return this;
                };
                Vec2.prototype.toString = function (decPlaces) {
                    decPlaces = decPlaces || 3;
                    var scalar = Math.pow(10, decPlaces);
                    return "[" + Math.round(this.x * scalar) / scalar + ", " + Math.round(this.y * scalar) / scalar + "]";
                };
                Vec2.prototype.clone = function () {
                    return new Vec2(this.x, this.y);
                };
                Vec2.prototype.length = function () {
                    return Math.sqrt((this.x * this.x) + (this.y * this.y));
                };
                Vec2.prototype.lengthSq = function () {
                    return (this.x * this.x) + (this.y * this.y);
                };
                Vec2.prototype.norm = function () {
                    var m = Math.max(this.length(), 1e-6);
                    return new Vec2(this.x / m, this.y / m);
                };
                Vec2.prototype.normEq = function () {
                    var m = Math.max(this.length(), 1e-6);
                    return this.set(this.x / m, this.y / m);
                };
                Vec2.prototype.flip = function (dx, dy) {
                    if (dx === void 0) { dx = -1.0; }
                    if (dy === void 0) { dy = -1.0; }
                    return this.clone().set(this.x * dx, this.y * dy);
                };
                Vec2.prototype.plus = function (v) {
                    return new Vec2(this.x + v.x, this.y + v.y);
                };
                Vec2.prototype.plusEq = function (v) {
                    return this.set(this.x + v.x, this.y + v.y);
                };
                Vec2.prototype.minus = function (v) {
                    return new Vec2(this.x - v.x, this.y - v.y);
                };
                Vec2.prototype.minusEq = function (v) {
                    return this.set(this.x - v.x, this.y - v.y);
                };
                Vec2.prototype.mul = function (s) {
                    return new Vec2(this.x * s, this.y * s);
                };
                Vec2.prototype.dot = function (v) {
                    return (this.x * v.x) + (this.y * v.y);
                };
                Vec2.prototype.dotNorm = function (v) {
                    return ((this.x * v.x) + (this.y * v.y)) / (Math.sqrt((this.x * this.x + this.y * this.y) * (v.x * v.x + v.y * v.y) + 1e-6));
                };
                Vec2.prototype.angle = function () {
                    return Math.atan2(this.y, this.x);
                };
                Vec2.prototype.rotate = function (angle) {
                    var cosRY = Math.cos(angle);
                    var sinRY = Math.sin(angle);
                    Vector2Const.temp.set(this.x, this.y);
                    return new Vec2((Vector2Const.temp.x * cosRY) - (Vector2Const.temp.y * sinRY), (Vector2Const.temp.x * sinRY) + (Vector2Const.temp.y * cosRY));
                };
                Vec2.prototype.dist = function (to) {
                    return Vector2Const.temp.set(this.x, this.y).minusEq(to).length();
                };
                Vec2.prototype.rotateAroundPoint = function (around, angle) {
                    return Vector2Const.temp.set(this.x, this.y).minusEq(around).rotate(angle).plusEq(around).clone();
                };
                Vec2.prototype.mulEq = function (coef) {
                    return this.set(this.x * coef, this.y * coef);
                };
                Vec2.prototype.copyTo = function (v) {
                    v.x = this.x;
                    v.y = this.y;
                    return v;
                };
                return Vec2;
            }());
            exports_1("Vec2", Vec2);
            ;
            Vector2Const = {
                TO_DEGREES: 180 / Math.PI,
                TO_RADIANS: Math.PI / 180,
                temp: new Vec2(0, 0)
            };
        }
    };
});
//# sourceMappingURL=vec2.js.map