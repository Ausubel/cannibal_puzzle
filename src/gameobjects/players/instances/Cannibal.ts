import SpriteProvider from "../../../assetmanagers/SpriteProvider";
import Vector2D from "../../../math/Vector2D";
import Player from "../Player";
import ConfigurationPlayer from "../core/ConfigurationPlayer";

export default class Cannibal extends Player {
    constructor(position: Vector2D) {
        const sprites = SpriteProvider.spriteManager.CANNIBAL;
        super(position, sprites, ConfigurationPlayer.CANNIBAL_SCALE);
    }
}