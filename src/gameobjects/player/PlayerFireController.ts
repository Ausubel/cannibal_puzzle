import GameControlProvider from "../../controls/GameControlProvider";
import LaserController from "../laser/LaserController";
import Vector2D from "../../math/Vector2D";
import PlayerControls from "./controls/PlayerControls";

export default class PlayerFireController {
	private gameControlProvider: GameControlProvider;
	private laserController: LaserController;
	private canFire: boolean = true;
	//#region Constants
	private static readonly FIRE_RATIO: number = 220;
	//#endregion
	constructor(
		private position: Vector2D,
		readonly sprite: HTMLImageElement,
		private playerControls: PlayerControls
	) {
		this.gameControlProvider = GameControlProvider.getInstance();
		this.laserController = new LaserController(sprite, {
			speed: 15,
			isToForward: true,
		});
	}
	fire() {
		if (!this.canFire || !this.isFiring()) return;
		this.laserController.create(this.position);
		this.canFire = false;
		this.schedulePermissionToFire();
	}
	private isFiring(): boolean {
		return this.gameControlProvider.hasPulsed(this.playerControls.fire);
	}
	private schedulePermissionToFire() {
		setTimeout(() => this.canFire = true, PlayerFireController.FIRE_RATIO);
	}
	followPath() {
		this.laserController.followPath();
	}
	render() {
		this.laserController.render();
	}
}
