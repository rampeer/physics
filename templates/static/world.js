System.register([], function (exports_1, context_1) {
    "use strict";
    var GameObject, Scene, World;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            GameObject = (function () {
                function GameObject(draw, update) {
                    if (draw === void 0) { draw = null; }
                    if (update === void 0) { update = null; }
                    this.children = [];
                    this.draw = draw;
                    this.update = update;
                }
                GameObject.prototype.add = function () {
                    var _a;
                    var children = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        children[_i] = arguments[_i];
                    }
                    (_a = this.children).push.apply(_a, children);
                };
                return GameObject;
            }());
            exports_1("GameObject", GameObject);
            Scene = (function () {
                function Scene() {
                    this.children = [];
                    this.draw = null;
                    this.update = null;
                }
                Scene.prototype.add = function () {
                    var _a;
                    var objects = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        objects[_i] = arguments[_i];
                    }
                    (_a = this.children).push.apply(_a, objects);
                };
                Scene.prototype.remove = function () {
                    var objects = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        objects[_i] = arguments[_i];
                    }
                    for (var _a = 0, objects_1 = objects; _a < objects_1.length; _a++) {
                        var obj = objects_1[_a];
                        this.children.splice(this.children.indexOf(obj), 1);
                    }
                };
                Scene.prototype.drawFunctions = function () {
                    var recurse = function (o) {
                        var elements = (o.children
                            .map(function (c) { return recurse(c); })
                            .reduce(function (a, v) { return a.concat(v); }));
                        if (o.draw)
                            elements.unshift(o.draw);
                        return elements;
                    };
                    return recurse(this);
                };
                Scene.prototype.updateFunctions = function () {
                    var recurse = function (o) {
                        var elements = (o.children
                            .map(function (c) { return recurse(c); })
                            .reduce(function (a, v) { return a.concat(v); }));
                        if (o.update)
                            elements.unshift(o.update);
                        return elements;
                    };
                    return recurse(this);
                };
                return Scene;
            }());
            exports_1("Scene", Scene);
            World = (function () {
                function World(gfx, upd) {
                    this.scene = null;
                    this.gfx = gfx;
                    this.upd = upd;
                }
                World.prototype.screenResize = function (width, height) {
                    this.screenSize.set(width, height);
                };
                World.prototype.setScene = function (scene) {
                    this.scene = scene;
                    return this;
                };
                World.prototype.advance = function (time, ctx) {
                    this.upd.advance(this, time);
                    this.gfx.render(this, ctx);
                };
                return World;
            }());
            exports_1("World", World);
        }
    };
});
//# sourceMappingURL=world.js.map