import Vector2D from "../../math/Vector2D";
import RenderProvider from "../../main/RenderProvider";
import PlayerControls from "./controls/PlayerControls";
import GameControlProvider from "../../controls/GameControlProvider";

export default class PlayerMovementController {
    private gameControlProvider: GameControlProvider;
    private readonly boundary: number;
    //#region Constants
    private static readonly SPEED: number = 10;
	//#endregion
    constructor(
        private position: Vector2D, 
        playerWidth: number, 
        private movementControls: PlayerControls
    ) {
        const canvasSizeWidth = RenderProvider.getInstance().canvasSize.width;
        this.boundary = canvasSizeWidth - playerWidth;
        this.gameControlProvider = GameControlProvider.getInstance();
    }
    private reachLeftBoundary() {
        return this.position.x - PlayerMovementController.SPEED > 0;
    }
    private reachRightBoundary() {
        return this.position.x + PlayerMovementController.SPEED <= this.boundary;
    }
    private moveLeft() {
        if (this.gameControlProvider.hasPulsed(this.movementControls.left) && 
            this.reachLeftBoundary()) 
            this.position.x -= PlayerMovementController.SPEED;
    }
    private moveRight() {
        if (this.gameControlProvider.hasPulsed(this.movementControls.right) && 
            this.reachRightBoundary()) 
            this.position.x += PlayerMovementController.SPEED;
    }
    move() {
        this.moveLeft();
        this.moveRight();
    }
    getPosition(): Vector2D {
        return this.position;
    }
}