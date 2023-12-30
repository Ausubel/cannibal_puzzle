import SpriteManager from "./SpriteManager";

export default class SpriteProvider {
    private static _spriteManager: SpriteManager;
    static async init() {
        SpriteProvider._spriteManager = await SpriteManager.create();
    }
    static get spriteManager() {
        return SpriteProvider._spriteManager;
    }
}