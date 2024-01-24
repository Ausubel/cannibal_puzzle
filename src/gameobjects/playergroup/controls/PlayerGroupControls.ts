import GameControl from "../../../controls/GameControl"

export default class PlayerGroupControls {
    readonly missionaryMove: GameControl
    readonly cannibalMove: GameControl
    readonly moveBoat: GameControl
    constructor() {
        this.moveBoat = GameControl.MoveBoat
        this.missionaryMove = GameControl.MoveMissionary
        this.cannibalMove = GameControl.MoveCannibal
    }
}