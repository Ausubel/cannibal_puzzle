import SpriteProvider from "../../assetmanagers/SpriteProvider";
import RenderProvider from "../../main/RenderProvider";
import Vector2D from "../../math/Vector2D";
import GameObject from "../core/GameObject";

export default class Background extends GameObject {
    private backgroundImage: HTMLImageElement;
    private renderProvider: RenderProvider = RenderProvider.getInstance();
    constructor() {
        super(new Vector2D(0, 0));
        const spriteManager = SpriteProvider.spriteManager;
        this.backgroundImage = spriteManager.BACKGROUND;
        
    }
    update(): void {
    }
    render(): void {
        const { renderizer, canvasSize } = this.renderProvider;
        renderizer.drawImage(
            this.backgroundImage,
            0,
            0,
            canvasSize.width,
            canvasSize.height
        );
    }
    get width(): number {
        return this.renderProvider.canvasSize.width;
    }
    get height(): number {
        return this.renderProvider.canvasSize.height;
    }
}