import RenderProvider from "../../main/RenderProvider";
import Vector2D from "../../math/Vector2D";
import Laser, { LaserMovementData } from "./Laser";

export default class LaserController {
    private lasers: Map<string, Laser>;
    private renderProvider: RenderProvider;
    constructor(
        private sprite: HTMLImageElement, 
        private movementData: LaserMovementData
    ) {
        this.lasers = new Map<string, Laser>();
        this.renderProvider = RenderProvider.getInstance();
    }
    private destroy(laser: Laser) {
        this.lasers.delete(laser.id);
    }
    private isOutOfBounds(laser: Laser): boolean {
        const { y } = laser.position;
        return y < -laser.height || y > this.renderProvider.canvasSize.height;
    }
    create(position: Vector2D) {
        const laser = new Laser(position, this.sprite, this.movementData);
        this.lasers.set(laser.id, laser);
    }
    followPath() {
        this.lasers.forEach(laser => {
            laser.update();
            if (this.isOutOfBounds(laser)) 
                this.destroy(laser);
        });
    }
    render() {
        this.lasers.forEach(laser => laser.render());
    }
}