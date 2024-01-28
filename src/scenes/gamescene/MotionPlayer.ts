import Player from "../../gameobjects/players/Player";
import Boat from "../../gameobjects/boat/Boat";
import PlayerInitialGroup from "../../gameobjects/playergroup/instances/PlayerInitialGroup";
import PlayerFinalGroup from "../../gameobjects/playergroup/instances/PlayerFinalGroup";
import PlayerGroupControls from "../../gameobjects/playergroup/controls/PlayerGroupControls";
import Timer from "../../utils/Timer";
import GameControlProvider from "../../controls/GameControlProvider";
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
      console.log(this.playerInitialGroup.getFlatPlayers());
		}
    if (this.gameControlProvider.hasPulsed(this.controls.cannibalMove)) {
      this.canMove = false;
      this.moveCannibal();
      this.timerMoveRatio.start();
      console.log(this.playerInitialGroup.getFlatPlayers());
    }
	}
	private moveMissionary() {
		const isBoatDirectionFinal =
			this.boat.movementController.isBoatDirectionRight;
		const seatsUsed = this.boat.seatsController.players.size;
		if (seatsUsed <= 1) {
      if (!isBoatDirectionFinal) {
        const missionary = this.playerInitialGroup.shiftMissionaryPlayer();
        if (!missionary) return;
        this.boat.seatsController.addSeatPlayer(missionary);
      } else {
        const missionary = this.playerFinalGroup.shiftMissionaryPlayer();
        console.log(missionary);
        if (!missionary) return;
        this.boat.seatsController.addSeatPlayer(missionary);
      }
    }else{
      if (!isBoatDirectionFinal){
        const missionary = this.boat.seatsController.shiftMissionaryPlayer();
        if (!missionary) return;
        this.playerFinalGroup.sitPlayer(missionary);
      }
    }
		
	}
  private moveCannibal() {
    const isBoatDirectionRight =
      this.boat.movementController.isBoatDirectionRight;
    const seatsQuantity = this.boat.seatsController.players.size;
    if (seatsQuantity <= 1) {
      if (!isBoatDirectionRight) {
        const cannibal = this.playerInitialGroup.shiftCannibalPlayer();
        if (!cannibal) return;
        this.boat.seatsController.addSeatPlayer(cannibal);
      } else {
        const cannibal = this.playerFinalGroup.shiftCannibalPlayer();
        if (!cannibal) return;
        this.boat.seatsController.addSeatPlayer(cannibal);
      }
    }
  }

	private enableMove() {
		this.canMove = true;
		this.timerMoveRatio.stop();
	}
}
