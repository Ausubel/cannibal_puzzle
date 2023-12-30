import Background from "../gameobjects/background/Background";
import Player from "../gameobjects/player/Player";
import RenderProvider from "../main/RenderProvider";
import Vector2D from "../math/Vector2D";
import GameObjectBag from "./core/GameObjectBag";
import Scene from "./core/Scene";

export default class GameScene implements Scene {
    private background: Background;
    private player: Player;
    private gameObjectBag: GameObjectBag;
    constructor() {
        const { canvasSize } = RenderProvider.getInstance();
        this.player = new Player(
            new Vector2D(canvasSize.width/2, canvasSize.height/1.2)
        );
        this.background = new Background();
        this.gameObjectBag = new GameObjectBag();
        this.gameObjectBag.addGameObjects(
            [
                this.background,
                this.player,
            ]
        );
    }
    update(): void {
        this.gameObjectBag.update();
    }
    render(): void {
        this.gameObjectBag.render();
    }
}