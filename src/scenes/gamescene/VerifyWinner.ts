import Swal from 'sweetalert2'
import Boat from "../../gameobjects/boat/Boat";
import PlayerGroup from "../../gameobjects/playergroup/PlayerGroup";
import Timer from '../../utils/Timer';
export default class VerifyWinner {
  private playerInitialGroup: PlayerGroup;
  private playerFinalGroup: PlayerGroup;
  private boat;
  private isCheck: boolean = false;
  private checkModalTimer: Timer;
  constructor(playerInitialGroup: PlayerGroup, playerFinalGroup: PlayerGroup, boat: Boat) {
    this.playerInitialGroup = playerInitialGroup;
    this.playerFinalGroup = playerFinalGroup;
    this.boat = boat;
    this.checkModalTimer = new Timer(
      () => this.reloadPage(), 
      1700
    );
  }
  private verify() {
    if (!this.hasPulsedMoveBoat() && this.isCheck) return;
    const missionaryInitialGroup = this.playerInitialGroup.getQuantityMissionary();
    const missionaryFinalGroup = this.playerFinalGroup.getQuantityMissionary();
    const cannibalInitialGroup = this.playerInitialGroup.getQuantityCannibal();
    const cannibalFinalGroup = this.playerFinalGroup.getQuantityCannibal();
    const missionaryBoatGroup = this.boat.seatsController.getQuantityMissionary();
    const cannibalBoatGroup = this.boat.seatsController.getQuantityCannibal();
    if (
        (false)
    ) {
      this.checkModalTimer.start();
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Me parece que perdiste :C",
        showConfirmButton: false,
        timer: 1500
      });
      
      this.isCheck = true;
    } 
    if (missionaryFinalGroup === 3 && cannibalFinalGroup  === 3) {
      Swal.fire({
        title: "¡GANASTE!",
        width: 600,
        padding: "3em",
        color: "#716add",
        background: "#fff url(/images/trees.png)",
        backdrop: `
          rgba(0,0,123,0.4)
          url("/assets/images/nyan-cat.gif")
          left top
          no-repeat
        `
      });
      this.isCheck = true;
    }
  }
  update(){
    this.verify();
    this.checkModalTimer.update();
  }
  hasPulsedMoveBoat(): boolean {
    return this.boat.movementController.hasPulsedMoveBoat()
  }
  private reloadPage(){
    window.location.reload();
  }
}