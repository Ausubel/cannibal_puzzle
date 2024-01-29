import Vector2D from "./../../math/Vector2D";
import RenderizableGameObject from "./../core/RenderizableGameObject";
import SpriteAnimator from "./../../animation/SpriteAnimator";
import ConfigurationBoat from "./core/ConfigurationBoat";
import SpriteProvider from "../../assetmanagers/SpriteProvider";
import BoatMovementController from "./BoatMovementController";
import Player from "../players/Player";
import SeatsController from "./BoatSeatsController";
import { BoatSprites } from "../../assetmanagers/SpriteManager";
import PlayerGroupControls from "../playergroup/controls/PlayerGroupControls";
import RenderProvider from "../../main/RenderProvider";

export default class Boat extends RenderizableGameObject {
    private sprites: BoatSprites;
    private animation: SpriteAnimator;
    public movementController: BoatMovementController;
    private players: Map<string, Player>;
    public seatsController: SeatsController;
    private controls: PlayerGroupControls;
    constructor() {
        const sprites = SpriteProvider.spriteManager.BOAT;
        const scale = ConfigurationBoat.BOAT_SCALE; 
        const { canvasSize } = RenderProvider.getInstance();
        const position = new Vector2D(
            ConfigurationBoat.BOAT_INITIAL_POSITION.x * canvasSize.width ,
            ConfigurationBoat.BOAT_INITIAL_POSITION.y * canvasSize.height
        );
        super(position, sprites.toRight[0], scale);
        this.players = new Map<string, Player>();
        this.sprites = sprites;
        this.controls = new PlayerGroupControls();
        this.movementController = new BoatMovementController(
            this,
            this.controls
        );
        this.animation = new SpriteAnimator(
            this.sprites.toRight,
            ConfigurationBoat.BOAT_ANIMATION_INTERVAL
        );
        
        this.seatsController = new SeatsController(this.players, this);
    }
    update(): void {
        this.seatsController.update();
        this.animation.update();
        this.movementController.update();
        this.changeSpriteDirection();
        
    }
    render(): void {
        this.players.forEach(seat => {
            seat.render();
        });
        this.seatsController.render()
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
        if (this.movementController.isBoatDirectionRight) this.animation.changeFrames = this.sprites.toRight;
        else this.animation.changeFrames = this.sprites.toLeft;
    }
    addPlayer(player: Player): void {
        if (!this.seatsController.isLimitOfSeats()) return;
        this.seatsController.addSeatPlayer(player);
        console.log("Player added to boat");
    }
    getPlayers(){
        return this.players.size;
    }
}