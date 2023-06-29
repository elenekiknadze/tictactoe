import { BoardState, TileValue } from '../services/resolver.service';

export interface GameState {
  isGameOver: boolean;
  tictactoe: Array<TileValue>;
  currentMode: MODES;
  startTime: Date;
  winningSequence?: Array<number>;
  state?: BoardState;
}

export enum MODES {
  EASY = 3,
  AVERAGE = 7,
  HARD = 10,
}
