import {Vec2} from "./vec2";

class Geom {

}

class Circle extends Geom {
    radius: number
}

class Segment extends Geom {
    to: Vec2
}

class Wrapper extends Geom {
    item: Geom
}

class Multiple extends Geom {
    items: Geom[]
}

class Offset extends Wrapper {

}

class Rotate extends Wrapper {

}