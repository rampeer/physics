System.register([], function (exports_1, context_1) {
    "use strict";
    var Inertia, SurfaceMaterial, Collision, MeshSegment, MeshPoly, MeshPoint, Mesh, MeshUnion, SolidBody, Impulse;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            Inertia = (function () {
                function Inertia(value, fixed) {
                    if (fixed === void 0) { fixed = false; }
                    this.value = value;
                    this.fixed = fixed;
                }
                Inertia.ratio = function (a, b) {
                    if (a.fixed && b.fixed)
                        throw Error();
                    if (a.fixed)
                        return { a: 1.0, b: 0.0 };
                    if (b.fixed)
                        return { a: 0.0, b: 1.0 };
                    return { a: a.value / (a.value + b.value), b: b.value / (a.value + b.value) };
                };
                return Inertia;
            }());
            exports_1("Inertia", Inertia);
            SurfaceMaterial = (function () {
                function SurfaceMaterial(restitution, stickiness) {
                    this.restitution = restitution;
                    this.stickiness = stickiness;
                }
                return SurfaceMaterial;
            }());
            exports_1("SurfaceMaterial", SurfaceMaterial);
            Collision = (function () {
                function Collision() {
                }
                return Collision;
            }());
            exports_1("Collision", Collision);
            MeshSegment = (function () {
                function MeshSegment() {
                }
                return MeshSegment;
            }());
            MeshPoly = (function () {
                function MeshPoly() {
                }
                return MeshPoly;
            }());
            MeshPoint = (function () {
                function MeshPoint() {
                }
                return MeshPoint;
            }());
            Mesh = (function () {
                function Mesh() {
                }
                return Mesh;
            }());
            MeshUnion = (function () {
                function MeshUnion() {
                }
                return MeshUnion;
            }());
            SolidBody = (function () {
                function SolidBody() {
                }
                return SolidBody;
            }());
            exports_1("SolidBody", SolidBody);
            Impulse = (function () {
                function Impulse(at, value) {
                    this.at = at;
                    this.value = value;
                }
                return Impulse;
            }());
            exports_1("Impulse", Impulse);
        }
    };
});
//# sourceMappingURL=phx_settings.js.map