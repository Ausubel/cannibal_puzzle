type TimerAction = () => void;

export default class Timer {
    private startTime: number;
    private elapsedTime: number;
    private stopped: boolean;

    constructor(private action: TimerAction, private readonly timeout: number) {
        this.startTime = 0;
        this.elapsedTime = 0;
        this.stopped = true;
    }

    update() {
        if (this.stopped) return;

        const now = performance.now();
        const deltaTime = now - this.startTime;
        this.startTime = now;

        this.elapsedTime += deltaTime;

        if (this.elapsedTime >= this.timeout) {
            this.elapsedTime = 0;
            this.action();
        }
    }

    start() {
        this.startTime = performance.now();
        this.stopped = false;
    }

    stop() {
        this.stopped = true;
    }

    get isStopped(): boolean {
        return this.stopped;
    }
}
