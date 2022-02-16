import { renderPlanet } from "../planet/planet";

export class Renderer {

    static instance: Renderer;

    public static createRenderer(canvas: HTMLCanvasElement) {
        if (Renderer.instance)
            return;
        Renderer.instance = new Renderer(canvas);
    }

    public static getInstance(): Renderer {
        return Renderer.instance;
    }

    /**
     * Renderer class
     */

    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;

    private canvasImg: ImageData;
    private imgBuffer: Uint32Array;

    private width: number = 0;
    private height: number = 0;

    private constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

        setCanvasSize(this.canvas);
        this.width = this.canvas.width;
        this.height = this.canvas.height;

        this.canvasImg = this.ctx.createImageData(this.width, this.height);
        this.imgBuffer = new Uint32Array(this.canvasImg.data.buffer);

        window.addEventListener("resize", this.updateCanvas.bind(this))
    }

    private updateCanvas() {
        setCanvasSize(this.canvas);
        this.width = this.canvas.width;
        this.height = this.canvas.height;

        this.canvasImg = this.ctx.createImageData(this.width, this.height);
        this.imgBuffer = new Uint32Array(this.canvasImg.data.buffer);

        this.clearCanvas();
    }

    private clearCanvas() {
        for (let i = 0; i < this.imgBuffer.length; i++)
            this.imgBuffer[i] = 0x00000000;
    }

    public render() {
        this.clearCanvas();

        renderPlanet(this.ctx, this.imgBuffer, this.width, this.height);

        this.ctx.putImageData(this.canvasImg, 0, 0);

    }

}

export const getCanvas = () => {
    const canvas = document.getElementById("rootCanvas") as HTMLCanvasElement;
    return canvas;
}

const setCanvasSize = (canvas: HTMLCanvasElement) => {

    const clientWidth = canvas.getBoundingClientRect().width;
    const clientHeight = canvas.getBoundingClientRect().height;

    if (canvas.width !== clientWidth)
        canvas.width = clientWidth;

    if (canvas.height !== clientHeight)
        canvas.height = clientHeight;
}