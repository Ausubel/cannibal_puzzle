import GameControlProvider from "../../controls/GameControlProvider";
import RenderProvider from "../../main/RenderProvider";
import Vector2D from "../../math/Vector2D";
import PlayerGroupControls from "../playergroup/controls/PlayerGroupControls";
import ConfigurationBoat from "./core/ConfigurationBoat";
import Timer from "../../utils/Timer";

export default class BoatMovementController{
  private boatSpeed: number;
  private isboatDirectionRight: boolean;
  private boatPosition: Vector2D;
  private gameControlProvider: GameControlProvider;
  private readonly boundaryLeft: number;
  private readonly boundaryRight: number;
  private moveButtonCooldownTimer: Timer;
  private canMove: boolean = true;
  constructor(
    boatPoition: Vector2D,
    boatWidth: number,
    private movementControls: PlayerGroupControls,
    ){
    this.boatPosition = boatPoition;
    const canvasSizeWidth = RenderProvider.getInstance().canvasSize.width;
    this.boundaryRight = (canvasSizeWidth * 0.9) - boatWidth;
    this.boundaryLeft = ConfigurationBoat.BOAT_INITIAL_POSITION.x * canvasSizeWidth;
    this.boatSpeed = ConfigurationBoat.BOAT_SPEED_MOVEMENT;
    this.isboatDirectionRight = false;
    this.gameControlProvider = GameControlProvider.getInstance();
    this.moveButtonCooldownTimer = new Timer(
      () => this.enableMove(), 
      ConfigurationBoat.BOAT_MOVE_RATIO
    );
    
  }
  update(): void {
    this.moveButtonCooldownTimer.update();
    this.move();
  }
  render(): void {
  }
  private reachedBoundaryLeftLimit(): boolean {
    return this.boatPosition.x - ConfigurationBoat.BOAT_SPEED_MOVEMENT > this.boundaryLeft;
  } 
  private reachedBoundaryRightLimit(): boolean {
    return this.boatPosition.x + ConfigurationBoat.BOAT_SPEED_MOVEMENT <= this.boundaryRight;
  }
  private changeDirection(): void {
    this.isboatDirectionRight = !this.isboatDirectionRight;
  }
  private move(): void {
    if (!this.canMove) return;
    if (this.hasPulsedMoveBoat()){
      this.canMove = false;
      this.changeDirection();
      if (this.isBoatDirectionRight){
        while (this.reachedBoundaryRightLimit()) {
        this.boatPosition.x += this.boatSpeed;
        this.moveButtonCooldownTimer.start();
        }
      }else{
        while (this.reachedBoundaryLeftLimit()) {
          this.boatPosition.x -= this.boatSpeed;
          this.moveButtonCooldownTimer.start();
        }
      }
    }
  }
  get isBoatDirectionRight(): boolean {
    return this.isboatDirectionRight;
  }
  enableMove(): void {
    this.canMove = true;
    this.moveButtonCooldownTimer.stop();
  }

  private hasPulsedMoveBoat(): boolean {
    return this.gameControlProvider.hasPulsed(this.movementControls.moveBoat);
  }
}