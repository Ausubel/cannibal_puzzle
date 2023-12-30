import GameControl from "../../../controls/GameControl";
import PlayerControls from "./PlayerControls";

export default class PlayerOneControls implements PlayerControls {
    readonly left: GameControl;
    readonly right: GameControl;
    readonly fire: GameControl;
    constructor() {
        this.left = GameControl.LeftPlayerOne;
        this.right = GameControl.RightPlayerOne;
        this.fire = GameControl.FirePlayerOne;
    }
}