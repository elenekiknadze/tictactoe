import { TileValue } from '../services/resolver.service';

export interface GameState {
  isGameOver: boolean;
  tictactoe: Array<TileValue>;
  currentMode: MODES;
  startTime: Date;
  winningSequence?: Array<number>;
}

export enum MODES {
  EASY = 0,
  AVERAGE = 5,
  HARD = 10,
}
