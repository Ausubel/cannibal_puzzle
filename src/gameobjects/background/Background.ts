import Colors from "../../assetmanagers/Colors";
import RenderProvider from "../../main/RenderProvider";
import Vector2D from "../../math/Vector2D";
import GameObject from "../core/GameObject";
import StarController from "./Star/StarController";

export default class Background extends GameObject {
    private renderProvider: RenderProvider;
    private starController: StarController;
    constructor() {
        super(new Vector2D(0, 0));
        this.renderProvider = RenderProvider.getInstance();
        this.starController = new StarController(60, 11);
    }
    update(): void {
        this.starController.followPath();
    }
    render(): void {
        const { renderizer, canvasSize } = this.renderProvider;
        renderizer.fillStyle = Colors.Space;
        renderizer.fillRect(
            0, 0, 
            canvasSize.width, canvasSize.height
        );
        this.starController.render();
    }
}