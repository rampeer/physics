import {GameObject, GameObjectContainer, Time, World} from "./world.js";
import {DrawText} from "./gfx_geom.js";
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
        (w, d) => {
            let r = w.getSize()
            DrawText(vec2(50, r.y - 50),
                `FPS: ${fps}`,
                {fontSize: 30},
                {fillColor: "red"})(w, d)
        }
    ).named("FPS Counter")
}


export function Tree() {
    class Node {
        children: Node[] = []
        index: number
        lastIndex: number
        level: number
        text: string
    }

    let root: Node;
    let rebuildTree = (level: number, index: number, n: Node, obj: GameObject) => {
        n.lastIndex = n.index = index
        n.level = level
        let name = obj.name || Object.getPrototypeOf(obj).constructor["name"]
        let typename = obj.typename
        n.text = `${n.index}: '${name}' (${typename})`
        if (obj instanceof GameObjectContainer) {
            for (const child of obj["children"]) {
                let childNode = rebuildTree(
                    level + 1, index += 1, new Node(), child
                )
                n.children.push(childNode)
                n.lastIndex = index = childNode.lastIndex
            }
        }
        return n
    }
    let drawNode = (world: World, drawing: DrawUtils, time: Time, n?: Node) => {
        DrawText({x: n.level * 40, y: n.index * 40}, n.text)(world, drawing)
        n.children.forEach(x => drawNode(world, drawing, time, x))
    }
    return new GameObject().onUpdate((world) => {
        root = rebuildTree(0, 0, new Node(), world.scene)
    }).onRedraw((world, drawing, time) =>
        drawNode(world, drawing, time, root)
    ).named("Object tree debug")
}