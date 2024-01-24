import Vector2D from "../../math/Vector2D";
import Player from "../players/Player";
import Boat from "./Boat";
import ConfigurationBoat from "./core/ConfigurationBoat";

export default class SeatsController {
  seats: Player[];
  boat: Boat;
  constructor(seats: Player[], boat: Boat) {
    this.seats = seats;
    this.boat = boat;
  }
  addSeat(player: Player) {
    if (this.isLimitOfSeats()) return;
    this.seats.push(player);
  }
  removeSeat(id: string) {
    this.seats = this.seats.filter((player) => player.id !== id);
  }
  getSeats() {
    return this.seats;
  }
  setSeatsPosition(): void {
    const boatPosition = this.boat.position;
    const boatWidth = this.boat.width;
    const boatHeight = this.boat.height;
    this.seats[0].position = new Vector2D(boatPosition.x + 0.2 * boatWidth, boatPosition.y + 0.5 * boatHeight);
    this.seats[1].position = new Vector2D(boatPosition.x + 0.8 * boatWidth, boatPosition.y + 0.5 * boatHeight);
  }
  getSeatPosition(index: number) {
    if (index === 0) {
      return this.getFirstSeatPosition();
    }
    return this.getSecondSeatPosition();
  }
  private getFirstSeatPosition() {
    const { x, y } = this.boat.position;
    return { x: x + ConfigurationBoat.BOAT_FIRST_SEATS_POSITION.x, y: y + ConfigurationBoat.BOAT_FIRST_SEATS_POSITION.y };
  }
  private getSecondSeatPosition() {
    const { x, y } = this.boat.position;
    return { x: x + ConfigurationBoat.BOAT_SECOND_SEATS_POSITION.x, y: y + ConfigurationBoat.BOAT_SECOND_SEATS_POSITION.y };
  }
  private isLimitOfSeats() {
    return this.seats.length >= ConfigurationBoat.BOAT_SEATS_LIMIT;
  }
}
