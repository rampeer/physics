import {World} from "./world.js";

export class Time {
    public ts: number;
    public dt: number;

    constructor(ts: number, dt: number) {
        this.ts = ts;
        this.dt = dt;
    }
}

export type UpdateFunction = {
    order: number,
    update: (world: World, t: Time) => void
}

export class UpdateLogicEngine {
    advanceTime(world: World, timer: Time) {
        for (let e of world.scene.updateFunctions()) {
            e.update(world, timer);
        }
    }
}
