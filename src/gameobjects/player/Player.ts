import SpriteAnimator from "../../animator/SpriteAnimator";
import SpriteProvider from "../../assetmanagers/SpriteProvider";
import Vector2D from "../../math/Vector2D";
import RenderizableGameObject from "../core/RenderizableGameObject";
import PlayerMovementController from "./PlayerMovementController";
import PlayerOneControls from "./controls/PlayerOneControls";
import PlayerFireController from "./PlayerFireController";

export default class Player extends RenderizableGameObject {
    private spriteAnimator: SpriteAnimator;
    private movementController: PlayerMovementController;
    private fireController: PlayerFireController;
    private controls: PlayerOneControls;
    constructor(position: Vector2D) {
        const spriteManager = SpriteProvider.spriteManager;
        const sprites = spriteManager.PLAYER_SHIP_1;
        super(position, sprites[0], 1.2);
        this.spriteAnimator = new SpriteAnimator(sprites, 100);
        this.controls = new PlayerOneControls();
        this.movementController = new PlayerMovementController(
            position, 
            this.width,
            this.controls
        );
        this.fireController = new PlayerFireController(
            position,
            spriteManager.PLAYER_SHIP_1_LASER,
            this.controls,
        );
        this.minusHalfWidth(position);
    }
    private minusHalfWidth(position: Vector2D) {
        position.x -= this.width/2;
    }
    update(): void {
        this.sprite = this.spriteAnimator.getCurrentFrame();
        this.movementController.move();
        this.fireController.fire();
        this.fireController.followPath();
    }
    render(): void {
        this.fireController.render();
        const { renderizer } = this.renderProvider;
        renderizer.drawImage(
            this.sprite,
            this._position.x, this._position.y,
            this.width,
            this.height
        );
    }
}