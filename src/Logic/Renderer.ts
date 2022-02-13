export class Renderer {

    private ctx: CanvasRenderingContext2D;

    private width: number = 0;
    private height: number = 0;

    constructor(canvas: HTMLCanvasElement) {
        this.ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
        this.width = canvas.width;
        this.height = canvas.height;
        this.clearCanvas();
    }

    private clearCanvas() {

        console.log("render")
        this.ctx.fillStyle = "#000000";

        this.ctx.fillRect(0, 0, this.width, this.height);
    }

}

export const getCanvas = () => {
    const canvas = document.getElementById("rootCanvas") as HTMLCanvasElement;
    return canvas;
}