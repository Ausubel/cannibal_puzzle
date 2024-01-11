export default class SpriteLoader {
    private static readonly SPRITES_ROOT: string = "/assets/sprites";
    private static getSpritePath(path: string): string {
        return `${SpriteLoader.SPRITES_ROOT}${path}`;
    }
    static createImage(path: string): HTMLImageElement {
        const image = new Image();
        image.src = this.getSpritePath(path);
        return image;
    }
}