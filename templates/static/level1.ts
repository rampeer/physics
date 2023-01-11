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
