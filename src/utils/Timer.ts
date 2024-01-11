type TimerAction = () => void;
export default class Timer {
    private nowTime: number;
    private lastTime: number;
    private elapsedTime: number;
    private stopped: boolean;
    constructor(
        private action: TimerAction, 
        private readonly timeout: number
    ) {
        this.nowTime = performance.now();
        this.lastTime = 0;
        this.elapsedTime = 0;
        this.stopped = true;
    }
    update() {
        if (this.checkPastTimeout()) {
            this.pastTimeout();
            return;
        }
        if (this.stopped) 
            return;
        this.nowTime = performance.now();
        this.elapsedTime += this.nowTime - this.lastTime;
        this.lastTime = this.nowTime;
    }
    private checkPastTimeout() {
        return this.elapsedTime >= this.timeout;
    }
    start() {
        this.elapsedTime = 0;
        this.stopped = false;
    }
    stop() {
        this.stopped = true;
    }
    get isStopped(): boolean {
        return this.stopped;
    }
    private pastTimeout() {
        this.elapsedTime = 0;
        this.action();
    }
}