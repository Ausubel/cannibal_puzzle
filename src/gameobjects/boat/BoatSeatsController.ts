import Vector2D from "../../math/Vector2D";
import Player from "../players/Player";
import Cannibal from "../players/instances/Cannibal";
import Missionary from "../players/instances/Missionary";
import Boat from "./Boat";
import ConfigurationBoat from "./core/ConfigurationBoat";

type PeekEnemyIterate = (enemy: Player) => void;
export default class SeatsController {
  players: Map<string, Player>;
  boat: Boat;
  private orderedKeys: string[];
  constructor(players: Map<string, Player>, boat: Boat) {
    this.players = players;
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
    console.log(player.id);
  }
  getFlatSeats() {
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
    const missionary = this.getFlatSeats().find(
        player => player instanceof Missionary
    );
    if (!missionary) return null;
    this.players.delete(missionary.id);
    this.orderedKeys = this.orderedKeys.filter(key => key !== missionary.id);
    return missionary;
  }
  shiftCannibalPlayer(): Player | null {
    const cannibal = this.getFlatSeats().find(
        player => player instanceof Cannibal
    );
    if (!cannibal) return null;
    this.players.delete(cannibal.id);
    this.orderedKeys = this.orderedKeys.filter(key => key !== cannibal.id);
    return cannibal;
  }
}
