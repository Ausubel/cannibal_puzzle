import Vector2D from "./../../math/Vector2D";
import RenderizableGameObject from "./../core/RenderizableGameObject";
import SpriteAnimator from "./../../animation/SpriteAnimator";
import ConfigurationBoat from "./core/ConfigurationBoat";
import SpriteProvider from "../../assetmanagers/SpriteProvider";
import BoatMovementController from "./BoatMovementController";
import Player from "../players/Player";
import SeatsController from "./SeatsController";
import { BoatSprites } from "../../assetmanagers/SpriteManager";
import Missionary from "../players/instances/Missionary";
import Cannibal from "../players/instances/Cannibal";
import PlayerGroupControls from "../playergroup/controls/PlayerGroupControls";
import RenderProvider from "../../main/RenderProvider";

export default class Boat extends RenderizableGameObject {
    private sprites: BoatSprites;
    private animation: SpriteAnimator;
    private movementController: BoatMovementController;
    private seats: Player[];
    private seatsController: SeatsController;
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
        this.animation = new SpriteAnimator(this.sprites.toRight, ConfigurationBoat.BOAT_ANIMATION_INTERVAL);
        this.seats = [
            new Missionary(new Vector2D(40, 50)),
            new Cannibal(new Vector2D(22, 123))
        ];
        this.seatsController = new SeatsController(this.seats, this);
        this.seatsController.setSeatsPosition();
    }

    update(): void {
        this.animation.update();
        this.movementController.update();
        this.seatsController.setSeatsPosition();
        this.changeSpriteDirection();
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
    }
    changeSpriteDirection(): void {
        if (this.movementController.isBoatDirectionRight) {
            this.animation.changeFrames = this.sprites.toRight;
        }else{
            this.animation.changeFrames = this.sprites.toLeft;
        }
    }
    addPlayerToBoat(player: Player): void {
        if (this.seats.length < 2) {
            this.seats.push(player);
            // Agrega lógica para posicionar al jugador en el bote
            // Puedes ajustar la posición relativa según la cantidad de jugadores en el bote
            const boatPosition = this.position;
            const boatWidth = this.width;
            const boatHeight = this.height;
            player.position = new Vector2D(boatPosition.x + 0.2 * boatWidth, boatPosition.y + 0.5 * boatHeight);
        }
    }
}