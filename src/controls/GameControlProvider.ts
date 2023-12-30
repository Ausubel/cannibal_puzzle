import GameControl from "./GameControl";
import GameControlManager from "./GameControlManager";
import Keyboard from "./Keyboard";

export default class GameControlProvider {
    //#region Attributes
    private gameControlManager: GameControlManager;
    private readonly keymap: Map<Keyboard, GameControl>;
    //#endregion
    private static instance: GameControlProvider;
    private constructor() {
        this.keymap = new Map<Keyboard, GameControl>([
            [Keyboard.A, GameControl.LeftPlayerOne],
            [Keyboard.D, GameControl.RightPlayerOne],
            [Keyboard.W, GameControl.FirePlayerOne],
            [Keyboard.ArrowLeft, GameControl.LeftPlayerTwo],
            [Keyboard.ArrowRight, GameControl.RightPlayerTwo],
            [Keyboard.ArrowUp, GameControl.FirePlayerTwo],
        ]);
        this.gameControlManager = new GameControlManager(this.keymap);
    }
    static getInstance(): GameControlProvider {
        if (!GameControlProvider.instance)
            GameControlProvider.instance = new GameControlProvider(); 
        return GameControlProvider.instance;
    }
    //#region Methods
    hasPulsed(control: GameControl): boolean {
        return this.gameControlManager.hasPulsed(control);
    }
    mapGameControl(key: Keyboard, control: GameControl) {
        this.keymap.set(key, control);
    }
    //#endregion
}