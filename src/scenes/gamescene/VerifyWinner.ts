import Swal from 'sweetalert2'
import Boat from "../../gameobjects/boat/Boat";
import PlayerGroup from "../../gameobjects/playergroup/PlayerGroup";
import GameScene from './GameScene';
export default class VerifyWinner {
  private playerInitialGroup: PlayerGroup;
  private playerFinalGroup: PlayerGroup;
  private boat;
  private isCheck: boolean = false;
  constructor(playerInitialGroup: PlayerGroup, playerFinalGroup: PlayerGroup, boat: Boat, private gameScene: GameScene  ) {
    this.playerInitialGroup = playerInitialGroup;
    this.playerFinalGroup = playerFinalGroup;
    this.boat = boat;
  }
  private verifyLose() {
    if (this.isCheck) return;
    const isBoatFinalPosition = this.boat.movementController.reachedBoundaryLeftLimit();
    const isBoatInitialPosition = this.boat.movementController.reachedBoundaryRightLimit();
    if (!(!isBoatFinalPosition || !isBoatInitialPosition)) return;
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
      if(!(missionaryInitialGroup === 0 || cannibalInitialGroup === 0))
      {
        if(!(missionaryInitialGroup >= cannibalInitialGroup)) this.userLost();
        if((totalFinalCannibalGroup === 0 || totalFinalMissionaryGroup === 0)) return;
        if(totalFinalCannibalGroup <= totalFinalMissionaryGroup) return;
        console.log(totalFinalCannibalGroup <= totalFinalMissionaryGroup);
        this.userLost();
      }
    } 
    
    if(isBoatInitialPosition){
      if(!(missionaryFinalGroup === 0 || cannibalFinalGroup === 0))
      {
        if(!(missionaryFinalGroup >= cannibalFinalGroup)) this.userLost();
        if((totalInitialCannibalGroup === 0 || totalInitialMissionaryGroup === 0)) return;
        if(totalInitialCannibalGroup <= totalInitialMissionaryGroup) return;
        this.userLost();
      }
    }
  }
  private verifyWin() {
    if (this.playerFinalGroup.getQuantityMissionary() === 3 && this.playerFinalGroup.getQuantityCannibal() === 3){
      this.userWin();
    }
  }
  
  update(){
    this.verifyLose();
    this.verifyWin();
  }
  hasPulsedMoveBoat(): boolean {
    return this.boat.movementController.hasPulsedMoveBoat()
  }
  private userLost(){
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Hay mas canibales que misioneros en el bote, perdiste!",
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.reload();
      }
    });
    this.isCheck = true;
  }
  private userWin(){
    this.gameScene.isRunning = false;
    Swal.fire({
      title: "¡GANASTE!",
      width: 550,
      text: "¡Felicidades! Has llevado a todos los misioneros y canibales al otro lado del rio. ¿Quieres jugar de nuevo?",
      padding: "1em",
      color: "#716add",
      backdrop: `
        rgba(0,0,123,0.4)
        url("/assets/images/nyan-cat.gif")
        left top
        no-repeat
      `,
      showConfirmButton: true
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.reload();
      }
    });
    this.isCheck = true;
  }
}