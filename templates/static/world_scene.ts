import {Scene, World} from "./world.js";
import {Level} from "./level1";
import {vec2, Vec2} from "./vec2";

export class LevelGameplayScene extends Scene {
    public lvlScreenOffset: Vec2;
    public lvlScreenScale: number;
    public level: Level;

    constructor(level: Level) {
        super();
        this.level = level;
    }

    computeLevelDrawTransform(world: World) {
        let scale = Math.min(
            world.screenSize.x / this.level.arena.width(),
            world.screenSize.y / this.level.arena.height()
        );
        this.lvlScreenOffset = vec2(
            (world.screenSize.x - scale * this.level.arena.width()) / 2,
            (world.screenSize.y - scale * this.level.arena.height()) / 2
        )
        this.lvlScreenScale = scale
    }

    public levelCoordinatesTransform = (ctx: CanvasRenderingContext2D) => {
        ctx.resetTransform();
        ctx.translate(this.lvlScreenOffset.x, this.lvlScreenOffset.y);
        ctx.scale(this.lvlScreenScale, this.lvlScreenScale)
    }
}