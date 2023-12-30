import GameControl from "./GameControl";
import Keyboard from "./Keyboard";

export default class GameControlManager {
    private keyset: Set<GameControl>;
    constructor(map: Map<Keyboard, GameControl>) {
        this.keyset = new Set<GameControl>();
        window.addEventListener('keydown', e => {
            const key = e.key as Keyboard;
            if (map.has(key)) 
                this.addKeyToSet(map.get(key)!);
        });
        window.addEventListener('keyup', e => {
            const key = e.key as Keyboard;
            if (map.has(key)) 
                this.removeKeyToSet(map.get(key)!);
        });
    }
    private addKeyToSet(control: GameControl) {
        this.keyset.add(control);
    }
    private removeKeyToSet(control: GameControl) {
        this.keyset.delete(control);
    }
    hasPulsed(control: GameControl): boolean {
        return this.keyset.has(control);
    }
}