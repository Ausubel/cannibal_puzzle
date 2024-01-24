import Player from "../../gameobjects/players/Player";
import Boat from "../../gameobjects/boat/Boat";
import PlayerInitialGroup from "../../gameobjects/playergroup/instances/PlayerInitialGroup";
import PlayerFinalGroup from "../../gameobjects/playergroup/instances/PlayerFinalGroup";
import PlayerGroupControls from "../../gameobjects/playergroup/controls/PlayerGroupControls";
import Timer from "../../utils/Timer";
import GameControlProvider from "../../controls/GameControlProvider";
import GameControl from "../../controls/GameControl";
import Missionary from "../../gameobjects/players/instances/Missionary";

export default class MotionPlayer {
	private controls: PlayerGroupControls;
	private timerMoveRatio: Timer;
	private canMove: boolean = true;
	private gameControlProvider: GameControlProvider;
	constructor(
		private boat: Boat,
		private playerInitialGroup: PlayerInitialGroup,
		private playerFinalGroup: PlayerFinalGroup
	) {
		this.controls = new PlayerGroupControls();
		this.timerMoveRatio = new Timer(() => this.enableMove(), 500);
		this.gameControlProvider = GameControlProvider.getInstance();
		this.controls = new PlayerGroupControls();
	}
	update() {
		this.move();
		this.timerMoveRatio.update();
	}
	private move() {
		if (!this.canMove) return;
		if (this.gameControlProvider.hasPulsed(this.controls.missionaryMove)) {
			this.canMove = false;
			this.moveMissionary();
			this.timerMoveRatio.start();
		}
	}
	private moveMissionary() {
		const isBoatDirectionRight =
			this.boat.movementController.isBoatDirectionRight;
		const seatsQuantity = this.boat.seatsController.players.length;
		if (seatsQuantity > 1) return;
		if (!isBoatDirectionRight) {
			const missionary = this.playerInitialGroup.shiftMissionaryPlayer();
      if (!missionary) return;
      this.boat.seatsController.addSeatPlayer(missionary);
		} else {
		}
	}

	private enableMove() {
		this.canMove = true;
		this.timerMoveRatio.stop();
	}
}
