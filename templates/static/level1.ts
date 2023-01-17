import {Region, vec2, Vec2} from "./vec2.js";
import {GameObject, GameObjectContainer, Time, World} from "./world.js";
import {DEFAULT_GRAVITY, PhysicsEngine} from "./phx.js";
import {Container} from "./utils.js";
import {CircleDrawer, TextDrawer} from "./gfx_geom.js";
import {BasicTransform} from "./shapes.js";
import {Tree} from "./g_ui.js";

// import {PlayerPaddle} from "./world_player.js";

export class Level extends GameObjectContainer {
    public physics: PhysicsEngine;
    public paddleSpawn: Vec2;
    public paddleArea: Region;
    public bounds: Region;
    public localTransform: BasicTransform = new BasicTransform()

    constructor(bounds: Region, gravity: number = DEFAULT_GRAVITY) {
        super();
        let p = new PhysicsEngine();
        this.physics = p;
        this.add(
            new GameObject().onUpdate(
                (world, t) => {
                    //p.step(t)
                }
            ),
        )
        this.bounds = bounds;
        // this.paddle = new PlayerPaddle(vec2(playerSpawn.x, playerSpawn.y));
        // this.add(this.paddle);
    }
};

function SampleObj() {
    let obj = new GameObject();
    let con = new GameObjectContainer();
    let tf = con.localTransform = new BasicTransform();
    obj.onRedraw(
        CircleDrawer(() => {
            return {radius: 0.1, x: 0.3, y: 0.3}
        })
    ).onUpdate((world, t) => {
        tf.setAngle(t.ts).setPos(0.1, 0.1)
    })
    con.add(obj)
    return con;
}

export class Level1 extends Level {
    constructor() {
        super(
            new Region(0.0, 0.0, 2.0, 2.0),
        );
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
