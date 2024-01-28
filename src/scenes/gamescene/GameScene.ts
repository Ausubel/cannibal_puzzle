import Background from "../../gameobjects/background/Background";
import Scene from "../core/Scene";
import Boat from "../../gameobjects/boat/Boat";
import MotionPlayer from "./MotionPlayer";
import PlayerGroup from "../../gameobjects/playergroup/PlayerGroup";

export default class GameScene implements Scene {
    private background: Background;
    private playerInitialGroup: PlayerGroup;
    private playerFinalGroup: PlayerGroup;
    private boat: Boat;
    private motionPlayer: MotionPlayer;
    constructor() {
        const isInitialGroup = true
        this.background = new Background();
        this.playerInitialGroup = new PlayerGroup(isInitialGroup);
        this.playerFinalGroup = new PlayerGroup(!isInitialGroup);
        this.boat = new Boat();
        this.motionPlayer = new MotionPlayer(
            this.boat,
            this.playerInitialGroup,
            this.playerFinalGroup
        );
    }
    update(): void {
        this.background.update();
        this.boat.update();
        this.playerInitialGroup.update();
        this.playerFinalGroup.update();
        this.motionPlayer.update();
    }
    render(): void {
        this.background.render();
        this.boat.render();
        this.playerInitialGroup.render();
        this.playerFinalGroup.render();
    }
}