
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

    private width: number = 0;
    private height: number = 0;

    private constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

        setCanvasSize(canvas);

        this.width = canvas.width;
        this.height = canvas.height;
        this.clearCanvas();

        window.addEventListener("resize", this.updateCanvas.bind(this))
    }

    private updateCanvas() {
        setCanvasSize(this.canvas);
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.clearCanvas();
    }

    private clearCanvas() {

        this.ctx.fillStyle = "#000000";

        this.ctx.fillRect(0, 0, this.width, this.height);
    }

    public render() {

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