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
    var Geom, Circle, Segment, Wrapper, Multiple, Offset, Rotate;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            Geom = (function () {
                function Geom() {
                }
                return Geom;
            }());
            Circle = (function (_super) {
                __extends(Circle, _super);
                function Circle() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                return Circle;
            }(Geom));
            Segment = (function (_super) {
                __extends(Segment, _super);
                function Segment() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                return Segment;
            }(Geom));
            Wrapper = (function (_super) {
                __extends(Wrapper, _super);
                function Wrapper() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                return Wrapper;
            }(Geom));
            Multiple = (function (_super) {
                __extends(Multiple, _super);
                function Multiple() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                return Multiple;
            }(Geom));
            Offset = (function (_super) {
                __extends(Offset, _super);
                function Offset() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                return Offset;
            }(Wrapper));
            Rotate = (function (_super) {
                __extends(Rotate, _super);
                function Rotate() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                return Rotate;
            }(Wrapper));
        }
    };
});
//# sourceMappingURL=geom.js.map