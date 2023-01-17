import {Collision, SolidBody} from "./phx_settings";
import {Vec2, vecFromTo} from "./vec2";
import {CircleShape, Segment} from "./shapes.js";
import {sign} from "./utils.js";

function collide(a: SolidBody, b: SolidBody): Collision {
    return new Collision()
}

function pointSegment(
    p: { 0: CircleShape, 1: CircleShape },
    seg: { 0: Segment, 1: Segment },
    radius: number
): object {
    // segment start point, but offset by `radius` along the normal
    let segStart0 = seg[0].from.plus(seg[0].norm.mul(radius)),
        segStart1 = seg[1].from.plus(seg[1].norm.mul(radius))

    // circle position, but 'relative' to the segment start
    // (and broken into 'segment-normal' and 'segment-tangential' parts
    let circleRelativePos0 = vecFromTo(segStart0, p[0].center).project(seg[0].norm);
    let circleRelativePos1 = vecFromTo(segStart1, p[1].center).project(seg[1].norm);

    // signed height above the segment (>0 means 'outside')
    // signed dist between segment start and circle position projection onto <seg start; seg end> line
    // (>0 means it lies 'after' start point)
    let height0 = circleRelativePos0.vecNormal.length() * sign(circleRelativePos0.dotProd),
        height1 = circleRelativePos1.vecNormal.length() * sign(circleRelativePos1.dotProd),
        len0 = circleRelativePos0.vecTangent.length() * sign(circleRelativePos0.vecTangent.dot(seg[0].dir)),
        len1 = circleRelativePos1.vecTangent.length() * sign(circleRelativePos1.vecTangent.dot(seg[1].dir))
    let time = Math.abs(height0) > Math.abs(height1) ?
        1.0 / (height1 / height0 - 1.0) :
        height0 / (height1 - height0)
    let collisionAt = len0 * time + len1 * (1.0 - time)

    return {
        cNorm: undefined,
        cPos: undefined,
        cTang: undefined,
        mA: undefined,
        mB: undefined,
        manifold: height1
    }
}