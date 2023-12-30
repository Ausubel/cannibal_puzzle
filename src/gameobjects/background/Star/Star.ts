import Vector2D from "../../../math/Vector2D";
import RenderProvider from "../../../main/RenderProvider";
import GameObject from "../../core/GameObject";
import generateRandomNumber from "../../../math/GenerateRandomNumber";

export default class Star extends GameObject{
    private speed: number;
    private renderProvider: RenderProvider;
    private readonly sense: number;
    private readonly scale: number;
    readonly size: number;
    constructor (
        position: Vector2D,
        speed: number,
    ) {
        super(position.copy());
        this.renderProvider = RenderProvider.getInstance();
        this.speed = speed;
        this.sense = 1;
        this.scale = 8;
        this.size = generateRandomNumber(this.scale);
    }
    startAgain(star: Star): void {
        const {width } = this.renderProvider.canvasSize;
        star.position.x = generateRandomNumber(width);
        star.position.y = 0;
    }
    update(): void {
        this.position.y += this.speed * this.sense;
    }
    render(): void {
        const { renderizer } = this.renderProvider;
        renderizer.fillStyle = "#ffffff";
        renderizer.fillRect(this.position.x, this.position.y, this.size, this.size);
    }
}