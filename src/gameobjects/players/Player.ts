import Vector2D from "./../../math/Vector2D";
import RenderizableGameObject from "./../core/RenderizableGameObject";
import SpriteAnimator from "./../../animation/SpriteAnimator";
import ConfigurationPlayer from "./core/ConfigurationPlayer";


export default class Player extends RenderizableGameObject {
    readonly id: string;
    private idleAnimation: SpriteAnimator;
    constructor(
        position: Vector2D,
        sprites: HTMLImageElement[],
        scale: number
    ) {
        super(position, sprites[0], scale);
        this.id = crypto.randomUUID();
        this.idleAnimation = new SpriteAnimator(sprites, ConfigurationPlayer.IDLE_PLAYER_ANIMATION_INTERVAL);
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
    setPosition(x: number, y: number) {
        this._position.x = x;
        this._position.y = y;
    }
}