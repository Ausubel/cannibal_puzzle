export default class ConfigurationBoat {
  static readonly BOAT_SCALE: number = 0.15;
  static readonly BOAT_ANIMATION_INTERVAL: number = 400;
  static readonly BOAT_INITIAL_POSITION = {
    x: 0.12,
    y: 0.7
  }
  static readonly BOAT_SPEED_MOVEMENT: number = 1;
  static readonly BOAT_SEATS_LIMIT: number = 2;
  static readonly BOAT_FIRST_SEATS_POSITION = {
    x: 10,
    y: -10
  }
  static readonly BOAT_SECOND_SEATS_POSITION = {
    x: 50,
    y: -10
  }
  static readonly BOAT_LEFT_LIMIT: number = 250;
  static readonly BOAT_RIGHT_LIMIT: number = 1600;
  static readonly BOAT_MOVE_RATIO: number = 500;
  static readonly BOAT_FIRT_SEAT_RELATIVE_POSITION_X: number = 0.25;
  static readonly BOAT_FIRT_SEAT_RELATIVE_POSITION_Y: number = 0.65;
  static readonly BOAT_SECOND_SEAT_RELATIVE_POSITION_X: number = 0.55;
  static readonly BOAT_SECOND_SEAT_RELATIVE_POSITION_Y: number = 0.65;
}   