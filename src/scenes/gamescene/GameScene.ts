import Background from "../../gameobjects/background/Background";
import Scene from "../core/Scene";
import PlayerGroup from "../../gameobjects/players/PlayerGroup";
import Boat from "../../gameobjects/boat/Boat";

export default class GameScene implements Scene {
    private background: Background;
    private playerGroup: PlayerGroup;
    private boat: Boat;
    constructor() {
        this.background = new Background();
        this.boat = new Boat();
        this.playerGroup = new PlayerGroup();
        //elimnar player
        console.log(this.playerGroup.getFlatPlayers()[0]);
        this.playerGroup.destroyPlayer(this.playerGroup.getFlatPlayers()[0]);
    }
    update(): void {
        this.background.update();
        this.playerGroup.update();
        this.boat.update();
    }
    render(): void {
        this.background.render();
        this.playerGroup.render();
        this.boat.render();
    }
}