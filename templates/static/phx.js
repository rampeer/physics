System.register(["./utils.js"], function (exports_1, context_1) {
    "use strict";
    var utils_js_1, PhysicsSettings, sign, signz, ind, DEFAULT_GRAVITY, PhysicsEngine;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (utils_js_1_1) {
                utils_js_1 = utils_js_1_1;
            }
        ],
        execute: function () {
            exports_1("PhysicsSettings", PhysicsSettings = {
                maxStepTime: 0.02,
                skinThickness: 0.001
            });
            sign = function (x) { return x > 0 ? +1.0 : -1.0; };
            signz = function (x, tol) {
                if (tol === void 0) { tol = 1e-6; }
                return x > tol ? +1.0 : x < -tol ? -1 : 0.0;
            };
            ind = function (x) { return x ? 1.0 : 0.0; };
            exports_1("DEFAULT_GRAVITY", DEFAULT_GRAVITY = 9.8);
            PhysicsEngine = (function () {
                function PhysicsEngine(gravity) {
                    if (gravity === void 0) { gravity = DEFAULT_GRAVITY; }
                    this.active = true;
                    this.lastTs = null;
                    this.nextFrameTime = null;
                    this.time = null;
                    this.objects = new utils_js_1.Container();
                    this.gravity = gravity;
                }
                PhysicsEngine.prototype.step = function (timer) {
                    if (this.lastTs === null || !this.active) {
                        this.lastTs = timer.ts;
                        this.time = 0.0;
                    }
                    this.time += timer.ts - this.lastTs;
                    this.lastTs = timer.ts;
                    while (this.nextFrameTime === null || this.nextFrameTime > this.time) {
                        this.nextFrameTime += PhysicsSettings.maxStepTime;
                        this._step(this.time, this.nextFrameTime);
                    }
                };
                PhysicsEngine.prototype.detectContacts = function () {
                    return null;
                };
                PhysicsEngine.prototype._step = function (ts, dt) {
                    console.log(ts, dt);
                    var toUpdate = [];
                    for (var _i = 0, _a = this.objects; _i < _a.length; _i++) {
                        var b = _a[_i];
                        if (b.state.ts < ts) {
                            toUpdate.push(b);
                        }
                    }
                    if (!toUpdate)
                        return;
                };
                return PhysicsEngine;
            }());
            exports_1("PhysicsEngine", PhysicsEngine);
        }
    };
});
//# sourceMappingURL=phx.js.map