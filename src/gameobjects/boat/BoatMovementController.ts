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
  private timerMoveRatio: Timer;
  private canMove: boolean = true;
  constructor(
    boatPoition: Vector2D,
    boatWidth: number,
    private movementControls: PlayerGroupControls,
    ){
    this.boatPosition = boatPoition;
    const canvasSizeWidth = RenderProvider.getInstance().canvasSize.width;
    this.boundaryRight = (canvasSizeWidth * 0.9) - boatWidth;
    this.boundaryLeft = (canvasSizeWidth * 0.13);
    this.boatSpeed = ConfigurationBoat.BOAT_SPEED_MOVEMENT;
    this.isboatDirectionRight = false;
    this.gameControlProvider = GameControlProvider.getInstance();
    this.timerMoveRatio = new Timer(
      () => this.enableMove(), 
      ConfigurationBoat.BOAT_MOVE_RATIO
  );
  }
  update(): void {
    this.timerMoveRatio.update();
    this.move();
  }
  render(): void {
  }
  private reachedLeftLimit(): boolean {
    return this.boatPosition.x - ConfigurationBoat.BOAT_SPEED_MOVEMENT > this.boundaryLeft;
  } 
  private reachedRightLimit(): boolean {
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
        while (this.reachedRightLimit()) {
          this.boatPosition.x += this.boatSpeed;
          this.timerMoveRatio.start();
        }
      }else{
        
        while (this.reachedLeftLimit()) {
          this.boatPosition.x -= this.boatSpeed;
          this.timerMoveRatio.start();
        }
      }
    }
  }
  get isBoatDirectionRight(): boolean {
    return this.isboatDirectionRight;
  }
  enableMove(): void {
    this.canMove = true;
    this.timerMoveRatio.stop();
  }
  private hasPulsedMoveBoat(): boolean {
    return this.gameControlProvider.hasPulsed(this.movementControls.moveBoat);
  }
}