import Boat from "../../gameobjects/boat/Boat";
import PlayerGroupControls from "../../gameobjects/playergroup/controls/PlayerGroupControls";
import Timer from "../../utils/Timer";
import GameControlProvider from "../../controls/GameControlProvider";
import PlayerGroup from "../../gameobjects/playergroup/PlayerGroup";

export default class MotionPlayer {
	private controls: PlayerGroupControls;
	private timerMoveRatio: Timer;
	private canMove: boolean = true;
	private gameControlProvider: GameControlProvider;
	constructor(
		private boat: Boat,
		private playerInitialGroup: PlayerGroup,
		private playerFinalGroup: PlayerGroup
	) {
		this.controls = new PlayerGroupControls();
		this.timerMoveRatio = new Timer(() => this.enableMove(), 200);
		this.gameControlProvider = GameControlProvider.getInstance();
		this.controls = new PlayerGroupControls();
	}
	update() {
		this.move();
		this.timerMoveRatio.update();
	}
	private move() {
		if (!this.canMove) return;
		if (this.hasPulsedPutInMissionary()) {
      this.canMove = false;
			this.putInMissionary();
			this.timerMoveRatio.start();
		}
    if (this.hasPulsedPutInCannibal()) {
      this.canMove = false;
      this.putInCannibal();
      this.timerMoveRatio.start();
    }
    if (this.hasPulsedTakeOffMissionary()){
      this.canMove = false;
      this.takeOffMissionary();
      this.timerMoveRatio.start();
    }
    if (this.hasPulsedTakeOffCannibal()){
      this.canMove = false;
      this.takeOffCannibal();
      this.timerMoveRatio.start();
    }
	}
  private hasPulsedPutInCannibal(): boolean {
    return this.gameControlProvider.hasPulsed(this.controls.putInCannibal);
  }
  private hasPulsedPutInMissionary(): boolean {
    return this.gameControlProvider.hasPulsed(this.controls.putInMissionary);
  }
  private hasPulsedTakeOffCannibal(): boolean {
    return this.gameControlProvider.hasPulsed(this.controls.takeOfCannibal);
  }
  private hasPulsedTakeOffMissionary(): boolean {
    return this.gameControlProvider.hasPulsed(this.controls.takeOfMissionary);
  }
	private putInMissionary() {
		const isBoatFinalDirection =
			this.boat.movementController.isBoatDirectionRight;
		const seatsUsed = this.boat.seatsController.players.size;
		if (seatsUsed <= 1) {
      if (!isBoatFinalDirection) {
        const missionary = this.playerInitialGroup.shiftMissionaryPlayer();
        if (!missionary) return;
        this.boat.seatsController.addSeatPlayer(missionary);
      } else {
        const missionary = this.playerFinalGroup.shiftMissionaryPlayer();
        if (!missionary) return;
        this.boat.seatsController.addSeatPlayer(missionary);
      }
    }
		
	}
  private putInCannibal() {
    const isBoatFinalDirection =
      this.boat.movementController.isBoatDirectionRight;
    const seatsUsed = this.boat.seatsController.players.size;
    if (seatsUsed <= 1) {
      if (!isBoatFinalDirection) {
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
  private takeOffMissionary(){
    const isBoatFinalDirection =
      this.boat.movementController.isBoatDirectionRight;
    const seatsUsed = this.boat.seatsController.players.size;
    if (seatsUsed > 0) {
      if (!isBoatFinalDirection) {
        const missionary = this.boat.seatsController.shiftMissionaryPlayer();
        if (!missionary) return;
        this.playerInitialGroup.sitPlayer(missionary);
      } else {
        const missionary = this.boat.seatsController.shiftMissionaryPlayer();
        if (!missionary) return;
        this.playerFinalGroup.sitPlayer(missionary);
      }
    }
  }
  private takeOffCannibal(){
    const isBoatFinalDirection =
      this.boat.movementController.isBoatDirectionRight;
    const seatsUsed = this.boat.seatsController.players.size;
    if (seatsUsed > 0) {
      if (!isBoatFinalDirection) {
        const cannibal = this.boat.seatsController.shiftCannibalPlayer();
        if (!cannibal) return;
        this.playerInitialGroup.sitPlayer(cannibal);
      } else {
        const cannibal = this.boat.seatsController.shiftCannibalPlayer();
        if (!cannibal) return;
        this.playerFinalGroup.sitPlayer(cannibal);
      }
    }
  }

	private enableMove() {
		this.canMove = true;
		this.timerMoveRatio.stop();
	}
}
