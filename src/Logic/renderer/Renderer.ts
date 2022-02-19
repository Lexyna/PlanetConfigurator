import { saveAs } from 'file-saver';
import JSZip from "jszip";
import planet, { renderPlanet } from "../planet/planet";
import { createPlanetPNG } from "../planet/planetExporter";
import { Animator } from "./Animator";

export class Renderer {

    static instance: Renderer;

    public static createRenderer(canvas: HTMLCanvasElement) {
        if (Renderer.instance)
            return;
        Renderer.instance = new Renderer(canvas);
    }

    public static downloadPlanetImg() {
        Renderer.getInstance().downloadPlanetPNG();
    }

    public static downloadPlanetAnimation() {
        Renderer.getInstance().downloadPlanetAnimation();
    }

    public static getInstance(): Renderer {
        return Renderer.instance;
    }

    /**
     * Renderer class
     */

    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;

    private downloadCanvas: HTMLCanvasElement;
    private downloadCtx: CanvasRenderingContext2D;

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

        this.downloadCanvas = getCanvas("downloadCanvas") as HTMLCanvasElement;
        this.downloadCtx = this.downloadCanvas.getContext("2d") as CanvasRenderingContext2D;

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

    public render(animationFrame: number) {
        this.clearCanvas();

        renderPlanet(this.imgBuffer, this.width, this.height, animationFrame);

        this.ctx.putImageData(this.canvasImg, 0, 0);

    }

    private downloadPlanetPNG() {

        const imgSize = planet.radius * 2;
        this.downloadCanvas.width = imgSize;
        this.downloadCanvas.height = imgSize;

        const planetImg = this.downloadCtx.createImageData(imgSize, imgSize);

        createPlanetPNG(
            new Uint32Array(planetImg.data.buffer),
            Animator.getAnimationFrame());

        this.downloadCtx.putImageData(planetImg, 0, 0);

        const link = document.createElement("a");
        link.download = "planet.png";
        link.href = this.downloadCanvas.toDataURL();
        link.click();

    }

    private downloadPlanetAnimation() {

        const length = planet.noiseMap.length;
        const imgSize = planet.radius * 2;

        this.downloadCanvas.width = imgSize;
        this.downloadCanvas.height = imgSize;

        const images: string[] = [];
        for (let i = 0; i < length; i++) {
            const planetImg = this.downloadCtx.createImageData(imgSize, imgSize);
            createPlanetPNG(
                new Uint32Array(planetImg.data.buffer),
                i
            );
            this.downloadCtx.putImageData(planetImg, 0, 0);
            const base64 = this.downloadCanvas.toDataURL()
                .replace(/^data:image\/(png|jpg);base64,/, "");
            images.push(base64);
        }

        const zip: JSZip = new JSZip();
        const imgFolder = zip.folder("animation");

        for (let i = 0; i < length; i++)
            imgFolder?.file(`animation${i}.png`, images[i], { base64: true });

        zip.generateAsync({ type: "blob" }).then(function (content) {
            saveAs(content, "animation.zip");
        })


    }

}

export const getCanvas = (id: string) => {
    const canvas = document.getElementById(id) as HTMLCanvasElement;
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