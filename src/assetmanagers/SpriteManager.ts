export default class SpriteManager {
    readonly PLAYER_SHIP_1: HTMLImageElement[];
    readonly PLAYER_SHIP_1_LASER: HTMLImageElement;
    private constructor() {
        this.PLAYER_SHIP_1 = this.getPlayerShipSprites("ship_1");
        this.PLAYER_SHIP_1_LASER = this.createImage("/players/ship_1/laser_ship_1/0.png");
    }
    static create(): Promise<SpriteManager> {
        return new Promise<SpriteManager>(res => {
            const instance = new SpriteManager();
            Promise.all(
                instance.toImageList().map(image => new Promise<void>(res => {
                    image.addEventListener("load", () => res());
                }))
            ).then(() => res(instance));
        });
    }
    private toImageList(): HTMLImageElement[] {
        const {
            PLAYER_SHIP_1,
            PLAYER_SHIP_1_LASER,
        } = this;
        return [
            ...PLAYER_SHIP_1,
            PLAYER_SHIP_1_LASER,
        ]
    };
    private getPlayerShipSprites(pathPlayer: string): HTMLImageElement[] {
        const frames = Array(3);
        for (let i = 0; i < frames.length; i++) 
            frames[i] = this.createImage(`/players/${pathPlayer}/${i}.png`);
        return frames;
    }
    private getSpritePath(path: string): string {
        return `/assets/sprites${path}`;
    }
    private createImage(path: string): HTMLImageElement {
        const image = new Image();
        image.src = this.getSpritePath(path);
        return image;
    }
}