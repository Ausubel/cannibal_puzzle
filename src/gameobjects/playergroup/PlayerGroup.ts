import Vector2D from "../../math/Vector2D";
import Player from "../players/Player";
import Cannibal from "../players/instances/Cannibal";
import Missionary from "../players/instances/Missionary";

type PeekEnemyIterate = (enemy: Player) => void;

export default abstract class PlayerGroup {
    protected players: Map<string, Player>;
    protected playerPositions: Vector2D[];
    constructor() {
        this.players = new Map<string, Player>();
        this.playerPositions = Array<Vector2D>();
    }
    addPlayer(player: Player) {
        this.players.set(player.id, player);
    }
    setPlayerPosition(player: Player,  position: Vector2D) {
        player.setPosition(position.x, position.y);
    }
    update() {
        this.forEachPlayer(player => player.update());
    }
    render() {
        this.forEachPlayer(player => player.render());
    }
    getFlatPlayers(): Player[] {
        return Array.from(this.players.values());
    }

    forEachPlayer(action: PeekEnemyIterate) {
        this.players.forEach(action);
    }
    sitPlayer(player: Player): void {
        if(this.players.size <= 6){
            this.addPlayer(player);
            const position = this.playerPositions[this.players.size - 1];
            this.setPlayerPosition(player, position);
        }
    }
}