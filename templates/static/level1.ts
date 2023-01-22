import {Region, vec2, Vec2} from "./vec2.js";
import {GameObject, GameObjectContainer, Time, TOnRedraw, World} from "./world.js";
import {DEFAULT_GRAVITY, PhysicsEngine} from "./phx.js";
import {Container} from "./utils.js";
import {DrawCircle, DrawPoly, DrawText} from "./gfx_geom.js";
import {BasicTransform} from "./shapes.js";
import {Tree} from "./g_ui.js";

// import {PlayerPaddle} from "./world_player.js";

export class Level extends GameObjectContainer {
    public physics: PhysicsEngine;
    public paddleSpawn: Vec2;
    public paddleArea: Region;
    public bounds: Region;
    public localTransform: BasicTransform = new BasicTransform()
    name = "Level #?"
    typename = "Level"

    constructor(bounds: Region, gravity: number = DEFAULT_GRAVITY) {
        super();
        this.physics = new PhysicsEngine();
        this.add(
            new GameObject().onUpdate(
                (world, t) => {
                    // p.step(t)
                }
            ).named("Physics updater"),
        )
        this.bounds = bounds;
        // this.paddle = new PlayerPaddle(vec2(playerSpawn.x, playerSpawn.y));
        // this.add(this.paddle);
    }
};


function SampleObj() {
    let obj = new GameObject().named("Sample obj");
    let tf = new BasicTransform();
    obj.onRedraw((world, drawing, time) => {
        DrawPoly([vec2(-0.2, -0.2), vec2(0.2, -0.2), vec2(0.2, 0.2), vec2(-0.2, 0.2)],
            null, {strokeColor: "red", lineWidth: 1})(world, drawing, time);
        DrawCircle({x: 0.3, y: 0.3},
            0.1,
            null,
            null, {strokeColor: "black", lineWidth: 1})(world, drawing, time);
    }).onUpdate((world, t) => {
        tf.setAngle(t.ts).setPos(0.1, 0.1)
    })
    return obj;
}

export class Level1 extends Level {
    constructor() {
        super(
            new Region(0.0, 0.0, 2.0, 2.0),
        );
        console.log("!!!!")
        this.add(SampleObj())
        // this.add(
        //     new Wall(vec2(0.0, 1.0), 0.1, 2.0, 0, "red"),
        //     new Wall(vec2(2.0, 1.0), 0.1, 2.0, 0, "red"),
        //     new Wall(vec2(1.5, 0.2), 1.0, 0.05, -0.1, "red"),
        //     new Wall(vec2(0.5, 0.4), 1.0, 0.05, 0.1, "red"),
        //     new Wall(vec2(1.5, 0.6), 1.0, 0.05, -0.1, "red"),
        //     new Wall(vec2(0.5, 0.8), 1.0, 0.05, 0.1, "red"),
        //     new Wall(vec2(1.0, 1.5), 2.0, 0.2, 0.0, "green"),
        //     new TennisBall(vec2(1.75, 0.05))
        // );
    }
}
