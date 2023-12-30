import Colors from "../assetmanagers/Colors";
import Fonts from "../assetmanagers/Fonts";
import RenderProvider from "./RenderProvider";

export default class FPSCounter {
    private _fps: number;
    private frames: number;
    private nowTime: number;
    private lastTime: number;
    private elapsedTime: number;
    private renderProvider: RenderProvider;
    constructor() {
        this._fps = 0;
        this.frames = 0;
        this.nowTime = performance.now();
        this.lastTime = 0;
        this.elapsedTime = 0;
        this.renderProvider = RenderProvider.getInstance();
    }
    get fps() {
        return this._fps;
    }
    count() {
        this.nowTime = performance.now();
        this.elapsedTime += this.nowTime - this.lastTime;
        this.lastTime = this.nowTime;
        if (this.elapsedTime < 1000) {
            this.frames++;
            return;
        }
        this._fps = this.frames;
        this.frames = 0;
        this.elapsedTime = 0;
    }
    display() {
        const { renderizer, canvasSize } = this.renderProvider;
        renderizer.fillStyle = Colors.FPS;
        renderizer.font = Fonts.FPS;
        renderizer.fillText(`FPS: ${this._fps}`, canvasSize.width*0.95, canvasSize.height*0.05);
    }
}