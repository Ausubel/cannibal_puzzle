import Vector2D from "../../math/Vector2D";
import Player from "./Player";
import ConfigurationPlayer from "./core/ConfigurationPlayer";
import Cannibal from "./intances/Cannibal";
import Missionary from "./intances/Missionary";

type PeekEnemyIterate = (enemy: Player) => void;

export default class PlayerGroup {
    private players: Map<string, Player>;
    constructor() {
        this.players = this.createPlayers();
    }
    private createPlayers(): Map<string, Player> {
        const players = new Map<string, Player>();
        const playerConfigs = [
            { type: Missionary, position: new Vector2D(5 + ConfigurationPlayer.GAP_X_OF_PLAYER_GROUP_SPAM, 30 + ConfigurationPlayer.GAP_Y_OF_PLAYER_GROUP_SPAM) },
            { type: Missionary, position: new Vector2D(105 + ConfigurationPlayer.GAP_X_OF_PLAYER_GROUP_SPAM, 30 + ConfigurationPlayer.GAP_Y_OF_PLAYER_GROUP_SPAM) },
            { type: Missionary, position: new Vector2D(205 + ConfigurationPlayer.GAP_X_OF_PLAYER_GROUP_SPAM, 30 + ConfigurationPlayer.GAP_Y_OF_PLAYER_GROUP_SPAM) },
            { type: Cannibal, position: new Vector2D(0 + ConfigurationPlayer.GAP_X_OF_PLAYER_GROUP_SPAM, 124 + ConfigurationPlayer.GAP_Y_OF_PLAYER_GROUP_SPAM) },
            { type: Cannibal, position: new Vector2D(100 + ConfigurationPlayer.GAP_X_OF_PLAYER_GROUP_SPAM, 124 + ConfigurationPlayer.GAP_Y_OF_PLAYER_GROUP_SPAM) },
            { type: Cannibal, position: new Vector2D(200 + ConfigurationPlayer.GAP_X_OF_PLAYER_GROUP_SPAM, 124 + ConfigurationPlayer.GAP_Y_OF_PLAYER_GROUP_SPAM) },
        ];
        playerConfigs.forEach(config => {
            const player = new config.type(config.position);
            players.set(player.id, player);
        });
        return players;
    }
    
    update() {
        this.forEachEnemy(player => player.update());
    }
    render() {
        this.forEachEnemy(player => player.render());
    }
    getFlatPlayers(): Player[] {
        return Array.from(this.players.values());
    }
    destroyPlayer(player: Player) {
        this.players.delete(player.id);
    }
    forEachEnemy(action: PeekEnemyIterate) {
        this.players.forEach(action);
    }
}