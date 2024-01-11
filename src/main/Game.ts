import GameScene from "../scenes/gamescene/GameScene";
import SceneManager from "../scenes/core/SceneManager";
import FPSCounter from "../utils/FPSCounter";
import RenderProvider from "./RenderProvider";

export default class Game {
    private renderProvider: RenderProvider;
    private sceneManager: SceneManager;
    private fpsCounter: FPSCounter;

    constructor() {
        this.renderProvider = RenderProvider.getInstance();
        this.sceneManager = SceneManager.getInstance();
        this.sceneManager.changeScene(new GameScene());
        this.fpsCounter = new FPSCounter();
    }
    private loop() {
        this.update();
        this.render();
        this.runLoop();
    }
    private update() {
        this.sceneManager.currentScene.update();
        this.fpsCounter.count();
    }
    private render() {
        this.renderProvider.clearScreen();
        this.sceneManager.currentScene.render();
        this.fpsCounter.display();
    }
    private runLoop() {
        requestAnimationFrame(() => {
            this.loop();
        });
    }
    init() {
        this.runLoop();
    }
}