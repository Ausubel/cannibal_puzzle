import Vector2D from "../../math/Vector2D";
import Player from "../players/Player";
import Boat from "./Boat";
import ConfigurationBoat from "./core/ConfigurationBoat";

export default class SeatsController {
  players: Player[];
  boat: Boat;
  constructor(seats: Player[], boat: Boat) {
    this.players = seats;
    this.boat = boat;
  }
  update(): void {
    this.setSeatsPosition();
  }
  addSeatPlayer(player: Player) {
    this.players.push(player);
  }
  popSeatPlayer(player: Player) {
    this.players = this.players.filter((seat) => seat !== player);
    return player;
  }
  getSeats() {
    return this.players;
  }
  private setSeatsPosition(): void {
    const boatPosition = this.boat.position;
    const boatWidth = this.boat.width;
    const boatHeight = this.boat.height;
    if(this.players[0]) this.players[0].position = new Vector2D(boatPosition.x + ConfigurationBoat.BOAT_FIRT_SEAT_RELATIVE_POSITION_X * boatWidth, boatPosition.y - ConfigurationBoat.BOAT_FIRT_SEAT_RELATIVE_POSITION_Y * boatHeight);
    if(this.players[1]) this.players[1].position = new Vector2D(boatPosition.x + ConfigurationBoat.BOAT_SECOND_SEAT_RELATIVE_POSITION_X * boatWidth, boatPosition.y - ConfigurationBoat.BOAT_SECOND_SEAT_RELATIVE_POSITION_Y * boatHeight);
  }
  isLimitOfSeats() {
    return this.players.length <= ConfigurationBoat.BOAT_SEATS_LIMIT;
  }
  hasSeatPlayer(player: Player) {
    return this.players.includes(player);
  }
}
