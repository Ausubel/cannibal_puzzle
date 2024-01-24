import Boat from "../../gameobjects/boat/Boat";
import PlayerFinalGroup from "../../gameobjects/playergroup/instances/PlayerFinalGroup";
import PlayerInitialGroup from "../../gameobjects/playergroup/instances/PlayerInitialGroup";

export default class VerifyWinner {
    private playerInitialGroup: PlayerInitialGroup;
    private playerFinalGroup: PlayerFinalGroup;
    private boat;
    constructor(playerInitialGroup: PlayerInitialGroup, playerFinalGroup: PlayerFinalGroup, boat: Boat) {
      this.playerInitialGroup = playerInitialGroup;
      this.playerFinalGroup = playerFinalGroup;
      this.boat = boat;
    }
    private verify() {

    }
    update(){
      this.verify();
    }
}