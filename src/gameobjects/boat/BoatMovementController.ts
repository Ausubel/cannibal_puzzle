import GameControlProvider from "../../controls/GameControlProvider";
import RenderProvider from "../../main/RenderProvider";
import Vector2D from "../../math/Vector2D";
import PlayerGroupControls from "../playergroup/controls/PlayerGroupControls";
import ConfigurationBoat from "./core/ConfigurationBoat";
import Timer from "../../utils/Timer";
import Boat from "./Boat";

export default class BoatMovementController{
  private boatSpeed: number;
  private isboatDirectionRight: boolean;
  private boatPosition: Vector2D;
  private gameControlProvider: GameControlProvider;
  private readonly boundaryLeft: number;
  private readonly boundaryRight: number;
  private moveButtonCooldownTimer: Timer;
  private canMove: boolean = true;
  private canPulse: boolean = true;
  constructor(
    private boat: Boat,
    private movementControls: PlayerGroupControls,
    ){
    this.boatPosition = boat.position;
    const canvasSizeWidth = RenderProvider.getInstance().canvasSize.width;
    this.boundaryRight = (canvasSizeWidth * 0.9) - boat.width;
    this.boundaryLeft = ConfigurationBoat.BOAT_INITIAL_POSITION.x * canvasSizeWidth || 0;
    this.boatSpeed = ConfigurationBoat.BOAT_SPEED_MOVEMENT;
    this.isboatDirectionRight = false;
    this.gameControlProvider = GameControlProvider.getInstance();
    this.moveButtonCooldownTimer = new Timer(
      () => this.enableButtonCooldown(), 
      ConfigurationBoat.BOAT_MOVE_RATIO
    );
  }
  update(): void {
    this.moveButtonCooldownTimer.update();
    this.enableMove();
    this.move();
  }
  reachedBoundaryLeftLimit(): boolean {
    return this.boatPosition.x - ConfigurationBoat.BOAT_SPEED_MOVEMENT > this.boundaryLeft;
  } 
  reachedBoundaryRightLimit(): boolean {
    return this.boatPosition.x + ConfigurationBoat.BOAT_SPEED_MOVEMENT <= this.boundaryRight;
  }
  private changeDirection(): void {
    this.isboatDirectionRight = !this.isboatDirectionRight;
  }
  private move(): void {
    if (this.isBoatDirectionRight && this.reachedBoundaryRightLimit()) {
      this.boatPosition.x += this.boatSpeed;
    } else if (!this.isBoatDirectionRight && this.reachedBoundaryLeftLimit()) {
      this.boatPosition.x -= this.boatSpeed;
    }
    if (!this.canMove) return;
    if (!this.hasPulsedMoveBoat()) return;
    this.moveButtonCooldownTimer.start();
    this.changeDirection();
    this.canPulse = false;
    this.canMove = false;
  }
  get isBoatDirectionRight(): boolean {
    return this.isboatDirectionRight;
  }
  private enableButtonCooldown(): void {
    this.canMove = true;
    this.canPulse = true;
    this.moveButtonCooldownTimer.stop();
  }
  private enableMove(): void {
    this.canMove = this.boat.getPlayers() > 0;
  }
  hasPulsedMoveBoat(): boolean {
    if (this.canPulse) return this.gameControlProvider.hasPulsed(this.movementControls.moveBoat);
    return false; 
  }
}