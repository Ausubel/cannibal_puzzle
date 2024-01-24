import Background from "../../gameobjects/background/Background";
import Scene from "../core/Scene";
import Boat from "../../gameobjects/boat/Boat";
import PlayerInitialGroup from "../../gameobjects/playergroup/instances/PlayerInitialGroup";
import PlayerFinalGroup from "../../gameobjects/playergroup/instances/PlayerFinalGroup";
import MotionPlayer from "./MotionPlayer";

export default class GameScene implements Scene {
    private background: Background;
    private playerInitialGroup: PlayerInitialGroup;
    private playerFinalGroup: PlayerFinalGroup;
    private boat: Boat;
    private motionPlayer: MotionPlayer;
    constructor() {
        this.background = new Background();
        this.boat = new Boat();
        this.playerInitialGroup = new PlayerInitialGroup();
        this.playerFinalGroup = new PlayerFinalGroup();
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