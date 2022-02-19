import { renderActionType } from "../../store/action-types/renderActionType";
import { store } from "../../store/store";
import { State } from "../../types/storeType";
import planet from "../planet/planet";
import { Renderer } from "./Renderer";

export class Animator {

    static animator: Animator;

    public static createAnimator() {
        if (Animator.animator)
            return;
        Animator.animator = new Animator();
    }

    private static getInstance(): Animator {
        return Animator.animator;
    }

    public static isAnimating() {
        return !Animator.getInstance().stop;
    }

    public static setAnimationFrame(keyframe: number) {
        Animator.stop();
        Animator.getInstance().animationFrame = keyframe - 1;
        Animator.getInstance().tick();
    }

    public static getAnimationFrame() {
        return Animator.getInstance().animationFrame;
    }

    public static changeAnimationStatus() {
        Animator.getInstance().animationFrame--;
        Animator.getInstance().stop = !Animator.getInstance().stop;
        Animator.getInstance().tick();
    }

    public static updateFPS() {
        const state: State = store.getState();
        Animator.getInstance().fps = state.renderSettings.fps;
        if (Animator.isAnimating()) {
            Animator.stop();
            Animator.getInstance().startTicking();
            Animator.start();
            return;
        }
        Animator.getInstance().startTicking();
        Animator.stop();
    }

    public static stop() {
        Animator.getInstance().stop = true;
    }

    public static start() {
        Animator.getInstance().stop = false;
    }


    /**
     * Class
     */

    private stop: boolean = false;

    private animationFrame: number = 0;

    private fps: number = 30;
    private fpsInterval: number = 0;
    private now: number = 0;
    private then: number = 0;
    private elapsed: number = 0;

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
        Renderer.getInstance().render(this.animationFrame);

        this.animationFrame++;
        this.animationFrame = (this.animationFrame % planet.noiseMap.length);
        this.updateKeyframe();
    }

    private updateKeyframe() {
        store.dispatch(
            {
                type: renderActionType.UPDATE_KEYFRAME,
                payload: this.animationFrame
            })
    }

}