import Scene from "./Scene";

export default class SceneManager {
    private _currentScene: Scene | null = null;
    private static instance: SceneManager;
    private constructor() {}
    static getInstance(): SceneManager {
        if (!SceneManager.instance) 
            return new SceneManager();
        return SceneManager.instance;
    }
    changeScene(scene: Scene) {
        this._currentScene = scene;
    }
    get currentScene(): Scene {
        if (!this._currentScene)
            throw new Error("Not exists any scene");
        return this._currentScene;
    }
}