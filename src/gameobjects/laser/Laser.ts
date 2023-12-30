import Vector2D from "../../math/Vector2D";
import RenderizableGameObject from "../core/RenderizableGameObject";

export type LaserMovementData = {
    speed: number,
    isToForward: boolean
};

export default class Laser extends RenderizableGameObject {
    readonly id: string;
    private readonly sense: number;
    private speed: number;
    constructor(
        position: Vector2D, 
        sprite: HTMLImageElement, 
        movementData: LaserMovementData
    ) {
        super(position.copy(), sprite, 1);
        this.id = crypto.randomUUID();
        this.speed = movementData.speed;
        this.sense = movementData.isToForward ? -1 : 1;
        this.position.x += this.width/2;
    }
    update(): void {
        this.position.y += this.speed * this.sense;
    }
    render(): void {
        const { renderizer } = this.renderProvider;
        renderizer.drawImage(this.sprite, this.position.x, this.position.y, this.width, this.height);
    }
}