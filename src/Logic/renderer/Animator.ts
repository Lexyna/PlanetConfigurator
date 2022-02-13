export class Animator {

    static animator: Animator;

    private stop: boolean = false;
    private frameCount: number = 0;

    private fps: number = 1;
    private fpsInterval: number = 0;
    private now: number = 0;
    private then: number = 0;
    private elapsed: number = 0;

    public static createAnimator() {
        if (Animator.animator)
            return;
        Animator.animator = new Animator();
    }

    public static getInstance(): Animator {
        return Animator.animator;
    }

    /**
     * Class
     */

    private constructor() {
        this.startTicking();
    }

    private startTicking() {
        this.fpsInterval = 1000 / this.fps;
        this.then = Date.now();
        this.tick();
    }

    private tick() {

        if (!this.stop)
            window.requestAnimationFrame(this.tick.bind(this));

        this.now = Date.now();
        this.elapsed = this.now - this.then;

        if (this.elapsed < this.fpsInterval)
            return

        this.then = this.now - (this.elapsed % this.fpsInterval);

        console.log("request")

    }

}