import Vector2D from "../../../math/Vector2D";
import ConfigurationPlayer from "../../players/core/ConfigurationPlayer";
import PlayerGroup from "../PlayerGroup";

export default class PlayerFinalGroup extends PlayerGroup{
    constructor(){
        super();
        this.initPositions();
    }
    private initPositions(){
        this.playerPositions = [
            new Vector2D(0 + ConfigurationPlayer.ARRIVAL_GAP_X_OF_INITIAL_PLAYER_GROUP, 124 + ConfigurationPlayer.GAP_Y_OF_PLAYER_GROUP),
            new Vector2D(100 + ConfigurationPlayer.ARRIVAL_GAP_X_OF_INITIAL_PLAYER_GROUP, 124 + ConfigurationPlayer.GAP_Y_OF_PLAYER_GROUP),
            new Vector2D(200 + ConfigurationPlayer.ARRIVAL_GAP_X_OF_INITIAL_PLAYER_GROUP, 124 + ConfigurationPlayer.GAP_Y_OF_PLAYER_GROUP),
            new Vector2D(5 + ConfigurationPlayer.ARRIVAL_GAP_X_OF_INITIAL_PLAYER_GROUP, 30 + ConfigurationPlayer.GAP_Y_OF_PLAYER_GROUP),
            new Vector2D(105 + ConfigurationPlayer.ARRIVAL_GAP_X_OF_INITIAL_PLAYER_GROUP, 30 + ConfigurationPlayer.GAP_Y_OF_PLAYER_GROUP),
            new Vector2D(205 + ConfigurationPlayer.ARRIVAL_GAP_X_OF_INITIAL_PLAYER_GROUP, 30 + ConfigurationPlayer.GAP_Y_OF_PLAYER_GROUP)
        ];
    }
}