import {GameObject, GameObjectContainer} from "./world.js";
import {TextDrawer} from "./gfx_geom.js";
import {vec2} from "./vec2.js";
import {DrawUtils} from "./gfx.js";

export function FPSCounter() {
    let counter = 0, nextReset = 0, fps = 0;
    return new GameObject().onUpdate(
        (world, t) => {
            counter += 1
            if (t.ts > nextReset) {
                fps = counter
                counter = 0
                nextReset = t.ts + 1.0
            }
        }
    ).onRedraw(
        TextDrawer(
            () => vec2(10.0, 10.0),
            () => `FPS: ${fps}`
        )
    )
}

class Node {
    children: Node[] = []
    obj: GameObject
    index: number
    lastIndex: number
    level: number
    text: string
}

export function Tree() {
    let root: Node = new Node()
    let updateThunk = (level: number, index: number, n: Node, o: GameObject) => {
        n.level = level
        n.index = n.lastIndex = index
        n.children = [];
        let oProto = Object.getPrototypeOf(o)
        let text = oProto.constructor["name"] || "???"
        // for (const key of Object.getOwnPropertyNames(o)) {
        //     let value = Object.getOwnPropertyDescriptor(o, key)
        //     if (value) {
        //         if (value !== Object.getOwnPropertyDescriptor(oProto, key)) {
        //             console.log(o, key, value)
        //             text += "\n" + key + Object.getPrototypeOf(value).constructor["name"]
        //         }
        //     }
        // }
        n.text = `${n.index}: ${text}`;
        if (o instanceof GameObjectContainer) {
            for (const c of o["children"]) {
                let nc = updateThunk(level + 1, n.lastIndex + 1, new Node(), c)
                n.children.push(nc)
                n.lastIndex = nc.lastIndex
            }
        }
        return n
    }
    let drawNode = (drawing: DrawUtils, n: Node) => {
        drawing.text({
                x: n.level * 70,
                y: n.index * 50
            },
            `${n.level} ${n.index} : ${n.text}`)
        n.children.forEach(x => drawNode(drawing, x))
    }
    return new GameObject().onUpdate((world) => {
        root = updateThunk(0, 0, new Node(), world.scene)
    }).onRedraw(((world, drawing, time) => {
        drawNode(drawing, root)
        throw Error()
    }))
}