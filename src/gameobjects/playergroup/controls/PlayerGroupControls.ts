import GameControl from "../../../controls/GameControl"

export default class PlayerGroupControls {
    readonly  missionaryBoard: GameControl
    readonly  missionaryGetOff: GameControl
    readonly  cannibalBoard: GameControl
    readonly  cannibalGetOff: GameControl
    readonly moveBoat: GameControl
    constructor() {
        this.moveBoat = GameControl.MoveBoat
        this.missionaryBoard = GameControl.MissionaryBoard
        this.missionaryGetOff = GameControl.MissionaryGetOff
        this.cannibalBoard = GameControl.CannibalBoard
        this.cannibalGetOff = GameControl.CannibalGetOff
    }
}