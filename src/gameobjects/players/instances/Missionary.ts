import SpriteProvider from "../../../assetmanagers/SpriteProvider";
import Vector2D from "../../../math/Vector2D";
import Player from "../Player";
import ConfigurationPlayer from "../core/ConfigurationPlayer";

export default class Missionary extends Player {
    constructor(position: Vector2D) {
        const sprites = SpriteProvider.spriteManager.MISSIONARY;
        super(position, sprites, ConfigurationPlayer.MISSIONARY_SCALE);
    }
    copy(): Missionary {
        return new Missionary(this.position.copy());
    }
}