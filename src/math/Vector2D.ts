export default class Vector2D {
    constructor(public x: number, public y: number) {}
    add(vector: Vector2D) {
        this.x += vector.x;
        this.y += vector.y;
    }
    diff(vector: Vector2D) {
        this.x -= vector.x;
        this.y -= vector.y;
    }
    copy() {
        return new Vector2D(this.x, this.y);
    }
}