import GameControl from "../../../controls/GameControl";
import PlayerControls from "./PlayerControls";

export default class PlayerTwoControls implements  PlayerControls{
    readonly left: GameControl;
    readonly right: GameControl;
    readonly fire: GameControl;
    constructor() {
        this.left = GameControl.LeftPlayerTwo;
        this.right = GameControl.RightPlayerTwo;
        this.fire = GameControl.FirePlayerTwo;
    }
}