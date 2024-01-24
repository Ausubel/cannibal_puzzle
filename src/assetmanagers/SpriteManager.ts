import SpriteLoader from "./SpriteLoader";
export type BoatSprites = {
    toRight: HTMLImageElement[];
    toLeft: HTMLImageElement[];
}
export default class SpriteManager {
    readonly BACKGROUND: HTMLImageElement
    readonly MISSIONARY: HTMLImageElement[];
    readonly CANNIBAL: HTMLImageElement[];
    readonly BOAT: BoatSprites;
    private constructor() {
        this.MISSIONARY = this.loadPlayersSprites("missionary");
        this.CANNIBAL = this.loadPlayersSprites("cannibal");
        this.BACKGROUND = SpriteLoader.createImage("/background/0.png");
        this.BOAT = this.loadBoatSprites("boat");
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
            BACKGROUND,
            CANNIBAL,
            MISSIONARY,
            BOAT
        } = this;
        return [
            BACKGROUND,
            ...CANNIBAL,
            ...MISSIONARY,
            ...BOAT.toRight,
            ...BOAT.toLeft
        ]
    }

    private loadPlayersSprites(pathPlayer: string): HTMLImageElement[] {
        const frames = Array(3);
        for (let i = 0; i < frames.length; i++) 
            frames[i] = SpriteLoader.createImage(`/${pathPlayer}/${i}.png`);
        return frames;
    }
    private loadBoatSprites(pathBoat: string): BoatSprites {
        const boatSprites: BoatSprites = {
            toRight: Array(2),
            toLeft: Array(2)
        };
        for (let i = 0; i < boatSprites.toRight.length; i++) {
            boatSprites.toRight[i] = SpriteLoader.createImage(`/${pathBoat}/${i+2}.png`);
            boatSprites.toLeft[i] = SpriteLoader.createImage(`/${pathBoat}/${i}.png`);
        }
        return boatSprites;
    }
}