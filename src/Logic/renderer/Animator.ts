import { Renderer } from "./Renderer";

export class Animator {

    static animator: Animator;

    private stop: boolean = false;

    private fps: number = 30;
    private fpsInterval: number = 0;
    private now: number = 0;
    private then: number = 0;
    private elapsed: number = 0;

    public static createAnimator() {
        if (Animator.animator)
            return;
        Animator.animator = new Animator();
    }

    private static getInstance(): Animator {
        return Animator.animator;
    }

    public static stop() {
        this.getInstance().stop = true;
    }

    public static start() {
        this.getInstance().stop = false;
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

        //Update Logic here
        Renderer.getInstance().render();

    }

}