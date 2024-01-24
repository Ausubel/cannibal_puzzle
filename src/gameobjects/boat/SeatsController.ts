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
  update(): void {
    this.setSeatsPosition();
  }
  addSeatPlayer(player: Player) {
    this.seats.push(player);
  }
  popSeatPlayer(player: Player) {
    this.seats = this.seats.filter((seat) => seat !== player);
    return player;
  }
  getSeats() {
    return this.seats;
  }
  private setSeatsPosition(): void {
    const boatPosition = this.boat.position;
    const boatWidth = this.boat.width;
    const boatHeight = this.boat.height;
    if(this.seats[0]) this.seats[0].position = new Vector2D(boatPosition.x + ConfigurationBoat.BOAT_FIRT_SEAT_RELATIVE_POSITION_X * boatWidth, boatPosition.y - ConfigurationBoat.BOAT_FIRT_SEAT_RELATIVE_POSITION_Y * boatHeight);
    if(this.seats[1]) this.seats[1].position = new Vector2D(boatPosition.x + ConfigurationBoat.BOAT_SECOND_SEAT_RELATIVE_POSITION_X * boatWidth, boatPosition.y - ConfigurationBoat.BOAT_SECOND_SEAT_RELATIVE_POSITION_Y * boatHeight);
  }
  isLimitOfSeats() {
    return this.seats.length <= ConfigurationBoat.BOAT_SEATS_LIMIT;
  }
  hasSeatPlayer(player: Player) {
    return this.seats.includes(player);
  }
}
