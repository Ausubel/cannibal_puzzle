import Boat from "../../gameobjects/boat/Boat";
import PlayerGroup from "../../gameobjects/playergroup/PlayerGroup";

export default class VerifyWinner {
    private playerInitialGroup: PlayerGroup;
    private playerFinalGroup: PlayerGroup;
    private boat;
    constructor(playerInitialGroup: PlayerGroup, playerFinalGroup: PlayerGroup, boat: Boat) {
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