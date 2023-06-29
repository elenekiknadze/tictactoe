import { Injectable } from '@angular/core';
import { Player } from '../enums/players.type';

export enum BoardState {
  DRAW,
  UNFINISHED,
  WINX,
  LOSEX,
}

export interface BoardData {
  state: BoardState;
  sequence?: Array<number>;
}

export interface Coordinates {
  x: Set<number>;
  o: Set<number>;
  empty: Set<number>;
}

export type TileValue = Player | '';

interface MoveResult {
  move: number;
  result: number;
}

@Injectable({
  providedIn: 'root',
})
export class ResolverService {
  winningSequences = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  constructor() {}

  bestMoveResolver(
    board: TileValue[],
    currentPlayer: 'x' | 'o' = 'x'
  ): MoveResult {
    const coords = this.getCoordinates(board);
    const result = this.resolveBoard(coords, board.length).state;
    if (result === BoardState.DRAW) {
      return { result: 0, move: -1 };
    } else if (result === BoardState.WINX) {
      return { result: 5, move: -1 };
    } else if (result === BoardState.LOSEX) {
      return { result: -5, move: -1 };
    }
    const potentialMoves = [];
    const emptySlots = coords.empty.keys();
    for (const slot of emptySlots) {
      const newBoard = [...board];
      newBoard[slot] = currentPlayer;
      const res = this.bestMoveResolver(
        newBoard,
        currentPlayer === 'x' ? 'o' : 'x'
      );
      res.move = slot;
      potentialMoves.push(res);
    }
    if (currentPlayer === 'x') {
      return potentialMoves.reduce((prev, cur) => {
        if (!prev) return cur;
        return prev.result >= cur.result ? prev : cur;
      });
    } else {
      return potentialMoves.reduce((prev, cur) => {
        if (!prev) return cur;
        return prev.result <= cur.result ? prev : cur;
      });
    }
  }

  randomMoveResolver(board: TileValue[]): MoveResult {
    const coords = this.getCoordinates(board);
    const emptySlots = Array.from(coords.empty);
    return {
      move: emptySlots[Math.floor(emptySlots.length * Math.random())],
      result: -1,
    };
  }

  resolveBoard(coords: Coordinates, boardLength: number): BoardData {
    for (let i = 0; i < this.winningSequences.length; i++) {
      const sequence = this.winningSequences[i];
      if (setContainsArray(coords.x, sequence)) {
        return { state: BoardState.WINX, sequence };
      }
      if (setContainsArray(coords.o, sequence)) {
        return { state: BoardState.LOSEX, sequence };
      }
    }

    if (coords.x.size + coords.o.size === boardLength) {
      return { state: BoardState.DRAW };
    }

    return { state: BoardState.UNFINISHED };
  }

  getCoordinates(board: TileValue[]): Coordinates {
    const coords: Coordinates = {
      x: new Set<number>(),
      o: new Set<number>(),
      empty: new Set<number>(),
    };
    for (let i = 0; i < board.length; i++) {
      const val = board[i];
      if (val === 'x') {
        coords.x.add(i);
      } else if (val === 'o') {
        coords.o.add(i);
      } else {
        coords.empty.add(i);
      }
    }
    return coords;
  }
}

function setContainsArray(set: Set<number>, arr: number[]) {
  for (let i = 0; i < arr.length; i++) {
    if (!set.has(arr[i])) {
      return false;
    }
  }
  return true;
}
