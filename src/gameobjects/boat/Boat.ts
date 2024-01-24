import Vector2D from "./../../math/Vector2D";
import RenderizableGameObject from "./../core/RenderizableGameObject";
import SpriteAnimator from "./../../animation/SpriteAnimator";
import ConfigurationBoat from "./core/ConfigurationBoat";
import SpriteProvider from "../../assetmanagers/SpriteProvider";
import BoatMovementController from "./BoatMovementController";
import Player from "../players/Player";
import SeatsController from "./SeatsController";
import { BoatSprites } from "../../assetmanagers/SpriteManager";
import PlayerGroupControls from "../playergroup/controls/PlayerGroupControls";
import RenderProvider from "../../main/RenderProvider";

export default class Boat extends RenderizableGameObject {
    private sprites: BoatSprites;
    private animation: SpriteAnimator;
    movementController: BoatMovementController;
    private seats: Player[];
    seatsController: SeatsController;
    private controls: PlayerGroupControls;
    constructor() {
        const sprites = SpriteProvider.spriteManager.BOAT;
        const scale = ConfigurationBoat.BOAT_SCALE; 
        const canvasSizeWidth = RenderProvider.getInstance().canvasSize.width;
        const position = new Vector2D(
            ConfigurationBoat.BOAT_INITIAL_POSITION.x * canvasSizeWidth ,
            ConfigurationBoat.BOAT_INITIAL_POSITION.y
        );
        super(position, sprites.toRight[0], scale);
        this.sprites = sprites;
        this.controls = new PlayerGroupControls();
        this.movementController = new BoatMovementController(
            this.position,
            this.width,
            this.controls);
        this.animation = new SpriteAnimator(
            this.sprites.toRight,
            ConfigurationBoat.BOAT_ANIMATION_INTERVAL
        );
        this.seats = [];
        this.seatsController = new SeatsController(this.seats, this);
    }
    update(): void {
        this.animation.update();
        this.movementController.update();
        this.changeSpriteDirection();
        this.seatsController.update();
    }
    render(): void {
        this.sprite = this.animation.getCurrentFrame();
        const { renderizer } = this.renderProvider;
        renderizer.drawImage(
            this.sprite,
            this._position.x, this._position.y,
            this.width,
            this.height
        );
        this.seats.forEach(seat => {
            seat.render();
        });
    }
    changeSpriteDirection(): void {
        if (this.movementController.isBoatDirectionRight) this.animation.changeFrames = this.sprites.toRight;
        else this.animation.changeFrames = this.sprites.toLeft;
    }
    addPlayer(player: Player): void {
        if (!this.seatsController.isLimitOfSeats()) return;
        this.seatsController.addSeatPlayer(player);
        console.log("Player added to boat");
    }
    popPlayer(player: Player): Player {
        const removePlayer = this.seatsController.popSeatPlayer(player);
        console.log("Player removed from boat");
        return removePlayer;
    }
    hasPlayer(player: Player): boolean {
        return this.seatsController.hasSeatPlayer(player);
    }
}