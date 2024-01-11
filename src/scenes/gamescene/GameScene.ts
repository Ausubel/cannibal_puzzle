import ConfigurationPlayer from "../../gameobjects/players/core/ConfigurationPlayer";
import Background from "../../gameobjects/background/Background";
import Missionary from "../../gameobjects/players/Missionary";
import RenderProvider from "../../main/RenderProvider";
import Vector2D from "../../math/Vector2D";
import Scene from "../core/Scene";

export default class GameScene implements Scene {
    private background: Background;
    private missionary: Missionary;
    constructor() {
        const { canvasSize } = RenderProvider.getInstance();
        this.background = new Background();
        this.missionary = new Missionary(
            new Vector2D(
                canvasSize.width*ConfigurationPlayer.TEST_PLAYER_X_OF_SPAWN_BY_OF_PERCENTAGE_OF_THE_SCREEN, 
                canvasSize.height*ConfigurationPlayer.TEST_PLAYER_Y_OF_SPAWN_BY_OF_PERCENTAGE_OF_THE_SCREEN
            )
        );
    }
    update(): void {
        this.background.update();
        this.missionary.update();
    }
    render(): void {
        this.background.render();
        this.missionary.render();
    }
}