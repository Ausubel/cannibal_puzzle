import CanvasSize from "./CanvasSize";

export default class RenderProvider {
    private readonly canvas: HTMLCanvasElement;
    readonly renderizer: CanvasRenderingContext2D;
    private static instance: RenderProvider;
    private static readonly ASPECT_RATIO = 16 / 9;
    private constructor() {
        this.canvas = document.getElementById("game") as HTMLCanvasElement;
        this.renderizer = this.canvas.getContext("2d") as CanvasRenderingContext2D;
        this.setupDimensions();
    }
    static getInstance(): RenderProvider {
        if (!RenderProvider.instance) 
            RenderProvider.instance = new RenderProvider();
        return RenderProvider.instance;
    }
    private getAjustedCanvasSize(): CanvasSize {
        const { innerWidth, innerHeight } = window;
        const newHeight = innerWidth / RenderProvider.ASPECT_RATIO;
        const finalHeight = Math.min(innerHeight, newHeight);
        return {
            width: innerWidth,
            height: finalHeight
        };
    };
    private setupDimensions() {
        this.setCanvasSize(this.getAjustedCanvasSize());
        this.setCanvasSizeCSS(this.getAjustedCanvasSize());
        window.addEventListener("resize",() => {
            this.setCanvasSizeCSS(this.getAjustedCanvasSize());
        });
    }
    private setCanvasSize({ width, height }: CanvasSize) {
        this.canvas.width = width;
        this.canvas.height = height;
    }
    private setCanvasSizeCSS({ width, height }: CanvasSize)  {
        this.canvas.style.width = `${width}px`;
        this.canvas.style.height = `${height}px`;
    }
    get canvasSize(): CanvasSize {
        return {
            width: this.canvas.width,
            height: this.canvas.height,
        };
    }
    clearScreen() {
        const canvasSize = this.canvasSize;
        const { renderizer } = this;
        renderizer.fillStyle = "#000000";
        renderizer.fillRect(0, 0, canvasSize.width, canvasSize.height);
    }
}