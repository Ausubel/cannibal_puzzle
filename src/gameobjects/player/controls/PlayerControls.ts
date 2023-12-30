import GameControl from "../../../controls/GameControl";

export default interface PlayerControls {
    readonly left: GameControl;
    readonly right: GameControl;
    readonly fire: GameControl;
};

