import {vec2, Vec2} from "./vec2.js";
import {clip, mobileAndTabletCheck} from "./utils.js";

const CLICK_BUTTON_MOUSE_LEFT = 1;
const CLICK_BUTTON_MOUSE_RIGHT = 2;
const CLICK_BUTTON_MOUSE_WHEEL = 4;

class Pointer {
    public pointer: Vec2; // desired pad position; {-1..+1, -1..+1} vector
    public angle: number; // desired pad rotation; {0.0} is 'horizontal position'
}

//region:Mouse Controls
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
    let lockElement = (
        document.pointerLockElement
        ||
        // @ts-ignore
        document.mozPointerLockElement
    );
    mousePointer.locked = (lockElement === mousePointer.element) && (lockElement != null);
}

function mouseDown(evt: MouseEvent) {
    if (mousePointer === null) return;
    if (mousePointer.locked && mousePointer.trackLockOnly) {
        mousePointer.angleActive = true;
        mousePointer.angleOffset = vec2(
            controlDirection.x / (controlDirection.length() + 1e-3) * mousePointer.angleSensorRadius,
            controlDirection.y / (controlDirection.length() + 1e-3) * mousePointer.angleSensorRadius,
        )
        evt.preventDefault();
    } else {
        lock();
    }
}

function mouseUp(evt: MouseEvent) {
    if (mousePointer === null) return;
    if (mousePointer.locked && mousePointer.trackLockOnly) {
        mousePointer.angleActive = false;
        evt.preventDefault();
    }
}

function mouseMove(evt: MouseEvent) {
    if (mousePointer === null) return;
    if (mousePointer.locked && mousePointer.trackLockOnly) {
        mousePointer.angleActive = (evt.buttons & 0x1) !== 0;
        if (mousePointer.angleActive) {
            mousePointer.angleOffset.x += evt.movementX;
            mousePointer.angleOffset.y += evt.movementY;
        } else {
            mousePointer.dirOffset.x += evt.movementX;
            mousePointer.dirOffset.y += evt.movementY;
        }
        evt.preventDefault();
    }
    controlPosition.x = clip(mousePointer.dirOffset.x / mousePointer.dirSensorSaturation, -1, 1);
    controlPosition.y = clip(mousePointer.dirOffset.y / mousePointer.dirSensorSaturation, -1, 1);
    controlDirection.x = mousePointer.angleOffset.x;
    controlDirection.y = mousePointer.angleOffset.y;
}

export let mousePointer: MousePointerHandler;

class MousePointerHandler {
    public locked: boolean = false;
    readonly element: Element;
    angleSensorRadius: number = 100.0;
    private angleSensorAngularShift: number = -Math.PI / 2;
    dirSensorSaturation: number = 100.0;
    lockable: boolean;
    trackLockOnly: boolean;
    public dirOffset: Vec2 = new Vec2(0.0, 0.0);
    public angleActive: boolean = false;
    public angleOffset: Vec2 = new Vec2(0.0, 0.0);

    constructor(
        element: Element,
        lockable: boolean = true,
        trackLockOnly: boolean = true,
        angleSensorRadius: number = 100.0,
        angleSensorAngularShift: number = -Math.PI / 2,
        dirSensorSaturation: number = 100.0,
    ) {
        this.angleSensorRadius = angleSensorRadius;
        this.angleSensorAngularShift = angleSensorAngularShift;
        this.dirSensorSaturation = dirSensorSaturation;
        this.lockable = lockable;
        this.trackLockOnly = trackLockOnly;
        this.element = element;

        element.requestPointerLock = (
            element.requestPointerLock ||
            // @ts-ignore
            element.mozRequestPointerLock
        );

        document.exitPointerLock = (
            document.exitPointerLock ||
            // @ts-ignore
            document.mozExitPointerLock
        );
        if ("onpointerlockchange" in document) {
            document.addEventListener('pointerlockchange', lockChanged, {});
        }
    }
}

//endregion


//region:Touch Controls

export let touchPointer: TouchScreenHandler;

function handleStart(evt: TouchEvent) {
    if (touchPointer === null) return;
    for (let i = 0; i < evt.changedTouches.length; i++) {
        let touch = evt.changedTouches[i];
        if (touchPointer.angleTouchId === null &&
            (touch.pageX < window.innerWidth * angleSensorWidth)) {
            touchPointer.angleTouchId = touch.identifier;
            let shift = vec2(
                controlDirection.x / (controlDirection.length() + 1e-3) * angleSensorRadius,
                controlDirection.y / (controlDirection.length() + 1e-3) * angleSensorRadius,
            );
            touchPointer.angleOffset = shift;
            touchPointer.angleOrigin = vec2(touch.pageX, touch.pageY).minus(shift);
            touchPointer.angleActive = true;
        } else if (touchPointer.dirTouchId == null &&
            (touch.pageX > window.innerWidth * dirSensorWidth)) {
            touchPointer.dirTouchId = touch.identifier;
            touchPointer.dirActive = true;
            touchPointer.dirOrigin = vec2(touch.pageX, touch.pageY);
            touchPointer.dirOffset = vec2(0, 0);
        }
    }
    evt.preventDefault();

}

function handleMove(evt: TouchEvent) {
    if (touchPointer === null) return;
    for (let i = 0; i < evt.touches.length; i++) {
        let touch = evt.touches[i];
        let touchPos = vec2(touch.pageX, touch.pageY);
        if (touchPointer.dirActive && touchPointer.dirTouchId == touch.identifier) {
            touchPointer.dirOffset = touchPos.minus(touchPointer.dirOrigin);
        }
        if (touchPointer.angleActive && touchPointer.angleTouchId == touch.identifier) {
            touchPointer.angleOffset = touchPos.minus(touchPointer.angleOrigin);
        }
    }
    controlPosition.x = clip(touchPointer.dirOffset.x / dirSensorSaturation, -1, 1);
    controlPosition.y = clip(touchPointer.dirOffset.y / dirSensorSaturation, -1, 1);

    controlDirection.x = touchPointer.angleOffset.x;
    controlDirection.y = touchPointer.angleOffset.y;
    evt.preventDefault();
}

function handleEnd(evt: TouchEvent) {
    if (touchPointer === null) return;
    for (let i = 0; i < evt.changedTouches.length; i++) {
        let touch = evt.changedTouches[i];
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

let angleSensorWidth: number = 0.4;
let dirSensorWidth: number = 0.4;
let angleSensorRadius: number = 100.0;
let dirSensorSaturation: number = 100.0;

export class TouchScreenHandler {
    private canvas: Element;
    public angleTouchId: number = null;
    public angleActive: boolean = false;
    public angleOrigin: Vec2 = vec2(0.0, 0.0);
    public angleOffset: Vec2 = vec2(0.5, -0.5);

    public dirTouchId: number = null;
    public dirActive: boolean = false;
    public dirOrigin: Vec2 = vec2(0, 0);
    public dirOffset: Vec2 = vec2(0, 0);

    constructor(canvas: Element) {
        this.canvas = canvas;
    }
}

//endregion

export let controlPosition: Vec2 = vec2(0, 0);
export let controlDirection: Vec2 = vec2(0, -1.0);

export function initControls(canvas: Element) {
    if (mobileAndTabletCheck()) {
        touchPointer = new TouchScreenHandler(canvas);
        canvas.addEventListener("touchstart", handleStart, false);
        canvas.addEventListener("touchend", handleEnd, false);
        canvas.addEventListener("touchmove", handleMove, false);
    } else {
        mousePointer = new MousePointerHandler(canvas);
        canvas.addEventListener("mousedown", mouseDown);
        canvas.addEventListener("mousemove", mouseMove);
        canvas.addEventListener("mouseup", mouseUp);
    }
}