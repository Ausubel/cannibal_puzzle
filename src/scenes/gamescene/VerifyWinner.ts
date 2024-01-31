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
  private verifyLose() {
    if (this.isCheck) return;
    const isBoatFinalPosition = this.boat.movementController.reachedBoundaryLeftLimit();
    const isBoatInitialPosition = this.boat.movementController.reachedBoundaryRightLimit();
    if (!(!isBoatFinalPosition || !isBoatInitialPosition)) return;
    console.log("verificando");
    const missionaryInitialGroup = this.playerInitialGroup.getQuantityMissionary();
    const missionaryFinalGroup = this.playerFinalGroup.getQuantityMissionary();

    const cannibalInitialGroup = this.playerInitialGroup.getQuantityCannibal();
    const cannibalFinalGroup = this.playerFinalGroup.getQuantityCannibal();

    const missionaryBoatGroup = this.boat.seatsController.getQuantityMissionary();
    const cannibalBoatGroup = this.boat.seatsController.getQuantityCannibal();

    const totalInitialMissionaryGroup = missionaryInitialGroup + missionaryBoatGroup;
    const totalInitialCannibalGroup = cannibalInitialGroup + cannibalBoatGroup;
    const totalFinalMissionaryGroup = missionaryFinalGroup + missionaryBoatGroup;
    const totalFinalCannibalGroup = cannibalFinalGroup + cannibalBoatGroup;
    
    if (isBoatInitialPosition 
      && totalInitialMissionaryGroup === 3 
      && cannibalInitialGroup + cannibalBoatGroup === 3) return;
    
    if (isBoatFinalPosition)
    {
      if(missionaryInitialGroup === 0 || cannibalInitialGroup === 0) return;
      else{
        if(missionaryInitialGroup >= cannibalInitialGroup) return;
        this.userLost();
        if((totalFinalCannibalGroup === 0 && totalFinalMissionaryGroup === 0)) return;
        if(totalFinalCannibalGroup <= totalFinalMissionaryGroup) return;
        console.log(totalFinalCannibalGroup <= totalFinalMissionaryGroup);
        this.userLost();
      }
    } 
    
    if(isBoatInitialPosition){
      if(missionaryFinalGroup === 0 || cannibalFinalGroup === 0) return;
      else{
        if(missionaryFinalGroup >= cannibalFinalGroup) return;
        this.userLost();
        if((totalInitialCannibalGroup === 0 && totalInitialMissionaryGroup === 0))  {console.log("no hay nadie"); return;}  
        if(totalInitialCannibalGroup <= totalInitialMissionaryGroup) return;
        this.userLost();
      }
      
    }
    
  }
  private verifyWin() {
    if (this.playerFinalGroup.getQuantityMissionary() === 3 && this.playerFinalGroup.getQuantityCannibal() === 3) this.userWin();
  }
  
  update(){
    this.verifyLose();
    this.verifyWin()
    this.checkModalTimer.update();
  }
  hasPulsedMoveBoat(): boolean {
    return this.boat.movementController.hasPulsedMoveBoat()
  }
  private reloadPage(){
    window.location.reload();
  }
  private userLost(){
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
  private userWin(){
    Swal.fire({
      title: "¡GANASTE!",
      width: 500,
      padding: "4em",
      color: "#716add",
      background: "#fff url(/images/trees.png)",
      backdrop: `
        rgba(0,0,123,0.4)
        url("/assets/images/nyan-cat.gif")
        top
        no-repeat
      `
    });
    this.isCheck = true;
  }
}