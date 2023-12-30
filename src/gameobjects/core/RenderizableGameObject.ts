import RenderProvider from "../../main/RenderProvider";
import Vector2D from "../../math/Vector2D";
import GameObject from "./GameObject";

export default abstract class RenderizableGameObject extends GameObject {
    protected scale: number;
    protected sprite: HTMLImageElement;
    protected renderProvider: RenderProvider;
    constructor(position: Vector2D, sprite: HTMLImageElement, scale: number) {
        super(position);
        this.sprite = sprite;
        this.renderProvider = RenderProvider.getInstance();
        this.scale = scale;
    }
    get width() {
        return this.sprite.width * this.scale;
    }
    get height() {
        return this.sprite.height * this.scale;
    }
    abstract update(): void;
    abstract render(): void;
}