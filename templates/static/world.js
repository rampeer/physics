System.register(["./vec2.js", "./gfx.js", "./utils.js", "./shapes.js"], function (exports_1, context_1) {
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
    var vec2_js_1, gfx_js_1, utils_js_1, shapes_js_1, World, GameObject, GameObjectContainer, Scene;
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
            },
            function (utils_js_1_1) {
                utils_js_1 = utils_js_1_1;
            },
            function (shapes_js_1_1) {
                shapes_js_1 = shapes_js_1_1;
            }
        ],
        execute: function () {
            World = (function () {
                function World(container, ctx) {
                    this.scene = null;
                    this.container = null;
                    this.container = container;
                    this.drawUtils = new gfx_js_1.DrawUtils(ctx);
                }
                World.prototype.getSize = function () {
                    var r = this.container.getBoundingClientRect();
                    return vec2_js_1.vec2(r.width, r.height);
                };
                World.prototype.setScene = function (scene) {
                    this.scene = scene;
                    return this;
                };
                World.prototype.frame = function (time) {
                    this.scene.update(this, time);
                    this.scene.redraw(this, this.drawUtils, time);
                };
                return World;
            }());
            exports_1("World", World);
            GameObject = (function () {
                function GameObject() {
                    this.localTransform = null;
                    this.screenTransform = null;
                    this.update = null;
                    this.name = "Unknown";
                    this.typename = "Game object";
                    this.redraw = null;
                    this.hitTest = null;
                    this.clicked = null;
                }
                GameObject.prototype.named = function (typename, name) {
                    this.name = name || typename;
                    this.typename = typename;
                    return this;
                };
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
            GameObjectContainer = (function (_super) {
                __extends(GameObjectContainer, _super);
                function GameObjectContainer() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.children = new utils_js_1.Container();
                    _this.add = _this.children.add;
                    _this.remove = _this.children.remove;
                    _this.typename = "Container";
                    _this.update = function (world, t) {
                        _this.children
                            .filter(function (x) { return x.update !== null; })
                            .forEach(function (x) { return x.update(world, t); });
                    };
                    _this.redraw = function (world, drawing, time) {
                        if (_this.localTransform)
                            drawing.pushTransform(_this.localTransform);
                        _this.children
                            .filter(function (x) { return x.redraw !== null; })
                            .forEach(function (x) { return x.redraw(world, drawing, time); });
                        if (_this.localTransform)
                            drawing.popTransform();
                    };
                    return _this;
                }
                return GameObjectContainer;
            }(GameObject));
            exports_1("GameObjectContainer", GameObjectContainer);
            Scene = (function (_super) {
                __extends(Scene, _super);
                function Scene() {
                    var _this = _super.call(this) || this;
                    _this.screenSize = null;
                    _this.typename = "Scene";
                    _this.localTransform = new shapes_js_1.BasicTransform();
                    return _this;
                }
                Scene.prototype.screenResize = function (width, height) {
                    this.screenSize = vec2_js_1.vec2(width, height);
                };
                return Scene;
            }(GameObjectContainer));
            exports_1("Scene", Scene);
        }
    };
});
//# sourceMappingURL=world.js.map