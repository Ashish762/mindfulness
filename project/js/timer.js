export class Timer {
    constructor(duration, onTick, onComplete) {
        this.duration = duration;
        this.onTick = onTick;
        this.onComplete = onComplete;
        this.endTime = null;
        this.timerId = null;
    }

    start() {
        this.endTime = Date.now() + this.duration * 1000;
        this.tick();
    }

    tick() {
        const remaining = Math.ceil((this.endTime - Date.now()) / 1000);
        
        if (remaining <= 0) {
            this.onTick(0);
            this.onComplete();
            return;
        }

        this.onTick(remaining);
        this.timerId = setTimeout(() => this.tick(), 100);
    }

    stop() {
        if (this.timerId) {
            clearTimeout(this.timerId);
            this.timerId = null;
        }
    }
}