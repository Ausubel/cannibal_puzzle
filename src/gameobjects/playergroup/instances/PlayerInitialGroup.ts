import Vector2D from "../../../math/Vector2D";
import ConfigurationPlayer from "../../players/core/ConfigurationPlayer";
import Cannibal from "../../players/instances/Cannibal";
import Missionary from "../../players/instances/Missionary";
import PlayerGroup from "../PlayerGroup";

export default class PlayerInitialGroup extends PlayerGroup {
  constructor() {
    super();
    this.initPlayers();
  }

  private initPositions(){
    this.playerPositions = [
      new Vector2D(0 + ConfigurationPlayer.SPAM_GAP_X_OF_INITIAL_PLAYER_GROUP, 124 + ConfigurationPlayer.GAP_Y_OF_PLAYER_GROUP),
      new Vector2D(100 + ConfigurationPlayer.SPAM_GAP_X_OF_INITIAL_PLAYER_GROUP, 124 + ConfigurationPlayer.GAP_Y_OF_PLAYER_GROUP),
      new Vector2D(200 + ConfigurationPlayer.SPAM_GAP_X_OF_INITIAL_PLAYER_GROUP, 124 + ConfigurationPlayer.GAP_Y_OF_PLAYER_GROUP),
      new Vector2D(5 + ConfigurationPlayer.SPAM_GAP_X_OF_INITIAL_PLAYER_GROUP, 30 + ConfigurationPlayer.GAP_Y_OF_PLAYER_GROUP),
      new Vector2D(105 + ConfigurationPlayer.SPAM_GAP_X_OF_INITIAL_PLAYER_GROUP, 30 + ConfigurationPlayer.GAP_Y_OF_PLAYER_GROUP),
      new Vector2D(205 + ConfigurationPlayer.SPAM_GAP_X_OF_INITIAL_PLAYER_GROUP, 30 + ConfigurationPlayer.GAP_Y_OF_PLAYER_GROUP)
    ];
  }
  private initPlayers(){
    this.initPositions();
    this.playerPositions.forEach((position, index) => {
      const player = index < 3 ? new Cannibal(position) : new Missionary(position);
      this.addPlayer(player);
    });
  }
}