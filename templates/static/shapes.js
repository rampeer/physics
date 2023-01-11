System.register([], function (exports_1, context_1) {
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
    var Shape, CircleShape, RectShape, PolyShape, Segment;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            Shape = (function () {
                function Shape(position, angle) {
                    this.pos = position;
                    this.angle = angle === null ? 0.0 : angle;
                }
                return Shape;
            }());
            exports_1("Shape", Shape);
            ;
            CircleShape = (function (_super) {
                __extends(CircleShape, _super);
                function CircleShape(position, radius, angle) {
                    var _this = _super.call(this, position, angle) || this;
                    _this.radius = radius;
                    return _this;
                }
                return CircleShape;
            }(Shape));
            exports_1("CircleShape", CircleShape);
            RectShape = (function (_super) {
                __extends(RectShape, _super);
                function RectShape(position, width, height, angle) {
                    var _this = _super.call(this, position, angle) || this;
                    _this.width = width;
                    _this.height = height;
                    return _this;
                }
                return RectShape;
            }(Shape));
            exports_1("RectShape", RectShape);
            PolyShape = (function (_super) {
                __extends(PolyShape, _super);
                function PolyShape(center, points, angle) {
                    var _this = _super.call(this, center, angle) || this;
                    _this.points = points;
                    return _this;
                }
                return PolyShape;
            }(Shape));
            exports_1("PolyShape", PolyShape);
            Segment = (function () {
                function Segment(from, to) {
                    this.A = from;
                    this.B = to;
                    this.tang = to.minus(from).normEq();
                    this.normal = this.tang.rotate(-Math.PI / 2);
                }
                return Segment;
            }());
            exports_1("Segment", Segment);
        }
    };
});
//# sourceMappingURL=shapes.js.map