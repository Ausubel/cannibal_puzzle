import Vector2D from "../../math/Vector2D";
import Player from "../players/Player";
import Missionary from "../players/instances/Missionary";
import Boat from "./Boat";
import ConfigurationBoat from "./core/ConfigurationBoat";

type PeekEnemyIterate = (enemy: Player) => void;
export default class SeatsController {
  players: Map<string, Player>;
  boat: Boat;
  private orderedKeys: string[];
  constructor(seats: Map<string, Player>, boat: Boat) {
    this.players = seats;
    this.boat = boat;
    this.orderedKeys = [];
  }
  update(): void {
    this.setSeatsPosition();
    this.forEachPlayer(player => player.update())
  }
  render() {
		this.forEachPlayer(player => player.render());
	}
  forEachPlayer(action: PeekEnemyIterate) {
		this.players.forEach(action);
	}
  addSeatPlayer(player: Player) {
    this.players.set(player.id, player);
    this.orderedKeys.push(player.id);
  }
  deletePlayer(player: Player) {
    this.players.delete(player.id);
  }
  getSeats() {
    return Array.from(this.players.values());
  }
  private setSeatsPosition(): void {
    const boatPosition = this.boat.position;
    const boatWidth = this.boat.width;
    const boatHeight = this.boat.height;
    const playersArray = this.orderedKeys.map((key) => this.players.get(key));
    if (playersArray[0]) playersArray[0].position = new Vector2D(boatPosition.x + ConfigurationBoat.BOAT_FIRT_SEAT_RELATIVE_POSITION_X * boatWidth, boatPosition.y - ConfigurationBoat.BOAT_SEAT_RELATIVE_POSITION_Y * boatHeight);
    if (playersArray[1]) playersArray[1].position = new Vector2D(boatPosition.x + ConfigurationBoat.BOAT_SECOND_SEAT_RELATIVE_POSITION_X * boatWidth, boatPosition.y - ConfigurationBoat.BOAT_SEAT_RELATIVE_POSITION_Y * boatHeight);
  }
  isLimitOfSeats() {
    return this.players.size <= ConfigurationBoat.BOAT_SEATS_LIMIT;
  }
  shiftMissionaryPlayer(): Player | null {
    const missionary = this.getSeats().find(
        player => player instanceof Missionary
    );
    if (!missionary) return null;
    this.deletePlayer(missionary);
    return missionary;
}
}
