System.register(["./vec2.js", "./utils.js"], function (exports_1, context_1) {
    "use strict";
    var vec2_js_1, utils_js_1, CLICK_BUTTON_MOUSE_LEFT, CLICK_BUTTON_MOUSE_RIGHT, CLICK_BUTTON_MOUSE_WHEEL, Pointer, mousePointer, MousePointerHandler, touchPointer, angleSensorWidth, dirSensorWidth, angleSensorRadius, dirSensorSaturation, TouchScreenHandler, controlPosition, controlDirection;
    var __moduleName = context_1 && context_1.id;
    function lock() {
        if (!mousePointer.locked && mousePointer.lockable) {
            mousePointer.element.requestPointerLock();
        }
    }
    function unlock() {
        if (mousePointer.locked && mousePointer.lockable) {
            document.exitPointerLock();
        }
    }
    function lockChanged() {
        var lockElement = (document.pointerLockElement
            ||
                document.mozPointerLockElement);
        mousePointer.locked = (lockElement === mousePointer.element) && (lockElement != null);
    }
    function mouseDown(evt) {
        if (mousePointer === null)
            return;
        if (mousePointer.locked && mousePointer.trackLockOnly) {
            mousePointer.angleActive = true;
            mousePointer.angleOffset = vec2_js_1.vec2(controlDirection.x / (controlDirection.length() + 1e-3) * mousePointer.angleSensorRadius, controlDirection.y / (controlDirection.length() + 1e-3) * mousePointer.angleSensorRadius);
            evt.preventDefault();
        }
        else {
            lock();
        }
    }
    function mouseUp(evt) {
        if (mousePointer === null)
            return;
        if (mousePointer.locked && mousePointer.trackLockOnly) {
            mousePointer.angleActive = false;
            evt.preventDefault();
        }
    }
    function mouseMove(evt) {
        if (mousePointer === null)
            return;
        if (mousePointer.locked && mousePointer.trackLockOnly) {
            mousePointer.angleActive = (evt.buttons & 0x1) !== 0;
            if (mousePointer.angleActive) {
                mousePointer.angleOffset.x += evt.movementX;
                mousePointer.angleOffset.y += evt.movementY;
            }
            else {
                mousePointer.dirOffset.x += evt.movementX;
                mousePointer.dirOffset.y += evt.movementY;
            }
            evt.preventDefault();
        }
        controlPosition.x = utils_js_1.clip(mousePointer.dirOffset.x / mousePointer.dirSensorSaturation, -1, 1);
        controlPosition.y = utils_js_1.clip(mousePointer.dirOffset.y / mousePointer.dirSensorSaturation, -1, 1);
        controlDirection.x = mousePointer.angleOffset.x;
        controlDirection.y = mousePointer.angleOffset.y;
    }
    function handleStart(evt) {
        if (touchPointer === null)
            return;
        for (var i = 0; i < evt.changedTouches.length; i++) {
            var touch = evt.changedTouches[i];
            if (touchPointer.angleTouchId === null &&
                (touch.pageX < window.innerWidth * angleSensorWidth)) {
                touchPointer.angleTouchId = touch.identifier;
                var shift = vec2_js_1.vec2(controlDirection.x / (controlDirection.length() + 1e-3) * angleSensorRadius, controlDirection.y / (controlDirection.length() + 1e-3) * angleSensorRadius);
                touchPointer.angleOffset = shift;
                touchPointer.angleOrigin = vec2_js_1.vec2(touch.pageX, touch.pageY).minus(shift);
                touchPointer.angleActive = true;
            }
            else if (touchPointer.dirTouchId == null &&
                (touch.pageX > window.innerWidth * dirSensorWidth)) {
                touchPointer.dirTouchId = touch.identifier;
                touchPointer.dirActive = true;
                touchPointer.dirOrigin = vec2_js_1.vec2(touch.pageX, touch.pageY);
                touchPointer.dirOffset = vec2_js_1.vec2(0, 0);
            }
        }
        evt.preventDefault();
    }
    function handleMove(evt) {
        if (touchPointer === null)
            return;
        for (var i = 0; i < evt.touches.length; i++) {
            var touch = evt.touches[i];
            var touchPos = vec2_js_1.vec2(touch.pageX, touch.pageY);
            if (touchPointer.dirActive && touchPointer.dirTouchId == touch.identifier) {
                touchPointer.dirOffset = touchPos.minus(touchPointer.dirOrigin);
            }
            if (touchPointer.angleActive && touchPointer.angleTouchId == touch.identifier) {
                touchPointer.angleOffset = touchPos.minus(touchPointer.angleOrigin);
            }
        }
        controlPosition.x = utils_js_1.clip(touchPointer.dirOffset.x / dirSensorSaturation, -1, 1);
        controlPosition.y = utils_js_1.clip(touchPointer.dirOffset.y / dirSensorSaturation, -1, 1);
        controlDirection.x = touchPointer.angleOffset.x;
        controlDirection.y = touchPointer.angleOffset.y;
        evt.preventDefault();
    }
    function handleEnd(evt) {
        if (touchPointer === null)
            return;
        for (var i = 0; i < evt.changedTouches.length; i++) {
            var touch = evt.changedTouches[i];
            if (touch.identifier == touchPointer.angleTouchId) {
                touchPointer.angleTouchId = null;
                touchPointer.angleActive = false;
            }
            if (touch.identifier == touchPointer.dirTouchId) {
                touchPointer.dirTouchId = null;
                touchPointer.dirActive = false;
            }
        }
        evt.preventDefault();
    }
    function initControls(canvas) {
        if (utils_js_1.mobileAndTabletCheck()) {
            exports_1("touchPointer", touchPointer = new TouchScreenHandler(canvas));
        }
        else {
            exports_1("mousePointer", mousePointer = new MousePointerHandler(canvas));
        }
        canvas.addEventListener("touchstart", handleStart, false);
        canvas.addEventListener("touchend", handleEnd, false);
        canvas.addEventListener("touchmove", handleMove, false);
        canvas.addEventListener("mousedown", mouseDown);
        canvas.addEventListener("mousemove", mouseMove);
        canvas.addEventListener("mouseup", mouseUp);
    }
    exports_1("initControls", initControls);
    return {
        setters: [
            function (vec2_js_1_1) {
                vec2_js_1 = vec2_js_1_1;
            },
            function (utils_js_1_1) {
                utils_js_1 = utils_js_1_1;
            }
        ],
        execute: function () {
            CLICK_BUTTON_MOUSE_LEFT = 1;
            CLICK_BUTTON_MOUSE_RIGHT = 2;
            CLICK_BUTTON_MOUSE_WHEEL = 4;
            Pointer = (function () {
                function Pointer() {
                }
                return Pointer;
            }());
            MousePointerHandler = (function () {
                function MousePointerHandler(element, lockable, trackLockOnly, angleSensorRadius, angleSensorAngularShift, dirSensorSaturation) {
                    if (lockable === void 0) { lockable = true; }
                    if (trackLockOnly === void 0) { trackLockOnly = true; }
                    if (angleSensorRadius === void 0) { angleSensorRadius = 100.0; }
                    if (angleSensorAngularShift === void 0) { angleSensorAngularShift = -Math.PI / 2; }
                    if (dirSensorSaturation === void 0) { dirSensorSaturation = 100.0; }
                    this.locked = false;
                    this.angleSensorRadius = 100.0;
                    this.angleSensorAngularShift = -Math.PI / 2;
                    this.dirSensorSaturation = 100.0;
                    this.dirOffset = new vec2_js_1.Vec2(0.0, 0.0);
                    this.angleActive = false;
                    this.angleOffset = new vec2_js_1.Vec2(0.0, 0.0);
                    this.angleSensorRadius = angleSensorRadius;
                    this.angleSensorAngularShift = angleSensorAngularShift;
                    this.dirSensorSaturation = dirSensorSaturation;
                    this.lockable = lockable;
                    this.trackLockOnly = trackLockOnly;
                    this.element = element;
                    element.requestPointerLock = (element.requestPointerLock ||
                        element.mozRequestPointerLock);
                    document.exitPointerLock = (document.exitPointerLock ||
                        document.mozExitPointerLock);
                    if ("onpointerlockchange" in document) {
                        document.addEventListener('pointerlockchange', lockChanged, {});
                    }
                }
                return MousePointerHandler;
            }());
            angleSensorWidth = 0.4;
            dirSensorWidth = 0.4;
            angleSensorRadius = 100.0;
            dirSensorSaturation = 100.0;
            TouchScreenHandler = (function () {
                function TouchScreenHandler(canvas) {
                    this.angleTouchId = null;
                    this.angleActive = false;
                    this.angleOrigin = vec2_js_1.vec2(0.0, 0.0);
                    this.angleOffset = vec2_js_1.vec2(0.5, -0.5);
                    this.dirTouchId = null;
                    this.dirActive = false;
                    this.dirOrigin = vec2_js_1.vec2(0, 0);
                    this.dirOffset = vec2_js_1.vec2(0, 0);
                    this.canvas = canvas;
                }
                return TouchScreenHandler;
            }());
            exports_1("TouchScreenHandler", TouchScreenHandler);
            exports_1("controlPosition", controlPosition = vec2_js_1.vec2(0, 0));
            exports_1("controlDirection", controlDirection = vec2_js_1.vec2(0, -1.0));
        }
    };
});
//# sourceMappingURL=controls.js.map