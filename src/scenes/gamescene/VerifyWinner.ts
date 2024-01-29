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
    const missionaryInitialGroup = this.playerInitialGroup.getQuantityMissionary();
    const missionaryFinalGroup = this.playerFinalGroup.getQuantityMissionary();
    const cannibalInitialGroup = this.playerInitialGroup.getQuantityCannibal();
    const cannibalFinalGroup = this.playerFinalGroup.getQuantityCannibal();
    const missionaryBoatGroup = this.boat.seatsController.getQuantityMissionary();
    const cannibalBoatGroup = this.boat.seatsController.getQuantityCannibal();
    if (this.boat.movementController.reachedBoundaryRightLimit()){
      if (
          (missionaryInitialGroup + missionaryBoatGroup < cannibalInitialGroup + cannibalBoatGroup) &&
          (missionaryInitialGroup + missionaryBoatGroup > 0 && cannibalInitialGroup + cannibalBoatGroup > 0)
      ) {
        alert("PERDISTE");
      }
    }
    else if (this.boat.movementController.reachedBoundaryLeftLimit()){
      if (
          (missionaryFinalGroup + missionaryBoatGroup < cannibalFinalGroup + cannibalBoatGroup) &&
          (missionaryFinalGroup + missionaryBoatGroup > 0 && cannibalFinalGroup + cannibalBoatGroup > 0)
      ) {
        alert("PERDISTE");
      } 
      else if (missionaryFinalGroup === 3 && cannibalFinalGroup  === 3) {
        alert("GANASTE");
      }
    }
  }
  update(){
    this.verify();
  }
}