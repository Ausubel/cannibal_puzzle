export default class Size2D {
    private _width: number; 
    private _height: number;
    constructor(width: number, height: number) {
        this._width = width;
        this._height = height;
    }
    get width(): number {
        return this._width;
    }
    set width(value: number) {
        if (value < 0)
            throw new Error("Invalid width");
        this._width = value;
    }
    get height(): number {
        return this._height;
    }
    set height(value: number) {
        if (value < 0)
            throw new Error("Invalid height");
        this._height = value;
    }
} 