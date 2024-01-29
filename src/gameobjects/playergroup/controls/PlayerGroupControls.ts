import GameControl from "../../../controls/GameControl"

export default class PlayerGroupControls {
    //meter canibal y misionero
    readonly putInMissionary: GameControl
    readonly putInCannibal: GameControl
    readonly takeOfMissionary: GameControl
    readonly takeOfCannibal: GameControl
    readonly moveBoat: GameControl
    constructor() {
        this.moveBoat = GameControl.MoveBoat
        this.putInMissionary = GameControl.PutIntoMissionary
        this.putInCannibal = GameControl.PutIntoCannibal
        this.takeOfMissionary = GameControl.TakeOffMissionary
        this.takeOfCannibal = GameControl.TakeOffCannibal
    }
}