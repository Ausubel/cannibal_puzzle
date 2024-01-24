import Timer from "../utils/Timer";

export default class SpriteAnimator {
    private frames: HTMLImageElement[];
    private indexCurrentFrame: number;
    private timer: Timer;
    constructor(frames: HTMLImageElement[], interval: number) {
        this.frames = frames;
        this.indexCurrentFrame = 0;
        this.timer = new Timer(() => this.nextFrame(), interval);
        this.timer.start();
    }
    getCurrentFrame() {
        return this.frames[this.indexCurrentFrame];
    }
    update() {
        this.timer.update();
    }
    set changeFrames(frames: HTMLImageElement[]) {
        this.frames = frames;
    }
    getFrames(){
        return this.frames;
    }
    private nextFrame() {
        if (this.indexCurrentFrame >= this.frames.length - 1) {
            this.indexCurrentFrame = 0;
            return;
        }
        this.indexCurrentFrame++;
    }
}