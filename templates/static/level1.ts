import {Wall, TennisBall} from "./world_geom.js";
import {Region, vec2, Vec2} from "./vec2.js";
import {GameObject} from "./world.js";
// import {PlayerPaddle} from "./world_player.js";

export class Level extends GameObject {
    public paddleSpawn: Vec2;
    public paddleArea: Region;
    // public paddle: PlayerPaddle;
    public arena: Region;
    protected gravity: number;

    constructor(playerSpawn: Vec2, arena: Region, paddleArea: Region, gravity: number) {
        super();
        this.paddleSpawn = playerSpawn;
        this.paddleArea = paddleArea;
        this.arena = arena;
        this.gravity = gravity;
        // this.paddle = new PlayerPaddle(vec2(playerSpawn.x, playerSpawn.y));
        // this.add(this.paddle);
    }
};

export class Level1 extends Level {
    constructor() {
        super(vec2(0.25, 0.01),
            new Region(0.0, 0.0, 2.0, 2.0),
            new Region(0.1, 1.9, 1.6, 1.9),
            0.1);
        this.add(
            new Wall(vec2(0.0, 1.0), 0.1, 2.0, 0, "red"),
            new Wall(vec2(2.0, 1.0), 0.1, 2.0, 0, "red"),
            new Wall(vec2(1.5, 0.2), 1.0, 0.05, -0.1, "red"),
            new Wall(vec2(0.5, 0.4), 1.0, 0.05, 0.1, "red"),
            new Wall(vec2(1.5, 0.6), 1.0, 0.05, -0.1, "red"),
            new Wall(vec2(0.5, 0.8), 1.0, 0.05, 0.1, "red"),
            new Wall(vec2(1.0, 1.5), 2.0, 0.2, 0.0, "green"),
            new TennisBall(vec2(1.75, 0.05))
        );
    }
}
