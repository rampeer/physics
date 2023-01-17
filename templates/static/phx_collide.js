System.register(["./phx_settings", "./vec2", "./utils.js"], function (exports_1, context_1) {
    "use strict";
    var phx_settings_1, vec2_1, utils_js_1;
    var __moduleName = context_1 && context_1.id;
    function collide(a, b) {
        return new phx_settings_1.Collision();
    }
    function pointSegment(p, seg, radius) {
        var segStart0 = seg[0].from.plus(seg[0].norm.mul(radius)), segStart1 = seg[1].from.plus(seg[1].norm.mul(radius));
        var circleRelativePos0 = vec2_1.vecFromTo(segStart0, p[0].center).project(seg[0].norm);
        var circleRelativePos1 = vec2_1.vecFromTo(segStart1, p[1].center).project(seg[1].norm);
        var height0 = circleRelativePos0.vecNormal.length() * utils_js_1.sign(circleRelativePos0.dotProd), height1 = circleRelativePos1.vecNormal.length() * utils_js_1.sign(circleRelativePos1.dotProd), len0 = circleRelativePos0.vecTangent.length() * utils_js_1.sign(circleRelativePos0.vecTangent.dot(seg[0].dir)), len1 = circleRelativePos1.vecTangent.length() * utils_js_1.sign(circleRelativePos1.vecTangent.dot(seg[1].dir));
        var time = Math.abs(height0) > Math.abs(height1) ?
            1.0 / (height1 / height0 - 1.0) :
            height0 / (height1 - height0);
        var collisionAt = len0 * time + len1 * (1.0 - time);
        return {
            cNorm: undefined,
            cPos: undefined,
            cTang: undefined,
            mA: undefined,
            mB: undefined,
            manifold: height1
        };
    }
    return {
        setters: [
            function (phx_settings_1_1) {
                phx_settings_1 = phx_settings_1_1;
            },
            function (vec2_1_1) {
                vec2_1 = vec2_1_1;
            },
            function (utils_js_1_1) {
                utils_js_1 = utils_js_1_1;
            }
        ],
        execute: function () {
        }
    };
});
//# sourceMappingURL=phx_collide.js.map