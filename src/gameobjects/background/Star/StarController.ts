import RenderProvider from "../../../main/RenderProvider";
import CanvasSize from "../../../main/CanvasSize";
import Vector2D from "../../../math/Vector2D";
import Star from "./Star";
import generateRandomNumber from "../../../math/GenerateRandomNumber";

export default class StarController{
    private stars: Array<Star>;
    private renderProvider: RenderProvider;
    private quantity: number;
    private speed: number;
    constructor(
        quantity: number,
        speed: number,
        ) {
        this.stars = new Array<Star>();
        this.renderProvider = RenderProvider.getInstance();
        this.quantity = quantity;
        this.speed = speed;
        this.init();
    }
    private isOutOfBounds(star: Star): boolean { 
        const { height } = this.renderProvider.canvasSize;
        const yCoordinate = star.position.y;
        return yCoordinate > height;
    }
    init(){
        for (let i = 0; i < this.quantity; i++) {
            const position = this.setPosition(this.renderProvider.canvasSize);
            this.create(position);
        }
    }
    private setPosition({ width, height }: CanvasSize) {
        const randomXCoordinate = generateRandomNumber(width);
        const randomYCoordinate = generateRandomNumber(height);
        return new Vector2D(randomXCoordinate, randomYCoordinate);
    }
    create(position: Vector2D) {
        const star = new Star(position, this.speed);
        this.stars.push(star);
    }
    followPath() {
        this.stars.forEach(star => {
            star.update();
            if (this.isOutOfBounds(star)) 
                star.startAgain(star);
        });
    }
    render() {
        this.stars.forEach(star => star.render());
    }
}