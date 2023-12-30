export default class SpriteAnimator {
    private frames: HTMLImageElement[];
    private indexCurrentFrame: number;
    constructor(frames: HTMLImageElement[], interval: number) {
        this.frames = frames;
        this.indexCurrentFrame = 0;
        setInterval(() => this.update(), interval);
    }
    getCurrentFrame() {
        return this.frames[this.indexCurrentFrame];
    }
    private update() {
        if (this.indexCurrentFrame >= this.frames.length - 1) {
            this.indexCurrentFrame = 0;
            return;
        }
        this.indexCurrentFrame++;
    }
}