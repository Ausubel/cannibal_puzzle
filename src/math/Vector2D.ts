export default class Vector2D {
    constructor(public x: number, public y: number) {}
    sum(vector: Vector2D): Vector2D {
        return new Vector2D(this.x + vector.x, this.y + vector.y);
    }
    diff(vector: Vector2D): Vector2D {
        return new Vector2D(this.x - vector.x, this.y - vector.y);
    }
    getMagnitude(): number {
        return Math.sqrt(this.x**2 + this.y**2);
    }
    copy(): Vector2D {
        return new Vector2D(this.x, this.y);
    }
}