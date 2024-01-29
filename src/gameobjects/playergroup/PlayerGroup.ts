import CanvasSize from "../../main/CanvasSize";
import RenderProvider from "../../main/RenderProvider";
import Vector2D from "../../math/Vector2D";
import Player from "../players/Player";
import Cannibal from "../players/instances/Cannibal";
import Missionary from "../players/instances/Missionary";

type PeekEnemyIterate = (enemy: Player) => void;

export default class PlayerGroup {
	protected players: Map<string, Player>;
	protected playerPositions: Vector2D[];
	constructor(private isInitialGroup: boolean) {
		this.players = new Map<string, Player>();
		this.playerPositions = Array<Vector2D>();
		this.initPlayers();
	}
	addPlayer(player: Player) {
		this.players.set(player.id, player);
	}
	setPlayerPosition(player: Player, position: Vector2D) {
		player.setPosition(position.x, position.y);
	}
	initPlayers(){
		if (!this.isInitialGroup) this.initPositions(0.8);
		else {
			this.initPositions(0.03);
			this.playerPositions.forEach((position, index) => {
				const player = index < 3 ? new Cannibal(position) : new Missionary(position);
				this.addPlayer(player);
			});
		}
  }
	getEmptyPosition(): Vector2D {
		const position = this.playerPositions.find(position => {
			const player = this.getFlatPlayers().find(
				player => player.position.equals(position)
			);
			return !player;
		})!;
		console.log("POSITION", position);
		return position;
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
		if (this.players.size < 6) {
			this.addPlayer(player);
			const position = this.getEmptyPosition();
			this.setPlayerPosition(player, position);
		}
	}
	shiftMissionaryPlayer(): Player | null {
		const missionary = this.getFlatPlayers().find(
			player => player instanceof Missionary
		);
		if (!missionary) return null;
		this.players.delete(missionary.id);
		return missionary;
	}
	shiftCannibalPlayer(): Player | null {
		const cannibal = this.getFlatPlayers().find(
			player => player instanceof Cannibal
		);
		if (!cannibal) return null;
		this.players.delete(cannibal.id);
		return cannibal;
	}
	initPositions(gap:number){
    const { canvasSize } = RenderProvider.getInstance();
    const spawnPointX = this.getSpawnPointX(canvasSize, gap);
    const botSpawnPointY = this.getBottomSpawnPointY(canvasSize);
    const topSpawnPointY = this.getTopSpawnPointY(canvasSize);
    const horizontalGap = this.horizontalGap(canvasSize);
    this.playerPositions = [
      new Vector2D( spawnPointX, botSpawnPointY),
      new Vector2D( spawnPointX + horizontalGap, botSpawnPointY),
      new Vector2D( spawnPointX + (2 * horizontalGap), botSpawnPointY),
      new Vector2D( spawnPointX, topSpawnPointY),
      new Vector2D( spawnPointX + horizontalGap, topSpawnPointY),
      new Vector2D( spawnPointX+ (2 * horizontalGap), topSpawnPointY)
    ];
  }
	protected getSpawnPointX(canvasSize: CanvasSize, scale: number): number{
    return canvasSize.width* scale
  }
  protected getBottomSpawnPointY(canvasSize: CanvasSize): number{
    return canvasSize.height*0.50
  }
  protected getTopSpawnPointY(canvasSize: CanvasSize): number{
    return canvasSize.height*0.33
  }
  protected horizontalGap(canvasSize: CanvasSize) {
    return canvasSize.width*0.052;
  }
}
