export type EnemySprites = {
    moving: HTMLImageElement[];
    fire: HTMLImageElement;
};

export default class SpriteManager {
    readonly PLAYER_SHIP_1: HTMLImageElement[];
    readonly PLAYER_SHIP_2: HTMLImageElement[];
    readonly PLAYER_SHIP_1_LASER: HTMLImageElement;
    readonly PLAYER_SHIP_2_LASER: HTMLImageElement;
    readonly ENEMY_LASER: HTMLImageElement;
    readonly WEAK_ENEMY: EnemySprites;
    readonly REGULAR_ENEMY: EnemySprites;
    readonly STRONG_ENEMY: EnemySprites;
    private constructor() {
        this.PLAYER_SHIP_1 = this.getPlayerShipSprites("ship_1");
        this.PLAYER_SHIP_2 = this.getPlayerShipSprites("ship_2");
        this.PLAYER_SHIP_1_LASER = this.createImage("/players/ship_1/laser_ship_1/0.png");
        this.PLAYER_SHIP_2_LASER = this.createImage("/players/ship_2/laser_ship_2/0.png");
        this.ENEMY_LASER = this.createImage("/enemies/enemy_laser/0.png");
        this.WEAK_ENEMY = this.getEnemySprites("enemy_weak");
        this.REGULAR_ENEMY = this.getEnemySprites("enemy_regular");
        this.STRONG_ENEMY = this.getEnemySprites("enemy_strong");
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
            PLAYER_SHIP_2,
            PLAYER_SHIP_1_LASER,
            PLAYER_SHIP_2_LASER,
            ENEMY_LASER,
            WEAK_ENEMY,
            REGULAR_ENEMY,
            STRONG_ENEMY,
        } = this;
        return [
            ...PLAYER_SHIP_1,
            ...PLAYER_SHIP_2,
            PLAYER_SHIP_1_LASER,
            PLAYER_SHIP_2_LASER,
            ENEMY_LASER,
            ...WEAK_ENEMY.moving,
            WEAK_ENEMY.fire,
            ...REGULAR_ENEMY.moving,
            REGULAR_ENEMY.fire,
            ...STRONG_ENEMY.moving,
            STRONG_ENEMY.fire,
        ]
    };
    private getEnemySprites(pathEnemy: string): EnemySprites {
        const enemy: EnemySprites = {
            fire: this.createImage(`/enemies/${pathEnemy}/fire.png`),
            moving: Array(3)
        };
        for (let i = 0; i < enemy.moving.length; i++) 
            enemy.moving[i] = this.createImage(`/enemies/${pathEnemy}/${i}.png`);
        return enemy;
    }
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