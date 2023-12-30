import Vector2D from "../../math/Vector2D";

export default abstract class GameObject {
    protected _position: Vector2D;
    constructor(position: Vector2D) {
        this._position = position;
    }
    get position() {
        return this._position;
    }
    abstract update(): void;
    abstract render(): void;
}