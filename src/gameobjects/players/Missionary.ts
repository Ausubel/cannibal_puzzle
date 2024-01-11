import SpriteProvider from "../../assetmanagers/SpriteProvider";
import Vector2D from "../../math/Vector2D";
import RenderizableGameObject from "../core/RenderizableGameObject";
import SprriteAnimator from "../../animation/SpriteAnimator";
import ConfigurationPlayer from "./core/ConfigurationPlayer";

export default class Player extends RenderizableGameObject {
    private idleAnimation: SprriteAnimator;
    constructor(
        position: Vector2D
    ) {
        const spriteManager = SpriteProvider.spriteManager;
        const sprites = spriteManager.MISSIONARY;
        super(position, sprites[0], 0.1);
        this.idleAnimation = new SprriteAnimator(sprites, ConfigurationPlayer.IDLE_ANIMATION_INTERVAL);
    }

    update(): void {
        this.idleAnimation.update();
    }
    render(): void {
        this.sprite = this.idleAnimation.getCurrentFrame();
        const { renderizer } = this.renderProvider;
        renderizer.drawImage(
            this.sprite,
            this._position.x, this._position.y,
            this.width,
            this.height
        );
    }
}