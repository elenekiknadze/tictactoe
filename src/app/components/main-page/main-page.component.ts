import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import {
  BoardData,
  BoardState,
  Coordinates,
  ResolverService,
} from '../../services/resolver.service';
import { AuthService } from '../../services/auth.service';
import { ScoreboardService } from '../../services/scoreboard.service';
import { TileComponent } from '../tile/tile.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { NameYourselfComponent } from '../name-yourself/name-yourself.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { PlayerData } from '../../interfaces/playerdata.interface';
import { ScoreIconComponent } from '../score-icon/score-icon.component';
import { GameState, MODES } from '../../interfaces/game.interface';
import { TimerService } from '../../services/timer.service';
import {
  ScoreboardBaseService,
  SCOREBOARD_SERVICE_TOKEN,
} from '../../services/scoreboard.abstract.service';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    TileComponent,
    MatDialogModule,
    MatButtonModule,
    MatCardModule,
    ScoreIconComponent,
  ],
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
  providers: [
    {
      provide: SCOREBOARD_SERVICE_TOKEN,
      useExisting: ScoreboardService,
    },
  ],
})
export class MainPageComponent implements OnInit {
  gameState: GameState = blankSlate();
  firstRow = [0, 1, 2];
  secondRow = [3, 4, 5];
  thirdRow = [6, 7, 8];
  boardState = BoardState;
  currentScore: number | null = null;

  constructor(
    public readonly authService: AuthService,
    @Inject(SCOREBOARD_SERVICE_TOKEN)
    public readonly scoreService: ScoreboardBaseService,
    private readonly resolver: ResolverService,
    private readonly dialog: MatDialog,
    public readonly timer: TimerService
  ) {}

  makeMove(index: number) {
    this.gameState.tictactoe[index] = this.authService.player;

    this.checkGameOver();
    if (this.gameState.isGameOver) return;
    const randomNumber = Math.floor(MODES.HARD * Math.random());
    const moveRes =
      randomNumber < this.gameState.currentMode
        ? this.resolver.bestMoveResolver(
            this.gameState.tictactoe,
            this.authService.computer
          )
        : this.resolver.randomMoveResolver(this.gameState.tictactoe);
    this.gameState.tictactoe[moveRes.move] = this.authService.computer;
    this.checkGameOver();
  }

  get titleString() {
    const boardState = this.gameState.state;
    const currentPlayer = this.authService.player;
    const name = this.authService.name;
    if (boardState === BoardState.UNFINISHED) {
      return `Whats your move ${name}?`;
    }
    if (boardState === BoardState.DRAW) {
      return "It's a draw, try again?";
    }
    if (
      (boardState === BoardState.WINX && currentPlayer === 'x') ||
      (boardState === BoardState.LOSEX && currentPlayer === 'o')
    ) {
      return 'You won!';
    }
    return 'You lost :(';
  }

  checkGameOver() {
    const coords = this.resolver.getCoordinates(this.gameState.tictactoe);
    const res = this.resolver.resolveBoard(
      coords,
      this.gameState.tictactoe.length
    );
    if (res.state !== BoardState.UNFINISHED) {
      this.gameState.isGameOver = true;
      this.gameState.winningSequence = res.sequence;
      this.gameState.state = res.state;
      this.registerScore(res, coords);
    }
  }

  registerScore(boardData: BoardData, coordinates: Coordinates) {
    this.timer.stopCounter();
    if (!this.playerWon(boardData)) {
      return;
    }
    const numberOfMoves =
      this.authService.player === 'x' ? coordinates.x.size : coordinates.o.size;
    const score = this.scoreService.calculateScore(
      this.timer.counter,
      numberOfMoves
    );
    this.scoreService.addScore({ name: this.authService.name, score });
    this.currentScore = score;
  }

  playerWon(boardData: BoardData) {
    return (
      (this.authService.player === 'x' &&
        boardData.state === BoardState.WINX) ||
      (this.authService.player === 'o' && boardData.state === BoardState.LOSEX)
    );
  }

  getDisabledStatus(index: number): boolean {
    return this.gameState.isGameOver || !!this.gameState.tictactoe[index];
  }

  isInWinningSequence(index: number): boolean {
    return !!this.gameState.winningSequence?.includes(index);
  }

  ngOnInit(): void {
    this.openEntryDialog();
  }

  openEntryDialog() {
    this.dialog
      .open(NameYourselfComponent, { disableClose: true })
      .afterClosed()
      .subscribe((data: PlayerData) => {
        this.authService.name = data.name;
        this.authService.player = data.player;
        this.startNewGame();
      });
  }

  startNewGame() {
    this.timer.startCounter();
    this.gameState = blankSlate();
    this.currentScore = null;
    if (this.authService.player === 'o') {
      const moveRes = this.resolver.bestMoveResolver(
        this.gameState.tictactoe,
        'x'
      );
      this.gameState.tictactoe[moveRes.move] = 'x';
    }
  }

  startOver() {
    this.openEntryDialog();
  }
}

function blankSlate(): GameState {
  return {
    isGameOver: false,
    tictactoe: new Array(9).fill(''),
    currentMode: MODES.AVERAGE,
    startTime: new Date(),
    winningSequence: [],
    state: BoardState.UNFINISHED,
  };
}
