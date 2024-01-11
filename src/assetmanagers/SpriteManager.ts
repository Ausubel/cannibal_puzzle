import SpriteLoader from "./SpriteLoader";

export type EnemySprites = {
    moving: HTMLImageElement[];
    fire: HTMLImageElement;
};
export type ShieldSprites = {
    noDamage: HTMLImageElement;
    damaged: HTMLImageElement;
    veryDamaged: HTMLImageElement;
};

export default class SpriteManager {
    readonly BACKGROUND: HTMLImageElement
    readonly MISSIONARY: HTMLImageElement[];
    readonly CANNIBAL: HTMLImageElement[];
    private constructor() {
        this.MISSIONARY = this.loadPlayersSprites("missionary");
        this.CANNIBAL = this.loadPlayersSprites("cannibal");
        this.BACKGROUND = SpriteLoader.createImage("/background/0.png");
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
        } = this;
        return [
            BACKGROUND,
            ...CANNIBAL,
            ...MISSIONARY,
        ]
    }

    private loadPlayersSprites(pathPlayer: string): HTMLImageElement[] {
        const frames = Array(3);
        for (let i = 0; i < frames.length; i++) 
            frames[i] = SpriteLoader.createImage(`/${pathPlayer}/${i}.png`);
        return frames;
    }
}