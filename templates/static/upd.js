System.register(["./utils.js"], function (exports_1, context_1) {
    "use strict";
    var utils_js_1, Time, UpdateLogicEngine;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (utils_js_1_1) {
                utils_js_1 = utils_js_1_1;
            }
        ],
        execute: function () {
            Time = (function () {
                function Time(ts, dt) {
                    this.ts = ts;
                    this.dt = dt;
                }
                return Time;
            }());
            exports_1("Time", Time);
            UpdateLogicEngine = (function () {
                function UpdateLogicEngine() {
                }
                UpdateLogicEngine.prototype.advance = function (world, timer) {
                    var children = world.scene
                        .updateFunctions()
                        .sort(function (a, b) { return utils_js_1.sign(a.order - b.order); });
                    for (var _i = 0, children_1 = children; _i < children_1.length; _i++) {
                        var e = children_1[_i];
                        e.update(world, timer);
                    }
                };
                return UpdateLogicEngine;
            }());
            exports_1("UpdateLogicEngine", UpdateLogicEngine);
        }
    };
});
//# sourceMappingURL=upd.js.map