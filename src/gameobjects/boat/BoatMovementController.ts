import Vector2D from "../../math/Vector2D";
import Boat from "./Boat";
import ConfigurationBoat from "./core/ConfigurationBoat";

export default class BoatMovementController{
  private boat: Boat;
  private boatSpeed: number;
  private isboatDirectionRight: boolean;
  private boatPosition: Vector2D;
  constructor(boat: Boat) {
    this.boat = boat;
    this.boatSpeed = ConfigurationBoat.BOAT_SPEED;
    this.isboatDirectionRight = true;
    this.boatPosition = boat.position;
  }
  update(): void {
    if (this.isLimitOfBoat()) {
      this.changeDirection();
    }
    this.moveBoat();
  }
  render(): void {
  }
  private isLimitOfBoat(): boolean {
    const { x } = this.boatPosition;
    const { width } = this.boat;
    return x + width >= window.innerWidth || x <= 0;
  }
  private changeDirection(): void {
    this.isboatDirectionRight = !this.isboatDirectionRight;
  }
  private moveBoat(): void {
    this.boatPosition.x += this.isboatDirectionRight ? this.boatSpeed : -this.boatSpeed;
    this.boat.position.x = this.boatPosition.x;
  }
  get isBoatDirectionRight(): boolean {
    return this.isboatDirectionRight;
  }
}