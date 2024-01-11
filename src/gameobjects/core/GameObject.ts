import Vector2D from "../../math/Vector2D";

export default abstract class GameObject {
    protected _position: Vector2D;
    constructor(position: Vector2D) {
        this._position = position;
    }
    get position(): Vector2D {
        return this._position;
    }
    getCenter(): Vector2D {
        return new Vector2D(
            this.position.x + this.width/2,
            this.position.y + this.height/2,
        );
    }
    abstract update(): void;
    abstract render(): void;
    abstract get width(): number;
    abstract get height(): number;
}