System.register(["./vec2.js", "./gfx.js"], function (exports_1, context_1) {
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
    var vec2_js_1, gfx_js_1, World, GameObject, Container, Scene;
    var __moduleName = context_1 && context_1.id;
    function Time(ts, dt) {
        return { ts: ts, dt: dt };
    }
    exports_1("Time", Time);
    return {
        setters: [
            function (vec2_js_1_1) {
                vec2_js_1 = vec2_js_1_1;
            },
            function (gfx_js_1_1) {
                gfx_js_1 = gfx_js_1_1;
            }
        ],
        execute: function () {
            World = (function () {
                function World() {
                    this.scene = null;
                }
                World.prototype.update = function (time) {
                    this.scene.update(this, time);
                };
                World.prototype.render = function (ctx, time) {
                    var drawing = new gfx_js_1.Drawing(ctx);
                    this.scene.redraw(this, drawing, time);
                };
                World.prototype.setScene = function (scene) {
                    this.scene = scene;
                    return this;
                };
                World.prototype.advanceTime = function (time, ctx) {
                    this.update(time);
                    this.render(ctx, time);
                };
                return World;
            }());
            exports_1("World", World);
            GameObject = (function () {
                function GameObject() {
                    this.update = null;
                    this.redraw = null;
                    this.hitTest = null;
                    this.clicked = null;
                }
                GameObject.prototype.onUpdate = function (fn) {
                    this.update = fn;
                    return this;
                };
                GameObject.prototype.onRedraw = function (fn) {
                    this.redraw = fn;
                    return this;
                };
                GameObject.prototype.onHit = function (fn) {
                    this.hitTest = fn;
                    return this;
                };
                GameObject.prototype.onClick = function (fn) {
                    this.clicked = fn;
                    return this;
                };
                return GameObject;
            }());
            exports_1("GameObject", GameObject);
            Container = (function (_super) {
                __extends(Container, _super);
                function Container() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.add = function () {
                        var objects = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            objects[_i] = arguments[_i];
                        }
                        return _this.push.apply(_this, objects);
                    };
                    _this.remove = function () {
                        var objects = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            objects[_i] = arguments[_i];
                        }
                        return objects.forEach(function (obj) { return _this.splice(_this.indexOf(obj), 1); });
                    };
                    return _this;
                }
                return Container;
            }(Array));
            exports_1("Container", Container);
            Scene = (function (_super) {
                __extends(Scene, _super);
                function Scene() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.children = new Container();
                    _this.add = _this.children.add;
                    _this.remove = _this.children.remove;
                    _this.screenSize = null;
                    _this.update = function (world, t) {
                        _this.children
                            .filter(function (x) { return x.update !== null; })
                            .forEach(function (x) { return x.update(world, t); });
                    };
                    _this.redraw = function (world, drawing, time) {
                        _this.children
                            .filter(function (x) { return x.redraw !== null; })
                            .forEach(function (x) { return x.redraw(world, drawing, time); });
                    };
                    return _this;
                }
                Scene.prototype.screenResize = function (width, height) {
                    this.screenSize = vec2_js_1.vec2(width, height);
                };
                return Scene;
            }(GameObject));
            exports_1("Scene", Scene);
        }
    };
});
//# sourceMappingURL=world.js.map